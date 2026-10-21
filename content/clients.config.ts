// ============================================================
// clients.config.ts — список клиентов
// marqueeOrder  — строгий порядок для бегущей строки на главной.
// CLIENTS_BY_CATEGORY — группировка по категориям для страницы /klienty.
// permission: true — логотип разрешён к публикации.
// ============================================================

export interface ClientEntry {
  slug: string;
  name: string;
  permission: boolean;
}

export interface ClientCategory {
  id: string;
  label: string;
  clients: ClientEntry[];
}

// ─── Порядок бегущей строки (главная) ────────────────────────────────────────
export const marqueeOrder: string[] = [
  "nokia",
  "samsung",
  "lg",
  "maximum",
  "bomba",
  "memernity",
  "simpals",
  "woloshin-banya",
  "lukoil",
  "rompetrol",
  "supraten",
  "air-moldova",
  "rtec",
  "lotereia-nationala",
  "cricova",
  "mimi",
  "purcari",
  "pepsi",
  "bucuria",
  "rogob",
  "andys",
  "la-placinta",
  "kaufland",
  "linella",
  "nr1",
  "felicia",
  "maib",
  "moldindconbank",
  "otp-bank",
  "orange",
  "moldcell",
];

// ─── Полный справочник клиентов ───────────────────────────────────────────────
const ALL_CLIENTS: Record<string, ClientEntry> = {
  nokia:            { slug: "nokia",            name: "Nokia",              permission: true },
  samsung:          { slug: "samsung",          name: "Samsung",            permission: true },
  lg:               { slug: "lg",               name: "LG",                 permission: true },
  maximum:          { slug: "maximum",          name: "Maximum",            permission: true },
  bomba:            { slug: "bomba",            name: "Bomba",              permission: true },
  memernity:        { slug: "memernity",        name: "Memernity",          permission: true },
  simpals:          { slug: "simpals",          name: "Simpals",            permission: true },
  kaufland:         { slug: "kaufland",         name: "Kaufland",           permission: true },
  linella:          { slug: "linella",          name: "Linella",            permission: true },
  nr1:              { slug: "nr1",              name: "Nr. 1",              permission: true },
  supraten:         { slug: "supraten",         name: "Supraten",           permission: true },
  "air-moldova":    { slug: "air-moldova",      name: "Air Moldova",        permission: true },
  rtec:             { slug: "rtec",             name: "RTEC",               permission: true },
  lukoil:           { slug: "lukoil",           name: "Lukoil",             permission: true },
  rompetrol:        { slug: "rompetrol",        name: "Rompetrol",          permission: true },
  "lotereia-nationala": { slug: "lotereia-nationala", name: "Loteria Națională", permission: true },
  "woloshin-banya": { slug: "woloshin-banya",   name: "Woloshin Banya",     permission: true },
  cricova:          { slug: "cricova",          name: "Cricova",            permission: true },
  mimi:             { slug: "mimi",             name: "Mimi",               permission: true },
  purcari:          { slug: "purcari",          name: "Purcari",            permission: true },
  pepsi:            { slug: "pepsi",            name: "Pepsi",              permission: true },
  bucuria:          { slug: "bucuria",          name: "Bucuria",            permission: true },
  rogob:            { slug: "rogob",            name: "Rogob",              permission: true },
  andys:            { slug: "andys",            name: "Andy's",             permission: true },
  "la-placinta":    { slug: "la-placinta",      name: "La Plăcintă",        permission: true },
  felicia:          { slug: "felicia",          name: "Felicia",            permission: true },
  maib:             { slug: "maib",             name: "MAIB",               permission: true },
  moldindconbank:   { slug: "moldindconbank",   name: "Moldindconbank",     permission: true },
  "otp-bank":       { slug: "otp-bank",         name: "OTP Bank",           permission: true },
  orange:           { slug: "orange",           name: "Orange",             permission: true },
  moldcell:         { slug: "moldcell",         name: "Moldcell",           permission: true },
};

// ─── Клиенты в порядке бегущей строки (для ClientsTicker) ────────────────────
export const CLIENTS: ClientEntry[] = marqueeOrder.map((slug) => ALL_CLIENTS[slug]);

// ─── Категории для страницы /klienty ─────────────────────────────────────────
export const CLIENTS_BY_CATEGORY: ClientCategory[] = [
  {
    id: "tech",
    label: "Технологии и Электроника",
    clients: ["nokia", "samsung", "lg", "maximum", "bomba", "memernity", "simpals"]
      .map((s) => ALL_CLIENTS[s]),
  },
  {
    id: "retail",
    label: "Сети и Ритейл",
    clients: ["kaufland", "linella", "nr1", "supraten"]
      .map((s) => ALL_CLIENTS[s]),
  },
  {
    id: "transport",
    label: "Транспорт и Услуги",
    clients: ["air-moldova", "rtec", "lukoil", "rompetrol", "lotereia-nationala", "woloshin-banya"]
      .map((s) => ALL_CLIENTS[s]),
  },
  {
    id: "wine",
    label: "Винодельни",
    clients: ["cricova", "mimi", "purcari"]
      .map((s) => ALL_CLIENTS[s]),
  },
  {
    id: "food",
    label: "Продукты и Рестораны",
    clients: ["pepsi", "bucuria", "rogob", "andys", "la-placinta"]
      .map((s) => ALL_CLIENTS[s]),
  },
  {
    id: "finance",
    label: "Финансы, Здоровье и Связь",
    clients: ["felicia", "maib", "moldindconbank", "otp-bank", "orange", "moldcell"]
      .map((s) => ALL_CLIENTS[s]),
  },
];
