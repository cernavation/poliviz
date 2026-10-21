// ============================================================
// services.config.ts — данные о 7 технологиях
// Только факты из брифа. TODO(client) для недостающего.
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
  title: { ru: string; ro: string };
  shortTitle: { ru: string; ro: string };
  description: { ru: string; ro: string };
  when: { ru: string; ro: string };
  params: {
    label: { ru: string; ro: string };
    value: { ru: string; ro: string };
  }[];
  products: { ru: string[]; ro: string[] };
  materials: { ru: string[]; ro: string[] };
  // format: displayed as "формат · материал · тираж" in hub
  hubSpec: { ru: string; ro: string };
  relatedSlugs: ServiceSlug[];
  heroPhoto: string; // path relative to /public
  videoChapter: string; // 01-offset, 02-digital, etc.
}

export const SERVICES: ServiceData[] = [
  {
    slug: "ofsetnaya-pechat",
    href: ROUTES.serviceOffset,
    index: 1,
    title: { ru: "Офсетная печать", ro: "Tipar offset" },
    shortTitle: { ru: "Офсет", ro: "Offset" },
    description: {
      ru: "Печать через офсетный валик, несколько красок в одном прогоне. Экономична на больших тиражах, точна в воспроизведении цвета.",
      ro: "Tipărire prin cilindru offset, mai multe culori într-o singură trecere. Economicoasă la tiraje mari, precisă în reproducerea culorilor.",
    },
    when: {
      ru: "Оптимально для тиражей от 500 листов и выше. Чем больше тираж — тем ниже цена единицы.",
      ro: "Optim pentru tiraje de la 500 de coli. Cu cât tirajul e mai mare, cu atât costul pe unitate scade.",
    },
    params: [
      {
        label: { ru: "Технология", ro: "Tehnologie" },
        value: { ru: "Офсетная печать", ro: "Offset" },
      },
      {
        label: { ru: "Краски", ro: "Culori" },
        value: { ru: "CMYK + Pantone", ro: "CMYK + Pantone" },
      },
      {
        label: { ru: "Материалы", ro: "Materiale" },
        value: { ru: "Бумага, картон, упаковка", ro: "Hârtie, carton, ambalaj" },
      },
    ],
    products: {
      ru: ["Книги", "Газеты", "Журналы", "Упаковка", "Брошюры", "Этикетки", "Визитки", "Папки", "Конверты", "Бланки", "Пакеты", "Ежедневники", "Магниты", "Ценники", "Пригласительные", "Открытки", "Плакаты", "Календари", "Буклеты"],
      ro: ["Cărți", "Ziare", "Reviste", "Ambalaje", "Broșuri", "Etichete", "Cărți de vizită", "Mape", "Plicuri", "Formulare", "Pungi", "Agende", "Magneți", "Prețuri", "Invitații", "Felicitări", "Postere", "Calendare", "Pliante"],
    },
    materials: {
      ru: ["Мелованная бумага", "Немелованная бумага", "Картон", "Самоклейка"],
      ro: ["Hârtie cretată", "Hârtie necretată", "Carton", "Autocolant"],
    },
    hubSpec: {
      ru: "CMYK + Pantone · бумага / картон · от 500 листов",
      ro: "CMYK + Pantone · hârtie / carton · de la 500 coli",
    },
    relatedSlugs: ["laminaciya", "poslepechatnye-raboty"],
    heroPhoto: "/media/photo/services/offset.jpg",
    videoChapter: "01-offset",
  },
  {
    slug: "cifrovaya-pechat",
    href: ROUTES.serviceDigital,
    index: 2,
    title: { ru: "Цифровая печать", ro: "Tipar digital" },
    shortTitle: { ru: "Цифра", ro: "Digital" },
    description: {
      ru: "Тонерная печать с переменными данными. Для коротких тиражей до 500 листов А3 в 4 краски.",
      ro: "Tipărire cu toner și date variabile. Pentru tiraje scurte până la 500 de coli A3 în 4 culori.",
    },
    when: {
      ru: "До 500 листов А3 в 4 краски, формат до 457×311 мм (А3+). Когда нужны переменные данные или малый тираж быстро.",
      ro: "Până la 500 de coli A3 în 4 culori, format până la 457×311 mm (A3+). Când aveți nevoie de date variabile sau tiraje mici rapid.",
    },
    params: [
      {
        label: { ru: "Технология", ro: "Tehnologie" },
        value: { ru: "Цифровая (тонер)", ro: "Digital (toner)" },
      },
      {
        label: { ru: "Макс. формат", ro: "Format maxim" },
        value: { ru: "457×311 мм (А3+)", ro: "457×311 mm (A3+)" },
      },
      {
        label: { ru: "Тираж", ro: "Tiraj" },
        value: { ru: "до 500 листов", ro: "până la 500 coli" },
      },
    ],
    products: {
      ru: ["Листовки", "Визитки", "Плакаты", "Сертификаты"],
      ro: ["Pliante", "Cărți de vizită", "Postere", "Certificate"],
    },
    materials: {
      ru: ["Бумага", "Картон"],
      ro: ["Hârtie", "Carton"],
    },
    hubSpec: {
      ru: "тонер · до 457×311 мм · до 500 листов",
      ro: "toner · până la 457×311 mm · până la 500 coli",
    },
    relatedSlugs: ["laminaciya", "poslepechatnye-raboty"],
    heroPhoto: "/media/photo/services/digital.jpg",
    videoChapter: "02-digital",
  },
  {
    slug: "shelkografiya",
    href: ROUTES.serviceSilkscreen,
    index: 3,
    title: { ru: "Шелкография", ro: "Serigrafie" },
    shortTitle: { ru: "Шелк", ro: "Seri" },
    description: {
      ru: "Толстый слой краски, яркий насыщенный оттиск. Ткань, промышленные сорта бумаги, акрил, металл, оракал. Полутона 65–85 lpi.",
      ro: "Strat gros de cerneală, imprimare vibrantă și saturată. Pânză, hârtie industrială, acril, metal, oracal. Semitonuri 65–85 lpi.",
    },
    when: {
      ru: "Когда нужны яркость и стойкость на нестандартных материалах: ткань, металл, акрил, промышленная бумага.",
      ro: "Când aveți nevoie de strălucire și durabilitate pe materiale nestandard: pânză, metal, acril, hârtie industrială.",
    },
    params: [
      {
        label: { ru: "Полутона", ro: "Semitonuri" },
        value: { ru: "65–85 lpi", ro: "65–85 lpi" },
      },
      {
        label: { ru: "Материалы", ro: "Materiale" },
        value: { ru: "Ткань, бумага, акрил, металл, оракал", ro: "Pânză, hârtie, acril, metal, oracal" },
      },
    ],
    products: {
      ru: ["Визитки", "Папки", "Конверты", "Пакеты", "Ежедневники", "Флаги", "Майки", "Бейсболки", "Автоароматизаторы", "Подставки под напитки", "Магниты", "Диски", "Сумки", "Шарики", "Коврики для мыши", "Таблички", "Ценники", "Пригласительные", "Открытки"],
      ro: ["Cărți de vizită", "Mape", "Plicuri", "Pungi", "Agende", "Steaguri", "Tricouri", "Șepci", "Odorizante auto", "Suporturi pahare", "Magneți", "Discuri", "Genți", "Baloane", "Mousepad-uri", "Plăcuțe", "Etichete prețuri", "Invitații", "Felicitări"],
    },
    materials: {
      ru: ["Ткань", "Бумага", "Акрил", "Металл", "Оракал"],
      ro: ["Pânză", "Hârtie", "Acril", "Metal", "Oracal"],
    },
    hubSpec: {
      ru: "65–85 lpi · ткань / металл / акрил · любой тираж",
      ro: "65–85 lpi · pânză / metal / acril · orice tiraj",
    },
    relatedSlugs: ["laminaciya", "poslepechatnye-raboty"],
    heroPhoto: "/media/photo/services/silkscreen.jpg",
    videoChapter: "03-silkscreen",
  },
  {
    slug: "shirokoformatnaya-pechat",
    href: ROUTES.serviceWide,
    index: 4,
    title: { ru: "Широкоформатная печать", ro: "Tipar de mari dimensiuni" },
    shortTitle: { ru: "Широкоформат", ro: "Larg format" },
    description: {
      ru: "Рулонные материалы, ширина плоттера до 1500 мм. Фотобумага, самоклейка, холст, флаговая ткань, Flex, BackLit.",
      ro: "Materiale în rolă, lățime plotter până la 1500 mm. Hârtie foto, autocolant, canvas, pânză de steag, Flex, BackLit.",
    },
    when: {
      ru: "Формат больше А3+, тираж до 500 шт. Баннеры, интерьерная печать, постеры, афиши.",
      ro: "Format mai mare de A3+, tiraj până la 500 buc. Bannere, tipar interior, postere, afișe.",
    },
    params: [
      {
        label: { ru: "Ширина плоттера", ro: "Lățime plotter" },
        value: { ru: "до 1500 мм", ro: "până la 1500 mm" },
      },
      {
        label: { ru: "Тираж", ro: "Tiraj" },
        value: { ru: "до 500 шт.", ro: "până la 500 buc." },
      },
      {
        label: { ru: "Материалы", ro: "Materiale" },
        value: { ru: "Фотобумага, самоклейка, холст, Flex, BackLit", ro: "Hârtie foto, autocolant, canvas, Flex, BackLit" },
      },
    ],
    products: {
      ru: ["Баннеры", "Постеры", "Афиши", "Интерьерная печать"],
      ro: ["Bannere", "Postere", "Afișe", "Tipar interior"],
    },
    materials: {
      ru: ["Фотобумага", "Самоклейка", "Холст", "Флаговая ткань", "Flex", "BackLit"],
      ro: ["Hârtie foto", "Autocolant", "Canvas", "Pânză de steag", "Flex", "BackLit"],
    },
    hubSpec: {
      ru: "до 1500 мм шириной · рулонные материалы · до 500 шт.",
      ro: "până la 1500 mm lățime · materiale în rolă · până la 500 buc.",
    },
    relatedSlugs: ["plotternaya-rezka", "laminaciya"],
    heroPhoto: "/media/photo/services/wide-format.jpg",
    videoChapter: "04-wide",
  },
  {
    slug: "plotternaya-rezka",
    href: ROUTES.servicePlotter,
    index: 5,
    title: { ru: "Плоттерная резка", ro: "Tăiere cu plotter" },
    shortTitle: { ru: "Плоттер", ro: "Plotter" },
    description: {
      ru: "Резка винила и термоплёнок по векторному контуру. Наклейки, вывески, таблички, рекламные щиты, штендеры.",
      ro: "Tăierea vinilului și a termopeliculelor după contur vectorial. Autocolante, reclame, plăcuțe, panouri publicitare, roll-up-uri.",
    },
    when: {
      ru: "Когда нужна точная фигурная резка: наклейки, вывески, буквы из винила или термоплёнки.",
      ro: "Când aveți nevoie de tăiere precisă: autocolante, reclame, litere din vinil sau termopeliculă.",
    },
    params: [
      {
        label: { ru: "Материалы", ro: "Materiale" },
        value: { ru: "Винил, термоплёнки", ro: "Vinil, termopeliculă" },
      },
      {
        label: { ru: "Контур", ro: "Contur" },
        value: { ru: "Векторный файл", ro: "Fișier vectorial" },
      },
    ],
    products: {
      ru: ["Наклейки", "Вывески", "Таблички", "Рекламные щиты", "Штендеры"],
      ro: ["Autocolante", "Reclame", "Plăcuțe", "Panouri publicitare", "Roll-up-uri"],
    },
    materials: {
      ru: ["Самоклеящийся винил", "Термоплёнка", "Флексография"],
      ro: ["Vinil autoadeziv", "Termopeliculă", "Flexografie"],
    },
    hubSpec: {
      ru: "векторный контур · винил / термоплёнка · любой формат",
      ro: "contur vectorial · vinil / termopeliculă · orice format",
    },
    relatedSlugs: ["shirokoformatnaya-pechat", "laminaciya"],
    heroPhoto: "/media/photo/services/plotter.jpg",
    videoChapter: "05-plotter",
  },
  {
    slug: "laminaciya",
    href: ROUTES.serviceLamination,
    index: 6,
    title: { ru: "Ламинация", ro: "Laminare" },
    shortTitle: { ru: "Ламинация", ro: "Laminare" },
    description: {
      ru: "Матовая или глянцевая плёнка: защита от загрязнений и механических воздействий, жёсткость, долгий внешний вид.",
      ro: "Peliculă mată sau lucioasă: protecție împotriva murdăriei și uzurii mecanice, rigiditate, aspect durabil.",
    },
    when: {
      ru: "Дополнение к любой печати: защищает поверхность, усиливает цвет, добавляет тактильное качество.",
      ro: "Completare pentru orice tipar: protejează suprafața, intensifică culoarea, adaugă calitate tactilă.",
    },
    params: [
      {
        label: { ru: "Типы плёнки", ro: "Tipuri de peliculă" },
        value: { ru: "Матовая, глянцевая", ro: "Mată, lucioasă" },
      },
      {
        label: { ru: "Эффект", ro: "Efect" },
        value: { ru: "Защита, жёсткость, долгий вид", ro: "Protecție, rigiditate, aspect durabil" },
      },
    ],
    products: {
      ru: ["Любые печатные изделия", "Визитки", "Брошюры", "Упаковка"],
      ro: ["Orice produse tipărite", "Cărți de vizită", "Broșuri", "Ambalaje"],
    },
    materials: {
      ru: ["Матовая плёнка", "Глянцевая плёнка"],
      ro: ["Peliculă mată", "Peliculă lucioasă"],
    },
    hubSpec: {
      ru: "матовая / глянцевая · поверх любой печати",
      ro: "mată / lucioasă · peste orice tipar",
    },
    relatedSlugs: ["ofsetnaya-pechat", "poslepechatnye-raboty"],
    heroPhoto: "/media/photo/services/lamination.jpg",
    videoChapter: "06-lamination",
  },
  {
    slug: "poslepechatnye-raboty",
    href: ROUTES.servicePostpress,
    index: 7,
    title: { ru: "Послепечатные работы", ro: "Lucrări post-tipar" },
    shortTitle: { ru: "Послепечать", ro: "Post-tipar" },
    description: {
      ru: "Высечка, перфорация, биговка, фальцовка, нумерация, брошюровка, сверление, скругление углов, тиснение, резка.",
      ro: "Ștanțare, perforare, biguitura, fălțuire, numerotare, broșare, găurire, rotunjire colțuri, folio, tăiere.",
    },
    when: {
      ru: "Финальная обработка после печати: придать форму, собрать, защитить, украсить.",
      ro: "Prelucrare finală după tipar: formă, asamblare, protecție, decorare.",
    },
    params: [
      {
        label: { ru: "Операции", ro: "Operații" },
        value: { ru: "Высечка, перфорация, биговка, фальцовка и др.", ro: "Ștanțare, perforare, biguire, fălțuire etc." },
      },
    ],
    products: {
      ru: ["Буклеты", "Папки", "Упаковка", "Блокноты", "Ежедневники"],
      ro: ["Pliante", "Mape", "Ambalaje", "Bloc-notes", "Agende"],
    },
    materials: {
      ru: ["Любые печатные материалы"],
      ro: ["Orice materiale tipărite"],
    },
    hubSpec: {
      ru: "высечка · биговка · фальцовка · брошюровка и др.",
      ro: "ștanțare · biguire · fălțuire · broșare etc.",
    },
    relatedSlugs: ["ofsetnaya-pechat", "laminaciya"],
    heroPhoto: "/media/photo/services/postpress.jpg",
    videoChapter: "07-postpress",
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
