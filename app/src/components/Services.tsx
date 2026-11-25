import { ArrowLeft, ArrowRight } from "lucide-react";
import { categoryImages, categoryLabels, contact, services, text, type ServiceCategory } from "../content";
import { pad2 } from "../utils";
import { BookLink } from "./BookingNotice";
import { SectionHeading } from "./SectionHeading";

const featured = services.filter((item) => item.featured).slice(0, 4);
const categories = Object.keys(categoryLabels) as ServiceCategory[];

/** Khối dịch vụ nổi bật trên trang chủ. */
export function ServicesSection({ onOpenPage }: { onOpenPage: () => void }) {
  return (
    <section id="services" className="section services">
      <SectionHeading eyebrow="Cheri Nail Art" title={text.services} intro={text.servicesSub} />
      <div className="service-grid">
        {featured.map((item, index) => (
          <article className="service-card" key={item.title}>
            <div className="service-image">
              <img src={categoryImages[item.category]} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="service-number">{item.badge ?? pad2(index + 1)}</div>
            <h3>{item.title}</h3>
            <p>{item.price} · {item.duration}</p>
          </article>
        ))}
      </div>
      <button className="services-page-button" onClick={onOpenPage}>
        {text.explore}
        <ArrowRight size={17} />
      </button>
    </section>
  );
}

/** Trang riêng /services: toàn bộ bảng giá, chia theo nhóm dịch vụ. */
export function ServicesPage({ onBack }: { onBack: () => void }) {
  return (
    <main className="service-page">
      <section className="service-page-hero">
        <button className="service-back" onClick={onBack}>
          <ArrowLeft size={17} />
          Back home
        </button>
        <h1>{text.servicesPageTitle}</h1>
        <p>{text.servicesPageIntro}</p>
      </section>

      {categories.map((category, groupIndex) => (
        <section className="service-group" key={category}>
          <img className="service-group-image" src={categoryImages[category]} alt="" loading="lazy" decoding="async" />
          <div>
            <span className="service-group-number">{pad2(groupIndex + 1)}</span>
            <h2 className="service-group-title">{categoryLabels[category]}</h2>
            {services
              .filter((item) => item.category === category)
              .map((item) => (
                <article className="service-row" key={item.title}>
                  <div className="service-row-head">
                    <h3>{item.title}</h3>
                    <strong>{item.price}</strong>
                  </div>
                  <span className="service-row-meta">
                    {item.duration}
                    {item.badge && <em>{item.badge}</em>}
                  </span>
                  <p>{item.description}</p>
                </article>
              ))}
          </div>
        </section>
      ))}

      <div className="service-page-footer">
        <BookLink className="book-button book-button-large" href={contact.bookingUrl}>
          Book online
        </BookLink>
      </div>
    </main>
  );
}
