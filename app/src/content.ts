// Toàn bộ nội dung hiển thị của website Cheri Nail Art.
// Nguồn: trang Facebook của tiệm và trang đặt lịch cherinail.glossgenius.com
// (cập nhật 11/2026). Khi giá hoặc dịch vụ thay đổi, chỉ cần sửa file này.

/** Id của các section trên trang chủ, dùng cho menu và tìm kiếm. */
export type SectionId = "home" | "reviews" | "services" | "gallery" | "about" | "info" | "contact";

export const brand = {
  name: "Cheri Nail Art",
  tagline: "Let your nails tell your story",
};

export const contact = {
  phoneDisplay: "701-300-2922",
  phoneHref: "tel:+17013002922",
  venue: "Inside Rose and Belle Spa",
  address: "1911 15th St West, Ste C, Dickinson, ND 58601",
  hours: [
    { days: "Monday – Friday", time: "10 AM – 7 PM" },
    { days: "Saturday", time: "10 AM – 5:30 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  hoursShort: "Mon–Fri 10–7 · Sat 10–5:30",
  bookingUrl: "https://cherinail.glossgenius.com/booking-flow",
  website: "cherinail.glossgenius.com",
  instagramHandle: "@cheri_nailzz",
  instagramUrl: "https://www.instagram.com/cheri_nailzz",
  facebookUrl: "https://www.facebook.com/profile.php?id=61590541716273",
};

/**
 * Thông báo của tiệm (chuông cạnh nút "Book now").
 * `csvUrl` là link CSV của Google Sheet sau khi "Publish to web" (xem README).
 * Chỉ cần đặt một lần; sau đó chủ tiệm sửa thông báo ngay trong Google Sheet.
 * Có thể ghi đè bằng biến môi trường VITE_NOTICES_CSV_URL khi build.
 */
export const announcementsConfig = {
  csvUrl:
    (import.meta.env.VITE_NOTICES_CSV_URL as string | undefined) ||
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRaACabh7U5JkM1ELK5LLxpXXvfBtR3x2fuI-BZc_SojVjk-5I43tnKRADV1xjSUBUnu-JPNgrcAH54/pub?gid=26386886&single=true&output=csv",
  // Dickinson, ND dùng giờ miền núi (Mountain Time): "hôm nay" tính theo giờ tiệm.
  timeZone: "America/Denver",
  // Thứ tự ngày khi sheet hiển thị ngày dạng 05/12/2026: "MDY" (Mỹ) hoặc "DMY" (Việt Nam).
  // Phải khớp File → Settings → Locale của Google Sheet. Ngày dạng 2026-12-05 luôn đọc đúng.
  dateOrder: "MDY" as "MDY" | "DMY",
};

/**
 * Chính sách huỷ / không đến, hiện trong hộp thoại "Notice" mỗi khi khách bấm
 * nút đặt lịch. Nội dung lấy nguyên văn từ bài ghim trên Facebook của tiệm.
 */
export const bookingPolicy = {
  title: "No-show & cancellation policy",
  greeting: "Dear Valued Clients,",
  intro:
    "At Cheri’ Nail Art by Tracy, we appreciate your time and support! ❤️ To respect our technicians’ time and accommodate all clients, please review our appointment policy.",
  items: [
    {
      icon: "✨",
      label: "No-Show Fee",
      text: "A 50% fee of the scheduled service price will be charged for missed appointments without prior notice.",
    },
    {
      icon: "✨",
      label: "Cancellation Fee",
      text: "Cancellations made less than 12 hours before your scheduled appointment will be subject to a 50% fee of the scheduled service price.",
    },
    {
      icon: "💳",
      label: "New Clients",
      text: "A credit or debit card is required to be kept on file when booking an appointment to secure your reservation.",
    },
  ],
  note: "Please notify us as early as possible if you need to cancel or reschedule.",
  closing:
    "Thank you for your understanding, cooperation, and continued support! We look forward to seeing you!",
  signature: "Cheri’ Nail Art by Tracy",
};

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${brand.name}, ${contact.address}`,
)}`;

export const text = {
  nav: [
    { id: "home", label: "Home" },
    { id: "reviews", label: "Reviews" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "info", label: "Good to know" },
    { id: "contact", label: "Contact" },
  ] satisfies { id: SectionId; label: string }[],
  heroEyebrow: "Boutique nail studio · Dickinson, ND",
  heroTitle: ["Let your nails", "tell your story"],
  heroText:
    "Over 10 years of beautiful manicures, luxurious pedicures and custom nail designs, inside Rose and Belle Spa.",
  services: "Our services",
  servicesSub: "Manicures, pedicures and extensions, each finished with long-lasting gel polish.",
  explore: "See all services & prices",
  servicesPageTitle: "Services & prices",
  servicesPageIntro:
    "Prices marked + start from the listed amount and vary with length, shape and design. Nail art is available on any set for an additional charge.",
  reviews: "Kind words",
  reviewsSub: "From our clients",
  gallery: "Recent work",
  gallerySub: "Every set tells a story of its own.",
  team: "Creativity, quality and care",
  teamText:
    "Cheri’ Nail Art is a boutique nail studio with over 10 years of experience. We combine creativity, quality and exceptional customer care to create a relaxing, fabulous experience for every guest. From classic elegance to trendy nail art, we’re here to help you look and feel your best, one beautiful set at a time.",
  teamFeatures: ["10+ years of experience", "Custom nail designs", "Genuine hospitality"],
  teamMembersTitle: "Meet the artists",
  teamMembersSub: "Book directly with the artist you love.",
  info: "Good to know",
  contact: "Visit us",
  hoursTitle: "Opening hours",
};

// TODO: ảnh tạm cho slideshow, thay bằng ảnh thật của tiệm khi có.
export const slides = [
  { image: "/images/salon-hero.webp", position: "center 48%" },
  { image: "/images/nail-artist.webp", position: "center 45%" },
  { image: "/images/nail-art.webp", position: "center 55%" },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Trích từ review thật của khách (xem mảng `reviews`). */
  quote: { text: string; author: string };
  /**
   * Link đặt lịch của thợ. GlossGenius hiện chưa hỗ trợ link chọn sẵn thợ,
   * nên tạm dùng trang đặt lịch chung (khách chọn thợ ở bước "Select a Professional").
   * Khi tiệm có link riêng cho từng thợ thì chỉ cần thay ở đây.
   */
  bookingUrl: string;
  /** Ảnh chân dung trong public/images (ảnh gốc từ trang Team của GlossGenius); để trống thì hiện chữ cái đầu. */
  photo?: string;
};

// Thông tin thợ lấy từ trang /team của GlossGenius (cả hai đều nhận đủ 14 dịch vụ)
// và từ review của khách. GlossGenius chưa có phần giới thiệu riêng cho từng thợ.
export const teamMembers: TeamMember[] = [
  {
    name: "Tracy Duong",
    role: "Founder & nail artist",
    bio: "Tracy opened Cheri’ Nail Art after years of caring for a loyal group of clients. She is known for custom designs that match your inspiration photo, and for taking her time until every set is exactly what you wanted.",
    quote: { text: "Her talent for all different designs is unmatched.", author: "Daisia W." },
    bookingUrl: "https://cherinail.glossgenius.com/booking-flow",
    photo: "/images/team-tracy.webp",
  },
  {
    name: "Moon Ly",
    role: "Nail artist",
    bio: "Moon works alongside Tracy on every service the studio offers, from gel manicures and pedicures to extensions and custom nail art. Clients love her detailed work and her warm, welcoming style.",
    quote: { text: "Moon was my nail artist… my nails turned out absolutely perfect.", author: "Leo D." },
    bookingUrl: "https://cherinail.glossgenius.com/booking-flow",
    photo: "/images/team-moon.webp",
  },
];

export type ServiceCategory = "manicure" | "extensions" | "pedicure" | "extras";

export type Service = {
  title: string;
  price: string;
  duration: string;
  description: string;
  category: ServiceCategory;
  /** Hiển thị trên trang chủ (tối đa 4 dịch vụ). */
  featured?: boolean;
  badge?: string;
};

export const categoryLabels: Record<ServiceCategory, string> = {
  manicure: "Manicure",
  extensions: "Extensions & builder gel",
  pedicure: "Pedicure",
  extras: "Extras",
};

// TODO: thay bằng ảnh thật của từng nhóm dịch vụ khi có.
export const categoryImages: Record<ServiceCategory, string> = {
  manicure: "/images/nail-art.webp",
  extensions: "/images/nail-artist.webp",
  pedicure: "/images/pedicure.webp",
  extras: "/images/salon-hero.webp",
};

export const services: Service[] = [
  {
    title: "The Classic Gel Mani",
    price: "$45+",
    duration: "35+ min",
    category: "manicure",
    description: "Nail shaping, cuticle care, a soothing hand massage and your choice of polish.",
  },
  {
    title: "Cheri’ Manicure",
    price: "$60",
    duration: "45 min",
    category: "manicure",
    featured: true,
    badge: "Signature",
    description:
      "Detailed nail care, a gentle hand scrub, a Jo Malone lotion massage and warm gloves, finished with flawless gel polish.",
  },
  {
    title: "Builder Gel New Set",
    price: "$65+",
    duration: "55+ min",
    category: "extensions",
    featured: true,
    description:
      "A durable hard gel on the natural nail that prevents chipping and breakage, for short, strong, natural-looking nails.",
  },
  {
    title: "Builder Gel Fill-In",
    price: "$60+",
    duration: "45+ min",
    category: "extensions",
    description: "Remove old polish, fill the growth area and rebalance the nail, finished with gel polish.",
  },
  {
    title: "Gel X Full Set",
    price: "$65+",
    duration: "65+ min",
    category: "extensions",
    featured: true,
    description: "Lightweight soft gel extensions customized to your shape and finished with gel polish.",
  },
  {
    title: "Gel X Fill-In",
    price: "$65+",
    duration: "60 min",
    category: "extensions",
    description: "Fresh soft gel over the growth area and new gel polish. One fill is recommended before a new set.",
  },
  {
    title: "Acrylic Full Set",
    price: "$60+",
    duration: "65 min",
    category: "extensions",
    description: "The best choice for long extensions: strong, durable and available in many shapes.",
  },
  {
    title: "Acrylic Fill-In",
    price: "$50+",
    duration: "55 min",
    category: "extensions",
    description: "Fill in nail growth, remove old gel polish and finish with fresh gel polish.",
  },
  {
    title: "Dip Powder",
    price: "$60+",
    duration: "45 min",
    category: "extensions",
    description:
      "On natural nails or with tips for extra length. A strong, natural finish, ideal for short nails.",
  },
  {
    title: "Classic Pedicure",
    price: "$50",
    duration: "40 min",
    category: "pedicure",
    description: "Nail trimming and shaping, gentle cuticle care, a relaxing foot massage and gel polish.",
  },
  {
    title: "Hot Spring Pedicure",
    price: "$70",
    duration: "45 min",
    category: "pedicure",
    featured: true,
    badge: "Most popular",
    description:
      "Sugar scrub, detox mud mask with warm towel wrap, collagen socks and a 7-minute foot and leg massage.",
  },
  {
    title: "Cheri’ Golden Detox Pedicure",
    price: "$90",
    duration: "55 min",
    category: "pedicure",
    badge: "Luxury",
    description:
      "Orange detox soak, golden mask, paraffin wax, warm candle oil and a 12-minute hot stone massage with a warm neck wrap.",
  },
  {
    title: "Design Artwork",
    price: "From $5",
    duration: "20 min",
    category: "extras",
    description: "Small designs such as lines or flowers: $5 for 2 fingers, $20 for all 10.",
  },
  {
    title: "Take Off / Soak Off Only",
    price: "$10+",
    duration: "10+ min",
    category: "extras",
    description: "We file the top coat, soak off powder or gel polish, then trim and shape your nails.",
  },
];

export type ReviewSource = "Google" | "GlossGenius";

/**
 * Điểm và tổng số review trên Google Maps (kiểm tra thủ công 11/2026).
 * Không tự cập nhật: khi số review trên Google thay đổi thì sửa lại ở đây.
 */
export const reviewSummary = {
  rating: "5.0",
  count: 28,
  source: "Google",
  url: "https://maps.google.com/?cid=1828531702874772198",
};

/**
 * Review thật, chép tay từ Google Maps và trang đặt lịch GlossGenius.
 * Chỉ hiển thị tên và chữ cái đầu của họ để tôn trọng quyền riêng tư của khách.
 * Muốn thêm review chỉ cần thêm phần tử vào mảng; giao diện tự giãn theo số lượng.
 */
export const reviews: { name: string; body: string; source: ReviewSource; artist?: string }[] = [
  { name: "Leo D.", source: "Google", body: "I was recommended this place by a friend, and it absolutely did not disappoint. Even though Moon was my nail artist, Tracy also made me feel very welcome. My nails turned out absolutely perfect and I can’t wait for my next set! Thank you guys!" },
  { name: "Andreea I.", source: "Google", body: "This was our first visit, and we absolutely loved it! I really appreciate that they work by appointment instead of taking walk-ins, it made the experience feel so relaxed and personalized. The salon is beautiful, spotless, and has such a luxurious atmosphere. Tracy was incredibly friendly, welcoming, and made sure we were comfortable from the moment we arrived. We treated ourselves to the Golden Detox Pedicure, and it was amazing! We’ll definitely be coming back!" },
  { name: "Brooklyn C.", source: "Google", body: "I have been going to Tracy and Moon for almost a year now and I tell you what, they kill it every 👏🏻 time 👏🏻!!!!! Tracy & Moon are the kindest, super talented gals and I always leave Cheri Nails with a big smile on my face!! I highly, highly recommend them both. You will not be disappointed, trust." },
  { name: "Sabra", source: "GlossGenius", artist: "Tracy Duong", body: "Tracy was amazing! She made me feel very welcome and chatted about everything with me! She did amazing on my design and the length I was wanting!" },
  { name: "Daisia W.", source: "GlossGenius", artist: "Tracy Duong", body: "Tracy is the best!! Her talent for all different designs is unmatched. She’s easy to talk to and is so kind. Plus scheduling is so easy!" },
  { name: "Kathy F.", source: "GlossGenius", artist: "Tracy Duong", body: "Tracy always does the best. I have used her for years and so glad she started her own shop. Try her, you won’t be sorry." },
  { name: "Jerica", source: "GlossGenius", artist: "Tracy Duong", body: "Tracy took her time with me during my appointment! She suggested I switch from dip powder to the builder gel and I love how natural my nails look!" },
  { name: "Teresa", source: "GlossGenius", artist: "Tracy Duong", body: "Tracy is a friendly & professional nail tech who creates beautiful nails using her natural talent! Tracy is knowledgeable & gives outstanding care to her clients!!" },
  { name: "Susan", source: "GlossGenius", artist: "Tracy Duong", body: "Tracy was so friendly and she did a great job on my nails. She took her time to make sure they were exactly what I wanted. I look forward to seeing her again." },
  { name: "Trista", source: "GlossGenius", artist: "Tracy Duong", body: "My nails turned out amazing!! Tracy is very talented and I will definitely be going back again!" },
  { name: "Kaylee", source: "GlossGenius", artist: "Tracy Duong", body: "Nailed them!! My nails look just like the picture I wanted!!! Tracy always does great work!" },
  { name: "Erica", source: "GlossGenius", artist: "Tracy Duong", body: "I always enjoy getting my nails done with Tracy. Not only does she do a great job, I enjoy visiting with her. 😊" },
  { name: "Gin", source: "GlossGenius", artist: "Tracy Duong", body: "Tracy does excellent work and makes me feel welcome and appreciated. I highly recommend her." },
  { name: "Amy S.", source: "GlossGenius", artist: "Tracy Duong", body: "Tracy was wonderful. It was a relaxing experience, and my nails look great." },
  { name: "Brenda", source: "GlossGenius", artist: "Tracy Duong", body: "Today I had a pedicure done by Tracy. I will definitely be having many more in the future." },
  { name: "Victoria H.", source: "GlossGenius", artist: "Tracy Duong", body: "Amazing work, professional and high quality! Highly recommend!" },
  { name: "Sadi J.", source: "GlossGenius", artist: "Tracy Duong", body: "Tracy does such a good job! I have only ever had great experiences!" },
  { name: "Edith", source: "GlossGenius", artist: "Tracy Duong", body: "She is the best in all ways 👌🏾👌🏾👌🏾" },
  { name: "Kimberly G.", source: "GlossGenius", artist: "Tracy Duong", body: "Tracy does a wonderful job!!!" },
  { name: "Kathy F.", source: "GlossGenius", artist: "Hailey Duong", body: "Hailey did my pedicure, great job." },
];

// TODO: ảnh và tên dưới đây là ảnh tạm. Thay bằng ảnh nail art thật của tiệm
// (đặt file WebP vào public/images rồi sửa đường dẫn tại đây).
export const gallery: { image: string; title: string }[] = [
  { image: "/images/nail-art.webp", title: "Chocolate French" },
  { image: "/images/nail-artist.webp", title: "Studio Moment" },
  { image: "/images/pedicure.webp", title: "Golden Detox Ritual" },
  { image: "/images/nail-art.webp", title: "Ivory & Gold" },
  { image: "/images/salon-hero.webp", title: "The Studio" },
  { image: "/images/nail-art.webp", title: "Minimal Nude" },
];

/** Thông tin thực tế cho khách trước khi đặt lịch. */
export const infoCards: { label: string; title: string; body: string; image: string }[] = [
  {
    label: "Appointments",
    title: "Cancellation policy",
    body: "A 50% fee applies to no-shows and to cancellations made within 12 hours of your appointment. Thank you for respecting our technicians’ time.",
    image: "/images/salon-hero.webp",
  },
  {
    label: "Nail art",
    title: "Add a design to any set",
    body: "Small designs such as lines or flowers are $5 for 2 fingers or $20 for all 10. Bring your inspiration photo and we’ll make it yours.",
    image: "/images/nail-art.webp",
  },
  {
    label: "Payment",
    title: "Buy now, pay later",
    body: "Buy Now, Pay Later is available in person at the studio, so you can spread the cost of your visit.",
    image: "/images/pedicure.webp",
  },
];
