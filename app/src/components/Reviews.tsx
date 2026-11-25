import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Heart, Star, X } from "lucide-react";
import { reviewSummary, reviews, text } from "../content";
import { pad2 } from "../utils";
import { SectionHeading } from "./SectionHeading";

type Review = (typeof reviews)[number];

const REVIEWS_PER_PAGE = 2;
// Số trang tính từ số review, nên thêm review vào content.ts là trang tự tăng theo.
const PAGE_COUNT = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
const AUTO_ADVANCE_MS = 11000;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const reviewMeta = (review: Review) =>
  review.artist ? `${review.source} · with ${review.artist}` : review.source;

/**
 * Thẻ review có chiều cao cố định: nội dung dài bị cắt bằng dấu ba chấm
 * (CSS line-clamp) và hiện nút "Read more" để mở toàn bộ trong hộp thoại.
 */
function ReviewCard({ review, onReadMore }: { review: Review; onReadMore: (review: Review) => void }) {
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const [truncated, setTruncated] = useState(false);

  // Chỉ hiện "Read more" khi chữ thật sự bị cắt (đo lại khi đổi kích thước màn hình).
  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const measure = () => setTruncated(body.scrollHeight > body.clientHeight + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(body);
    return () => observer.disconnect();
  }, [review]);

  return (
    <article className="review-card">
      <div className="review-top">
        <div className="avatar" aria-hidden>{review.name[0]}</div>
        <div>
          <strong>{review.name}</strong>
          <span>{reviewMeta(review)}</span>
        </div>
        <Heart className="review-heart" size={18} aria-hidden />
      </div>
      <p ref={bodyRef} className="review-body">{review.body}</p>
      {truncated && (
        <button className="review-more" onClick={() => onReadMore(review)}>
          Read more
        </button>
      )}
    </article>
  );
}

export function Reviews() {
  const [page, setPage] = useState(0);
  // Người dùng bật "giảm chuyển động" thì không tự chuyển trang.
  const [reducedMotion] = useState(prefersReducedMotion);
  // Tạm dừng khi người dùng đang rê chuột / focus vào khu vực review, để kịp đọc.
  const [hovered, setHovered] = useState(false);
  const [openReview, setOpenReview] = useState<Review | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const step = (delta: number) => setPage((current) => (current + delta + PAGE_COUNT) % PAGE_COUNT);
  const visible = reviews.slice(page * REVIEWS_PER_PAGE, (page + 1) * REVIEWS_PER_PAGE);
  const autoPlaying = !reducedMotion && !hovered && !openReview;

  // Tự chuyển trang. Phụ thuộc `page` nên bấm chuyển tay sẽ đếm lại từ đầu.
  useEffect(() => {
    if (!autoPlaying) return;
    const timer = window.setTimeout(() => {
      if (!document.hidden) step(1);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [page, autoPlaying]);

  // Mở / đóng hộp thoại xem toàn bộ review (thẻ <dialog> có sẵn Esc và khoá focus).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openReview && !dialog.open) dialog.showModal();
    if (!openReview && dialog.open) dialog.close();
  }, [openReview]);

  return (
    <section id="reviews" className="reviews">
      <div className="reviews-summary">
        <span>Google reviews</span>
        <h2>{reviewSummary.rating}</h2>
        <div className="reviews-stars" aria-label={`${reviewSummary.rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} size={20} fill="currentColor" aria-hidden />
          ))}
        </div>
        <p>{reviewSummary.count} reviews on {reviewSummary.source}</p>
        <a className="reviews-source" href={reviewSummary.url} target="_blank" rel="noopener noreferrer">
          Read all on Google <ArrowUpRight size={12} aria-hidden />
        </a>
      </div>
      <div
        className="review-content"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) setHovered(false);
        }}
      >
        <SectionHeading eyebrow={text.reviewsSub} title={text.reviews} />
        {/* key={page} để chạy lại hiệu ứng mờ dần mỗi khi đổi trang. */}
        <div className="review-grid" key={page} aria-live={autoPlaying ? "off" : "polite"}>
          {visible.map((review, index) => (
            <ReviewCard key={`${page}-${index}`} review={review} onReadMore={setOpenReview} />
          ))}
        </div>
        <div className="review-nav">
          <button onClick={() => step(-1)} aria-label="Previous reviews"><ArrowLeft /></button>
          <span>{pad2(page + 1)} / {pad2(PAGE_COUNT)}</span>
          <button onClick={() => step(1)} aria-label="Next reviews"><ArrowRight /></button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="review-dialog"
        aria-labelledby="review-dialog-name"
        onClose={() => setOpenReview(null)}
        onClick={(event) => {
          // Bấm ra vùng nền tối bên ngoài hộp thoại để đóng.
          if (event.target === event.currentTarget) setOpenReview(null);
        }}
      >
        {openReview && (
          <div className="review-dialog-body">
            <button className="review-dialog-close" onClick={() => setOpenReview(null)} aria-label="Close review">
              <X size={20} />
            </button>
            <div className="review-top">
              <div className="avatar" aria-hidden>{openReview.name[0]}</div>
              <div>
                <strong id="review-dialog-name">{openReview.name}</strong>
                <span>{reviewMeta(openReview)}</span>
              </div>
            </div>
            <p>{openReview.body}</p>
          </div>
        )}
      </dialog>
    </section>
  );
}
