/**
 * audit-photos.mjs
 * Аудит всех фото-слотов: media.config.ts + catalog.config.ts
 * Проверяет физическое наличие файлов в public/media/photo/
 */

import { existsSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = (p => p.substring(0, p.lastIndexOf("/")))(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");

// ─── Слоты из media.config.ts (только photo-слоты, не video, не brand) ───────
const MEDIA_SLOTS = [
  // Services
  { path: "/media/photo/services/offset.jpg",      name: "Офсетная печать",          usedIn: "uslugi/ofsetnaya-pechat" },
  { path: "/media/photo/services/digital.jpg",     name: "Цифровая печать",           usedIn: "uslugi/cifrovaya-pechat" },
  { path: "/media/photo/services/silkscreen.jpg",  name: "Шелкография",              usedIn: "uslugi/shelkografiya" },
  { path: "/media/photo/services/wide-format.jpg", name: "Широкоформатная печать",   usedIn: "uslugi/shirokoformatnaya-pechat" },
  { path: "/media/photo/services/plotter.jpg",     name: "Плоттерная резка",         usedIn: "uslugi/plotternaya-rezka" },
  { path: "/media/photo/services/lamination.jpg",  name: "Ламинация",                usedIn: "uslugi/laminaciya" },
  { path: "/media/photo/services/postpress.jpg",   name: "Послепечатные работы",     usedIn: "uslugi/poslepechatnye-raboty" },
  // Sections
  { path: "/media/photo/sections/knolling-all.jpg",name: "Ассортимент (knolling)",   usedIn: "Главная — блок продукции" },
  { path: "/media/photo/sections/packaging.jpg",   name: "Упаковочная продукция",    usedIn: "produkciya" },
  { path: "/media/photo/sections/merch.jpg",       name: "Мерч и сувениры",          usedIn: "produkciya" },
  { path: "/media/photo/sections/outdoor.jpg",     name: "Наружная реклама",         usedIn: "produkciya" },
  // Team
  { path: "/media/photo/team/hands-operator.jpg",  name: "Руки оператора станка",    usedIn: "vakansii" },
  // Contacts
  { path: "/media/photo/contacts/building.jpg",    name: "Здание типографии",        usedIn: "kontakty" },
];

// ─── Каталог из catalog.config.ts ────────────────────────────────────────────
const CATALOG_ITEMS = [
  // Бумажная продукция
  { slug: "vizitki",           name: "Визитки",                usedIn: "produkciya, Главная (featured)" },
  { slug: "buklet",            name: "Буклеты",                usedIn: "produkciya, Главная (featured)" },
  { slug: "brosyura",          name: "Брошюры",                usedIn: "produkciya" },
  { slug: "listovka",          name: "Листовки",               usedIn: "produkciya" },
  { slug: "plakat",            name: "Плакаты",                usedIn: "produkciya, Главная (featured)" },
  { slug: "otkrytka",          name: "Открытки",               usedIn: "produkciya" },
  { slug: "priglasitelnoye",   name: "Пригласительные",        usedIn: "produkciya" },
  { slug: "konyert",           name: "Конверты",               usedIn: "produkciya" },
  { slug: "papka",             name: "Папки",                  usedIn: "produkciya" },
  { slug: "blank",             name: "Бланки",                 usedIn: "produkciya" },
  { slug: "diplom",            name: "Дипломы и сертификаты",  usedIn: "produkciya" },
  { slug: "zhurnal",           name: "Журналы",                usedIn: "produkciya" },
  { slug: "kalendar",          name: "Календари",              usedIn: "produkciya" },
  { slug: "bloknot",           name: "Блокноты",               usedIn: "produkciya" },
  { slug: "menu",              name: "Меню",                   usedIn: "produkciya, Главная (featured)" },
  { slug: "ezhedneynik",       name: "Ежедневники",            usedIn: "produkciya, Главная (featured)" },
  { slug: "vobler",            name: "Воблеры",                usedIn: "produkciya" },
  { slug: "diskontnaya-karta", name: "Дисконтные карты",       usedIn: "produkciya" },
  // Упаковка
  { slug: "upakovka",          name: "Упаковка",               usedIn: "produkciya, Главная (featured)" },
  { slug: "paket",             name: "Пакеты",                 usedIn: "produkciya" },
  { slug: "nakleyka",          name: "Наклейки",               usedIn: "produkciya, Главная (featured)" },
  // Наружная реклама
  { slug: "nарuzhnaya-reklama",name: "Наружная реклама",       usedIn: "produkciya, Главная (featured)" },
  { slug: "stend",             name: "Стенды / Roll-up",       usedIn: "produkciya" },
  { slug: "tablichka",         name: "Таблички",               usedIn: "produkciya" },
  // Мерч
  { slug: "mayka",             name: "Майки (мерч)",           usedIn: "produkciya, Главная (featured)" },
  { slug: "kepka",             name: "Бейсболки",              usedIn: "produkciya" },
  { slug: "sumka",             name: "Сумки / тотал-бэги",     usedIn: "produkciya, Главная (featured)" },
  { slug: "magnet",            name: "Магниты на холодильник", usedIn: "produkciya, Главная (featured)" },
  { slug: "shariki",           name: "Шарики",                 usedIn: "produkciya" },
  { slug: "kovrik-dlya-myshi", name: "Коврики для мыши",       usedIn: "produkciya" },
  { slug: "avto-aromatizator", name: "Автоароматизаторы",      usedIn: "produkciya" },
  { slug: "podstavka-napitki", name: "Подставки под напитки",  usedIn: "produkciya" },
  { slug: "posuda",            name: "Посуда с печатью",       usedIn: "produkciya" },
  { slug: "ruchka",            name: "Ручки с логотипом",      usedIn: "produkciya" },
  { slug: "bryelok",           name: "Брелоки",                usedIn: "produkciya" },
  // Транспорт
  { slug: "transport",         name: "Транспортная продукция", usedIn: "produkciya" },
  { slug: "flag",              name: "Флаги",                  usedIn: "produkciya, Главная (featured)" },
  // Цифровые
  { slug: "cd",                name: "CD-диски",               usedIn: "produkciya" },
];

// ─── Аудит ────────────────────────────────────────────────────────────────────

const missing = { media: [], catalog: [] };
const found   = { media: 0, catalog: 0 };

// Media slots
for (const slot of MEDIA_SLOTS) {
  const abs = join(PUBLIC, slot.path);
  if (existsSync(abs)) {
    found.media++;
  } else {
    missing.media.push(slot);
  }
}

// Catalog
for (const item of CATALOG_ITEMS) {
  const filePath = `/media/photo/catalog/${item.slug}.jpg`;
  const abs = join(PUBLIC, filePath);
  if (existsSync(abs)) {
    found.catalog++;
  } else {
    missing.catalog.push({ ...item, path: `catalog/${item.slug}.jpg` });
  }
}

// ─── Вывод ───────────────────────────────────────────────────────────────────
const totalMissing = missing.media.length + missing.catalog.length;
const totalSlots   = MEDIA_SLOTS.length + CATALOG_ITEMS.length;

console.log(`\n📊 АУДИТ ФОТОГРАФИЙ`);
console.log(`   Всего слотов: ${totalSlots}`);
console.log(`   Найдено:      ${found.media + found.catalog}`);
console.log(`   Отсутствует:  ${totalMissing}\n`);

// JSON для парсинга
const output = {
  missingMedia: missing.media,
  missingCatalog: missing.catalog,
};
console.log("---JSON_START---");
console.log(JSON.stringify(output, null, 2));
console.log("---JSON_END---");
