/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Link CSV của Google Sheet thông báo (tuỳ chọn, ghi đè giá trị trong content.ts). */
  readonly VITE_NOTICES_CSV_URL?: string;
}
