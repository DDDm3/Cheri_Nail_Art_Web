/** Đánh số dạng 01, 02, ... 10, 11 (không bị "010" khi vượt quá 9). */
export const pad2 = (value: number) => String(value).padStart(2, "0");

/**
 * Chuẩn hoá chuỗi để tìm kiếm: bỏ dấu tiếng Việt và viết thường,
 * nhờ vậy gõ "mau nail" vẫn khớp "Mẫu nail".
 */
export const normalizeSearch = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
