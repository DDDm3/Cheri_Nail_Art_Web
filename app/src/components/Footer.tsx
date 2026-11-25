import { ArrowRight, MapPin, Phone } from "lucide-react";
import { brand, contact, mapsUrl, text } from "../content";
import { BookLink } from "./BookingNotice";
import { Logo } from "./Logo";

export function Footer({ onBackToTop }: { onBackToTop: () => void }) {
  return (
    <footer id="contact" className="footer">
      <div className="footer-overlay" />
      <div className="footer-content">
        <div className="footer-brand">
          <div className="brand light"><Logo light /></div>
          <p>{brand.tagline}.</p>
          <BookLink className="footer-book" href={contact.bookingUrl}>
            Book an appointment<ArrowRight size={16} />
          </BookLink>
        </div>
        <div>
          <h3>{text.contact}</h3>
          <p><MapPin size={17} /> <span>{contact.venue}<br />{contact.address}</span></p>
          <p><Phone size={17} /> <a href={contact.phoneHref}>{contact.phoneDisplay}</a></p>
          <a className="map-card" href={mapsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin size={22} aria-hidden />
            <span>{brand.name}<br /><small>Open in Google Maps</small></span>
          </a>
        </div>
        <div>
          <h3>{text.hoursTitle}</h3>
          {contact.hours.map((row) => (
            <p className="footer-hours" key={row.days}><span>{row.days}</span><span>{row.time}</span></p>
          ))}
        </div>
        <div>
          <h3>Follow us</h3>
          <p><a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram {contact.instagramHandle}</a></p>
          <p><a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a></p>
          <button className="footer-book" onClick={onBackToTop}>
            Back to top<ArrowRight size={16} />
          </button>
        </div>
      </div>
      <div className="copyright">© {new Date().getFullYear()} {brand.name}. All rights reserved.</div>
    </footer>
  );
}
