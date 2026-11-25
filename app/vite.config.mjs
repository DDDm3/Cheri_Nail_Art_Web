import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Cấu trúc thư mục: index.html, README.md và package.json ở thư mục gốc,
// còn mã nguồn, ảnh và tài liệu nằm trong app/. Vì vậy gốc của Vite là
// thư mục cha của file này, và thư mục public nằm ở app/public.
const projectRoot = fileURLToPath(new URL("..", import.meta.url));

export default defineConfig({
  root: projectRoot,
  publicDir: "app/public",
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    warmup: {
      clientFiles: ["./app/src/main.tsx"],
    },
  },
  plugins: [react()],
});
