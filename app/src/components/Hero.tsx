import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { slides, text } from "../content";
import { pad2 } from "../utils";

const SLIDE_INTERVAL_MS = 5000;

export function Hero() {
  const [slide, setSlide] = useState(0);
  const step = (delta: number) => setSlide((current) => (current + delta + slides.length) % slides.length);

  // Tự chuyển ảnh. Effect phụ thuộc `slide` nên khi người dùng bấm
  // chuyển ảnh thủ công, bộ đếm được khởi động lại từ đầu.
  useEffect(() => {
    const timer = window.setTimeout(() => step(1), SLIDE_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [slide]);

  return (
    <section id="home" className="hero">
      {slides.map((item, index) => (
        <div
          key={item.image}
          className={`hero-image ${index === slide ? "active" : ""}`}
          style={{ backgroundImage: `url(${item.image})`, backgroundPosition: item.position }}
        />
      ))}
      <div className="hero-wash" />
      <div className="hero-content">
        <p>{text.heroEyebrow}</p>
        <h1>{text.heroTitle.map((line) => <span key={line}>{line}</span>)}</h1>
        <div className="hero-copy">{text.heroText}</div>
      </div>
      <div className="hero-controls">
        <button onClick={() => step(-1)} aria-label="Previous slide"><ArrowLeft /></button>
        <span>{pad2(slide + 1)} / {pad2(slides.length)}</span>
        <button onClick={() => step(1)} aria-label="Next slide"><ArrowRight /></button>
      </div>
    </section>
  );
}
