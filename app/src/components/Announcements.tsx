import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Bell, X } from "lucide-react";
import { activeOn, fetchAnnouncements, liveSheetCsvUrl, todayIn, type Announcement } from "../announcements";
import { announcementsConfig } from "../content";

// Ghi nhớ (trên trình duyệt của khách) những thông báo đã xem trong ngày,
// để không tự bật lên lại mỗi lần chuyển trang / tải lại.
const SEEN_KEY = "cheri-announcements-seen";
// Khung tự bật lúc mở trang sẽ tự đóng sau thời gian này nếu khách không tương tác.
const AUTO_CLOSE_MS = 10000;

function readSeen(today: string): string[] {
  try {
    const saved = JSON.parse(localStorage.getItem(SEEN_KEY) ?? "null");
    return saved?.date === today && Array.isArray(saved.ids) ? saved.ids : [];
  } catch {
    return [];
  }
}

function writeSeen(today: string, ids: string[]) {
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify({ date: today, ids }));
  } catch {
    // Trình duyệt chặn lưu trữ (chế độ ẩn danh...): bỏ qua, chỉ là tiện ích.
  }
}

/**
 * Chuông thông báo ở header. Khi mở trang, nếu hôm nay có thông báo mới
 * thì tự mở khung thông báo một lần; khách bấm chuông để xem lại bất cứ lúc nào.
 */
export function Announcements() {
  const today = todayIn(announcementsConfig.timeZone);
  const [items, setItems] = useState<Announcement[]>([]);
  const [open, setOpen] = useState(false);
  // true khi khung tự bật lúc tải trang (chỉ trường hợp này mới tự đóng sau 10 giây).
  const [autoOpened, setAutoOpened] = useState(false);
  // Khách đang rê chuột / focus vào khung thì tạm dừng đếm giờ tự đóng.
  const [engaged, setEngaged] = useState(false);
  const [seen, setSeen] = useState<string[]>(() => readSeen(today));
  const wrapperRef = useRef<HTMLDivElement>(null);

  const unread = items.filter((item) => !seen.includes(item.id)).length;
  // Số trên chuông = số thông báo hôm nay, để khách biết hôm nay tiệm có thông báo.
  const count = items.length;

  // Tải thông báo từ Google Sheet; lỗi mạng thì im lặng coi như không có thông báo.
  useEffect(() => {
    const { sheetId, gid, csvUrl } = announcementsConfig;
    // Biến môi trường VITE_NOTICES_CSV_URL (dùng khi test) thay thế toàn bộ nguồn.
    const override = import.meta.env.VITE_NOTICES_CSV_URL;
    const sources = override ? [override] : [sheetId ? liveSheetCsvUrl(sheetId, gid) : "", csvUrl].filter(Boolean);
    if (sources.length === 0) return;
    const controller = new AbortController();
    fetchAnnouncements(sources, announcementsConfig.dateOrder, controller.signal)
      .then((all) => {
        const current = activeOn(all, today);
        setItems(current);
        if (current.some((item) => !readSeen(today).includes(item.id))) {
          setAutoOpened(true);
          setOpen(true);
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, [today]);

  // Đang mở = đã xem: đánh dấu tất cả thông báo hiện có là đã đọc.
  useEffect(() => {
    if (!open || items.length === 0) return;
    const ids = items.map((item) => item.id);
    setSeen(ids);
    writeSeen(today, ids);
  }, [open, items, today]);

  // Khung đã đóng thì không còn "đang tương tác" (sự kiện rời chuột có thể không kịp chạy).
  useEffect(() => {
    if (!open) setEngaged(false);
  }, [open]);

  // Tự đóng sau 10 giây nếu khung tự bật và khách không tương tác với nó.
  useEffect(() => {
    if (!open || !autoOpened || engaged) return;
    const timer = window.setTimeout(() => setOpen(false), AUTO_CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [open, autoOpened, engaged]);

  // Đóng khi bấm ra ngoài hoặc nhấn Esc.
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const label =
    count === 0 ? "Announcements" : `Announcements, ${count} today${unread > 0 ? `, ${unread} new` : ""}`;

  return (
    <div className="announcements" ref={wrapperRef}>
      <button
        className="announcements-bell"
        onClick={() => {
          // Khách tự mở bằng chuông thì không tự đóng nữa.
          setAutoOpened(false);
          setOpen((value) => !value);
        }}
        aria-label={label}
        aria-expanded={open}
        aria-controls="announcements-panel"
      >
        <Bell size={19} aria-hidden />
        {count > 0 && !open && <span className="announcements-badge" aria-hidden>{count}</span>}
      </button>

      {open && (
        <div
          id="announcements-panel"
          className="announcements-panel"
          role="dialog"
          aria-label="Studio announcements"
          onPointerEnter={() => setEngaged(true)}
          onPointerLeave={() => setEngaged(false)}
          onFocus={() => setEngaged(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) setEngaged(false);
          }}
        >
          <div className="announcements-head">
            <span>Studio announcements</span>
            <button onClick={() => setOpen(false)} aria-label="Close announcements">
              <X size={16} />
            </button>
          </div>
          {items.length === 0 ? (
            <p className="announcements-empty">No announcements today. See you soon!</p>
          ) : (
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  {item.title && <strong>{item.title}</strong>}
                  {item.message && <p>{item.message}</p>}
                  {item.linkUrl && (
                    <a href={item.linkUrl} target="_blank" rel="noopener noreferrer">
                      {item.linkText || "Learn more"} <ArrowUpRight size={13} aria-hidden />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
