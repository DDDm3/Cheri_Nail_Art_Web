import { useCallback, useEffect, useState } from "react";
import type { SectionId } from "../content";

export type Page = "home" | "services";

const pathToPage = (path: string): Page => (path === "/services" ? "services" : "home");
const pageToPath: Record<Page, string> = { home: "/", services: "/services" };

/**
 * Router tối giản cho 2 trang (trang chủ và /services) dùng History API,
 * tránh phải thêm thư viện router cho một site nhỏ.
 *
 * Khi deploy, host phải rewrite mọi đường dẫn về index.html
 * (đã cấu hình trong app/public/_redirects), nếu không tải lại trang /services sẽ bị 404.
 */
export function usePage() {
  const [page, setPage] = useState<Page>(() => pathToPage(window.location.pathname));

  // Đồng bộ state khi người dùng bấm Back/Forward của trình duyệt.
  useEffect(() => {
    const handlePopState = () => setPage(pathToPage(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const goToPage = useCallback((next: Page) => {
    if (window.location.pathname !== pageToPath[next]) {
      window.history.pushState(null, "", pageToPath[next]);
    }
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /** Cuộn tới một section của trang chủ; nếu đang ở trang khác thì về trang chủ trước. */
  const goToSection = useCallback(
    (id: SectionId) => {
      const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      // Footer (#contact) có ở mọi trang nên không cần đổi trang.
      if (page === "home" || id === "contact") {
        scroll();
        return;
      }
      window.history.pushState(null, "", pageToPath.home);
      setPage("home");
      // Chờ React render xong trang chủ rồi mới tìm được phần tử để cuộn tới.
      window.setTimeout(scroll, 0);
    },
    [page],
  );

  return { page, goToPage, goToSection };
}
