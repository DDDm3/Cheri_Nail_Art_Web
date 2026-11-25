# Cheri Nail Art

Website giới thiệu cho Cheri Nail Art (boutique nail studio trong Rose and Belle Spa, Dickinson, ND),
xây dựng bằng React, TypeScript và Vite. Nội dung website bằng tiếng Anh.

## Chạy dự án

```bash
npm install
npm run dev
```

Các lệnh hữu ích:

```bash
npm run build     # type-check bằng tsc rồi build ra dist/
npm run preview
npm audit         # kiểm tra lỗ hổng trong dependencies
```

## Cấu trúc thư mục

```text
Nail_web/
|-- index.html                 # HTML shell cho Vite (điểm vào của website)
|-- README.md
|-- package.json               # Scripts và dependencies (phải ở thư mục gốc để npm chạy)
|-- package-lock.json
`-- app/                       # Toàn bộ mã nguồn, ảnh, tài liệu và cấu hình
    |-- src/
    |   |-- App.tsx            # Ghép các section, quản lý menu / tìm kiếm
    |   |-- content.ts         # Toàn bộ nội dung: dịch vụ, giá, giờ mở cửa, review
    |   |-- announcements.ts   # Đọc thông báo từ Google Sheet (CSV) và lọc theo ngày
    |   |-- utils.ts           # Hàm tiện ích (đánh số, chuẩn hoá chuỗi tìm kiếm)
    |   |-- hooks/usePage.ts   # Router tối giản: trang chủ và /services
    |   |-- components/        # Mỗi section một component
    |   |-- main.tsx           # Điểm khởi chạy React
    |   `-- styles.css         # Style của website
    |-- public/                # Copy nguyên vào bản build: ảnh, favicon, robots.txt,
    |   |                      # _redirects và _headers (Cloudflare Pages)
    |   `-- images/            # Ảnh WebP đã nén mà website sử dụng
    |-- design-source/images/  # Ảnh gốc: PNG, logo.svg, ảnh thợ (không được deploy)
    |-- docs/                  # Mẫu Google Sheet thông báo, hướng dẫn deploy Cloudflare Pages
    |-- tsconfig.json          # Cấu hình TypeScript
    `-- vite.config.mjs        # Cấu hình Vite (gốc dự án = thư mục cha, public = app/public)
```

## Sửa nội dung

Mọi chữ hiển thị, giá dịch vụ, giờ mở cửa, đánh giá và ảnh bộ sưu tập đều nằm trong
`app/src/content.ts`. Dịch vụ, giá và review lấy từ trang đặt lịch cherinail.glossgenius.com
(11/2026). Khi tiệm đổi giá trên GlossGenius thì cập nhật lại file này.

Logo: `app/public/images/logo.webp` (+ `logo@2x.webp`, bản trắng `logo-light.webp` cho footer),
favicon `app/public/favicon.png`. Bản gốc là `app/design-source/images/logo.svg`.

Thêm ảnh mới: đặt bản gốc vào `app/design-source/images`, xuất bản WebP (chiều rộng khoảng
1400–1700px, chất lượng ~80) vào `app/public/images`, rồi tham chiếu đường dẫn `.webp`.

## Thông báo của tiệm (chuông cạnh nút Book now)

Chủ tiệm sửa thông báo trong **Google Sheet**, không cần đụng vào code. Mỗi lần khách mở trang,
website đọc sheet và hiện các thông báo của **hôm nay** (tính theo giờ Dickinson, ND). Nếu có
thông báo mới, khung thông báo tự bật lên một lần rồi tự đóng sau 10 giây (trừ khi khách đang
rê chuột / bấm vào khung). Khách bấm chuông để xem lại bất cứ lúc nào.

### Thiết lập một lần (người làm web)

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

### Cách chủ tiệm thêm / sửa thông báo

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

## Trước khi deploy

- **Review:** chép tay từ Google Maps và GlossGenius, không tự cập nhật. Khi có review mới,
  thêm vào mảng `reviews` và sửa `reviewSummary` (điểm, tổng số) trong `content.ts`;
  số trang (2 review mỗi trang) tự tăng theo.
- **Thợ (About us):** thông tin trong `teamMembers` của `content.ts`. Nút "Book with …" đang mở
  trang đặt lịch chung vì GlossGenius chưa hỗ trợ link chọn sẵn thợ; khi có link riêng thì
  thay `bookingUrl`. Ảnh chân dung ở `app/public/images/team-*.webp` (bản gốc trong `app/design-source/images/team`).
- **Ảnh tạm:** slideshow, bộ sưu tập và ảnh dịch vụ vẫn là ảnh mẫu (có TODO trong
  `content.ts`). Cần thay bằng ảnh nail art thật của tiệm.
- **Deploy:** xem hướng dẫn từng bước ở `app/docs/deploy-cloudflare-pages.md` (Cloudflare Pages + tên miền).
  Rewrite cho `/services` (`app/public/_redirects`) và header bảo mật (`app/public/_headers`) đã có sẵn.
  Nếu thêm dịch vụ bên ngoài (font, analytics, widget), nhớ thêm tên miền của nó vào
  `Content-Security-Policy` trong `app/public/_headers`.

## Ghi chú

- `dist` là thư mục build được tạo lại bằng `npm run build`, không nên chỉnh sửa trực tiếp.
- Mọi nút đặt lịch dùng component `BookLink`: bấm vào sẽ hiện hộp thoại "Notice" với chính sách
  huỷ lịch (`bookingPolicy` trong `content.ts`), khách bấm "I understand" mới mở trang đặt lịch GlossGenius.
