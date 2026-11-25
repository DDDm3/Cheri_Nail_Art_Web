# Cheri Nail Art

Website giới thiệu cho Cheri Nail Art (boutique nail studio trong Rose and Belle Spa, Dickinson, ND), xây dựng bằng React, TypeScript và Vite. Nội dung website bằng tiếng Anh.

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
    |   |-- fonts.ts           # Nạp font Fraunces (tiêu đề) và Nunito Sans (nội dung)
    |   |-- main.tsx           # Điểm khởi chạy React
    |   `-- styles.css         # Style của website
    |-- public/                # Copy nguyên vào bản build: ảnh, favicon, robots.txt,
    |   |                      # _redirects và _headers (Cloudflare Pages)
    |   `-- images/            # Ảnh WebP đã nén mà website sử dụng
    |-- design-source/images/  # Ảnh gốc: PNG, logo.svg, ảnh thợ (không được deploy)
    |-- docs/                  # Hướng dẫn: thông báo (Google Sheet) và deploy Cloudflare Pages
    |-- tsconfig.json          # Cấu hình TypeScript
    `-- vite.config.mjs        # Cấu hình Vite (gốc dự án = thư mục cha, public = app/public)
```
