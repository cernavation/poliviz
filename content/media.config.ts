// ============================================================
// media.config.ts — все медиа-слоты сайта
// Один объект на слот: id, путь, тип, соотношение, alt, где используется.
// ============================================================

export type MediaType = "video" | "photo";
export type MediaStatus = "missing" | "ok";

export interface MediaSlot {
  id: string;
  path: string;        // relative to /public
  type: MediaType;
  ratio: string;       // e.g. "16:9", "9:16", "4:5", "1:1"
  required: boolean;
  usedIn: string[];    // page or component paths
  alt: { ru: string; ro: string };
  // Video-specific
  duration?: string;   // e.g. "8–10s"
  mobilePath?: string; // -m.mp4 version
  posterPath?: string; // .jpg poster
}

export const MEDIA: MediaSlot[] = [
  // ─── Видео-главы (скролл-история на главной) ────────────
  {
    id: "video-00-hero",
    path: "/media/video/00-hero.mp4",
    mobilePath: "/media/video/00-hero-m.mp4",
    posterPath: "/media/video/00-hero.jpg",
    type: "video",
    ratio: "16:9",
    required: true,
    duration: "8–10s",
    usedIn: ["src/components/home/ScrollVideo.tsx"],
    alt: { ru: "Типография Poliviz-Design — общий вид цеха", ro: "Tipografie Poliviz-Design — vedere generală atelier" },
  },
  {
    id: "video-01-offset",
    path: "/media/video/01-offset.mp4",
    mobilePath: "/media/video/01-offset-m.mp4",
    posterPath: "/media/video/01-offset.jpg",
    type: "video",
    ratio: "16:9",
    required: true,
    duration: "8–10s",
    usedIn: ["src/components/home/ScrollVideo.tsx"],
    alt: { ru: "Офсетная печать — процесс", ro: "Tipar offset — proces" },
  },
  {
    id: "video-02-digital",
    path: "/media/video/02-digital.mp4",
    mobilePath: "/media/video/02-digital-m.mp4",
    posterPath: "/media/video/02-digital.jpg",
    type: "video",
    ratio: "16:9",
    required: true,
    duration: "8–10s",
    usedIn: ["src/components/home/ScrollVideo.tsx"],
    alt: { ru: "Цифровая печать — процесс", ro: "Tipar digital — proces" },
  },
  {
    id: "video-03-silkscreen",
    path: "/media/video/03-silkscreen.mp4",
    mobilePath: "/media/video/03-silkscreen-m.mp4",
    posterPath: "/media/video/03-silkscreen.jpg",
    type: "video",
    ratio: "16:9",
    required: true,
    duration: "8–10s",
    usedIn: ["src/components/home/ScrollVideo.tsx"],
    alt: { ru: "Шелкография — процесс", ro: "Serigrafie — proces" },
  },
  {
    id: "video-04-wide",
    path: "/media/video/04-wide.mp4",
    mobilePath: "/media/video/04-wide-m.mp4",
    posterPath: "/media/video/04-wide.jpg",
    type: "video",
    ratio: "16:9",
    required: true,
    duration: "8–10s",
    usedIn: ["src/components/home/ScrollVideo.tsx"],
    alt: { ru: "Широкоформатная печать — процесс", ro: "Tipar larg format — proces" },
  },
  {
    id: "video-05-plotter",
    path: "/media/video/05-plotter.mp4",
    mobilePath: "/media/video/05-plotter-m.mp4",
    posterPath: "/media/video/05-plotter.jpg",
    type: "video",
    ratio: "16:9",
    required: true,
    duration: "8–10s",
    usedIn: ["src/components/home/ScrollVideo.tsx"],
    alt: { ru: "Плоттерная резка — процесс", ro: "Tăiere plotter — proces" },
  },
  {
    id: "video-06-lamination",
    path: "/media/video/06-lamination.mp4",
    mobilePath: "/media/video/06-lamination-m.mp4",
    posterPath: "/media/video/06-lamination.jpg",
    type: "video",
    ratio: "16:9",
    required: true,
    duration: "8–10s",
    usedIn: ["src/components/home/ScrollVideo.tsx"],
    alt: { ru: "Ламинация — процесс", ro: "Laminare — proces" },
  },
  {
    id: "video-07-postpress",
    path: "/media/video/07-postpress.mp4",
    mobilePath: "/media/video/07-postpress-m.mp4",
    posterPath: "/media/video/07-postpress.jpg",
    type: "video",
    ratio: "16:9",
    required: true,
    duration: "8–10s",
    usedIn: ["src/components/home/ScrollVideo.tsx"],
    alt: { ru: "Послепечатные работы — процесс", ro: "Lucrări post-tipar — proces" },
  },
  {
    id: "video-08-finale",
    path: "/media/video/08-finale.mp4",
    mobilePath: "/media/video/08-finale-m.mp4",
    posterPath: "/media/video/08-finale.jpg",
    type: "video",
    ratio: "16:9",
    required: false,
    duration: "8–10s",
    usedIn: ["src/components/home/ScrollVideo.tsx"],
    alt: { ru: "Готовая продукция", ro: "Produse finite" },
  },
  {
    id: "video-09-preflight",
    path: "/media/video/09-preflight.mp4",
    mobilePath: "/media/video/09-preflight-m.mp4",
    posterPath: "/media/video/09-preflight.jpg",
    type: "video",
    ratio: "16:9",
    required: false,
    duration: "8–10s",
    usedIn: ["src/app/podgotovka-maketov/page.tsx"],
    alt: { ru: "Проверка макета перед печатью", ro: "Verificare machete înainte de tipar" },
  },
  // ─── Фото услуг ─────────────────────────────────────────
  {
    id: "photo-service-offset",
    path: "/media/photo/services/offset.jpg",
    type: "photo",
    ratio: "16:9",
    required: true,
    usedIn: ["src/app/uslugi/[slug]/page.tsx"],
    alt: { ru: "Офсетная печать", ro: "Tipar offset" },
  },
  {
    id: "photo-service-digital",
    path: "/media/photo/services/digital.jpg",
    type: "photo",
    ratio: "16:9",
    required: true,
    usedIn: ["src/app/uslugi/[slug]/page.tsx"],
    alt: { ru: "Цифровая печать", ro: "Tipar digital" },
  },
  {
    id: "photo-service-silkscreen",
    path: "/media/photo/services/silkscreen.jpg",
    type: "photo",
    ratio: "16:9",
    required: true,
    usedIn: ["src/app/uslugi/[slug]/page.tsx"],
    alt: { ru: "Шелкография", ro: "Serigrafie" },
  },
  {
    id: "photo-service-wide-format",
    path: "/media/photo/services/wide-format.jpg",
    type: "photo",
    ratio: "16:9",
    required: true,
    usedIn: ["src/app/uslugi/[slug]/page.tsx"],
    alt: { ru: "Широкоформатная печать", ro: "Tipar larg format" },
  },
  {
    id: "photo-service-plotter",
    path: "/media/photo/services/plotter.jpg",
    type: "photo",
    ratio: "16:9",
    required: true,
    usedIn: ["src/app/uslugi/[slug]/page.tsx"],
    alt: { ru: "Плоттерная резка", ro: "Tăiere plotter" },
  },
  {
    id: "photo-service-lamination",
    path: "/media/photo/services/lamination.jpg",
    type: "photo",
    ratio: "16:9",
    required: true,
    usedIn: ["src/app/uslugi/[slug]/page.tsx"],
    alt: { ru: "Ламинация", ro: "Laminare" },
  },
  {
    id: "photo-service-postpress",
    path: "/media/photo/services/postpress.jpg",
    type: "photo",
    ratio: "16:9",
    required: true,
    usedIn: ["src/app/uslugi/[slug]/page.tsx"],
    alt: { ru: "Послепечатные работы", ro: "Lucrări post-tipar" },
  },
  // ─── Секционные фото ────────────────────────────────────
  {
    id: "photo-knolling",
    path: "/media/photo/sections/knolling-all.jpg",
    type: "photo",
    ratio: "16:9",
    required: false,
    usedIn: ["src/app/page.tsx"],
    alt: { ru: "Ассортимент полиграфической продукции", ro: "Gamă de produse tipografice" },
  },
  {
    id: "photo-packaging",
    path: "/media/photo/sections/packaging.jpg",
    type: "photo",
    ratio: "16:9",
    required: false,
    usedIn: ["src/app/produkciya/page.tsx"],
    alt: { ru: "Упаковочная продукция", ro: "Produse de ambalaj" },
  },
  {
    id: "photo-merch",
    path: "/media/photo/sections/merch.jpg",
    type: "photo",
    ratio: "16:9",
    required: false,
    usedIn: ["src/app/produkciya/page.tsx"],
    alt: { ru: "Мерч и сувениры", ro: "Merch și suveniruri" },
  },
  {
    id: "photo-outdoor",
    path: "/media/photo/sections/outdoor.jpg",
    type: "photo",
    ratio: "16:9",
    required: false,
    usedIn: ["src/app/produkciya/page.tsx"],
    alt: { ru: "Наружная реклама", ro: "Publicitate exterioară" },
  },
  // ─── Команда ────────────────────────────────────────────
  {
    id: "photo-hands-operator",
    path: "/media/photo/team/hands-operator.jpg",
    type: "photo",
    ratio: "4:3",
    required: false,
    usedIn: ["src/app/vakansii/page.tsx"],
    alt: { ru: "Руки оператора печатного станка", ro: "Mâinile operatorului mașinii de tipar" },
  },
  // ─── Контакты ───────────────────────────────────────────
  {
    id: "photo-building",
    path: "/media/photo/contacts/building.jpg",
    type: "photo",
    ratio: "16:9",
    required: false,
    usedIn: ["src/app/kontakty/page.tsx"],
    alt: { ru: "Здание типографии Poliviz-Design, бул. Москова 21", ro: "Clădirea tipografiei Poliviz-Design, bd. Moscova 21" },
  },
  // ─── Бренд ──────────────────────────────────────────────
  {
    id: "brand-logo",
    path: "/media/brand/logo.svg",
    type: "photo",
    ratio: "auto",
    required: true,
    usedIn: ["src/components/layout/Header.tsx", "src/components/layout/Footer.tsx"],
    alt: { ru: "Poliviz-Design — логотип", ro: "Poliviz-Design — logo" },
  },
  {
    id: "brand-og",
    path: "/media/brand/og-image.jpg",
    type: "photo",
    ratio: "1200:630",
    required: true,
    usedIn: ["src/app/layout.tsx"],
    alt: { ru: "Poliviz-Design SRL — типография в Кишинёве", ro: "Poliviz-Design SRL — tipografie în Chișinău" },
  },
];

export function getMediaSlot(id: string): MediaSlot | undefined {
  return MEDIA.find((m) => m.id === id);
}
