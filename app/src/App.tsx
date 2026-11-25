import { useCallback, useState } from "react";
import { BookingNoticeProvider } from "./components/BookingNotice";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Info } from "./components/Info";
import { Reviews } from "./components/Reviews";
import { SearchModal } from "./components/SearchModal";
import { ServicesPage, ServicesSection } from "./components/Services";
import { Team } from "./components/Team";
import type { SectionId } from "./content";
import { usePage } from "./hooks/usePage";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { page, goToPage, goToSection } = usePage();

  const navigate = useCallback(
    (id: SectionId) => {
      setMenuOpen(false);
      goToSection(id);
    },
    [goToSection],
  );

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <BookingNoticeProvider>
      <div className="site-shell">
        <Header
          menuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen((open) => !open)}
          onNavigate={navigate}
          onOpenSearch={() => setSearchOpen(true)}
        />

        {page === "services" ? (
          <ServicesPage onBack={() => goToPage("home")} />
        ) : (
          <main>
            <Hero />
            <ServicesSection
              onOpenPage={() => {
                setMenuOpen(false);
                goToPage("services");
              }}
            />
            <Reviews />
            <Gallery />
            <Team />
            <Info />
          </main>
        )}

        <Footer onBackToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })} />

        {searchOpen && (
          <SearchModal
            onClose={closeSearch}
            onSelect={(target) => {
              closeSearch();
              navigate(target);
            }}
          />
        )}
      </div>
    </BookingNoticeProvider>
  );
}
