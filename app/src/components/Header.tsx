import { ChevronDown, Clock, MapPin, Menu, Phone, Search, X } from "lucide-react";
import { contact, mapsUrl, text, type SectionId } from "../content";
import { Announcements } from "./Announcements";
import { BookLink } from "./BookingNotice";
import { Logo } from "./Logo";

type Props = {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onNavigate: (id: SectionId) => void;
  onOpenSearch: () => void;
};

export function Header({ menuOpen, onToggleMenu, onNavigate, onOpenSearch }: Props) {
  return (
    <>
      <div className="utility-bar">
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={14} /> Dickinson, ND</a>
        <div><Clock size={14} /> {contact.hoursShort}</div>
        <a href={contact.phoneHref}><Phone size={14} /> {contact.phoneDisplay}</a>
      </div>

      <header className="header">
        <button
          className="mobile-icon"
          onClick={onToggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <button className="brand" onClick={() => onNavigate("home")} aria-label="Cheri Nail Art, back to top">
          <Logo />
        </button>
        <nav id="main-nav" className={menuOpen ? "nav open" : "nav"}>
          {text.nav.map((item) => (
            <button key={item.id} onClick={() => onNavigate(item.id)}>
              {item.label}
              {item.id === "services" && <ChevronDown size={14} aria-hidden />}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="search-button" onClick={onOpenSearch} aria-label="Search">
            <Search size={19} />
          </button>
          <BookLink className="book-button" href={contact.bookingUrl}>
            Book now
          </BookLink>
          <Announcements />
        </div>
      </header>
    </>
  );
}
