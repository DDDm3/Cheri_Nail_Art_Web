import { infoCards, text } from "../content";
import { SectionHeading } from "./SectionHeading";

/** Thông tin cần biết trước khi đặt lịch (chính sách huỷ, nail art, thanh toán). */
export function Info() {
  return (
    <section id="info" className="section journal">
      <SectionHeading eyebrow="Before you book" title={text.info} />
      <div className="post-grid">
        {infoCards.map((card) => (
          <article className="post" key={card.title}>
            <div className="post-image"><img src={card.image} alt="" loading="lazy" decoding="async" /></div>
            <span>{card.label}</span>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
