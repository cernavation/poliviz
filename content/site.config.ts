// ============================================================
// site.config.ts — единственный источник правды о компании
// Тексты и факты только из брифа. Выдуманных данных нет.
// ============================================================

export const SITE = {
  name: "Poliviz-Design SRL",
  nameSuffix: "SRL",
  domain: "poliviz.md",
  email: "info@poliviz.md",
  phone: {
    main: "+37322930270",
    mobile: "+37367135999",
    fax: "+37322450652",
    mainFormatted: "+373 22 93 02 70",
    mobileFormatted: "+373 67 13 59 99",
    faxFormatted: "+373 22 45 06 52",
  },
  address: {
    street: "бул. Москова 21",
    building: "завод «Мезон»",
    city: "Кишинёв",
    country: "Молдова",
    countryCode: "MD",
    lat: 47.0171,
    lng: 28.8388,
  },

  // ─── Флаги ──────────────────────────────────────────────────
  // SHOW_YEARS: false — не показывать «N лет на рынке»
  // пока клиент не подтвердит дату основания.
  // В реестре юрлицо с 2006, но на сайте это НЕ отображается.
  SHOW_YEARS: false,
  // TODO(client): подтвердить год основания чтобы включить SHOW_YEARS

  // ─── Цифры ──────────────────────────────────────────────────
  stats: {
    clients: "700+",
    technologies: 7,
    // TODO(client): добавить другие верифицированные цифры
  },

  // ─── Ключевые идеи (для SEO и meta) ─────────────────────────
  tagline: {
    ru: "Из файла — в руки.",
    ro: "Din fișier — în mâini.",
  },
  description: {
    ru: "Типография полного цикла в Кишинёве: дизайн, печать и послепечатная обработка в одном цехе.",
    ro: "Tipografie cu ciclu complet în Chișinău: design, tipar și finisare sub același acoperiș.",
  },

  // ─── Идея страницы «Макеты» ─────────────────────────────────
  maxUploadMb: 25,
} as const;

export type SiteConfig = typeof SITE;
