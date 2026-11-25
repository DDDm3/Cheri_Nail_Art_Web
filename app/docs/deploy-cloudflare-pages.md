# Đưa website lên mạng: Cloudflare Pages + tên miền riêng

Website là site tĩnh (chỉ HTML/CSS/JS và ảnh sau khi build), nên không cần VPS.
Cloudflare Pages cho host miễn phí, có sẵn HTTPS và CDN. Chi phí duy nhất là tên miền
(khoảng 10–15 USD/năm cho `.com`).

**Nên tạo mọi tài khoản (Cloudflare, GitHub, tên miền) bằng email của chủ tiệm**, để website
và tên miền luôn thuộc về tiệm.

## Đã chuẩn bị sẵn trong code

| File | Tác dụng |
|---|---|
| `app/public/_redirects` | Mở thẳng hoặc tải lại `/services` không bị lỗi 404 |
| `app/public/_headers` | Header bảo mật (CSP, chống nhúng iframe, HSTS…) và cache cho file JS/CSS/ảnh |
| `app/public/robots.txt` | Cho phép Google lập chỉ mục website |
| `.node-version` | Cloudflare build bằng Node 22 |

Hai file `_redirects` và `_headers` được copy vào `dist/` khi build, Cloudflare Pages tự đọc.
Thư mục gốc của repository giữ `package.json`, nên trên Cloudflare **để trống "Root directory"**.
Nếu sau này thêm dịch vụ bên ngoài (Google Fonts, Google Analytics, widget...), phải thêm
tên miền của dịch vụ đó vào dòng `Content-Security-Policy` trong `app/public/_headers`,
nếu không trình duyệt sẽ chặn.

## Bước 1: Tạo project trên Cloudflare Pages

### Cách A (khuyên dùng): nối với GitHub, mỗi lần push là tự deploy

1. Tạo repository trên GitHub (để **Private**) và push code lên nhánh `main`.
2. Vào https://dash.cloudflare.com → **Workers & Pages** → **Create** → tab **Pages**
   → **Connect to Git** → chọn repository vừa tạo.
3. Cấu hình build:
   - **Framework preset:** `Vite` (hoặc `None`)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - Biến môi trường: không cần (link Google Sheet thông báo đã nằm trong `app/src/content.ts`).
4. Bấm **Save and Deploy**. Sau 1–2 phút website chạy ở địa chỉ dạng `https://<tên-project>.pages.dev`.

Từ đó: push lên `main` thì website thật tự cập nhật; push nhánh khác thì Cloudflare tạo
một link xem thử riêng (preview) để kiểm tra trước.

### Cách B: tải lên trực tiếp, không cần GitHub

1. Trên máy: `npm run build` (tạo thư mục `dist/`).
2. Vào **Workers & Pages** → **Create** → tab **Pages** → **Upload assets** → đặt tên project
   → kéo thả **thư mục `dist`** vào → **Deploy**.

Mỗi lần sửa website phải build và tải lên lại. Cách A tiện hơn về lâu dài.

## Bước 2: Mua và gắn tên miền

1. Trong Cloudflare: **Domain Registration** → **Register Domains** → tìm tên miền
   (ví dụ `cherinailart.com`) → mua. Cloudflare bán đúng giá gốc, không tăng giá năm sau.
2. Mở project Pages → **Custom domains** → **Set up a custom domain** → nhập `cherinailart.com`
   → làm theo hướng dẫn. Cloudflare tự tạo bản ghi DNS và chứng chỉ HTTPS (vài phút).
3. Làm lại bước 2 với `www.cherinailart.com` để khách gõ có `www` cũng vào được.

Nếu mua tên miền ở nơi khác (Namecheap, Porkbun, GoDaddy...): khi thêm custom domain,
Cloudflare sẽ chỉ cách đổi nameserver hoặc thêm bản ghi CNAME ở nơi đã mua.

## Bước 3: Kiểm tra sau khi lên mạng

- [ ] Mở trang chủ, bấm **Services** rồi tải lại trang `/services`: phải hiện bảng giá, không lỗi 404.
- [ ] Bấm một nút **Book**: hiện hộp thoại Notice, bấm **I understand** mở trang GlossGenius.
- [ ] Chuông thông báo: thêm một dòng `yes` cho hôm nay trong Google Sheet, đợi ~5 phút, tải lại trang. Cách dùng sheet: `app/docs/announcements-guide.md`.
- [ ] Kiểm tra header bảo mật tại https://securityheaders.com (nhập tên miền).
- [ ] Đổi `contact.website` trong `app/src/content.ts` thành tên miền mới.
- [ ] Cập nhật link website trên Google Maps (Google Business Profile), Facebook, Instagram và GlossGenius.

## Email theo tên miền (tuỳ chọn)

- **Cloudflare Email Routing** (miễn phí): nhận thư gửi tới `hello@cherinailart.com` và
  chuyển về Gmail của tiệm.
- **Google Workspace** (trả phí): hộp thư riêng hoàn chỉnh, gửi thư bằng tên miền.
