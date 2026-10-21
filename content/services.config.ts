// ============================================================
// services.config.ts — данные о 7 технологиях Poliviz
// Полные переводы на RU, RO, EN
// ============================================================

import { ROUTES } from "./routes";

export type ServiceSlug =
  | "ofsetnaya-pechat"
  | "cifrovaya-pechat"
  | "shelkografiya"
  | "shirokoformatnaya-pechat"
  | "plotternaya-rezka"
  | "laminaciya"
  | "poslepechatnye-raboty";

export interface ServiceData {
  slug: ServiceSlug;
  href: string;
  index: number; // 01–07 for sheet labels
  title: { ru: string; ro: string; en: string };
  shortTitle: { ru: string; ro: string; en: string };
  description: { ru: string; ro: string; en: string };
  when: { ru: string; ro: string; en: string };
  params: {
    label: { ru: string; ro: string; en: string };
    value: { ru: string; ro: string; en: string };
  }[];
  products: { ru: string[]; ro: string[]; en: string[] };
  materials: { ru: string[]; ro: string[]; en: string[] };
  hubSpec: { ru: string; ro: string; en: string };
  relatedSlugs: ServiceSlug[];
  heroPhoto: string; // path relative to /public
  videoChapter: string; // 01-offset, 02-digital, etc.
}

