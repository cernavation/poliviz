// ============================================================
// catalog.config.ts — 38 позиций каталога
// Slug-и сгенерированы по русским названиям (латиница).
// ============================================================

export type CatalogCategory =
  | "paper"       // бумажная продукция
  | "merch"       // мерч и сувениры
  | "outdoor"     // наружная реклама
  | "packaging"   // упаковка
  | "transport"   // транспортная и защищённая продукция
  | "digital";    // цифровые носители

export type TechTag =
  | "offset"
  | "digital"
  | "silkscreen"
  | "wide"
  | "plotter"
  | "lamination"
  | "postpress";

export interface CatalogItem {
  slug: string;
  title: { ru: string; ro: string; en: string };
  category: CatalogCategory;
  technologies: TechTag[];
  photo: string; // /media/photo/catalog/{slug}.jpg
}

export const CATALOG: CatalogItem[] = [
  // ─── Бумажная продукция ──────────────────────────────────
  { slug: "vizitki", title: { ru: "Визитки", ro: "Cărți de vizită", en: "Business cards" }, category: "paper", technologies: ["offset", "digital", "silkscreen"], photo: "/media/photo/catalog/vizitki.jpg" },
  { slug: "buklet", title: { ru: "Буклеты", ro: "Pliante pliabile", en: "Brochures" }, category: "paper", technologies: ["offset", "digital", "lamination", "postpress"], photo: "/media/photo/catalog/buklet.jpg" },
  { slug: "brosyura", title: { ru: "Брошюры", ro: "Broșuri", en: "Booklets" }, category: "paper", technologies: ["offset", "digital", "postpress"], photo: "/media/photo/catalog/brosyura.jpg" },
  { slug: "listovka", title: { ru: "Листовки", ro: "Fluturași", en: "Flyers" }, category: "paper", technologies: ["offset", "digital"], photo: "/media/photo/catalog/listovka.jpg" },
  { slug: "plakat", title: { ru: "Плакаты", ro: "Postere", en: "Posters" }, category: "paper", technologies: ["offset", "digital", "wide"], photo: "/media/photo/catalog/plakat.jpg" },
  { slug: "otkrytka", title: { ru: "Открытки", ro: "Felicitări", en: "Postcards" }, category: "paper", technologies: ["offset", "digital", "silkscreen"], photo: "/media/photo/catalog/otkrytka.jpg" },
  { slug: "priglasitelnoye", title: { ru: "Пригласительные", ro: "Invitații", en: "Invitations" }, category: "paper", technologies: ["offset", "digital", "silkscreen", "postpress"], photo: "/media/photo/catalog/priglasitelnoye.jpg" },
  { slug: "konyert", title: { ru: "Конверты", ro: "Plicuri", en: "Envelopes" }, category: "paper", technologies: ["offset", "digital", "silkscreen"], photo: "/media/photo/catalog/konyert.jpg" },
  { slug: "papka", title: { ru: "Папки", ro: "Mape", en: "Folders" }, category: "paper", technologies: ["offset", "silkscreen", "lamination", "postpress"], photo: "/media/photo/catalog/papka.jpg" },
  { slug: "blank", title: { ru: "Бланки", ro: "Formulare", en: "Letterheads" }, category: "paper", technologies: ["offset", "digital"], photo: "/media/photo/catalog/blank.jpg" },
  { slug: "diplom", title: { ru: "Дипломы", ro: "Diplome", en: "Diplomas & Certificates" }, category: "paper", technologies: ["offset", "digital"], photo: "/media/photo/catalog/diplom.jpg" },
  { slug: "zhurnal", title: { ru: "Журналы", ro: "Reviste", en: "Magazines & Catalogs" }, category: "paper", technologies: ["offset", "postpress"], photo: "/media/photo/catalog/zhurnal.jpg" },
  { slug: "kalendar", title: { ru: "Календари", ro: "Calendare", en: "Calendars" }, category: "paper", technologies: ["offset", "digital"], photo: "/media/photo/catalog/kalendar.jpg" },
  { slug: "bloknot", title: { ru: "Блокноты", ro: "Bloc-notes", en: "Notepads" }, category: "paper", technologies: ["offset", "postpress"], photo: "/media/photo/catalog/bloknot.jpg" },
  { slug: "menu", title: { ru: "Меню", ro: "Meniuri", en: "Menus" }, category: "paper", technologies: ["offset", "digital", "lamination"], photo: "/media/photo/catalog/menu.jpg" },
  { slug: "ezhedneynik", title: { ru: "Ежедневники", ro: "Agende", en: "Planners & Diaries" }, category: "paper", technologies: ["offset", "silkscreen", "postpress"], photo: "/media/photo/catalog/ezhedneynik.jpg" },
  { slug: "vobler", title: { ru: "Воблеры", ro: "Wobblere", en: "Shelf wobblers" }, category: "paper", technologies: ["offset", "digital", "postpress"], photo: "/media/photo/catalog/vobler.jpg" },
  { slug: "diskontnaya-karta", title: { ru: "Дисконтные карты", ro: "Carduri de reducere", en: "Discount cards" }, category: "paper", technologies: ["offset", "digital"], photo: "/media/photo/catalog/diskontnaya-karta.jpg" },
  // ─── Упаковка ────────────────────────────────────────────
  { slug: "upakovka", title: { ru: "Упаковка", ro: "Ambalaje", en: "Packaging boxes" }, category: "packaging", technologies: ["offset", "silkscreen", "postpress"], photo: "/media/photo/catalog/upakovka.jpg" },
  { slug: "paket", title: { ru: "Пакеты", ro: "Pungi", en: "Paper & Kraft bags" }, category: "packaging", technologies: ["offset", "silkscreen"], photo: "/media/photo/catalog/paket.jpg" },
  { slug: "nakleyka", title: { ru: "Наклейки", ro: "Autocolante", en: "Stickers & Labels" }, category: "packaging", technologies: ["digital", "plotter"], photo: "/media/photo/catalog/nakleyka.jpg" },
  // ─── Наружная реклама ────────────────────────────────────
  { slug: "nарuzhnaya-reklama", title: { ru: "Наружная реклама", ro: "Publicitate exterioară", en: "Outdoor signs" }, category: "outdoor", technologies: ["wide", "plotter"], photo: "/media/photo/catalog/naruzhnaya-reklama.jpg" },
  { slug: "stend", title: { ru: "Стенды", ro: "Standuri", en: "Display stands" }, category: "outdoor", technologies: ["wide", "offset", "postpress"], photo: "/media/photo/catalog/stend.jpg" },
  { slug: "tablichka", title: { ru: "Таблички", ro: "Plăcuțe", en: "Signboards & Plates" }, category: "outdoor", technologies: ["silkscreen", "plotter"], photo: "/media/photo/catalog/tablichka.jpg" },
  // ─── Мерч и сувениры ─────────────────────────────────────
  { slug: "mayka", title: { ru: "Майки", ro: "Tricouri", en: "T-shirts & Polos" }, category: "merch", technologies: ["silkscreen"], photo: "/media/photo/catalog/mayka.jpg" },
  { slug: "kepka", title: { ru: "Бейсболки", ro: "Șepci", en: "Caps & Hats" }, category: "merch", technologies: ["silkscreen"], photo: "/media/photo/catalog/kepka.jpg" },
  { slug: "sumka", title: { ru: "Сумки", ro: "Genți", en: "Tote bags" }, category: "merch", technologies: ["silkscreen"], photo: "/media/photo/catalog/sumka.jpg" },
  { slug: "magnet", title: { ru: "Магниты", ro: "Magneți", en: "Magnets" }, category: "merch", technologies: ["offset", "digital", "silkscreen"], photo: "/media/photo/catalog/magnet.jpg" },
  { slug: "shariki", title: { ru: "Шарики", ro: "Baloane", en: "Printed balloons" }, category: "merch", technologies: ["silkscreen"], photo: "/media/photo/catalog/shariki.jpg" },
  { slug: "kovrik-dlya-myshi", title: { ru: "Коврики для мыши", ro: "Mousepad-uri", en: "Mousepads" }, category: "merch", technologies: ["silkscreen"], photo: "/media/photo/catalog/kovrik-dlya-myshi.jpg" },
  { slug: "avto-aromatizator", title: { ru: "Автоароматизаторы", ro: "Odorizante auto", en: "Car air fresheners" }, category: "merch", technologies: ["offset", "silkscreen"], photo: "/media/photo/catalog/avto-aromatizator.jpg" },
  { slug: "podstavka-napitki", title: { ru: "Подставки под напитки", ro: "Suporturi pahare", en: "Coasters" }, category: "merch", technologies: ["offset", "silkscreen"], photo: "/media/photo/catalog/podstavka-napitki.jpg" },
  { slug: "posuda", title: { ru: "Посуда", ro: "Veselă", en: "Mugs & Glassware" }, category: "merch", technologies: ["silkscreen"], photo: "/media/photo/catalog/posuda.jpg" },
  { slug: "ruchka", title: { ru: "Ручки", ro: "Pixuri", en: "Branded pens" }, category: "merch", technologies: ["silkscreen"], photo: "/media/photo/catalog/ruchka.jpg" },
  { slug: "bryelok", title: { ru: "Брелоки", ro: "Brelouri", en: "Keychains" }, category: "merch", technologies: ["silkscreen"], photo: "/media/photo/catalog/bryelok.jpg" },
  // ─── Транспортная и защищённая продукция ─────────────────
  { slug: "transport", title: { ru: "Транспортная продукция", ro: "Produse transport", en: "Transport & security" }, category: "transport", technologies: ["offset", "silkscreen", "postpress"], photo: "/media/photo/catalog/transport.jpg" },
  { slug: "flag", title: { ru: "Флаги", ro: "Steaguri", en: "Flags & Banners" }, category: "transport", technologies: ["wide", "silkscreen"], photo: "/media/photo/catalog/flag.jpg" },
  // ─── Цифровые носители ───────────────────────────────────
  { slug: "cd", title: { ru: "CD", ro: "CD", en: "CD & DVD disks" }, category: "digital", technologies: ["silkscreen", "offset"], photo: "/media/photo/catalog/cd.jpg" },
];

