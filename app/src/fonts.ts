// Font của website, tự lưu trong bản build (gói @fontsource) thay vì tải từ
// Google Fonts: không phải nới Content-Security-Policy và Google không theo dõi
// khách qua font. Trình duyệt chỉ tải phần chữ cái cần dùng (latin).
//
// - Fraunces (tiêu đề): bản có trục SOFT để bo tròn nét chữ.
// - Nunito Sans (nội dung).
// Tên font và cách dùng nằm trong biến --font-display / --font-body ở styles.css.
import "@fontsource-variable/fraunces/soft.css";
import "@fontsource-variable/nunito-sans";