export const SERVICES: ServiceData[] = [
  {
    slug: "ofsetnaya-pechat",
    href: ROUTES.serviceOffset,
    index: 1,
    title: { ru: "Офсетная печать", ro: "Tipar offset", en: "Offset printing" },
    shortTitle: { ru: "Офсет", ro: "Offset", en: "Offset" },
    description: {
      ru: "Печать через офсетный валик, несколько красок в одном прогоне. Экономична на больших тиражах, точна в воспроизведении цвета.",
      ro: "Tipărire prin cilindru offset, mai multe culori într-o singură trecere. Economicoasă la tiraje mari, precisă în reproducerea culorilor.",
      en: "Offset cylinder printing with multiple inks in a single pass. Cost-effective for large runs, highly precise in color reproduction.",
    },
    when: {
      ru: "Оптимально для тиражей от 500 листов и выше. Чем больше тираж — тем ниже цена единицы.",
      ro: "Optim pentru tiraje de la 500 de coli. Cu cât tirajul e mai mare, cu atât costul pe unitate scade.",
      en: "Best suited for print runs of 500+ sheets. The larger the volume, the lower the unit price.",
    },
    params: [
      {
        label: { ru: "Технология", ro: "Tehnologie", en: "Technology" },
        value: { ru: "Офсетная печать", ro: "Offset", en: "Offset printing" },
      },
      {
        label: { ru: "Краски", ro: "Culori", en: "Colors" },
        value: { ru: "CMYK + Pantone", ro: "CMYK + Pantone", en: "CMYK + Pantone" },
      },
      {
        label: { ru: "Материалы", ro: "Materiale", en: "Materials" },
        value: { ru: "Бумага, картон, упаковка", ro: "Hârtie, carton, ambalaj", en: "Paper, cardboard, packaging" },
      },
    ],
    products: {
      ru: ["Книги", "Газеты", "Журналы", "Упаковка", "Брошюры", "Этикетки", "Визитки", "Папки", "Конверты", "Бланки", "Пакеты", "Ежедневники", "Магниты", "Ценники", "Пригласительные", "Открытки", "Плакаты", "Календари", "Буклеты"],
      ro: ["Cărți", "Ziare", "Reviste", "Ambalaje", "Broșuri", "Etichete", "Cărți de vizită", "Mape", "Plicuri", "Formulare", "Pungi", "Agende", "Magneți", "Prețuri", "Invitații", "Felicitări", "Postere", "Calendare", "Pliante"],
      en: ["Books", "Newspapers", "Magazines", "Packaging", "Brochures", "Labels", "Business cards", "Folders", "Envelopes", "Forms", "Bags", "Planners", "Magnets", "Price tags", "Invitations", "Postcards", "Posters", "Calendars", "Flyers"],
    },
    materials: {
      ru: ["Мелованная бумага", "Немелованная бумага", "Картон", "Самоклейка"],
      ro: ["Hârtie cretată", "Hârtie necretată", "Carton", "Autocolant"],
      en: ["Coated paper", "Uncoated paper", "Cardboard", "Self-adhesive"],
    },
    hubSpec: {
      ru: "CMYK + Pantone · бумага / картон · от 500 листов",
      ro: "CMYK + Pantone · hârtie / carton · de la 500 coli",
      en: "CMYK + Pantone · paper / cardboard · from 500 sheets",
    },
    relatedSlugs: ["laminaciya", "poslepechatnye-raboty"],
    heroPhoto: "/media/photo/services/offset.jpg",
    videoChapter: "01-offset",
  },
  {
    slug: "cifrovaya-pechat",
    href: ROUTES.serviceDigital,
    index: 2,
    title: { ru: "Цифровая печать", ro: "Tipar digital", en: "Digital printing" },
    shortTitle: { ru: "Цифра", ro: "Digital", en: "Digital" },
    description: {
      ru: "Тонерная печать с переменными данными. Для коротких тиражей до 500 листов А3 в 4 краски.",
      ro: "Tipărire cu toner și date variabile. Pentru tiraje scurte până la 500 de coli A3 în 4 culori.",
      en: "Toner printing with variable data support. For short runs up to 500 sheets A3 in 4 colors.",
    },
    when: {
      ru: "До 500 листов А3 в 4 краски, формат до 457×311 мм (А3+). Когда нужны переменные данные или малый тираж быстро.",
      ro: "Până la 500 de coli A3 în 4 culori, format până la 457×311 mm (A3+). Când aveți nevoie de date variabile sau tiraje mici rapid.",
      en: "Up to 500 A3 sheets in 4 colors, up to 457×311 mm (A3+). Ideal when variable data or rapid turnarounds are required.",
    },
    params: [
      {
        label: { ru: "Технология", ro: "Tehnologie", en: "Technology" },
        value: { ru: "Цифровая (тонер)", ro: "Digital (toner)", en: "Digital (toner)" },
      },
      {
        label: { ru: "Макс. формат", ro: "Format maxim", en: "Max format" },
        value: { ru: "457×311 мм (А3+)", ro: "457×311 mm (A3+)", en: "457×311 mm (A3+)" },
      },
      {
        label: { ru: "Тираж", ro: "Tiraj", en: "Print run" },
        value: { ru: "до 500 листов", ro: "până la 500 coli", en: "up to 500 sheets" },
      },
    ],
    products: {
      ru: ["Листовки", "Визитки", "Плакаты", "Сертификаты"],
      ro: ["Pliante", "Cărți de vizită", "Postere", "Certificate"],
      en: ["Flyers", "Business cards", "Posters", "Certificates"],
    },
    materials: {
      ru: ["Бумага", "Картон"],
      ro: ["Hârtie", "Carton"],
      en: ["Paper", "Cardboard"],
    },
    hubSpec: {
      ru: "тонер · до 457×311 мм · до 500 листов",
      ro: "toner · până la 457×311 mm · până la 500 coli",
      en: "toner · up to 457×311 mm · up to 500 sheets",
    },
    relatedSlugs: ["laminaciya", "poslepechatnye-raboty"],
    heroPhoto: "/media/photo/services/digital.jpg",
    videoChapter: "02-digital",
  },
  {
    slug: "shelkografiya",
    href: ROUTES.serviceSilkscreen,
    index: 3,
    title: { ru: "Шелкография", ro: "Serigrafie", en: "Silkscreen printing" },
    shortTitle: { ru: "Шелк", ro: "Seri", en: "Silkscreen" },
    description: {
      ru: "Толстый слой краски, яркий насыщенный оттиск. Ткань, промышленные сорта бумаги, акрил, металл, оракал. Полутона 65–85 lpi.",
      ro: "Strat gros de cerneală, imprimare vibrantă și saturată. Pânză, hârtie industrială, acril, metal, oracal. Semitonuri 65–85 lpi.",
      en: "Heavy ink deposit, vibrant and rich prints. Fabric, industrial paper, acrylic, metal, Oracal vinyl. Halftones 65–85 lpi.",
    },
    when: {
      ru: "Когда нужны яркость и стойкость на нестандартных материалах: ткань, металл, акрил, промышленная бумага.",
      ro: "Când aveți nevoie de strălucire și durabilitate pe materiale nestandard: pânză, metal, acril, hârtie industrială.",
      en: "When vivid color and durability are required on specialty materials: textiles, metal, acrylic, industrial stock.",
    },
    params: [
      {
        label: { ru: "Полутона", ro: "Semitonuri", en: "Halftones" },
        value: { ru: "65–85 lpi", ro: "65–85 lpi", en: "65–85 lpi" },
      },
      {
        label: { ru: "Материалы", ro: "Materiale", en: "Materials" },
        value: { ru: "Ткань, бумага, акрил, металл, оракал", ro: "Pânză, hârtie, acril, metal, oracal", en: "Fabric, paper, acrylic, metal, vinyl" },
      },
    ],
    products: {
      ru: ["Визитки", "Папки", "Конверты", "Пакеты", "Ежедневники", "Флаги", "Майки", "Бейсболки", "Автоароматизаторы", "Подставки под напитки", "Магниты", "Диски", "Сумки", "Шарики", "Коврики для мыши", "Таблички", "Ценники", "Пригласительные", "Открытки"],
      ro: ["Cărți de vizită", "Mape", "Plicuri", "Pungi", "Agende", "Steaguri", "Tricouri", "Șepci", "Odorizante auto", "Suporturi pahare", "Magneți", "Discuri", "Genți", "Baloane", "Mousepad-uri", "Plăcuțe", "Etichete prețuri", "Invitații", "Felicitări"],
      en: ["Business cards", "Folders", "Envelopes", "Bags", "Diaries", "Flags", "T-shirts", "Caps", "Air fresheners", "Coasters", "Magnets", "CDs", "Tote bags", "Balloons", "Mousepads", "Plates", "Price tags", "Invitations", "Postcards"],
    },
    materials: {
      ru: ["Ткань", "Бумага", "Акрил", "Металл", "Оракал"],
      ro: ["Pânză", "Hârtie", "Acril", "Metal", "Oracal"],
      en: ["Fabric", "Paper", "Acrylic", "Metal", "Vinyl"],
    },
    hubSpec: {
      ru: "65–85 lpi · ткань / металл / акрил · любой тираж",
      ro: "65–85 lpi · pânză / metal / acril · orice tiraj",
      en: "65–85 lpi · fabric / metal / acrylic · any run",
    },
    relatedSlugs: ["laminaciya", "poslepechatnye-raboty"],
    heroPhoto: "/media/photo/services/silkscreen.jpg",
    videoChapter: "03-silkscreen",
  },
  {
    slug: "shirokoformatnaya-pechat",
    href: ROUTES.serviceWide,
    index: 4,
    title: { ru: "Широкоформатная печать", ro: "Tipar de mari dimensiuni", en: "Large format printing" },
    shortTitle: { ru: "Широкоформат", ro: "Larg format", en: "Large format" },
    description: {
      ru: "Рулонные материалы, ширина плоттера до 1500 мм. Фотобумага, самоклейка, холст, флаговая ткань, Flex, BackLit.",
      ro: "Materiale în rolă, lățime plotter până la 1500 mm. Hârtie foto, autocolant, canvas, pânză de steag, Flex, BackLit.",
      en: "Roll materials, plotter width up to 1500 mm. Photo paper, self-adhesive, canvas, banner fabric, Flex, BackLit.",
    },
    when: {
      ru: "Формат больше А3+, тираж до 500 шт. Баннеры, интерьерная печать, постеры, афиши.",
      ro: "Format mai mare de A3+, tiraj până la 500 buc. Bannere, tipar interior, postere, afișe.",
      en: "Sizes exceeding A3+, runs up to 500 pcs. Banners, indoor graphics, posters, large displays.",
    },
    params: [
      {
        label: { ru: "Ширина плоттера", ro: "Lățime plotter", en: "Plotter width" },
        value: { ru: "до 1500 мм", ro: "până la 1500 mm", en: "up to 1500 mm" },
      },
      {
        label: { ru: "Тираж", ro: "Tiraj", en: "Print run" },
        value: { ru: "до 500 шт.", ro: "până la 500 buc.", en: "up to 500 pcs." },
      },
      {
        label: { ru: "Материалы", ro: "Materiale", en: "Materials" },
        value: { ru: "Фотобумага, самоклейка, холст, Flex, BackLit", ro: "Hârtie foto, autocolant, canvas, Flex, BackLit", en: "Photo paper, vinyl, canvas, Flex, BackLit" },
      },
    ],
    products: {
      ru: ["Баннеры", "Постеры", "Афиши", "Интерьерная печать"],
      ro: ["Bannere", "Postere", "Afișe", "Tipar interior"],
      en: ["Banners", "Posters", "Billboards", "Interior graphics"],
    },
    materials: {
      ru: ["Фотобумага", "Самоклейка", "Холст", "Флаговая ткань", "Flex", "BackLit"],
      ro: ["Hârtie foto", "Autocolant", "Canvas", "Pânză de steag", "Flex", "BackLit"],
      en: ["Photo paper", "Self-adhesive vinyl", "Canvas", "Flag fabric", "Flex", "BackLit"],
    },
    hubSpec: {
      ru: "до 1500 мм шириной · рулонные материалы · до 500 шт.",
      ro: "până la 1500 mm lățime · materiale în rolă · până la 500 buc.",
      en: "up to 1500 mm width · roll media · up to 500 pcs",
    },
    relatedSlugs: ["plotternaya-rezka", "laminaciya"],
    heroPhoto: "/media/photo/services/wide-format.jpg",
    videoChapter: "04-wide",
  },
  {
    slug: "plotternaya-rezka",
    href: ROUTES.servicePlotter,
    index: 5,
    title: { ru: "Плоттерная резка", ro: "Tăiere cu plotter", en: "Plotter cutting" },
    shortTitle: { ru: "Плоттер", ro: "Plotter", en: "Plotter" },
    description: {
      ru: "Резка винила и термоплёнок по векторному контуру. Наклейки, вывески, таблички, рекламные щиты, штендеры.",
      ro: "Tăierea vinilului și a termopeliculelor după contur vectorial. Autocolante, reclame, plăcuțe, panouri publicitare, roll-up-uri.",
      en: "Precision contour cutting of vinyl and heat transfer films. Stickers, signs, nameplates, billboards, roll-ups.",
    },
    when: {
      ru: "Когда нужна точная фигурная резка: наклейки, вывески, буквы из винила или термоплёнки.",
      ro: "Când aveți nevoie de tăiere precisă: autocolante, reclame, litere din vinil sau termopeliculă.",
      en: "When precise shaped cuts are needed: stickers, signage, letters from vinyl or heat transfer films.",
    },
    params: [
      {
        label: { ru: "Материалы", ro: "Materiale", en: "Materials" },
        value: { ru: "Винил, термоплёнки", ro: "Vinil, termopeliculă", en: "Vinyl, thermal film" },
      },
      {
        label: { ru: "Контур", ro: "Contur", en: "Contour" },
        value: { ru: "Векторный файл", ro: "Fișier vectorial", en: "Vector file" },
      },
    ],
    products: {
      ru: ["Наклейки", "Вывески", "Таблички", "Рекламные щиты", "Штендеры"],
      ro: ["Autocolante", "Reclame", "Plăcuțe", "Panouri publicitare", "Roll-up-uri"],
      en: ["Stickers", "Signboards", "Plates", "Advertising billboards", "Roll-up stands"],
    },
    materials: {
      ru: ["Самоклеящийся винил", "Термоплёнка", "Флексография"],
      ro: ["Vinil autoadeziv", "Termopeliculă", "Flexografie"],
      en: ["Self-adhesive vinyl", "Heat transfer film", "Flexography"],
    },
    hubSpec: {
      ru: "векторный контур · винил / термоплёнка · любой формат",
      ro: "contur vectorial · vinil / termopeliculă · orice format",
      en: "vector contour · vinyl / thermal film · any size",
    },
    relatedSlugs: ["shirokoformatnaya-pechat", "laminaciya"],
    heroPhoto: "/media/photo/services/plotter.jpg",
    videoChapter: "05-plotter",
  },
  {
    slug: "laminaciya",
    href: ROUTES.serviceLamination,
    index: 6,
    title: { ru: "Ламинация", ro: "Laminare", en: "Lamination" },
    shortTitle: { ru: "Ламинация", ro: "Laminare", en: "Lamination" },
    description: {
      ru: "Матовая или глянцевая плёнка: защита от загрязнений и механических воздействий, жёсткость, долгий внешний вид.",
      ro: "Peliculă mată sau lucioasă: protecție împotriva murdăriei și uzurii mecanice, rigiditate, aspect durabil.",
      en: "Matte or glossy film: protection against dirt and abrasion, enhanced rigidity, long-lasting premium appearance.",
    },
    when: {
      ru: "Дополнение к любой печати: защищает поверхность, усиливает цвет, добавляет тактильное качество.",
      ro: "Completare pentru orice tipar: protejează suprafața, intensifică culoarea, adaugă calitate tactilă.",
      en: "An essential addition to any print: protects the surface, enriches color, adds tactile quality.",
    },
    params: [
      {
        label: { ru: "Типы плёнки", ro: "Tipuri de peliculă", en: "Film types" },
        value: { ru: "Матовая, глянцевая", ro: "Mată, lucioasă", en: "Matte, glossy, soft-touch" },
      },
      {
        label: { ru: "Эффект", ro: "Efect", en: "Effect" },
        value: { ru: "Защита, жёсткость, долгий вид", ro: "Protecție, rigiditate, aspect durabil", en: "Protection, rigidity, durability" },
      },
    ],
    products: {
      ru: ["Любые печатные изделия", "Визитки", "Брошюры", "Упаковка"],
      ro: ["Orice produse tipărite", "Cărți de vizită", "Broșuri", "Ambalaje"],
      en: ["Any printed goods", "Business cards", "Brochures", "Packaging"],
    },
    materials: {
      ru: ["Матовая плёнка", "Глянцевая плёнка"],
      ro: ["Peliculă mată", "Peliculă lucioasă"],
      en: ["Matte film", "Glossy film"],
    },
    hubSpec: {
      ru: "матовая / глянцевая · поверх любой печати",
      ro: "mată / lucioasă · peste orice tipar",
      en: "matte / glossy · over any print",
    },
    relatedSlugs: ["ofsetnaya-pechat", "poslepechatnye-raboty"],
    heroPhoto: "/media/photo/services/lamination.jpg",
    videoChapter: "06-lamination",
  },
  {
    slug: "poslepechatnye-raboty",
    href: ROUTES.servicePostpress,
    index: 7,
    title: { ru: "Послепечатные работы", ro: "Lucrări post-tipar", en: "Post-press finishing" },
    shortTitle: { ru: "Послепечать", ro: "Post-tipar", en: "Post-press" },
    description: {
      ru: "Высечка, перфорация, биговка, фальцовка, нумерация, брошюровка, сверление, скругление углов, тиснение, резка.",
      ro: "Ștanțare, perforare, biguitura, fălțuire, numerotare, broșare, găurire, rotunjire colțuri, folio, tăiere.",
      en: "Die-cutting, perforation, creasing, folding, numbering, binding, drilling, corner rounding, foil stamping, trimming.",
    },
    when: {
      ru: "Финальная обработка после печати: придать форму, собрать, защитить, украсить.",
      ro: "Prelucrare finală după tipar: formă, asamblare, protecție, decorare.",
      en: "Final finishing stage after printing: shaping, assembling, protecting, and embellishing.",
    },
    params: [
      {
        label: { ru: "Операции", ro: "Operații", en: "Operations" },
        value: { ru: "Высечка, перфорация, биговка, фальцовка и др.", ro: "Ștanțare, perforare, biguire, fălțuire etc.", en: "Die-cut, perforation, crease, fold, foil etc." },
      },
    ],
    products: {
      ru: ["Буклеты", "Папки", "Упаковка", "Блокноты", "Ежедневники"],
      ro: ["Pliante", "Mape", "Ambalaje", "Bloc-notes", "Agende"],
      en: ["Brochures", "Folders", "Boxes", "Notepads", "Planners"],
    },
    materials: {
      ru: ["Любые печатные материалы"],
      ro: ["Orice materiale tipărite"],
      en: ["All printed materials"],
    },
    hubSpec: {
      ru: "высечка · биговка · фальцовка · брошюровка и др.",
      ro: "ștanțare · biguire · fălțuire · broșare etc.",
      en: "die-cut · crease · fold · binding etc.",
    },
    relatedSlugs: ["ofsetnaya-pechat", "laminaciya"],
    heroPhoto: "/media/photo/services/postpress.jpg",
    videoChapter: "07-postpress",
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
