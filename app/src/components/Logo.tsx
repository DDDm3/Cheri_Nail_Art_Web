/** Logo + tên tiệm. Bản `light` dùng logo trắng cho nền tối (footer). */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <>
      <img
        className="brand-mark"
        src={light ? "/images/logo-light.webp" : "/images/logo.webp"}
        srcSet={light ? undefined : "/images/logo.webp 1x, /images/logo@2x.webp 2x"}
        alt=""
        width={48}
        height={48}
      />
      <span>Cheri <i>Nail Art</i></span>
    </>
  );
}
