// Thông báo của tiệm (nghỉ lễ, đổi giờ, khuyến mãi...).
// Chủ tiệm sửa trong một Google Sheet đã "Publish to web" dạng CSV, website đọc
// file CSV đó mỗi lần tải trang. Cách thiết lập: xem app/docs/announcements-guide.md.

export type Announcement = {
  id: string;
  title: string;
  message: string;
  linkText?: string;
  linkUrl?: string;
  /** Ngày bắt đầu / kết thúc dạng YYYY-MM-DD (theo giờ của tiệm). Trống = không giới hạn. */
  start?: string;
  end?: string;
};

/** Ngày hôm nay (YYYY-MM-DD) theo múi giờ của tiệm, không phụ thuộc máy của khách. */
export function todayIn(timeZone: string, now = new Date()): string {
  // Locale en-CA định dạng ngày đúng kiểu YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

/** Đọc CSV (có hỗ trợ dấu ngoặc kép, dấu phẩy và xuống dòng trong ô). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

/**
 * Chuẩn hoá ngày về YYYY-MM-DD. Google Sheets xuất ô ngày theo định dạng hiển thị
 * của bảng tính, nên chấp nhận:
 * - "2026-12-24" (khuyên dùng, không bao giờ nhầm)
 * - "12/24/2026" kiểu Mỹ và "24/12/2026" kiểu Việt Nam/châu Âu: số nào lớn hơn 12 là ngày.
 *   Nếu cả hai đều ≤ 12 (vd. 05/12/2026) thì đọc theo `slashOrder` (mặc định kiểu Mỹ).
 */
function normalizeDate(value: string, slashOrder: "MDY" | "DMY"): string | undefined {
  const v = value.trim();
  if (!v) return undefined;
  const pad = (n: number) => String(n).padStart(2, "0");
  const valid = (y: number, m: number, d: number) => m >= 1 && m <= 12 && d >= 1 && d <= 31;

  const iso = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (iso) {
    const [y, m, d] = [Number(iso[1]), Number(iso[2]), Number(iso[3])];
    return valid(y, m, d) ? `${y}-${pad(m)}-${pad(d)}` : undefined;
  }

  const slash = v.match(/^(\d{1,2})[/.](\d{1,2})[/.](\d{4})$/);
  if (slash) {
    const [a, b, y] = [Number(slash[1]), Number(slash[2]), Number(slash[3])];
    const dayFirst = a > 12 || (b <= 12 && slashOrder === "DMY");
    const [m, d] = dayFirst ? [b, a] : [a, b];
    return valid(y, m, d) ? `${y}-${pad(m)}-${pad(d)}` : undefined;
  }
  return undefined;
}

/** Chỉ nhận link http(s) để chủ tiệm không vô tình chèn link nguy hiểm (vd. javascript:). */
function safeUrl(value: string): string | undefined {
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

const isNo = (value: string) => /^(no|false|0|off|hide|không|khong)$/i.test(value.trim());

/**
 * Chuyển các dòng của sheet thành danh sách thông báo.
 * Cột theo tên tiêu đề ở dòng 1 (không phân biệt hoa thường, thứ tự tuỳ ý):
 * show, start_date, end_date, title, message, link_text, link_url.
 */
export function rowsToAnnouncements(rows: string[][], slashOrder: "MDY" | "DMY" = "MDY"): Announcement[] {
  const [header, ...body] = rows;
  if (!header) return [];
  const col = (name: string) => header.findIndex((h) => h.trim().toLowerCase() === name);
  const index = {
    show: col("show"),
    start: col("start_date"),
    end: col("end_date"),
    title: col("title"),
    message: col("message"),
    linkText: col("link_text"),
    linkUrl: col("link_url"),
  };
  const get = (row: string[], i: number) => (i >= 0 ? (row[i] ?? "").trim() : "");

  return body.flatMap((row, rowIndex) => {
    const title = get(row, index.title);
    const message = get(row, index.message);
    if ((!title && !message) || isNo(get(row, index.show))) return [];
    const startText = get(row, index.start);
    const endText = get(row, index.end);
    const start = normalizeDate(startText, slashOrder);
    // Chỉ có ngày bắt đầu thì hiểu là thông báo của đúng ngày đó.
    const end = normalizeDate(endText, slashOrder) ?? start;
    // Ô ngày có chữ nhưng đọc không được (gõ sai) thì bỏ dòng, thay vì hiện mãi mãi.
    if ((startText && !start) || (endText && !normalizeDate(endText, slashOrder))) return [];
    return [
      {
        id: `${rowIndex}-${start ?? ""}-${title}`,
        title,
        message,
        start,
        end,
        linkText: get(row, index.linkText) || undefined,
        linkUrl: safeUrl(get(row, index.linkUrl)),
      },
    ];
  });
}

/** Thông báo còn hiệu lực trong ngày `today` (YYYY-MM-DD so sánh được dạng chuỗi). */
export function activeOn(items: Announcement[], today: string): Announcement[] {
  return items.filter((item) => (!item.start || item.start <= today) && (!item.end || today <= item.end));
}

/** Link đọc thẳng dữ liệu hiện tại của sheet (Google Visualization API, xuất CSV). */
export function liveSheetCsvUrl(sheetId: string, gid: string): string {
  // headers=1: dòng 1 luôn là tên cột.
  return `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/gviz/tq?tqx=out:csv&headers=1&gid=${encodeURIComponent(gid)}`;
}

/**
 * Tải thông báo, thử lần lượt từng nguồn: nguồn đầu lỗi thì dùng nguồn sau.
 * cache: "no-store" để không dùng bản lưu tạm của trình duyệt.
 */
export async function fetchAnnouncements(
  urls: string[],
  slashOrder: "MDY" | "DMY",
  signal?: AbortSignal,
): Promise<Announcement[]> {
  let lastError: unknown;
  for (const url of urls) {
    try {
      const response = await fetch(url, { signal, cache: "no-store" });
      if (!response.ok) throw new Error(`Announcements request failed: ${response.status}`);
      const rows = parseCsv(await response.text());
      // Nguồn trả về trang lỗi / đăng nhập thay vì CSV có dòng tiêu đề "show,...": thử nguồn sau.
      if (!rows[0]?.some((cell) => cell.trim().toLowerCase() === "show")) throw new Error("Unexpected sheet format");
      return rowsToAnnouncements(rows, slashOrder);
    } catch (error) {
      if (signal?.aborted) throw error;
      lastError = error;
    }
  }
  throw lastError ?? new Error("No announcement source configured");
}
