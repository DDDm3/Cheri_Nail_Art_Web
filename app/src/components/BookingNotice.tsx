import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { bookingPolicy, contact } from "../content";

type BookingNoticeApi = { requestBooking: (url: string) => void };

const BookingNoticeContext = createContext<BookingNoticeApi | null>(null);

/**
 * Mọi nút đặt lịch đều đi qua đây: hiện hộp thoại "Notice" với chính sách
 * huỷ lịch, khách bấm "I understand" thì mới mở trang đặt lịch (tab mới).
 */
export function BookingNoticeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  // Link đặt lịch của nút vừa bấm. Không xoá khi đóng hộp thoại, để thẻ <a>
  // "I understand" vẫn giữ đúng href trong lúc trình duyệt mở tab mới.
  const [bookingUrl, setBookingUrl] = useState(contact.bookingUrl);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const requestBooking = useCallback((url: string) => {
    setBookingUrl(url);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  // Đồng bộ state với thẻ <dialog> (thẻ này có sẵn phím Esc và khoá focus).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <BookingNoticeContext.Provider value={{ requestBooking }}>
      {children}
      <dialog
        ref={dialogRef}
        className="notice-dialog"
        aria-labelledby="notice-title"
        aria-describedby="notice-policy"
        onClose={close}
        onClick={(event) => {
          // Bấm ra vùng nền tối bên ngoài hộp thoại để đóng.
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="notice-body">
          <button className="notice-close" onClick={close} aria-label="Close notice">
            <X size={20} />
          </button>
          <span id="notice-title" className="notice-label">Notice</span>
          <div id="notice-policy">
            <h2>{bookingPolicy.title}</h2>
            <p>{bookingPolicy.greeting}</p>
            <p>{bookingPolicy.intro}</p>
            <ul>
              {bookingPolicy.items.map((item) => (
                <li key={item.label}>
                  <span aria-hidden>{item.icon}</span>
                  <p><strong>{item.label}:</strong> {item.text}</p>
                </li>
              ))}
            </ul>
            <p>{bookingPolicy.note}</p>
            <p>{bookingPolicy.closing}</p>
            <p className="notice-signature">{bookingPolicy.signature}</p>
          </div>
          <div className="notice-actions">
            <button className="notice-cancel" onClick={close}>Cancel</button>
            {/* Dùng link thật thay vì window.open: trình duyệt coi đây là điều hướng
                bình thường nên không bị trình chặn popup chặn. */}
            <a
              className="book-button notice-confirm"
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              autoFocus
            >
              I understand
            </a>
          </div>
        </div>
      </dialog>
    </BookingNoticeContext.Provider>
  );
}

/**
 * Link đặt lịch. Vẫn là thẻ <a> thật (href trỏ thẳng tới trang đặt lịch) để
 * trình đọc màn hình hiểu đây là link; mọi cú bấm đều hiện hộp thoại Notice trước.
 */
export function BookLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const notice = useContext(BookingNoticeContext);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!notice) return;
    event.preventDefault();
    notice.requestBooking(href);
  };

  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
      {children}
    </a>
  );
}
