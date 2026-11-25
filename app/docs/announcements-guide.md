# Thông báo của tiệm (chuông cạnh nút Book now)

Chủ tiệm sửa thông báo trong **Google Sheet**, không cần đụng vào code. Mỗi lần khách mở trang,
website đọc sheet và hiện các thông báo của **hôm nay** (tính theo giờ Dickinson, ND). Nếu có
thông báo mới, khung thông báo tự bật lên một lần rồi tự đóng sau 10 giây (trừ khi khách đang
rê chuột / bấm vào khung). Khách bấm chuông để xem lại bất cứ lúc nào.

## Thiết lập một lần (người làm web)

Sheet đã có sẵn: **Cheri Nail Art website announcements** trong Google Drive
(https://docs.google.com/spreadsheets/d/1ZK4-8SBss_EftCVgoCeWZ2QZM-JJvB2qQAJdpZI0HTA/edit).
Nếu cần tạo lại, import `app/docs/announcements-template.csv` vào Google Sheets.

1. **File → Settings → Locale: United States** → Save. Website đọc ngày dạng `12/24/2026` theo kiểu Mỹ
   (`announcementsConfig.dateOrder` = `"MDY"`); nếu giữ locale Việt Nam thì đổi giá trị đó thành `"DMY"`.
2. **File → Share → Publish to web** → chọn trang tính đầu tiên → **Comma-separated values (.csv)**
   → **Publish**. Copy link được tạo (dạng `https://docs.google.com/spreadsheets/d/e/…/pub?…&output=csv`).
3. Dán link vào `announcementsConfig.csvUrl` trong `app/src/content.ts`
   (hoặc đặt biến môi trường `VITE_NOTICES_CSV_URL` khi build), rồi build và deploy lại **một lần**.
4. **Share** sheet cho chủ / quản lý tiệm với quyền **Editor**.

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
- Sửa sheet xong, Google cần khoảng **5 phút** để cập nhật bản đã publish; sau đó khách tải lại trang là thấy.
- Nội dung được hiển thị dạng chữ thuần (không chạy HTML); link không phải `http(s)` sẽ bị bỏ qua.
- Nếu sheet lỗi hoặc không truy cập được, website vẫn chạy bình thường, chuông chỉ báo "No announcements today".
