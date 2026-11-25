import { useEffect, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { gallery, infoCards, services, teamMembers, type SectionId } from "../content";
import { normalizeSearch } from "../utils";

const DEFAULT_RESULT_COUNT = 6;

// Mỗi kết quả mang sẵn section đích, nên khi chọn không cần đoán từ nhãn hiển thị.
const searchItems: { title: string; type: string; target: SectionId }[] = [
  ...services.map((item) => ({ title: item.title, type: `Service · ${item.price}`, target: "services" as const })),
  ...gallery.map((item) => ({ title: item.title, type: "Nail design", target: "gallery" as const })),
  ...teamMembers.map((item) => ({ title: item.name, type: `Team · ${item.role}`, target: "about" as const })),
  ...infoCards.map((item) => ({ title: item.title, type: "Good to know", target: "info" as const })),
];

type Props = {
  onClose: () => void;
  onSelect: (target: SectionId) => void;
};

export function SearchModal({ onClose, onSelect }: Props) {
  const [query, setQuery] = useState("");

  const normalizedQuery = normalizeSearch(query);
  const results = normalizedQuery
    ? searchItems.filter((item) => normalizeSearch(item.title).includes(normalizedQuery))
    : searchItems.slice(0, DEFAULT_RESULT_COUNT);

  // Đóng bằng phím Esc.
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="search-modal" role="dialog" aria-modal="true" aria-labelledby="search-title">
      <button className="close-search" onClick={onClose} aria-label="Close search"><X /></button>
      <div className="search-panel">
        <span>Cheri Nail Art</span>
        <h2 id="search-title">What are you looking for?</h2>
        <label>
          <Search aria-hidden />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search services, designs, policies..."
            aria-label="Search"
          />
        </label>
        <div className="search-results">
          {results.length ? (
            results.map((item, index) => (
              <button key={`${item.target}-${item.title}-${index}`} onClick={() => onSelect(item.target)}>
                <span>{item.type}</span>{item.title}<ArrowRight size={15} />
              </button>
            ))
          ) : (
            <p>No matching results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
