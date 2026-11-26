# Thông báo của tiệm (chuông cạnh nút Book now)

Chủ tiệm sửa thông báo trong **Google Sheet**, không cần đụng vào code. Mỗi lần khách mở trang,
website đọc sheet và hiện các thông báo của **hôm nay** (tính theo giờ Dickinson, ND). Nếu có
thông báo mới, khung thông báo tự bật lên một lần rồi tự đóng sau 10 giây (trừ khi khách đang
rê chuột / bấm vào khung). Khách bấm chuông để xem lại bất cứ lúc nào.

## Thiết lập một lần (người làm web)

Sheet đã có sẵn: **website_announcements** trong Google Drive
(https://docs.google.com/spreadsheets/d/1ZK4-8SBss_EftCVgoCeWZ2QZM-JJvB2qQAJdpZI0HTA/edit).
Nếu cần tạo lại, import `app/docs/announcements-template.csv` vào Google Sheets.

Website đọc **thẳng dữ liệu hiện tại** của sheet (Google Visualization API), nên sửa sheet xong
khách tải lại trang là thấy ngay. Link "Publish to web" chỉ dùng làm dự phòng: bản publish được
Google cập nhật chậm và không đều (có máy thấy bản mới, máy khác vẫn thấy bản cũ vài phút).

1. **File → Settings → Locale: United States** → Save. Website đọc ngày dạng `12/24/2026` theo kiểu Mỹ
   (`announcementsConfig.dateOrder` = `"MDY"`); nếu giữ locale Việt Nam thì đổi giá trị đó thành `"DMY"`.
2. **Chọn cột B và C** (start_date, end_date) → **Format → Number → Plain text**. Ngày gõ vào sẽ giữ
   nguyên dạng chữ (ví dụ `2026-12-24`). Nếu không làm bước này, một ô ngày gõ sai định dạng có thể bị
   Google bỏ trống khi website đọc, và thông báo đó sẽ hiện mỗi ngày.
3. **File → Share → Publish to web** → chọn trang tính → **Comma-separated values (.csv)** → **Publish**
   (vẫn cần bật để website đọc được sheet mà không phải đăng nhập). Bảo đảm ô
   **"Automatically republish when changes are made"** đang được tích.
4. Trong `app/src/content.ts`, `announcementsConfig`:
   - `sheetId` và `gid`: lấy từ link sửa sheet `…/spreadsheets/d/<sheetId>/edit#gid=<gid>`.
   - `csvUrl`: link "Publish to web" ở bước 3 (dự phòng).
   Build và deploy lại **một lần**. Khi test có thể đặt biến môi trường `VITE_NOTICES_CSV_URL`
   để chỉ đọc một nguồn CSV khác.
5. **Share** sheet cho chủ / quản lý tiệm với quyền **Editor**.

## Cách chủ tiệm thêm / sửa thông báo

Mỗi dòng là một thông báo. Dòng 1 là tiêu đề cột, **không đổi tên cột**:

| Cột | Ý nghĩa | Ví dụ |
|---|---|---|
| `show` | `yes` để hiện, `no` để tạm ẩn (không cần xoá dòng) | `yes` |
| `start_date` | Ngày bắt đầu hiện. Để trống = hiện ngay. Nên gõ dạng năm-tháng-ngày | `2026-12-24` |
| `end_date` | Ngày cuối cùng hiện. Để trống = chỉ hiện đúng ngày bắt đầu | `2026-12-26` |
| `title` | Tiêu đề ngắn | `Holiday hours` |
| `message` | Nội dung (có thể xuống dòng trong ô bằng Ctrl+Enter) | `We are closed Dec 24–26.` |
| `link_text` | Chữ trên nút (tuỳ chọn) | `Book now` |
| `link_url` | Link của nút, phải bắt đầu bằng `https://` (tuỳ chọn) | `https://cherinail.glossgenius.com/booking-flow` |

- Hai dòng mẫu có sẵn đang để `show = no` nên không hiện trên website. Sửa nội dung và đổi `show` thành `yes` để dùng.
- Ô ngày gõ sai (không đọc được) thì dòng đó bị bỏ qua, không hiện.
- Để trống **cả hai** cột ngày thì thông báo hiện mỗi ngày cho tới khi đổi `show` thành `no`.
- "Hôm nay" tính theo giờ của tiệm ở Dickinson, ND (Mountain Time): **GMT−7** từ đầu tháng 11 đến giữa
  tháng 3, **GMT−6** trong thời gian giờ mùa hè (giữa tháng 3 đến đầu tháng 11). Ngày mới của tiệm bắt đầu
  lúc 14:00 giờ Việt Nam vào mùa đông (13:00 vào mùa hè).
- Sửa sheet xong, khách **tải lại trang** là thấy (thường trong vài giây). Trang đang mở sẵn không tự cập nhật.
- Nội dung được hiển thị dạng chữ thuần (không chạy HTML); link không phải `http(s)` sẽ bị bỏ qua.
- Nếu sheet lỗi hoặc không truy cập được, website vẫn chạy bình thường, chuông chỉ báo "No announcements today".
