import { ArrowRight } from "lucide-react";
import { contact, gallery, text } from "../content";
import { pad2 } from "../utils";
import { SectionHeading } from "./SectionHeading";

export function Gallery() {
  return (
    <section id="gallery" className="section gallery">
      <SectionHeading eyebrow="Selected work" title={text.gallery} intro={text.gallerySub} />
      <div className="gallery-grid">
        {gallery.map((item, index) => (
          // Class gallery-N quyết định vị trí ô trong lưới (xem styles.css).
          <figure className={`gallery-item gallery-${index + 1}`} key={`${item.title}-${index}`}>
            <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
            <figcaption><span>{pad2(index + 1)}</span>{item.title}</figcaption>
          </figure>
        ))}
      </div>
      {/* Bộ sưu tập đầy đủ được đăng trên Instagram của tiệm. */}
      <a className="outline-button" href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
        More on Instagram {contact.instagramHandle}
        <ArrowRight size={17} />
      </a>
    </section>
  );
}