export const CATALOG_FILTER_LABELS: Record<CatalogCategory, { ru: string; ro: string; en: string }> = {
  paper: { ru: "Бумажная", ro: "Hârtie", en: "Paper" },
  merch: { ru: "Мерч", ro: "Merch", en: "Merch" },
  outdoor: { ru: "Наружная", ro: "Exterioară", en: "Outdoor" },
  packaging: { ru: "Упаковка", ro: "Ambalaj", en: "Packaging" },
  transport: { ru: "Транспорт", ro: "Transport", en: "Transport" },
  digital: { ru: "Цифровые", ro: "Digitale", en: "Digital" },
};

export const TECH_FILTER_LABELS: Record<TechTag, { ru: string; ro: string; en: string }> = {
  offset: { ru: "Офсет", ro: "Offset", en: "Offset" },
  digital: { ru: "Цифровая", ro: "Digital", en: "Digital" },
  silkscreen: { ru: "Шелкография", ro: "Serigrafie", en: "Silkscreen" },
  wide: { ru: "Широкоформат", ro: "Larg format", en: "Large format" },
  plotter: { ru: "Плоттер", ro: "Plotter", en: "Plotter" },
  lamination: { ru: "Ламинация", ro: "Laminare", en: "Lamination" },
  postpress: { ru: "Послепечать", ro: "Post-tipar", en: "Post-press" },
};

// 12 избранных для главной страницы
export const CATALOG_FEATURED_SLUGS = [
  "vizitki",
  "buklet",
  "upakovka",
  "mayka",
  "nakleyka",
  "plakat",
  "ezhedneynik",
  "sumka",
  "nарuzhnaya-reklama",
  "flag",
  "magnet",
  "menu",
];
