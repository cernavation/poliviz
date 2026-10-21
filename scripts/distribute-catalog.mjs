/**
 * distribute-catalog.mjs
 * Раскидывает оставшиеся фото из media-inbox/ по слотам catalog.config.ts
 * Сопоставление — по ключевым словам в именах файлов.
 */

import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INBOX = path.join(ROOT, "media-inbox");
const DEST_DIR = path.join(ROOT, "public", "media", "photo", "catalog");

// ─── Таблица сопоставления slug → ключевые слова файла ────────────────────
// OR-группы: файл подходит, если хотя бы одна AND-группа полностью совпала.
const RULES = [
  // Бумажная продукция
  { slug: "vizitki",         match: [["business_card"], ["business-card"]] },
  { slug: "buklet",          match: [["tri-fold_leaflet"], ["tri-fold-leaflet"], ["buklet"]] },
  { slug: "brosyura",        match: [["security_paper_blanks"]] }, // брошюра/бланк — ближайшее
  { slug: "listovka",        match: [["listovka"]] }, // нет прямого файла
  { slug: "plakat",          match: [["plakat"]] }, // нет прямого файла
  { slug: "otkrytka",        match: [["otkrytka"]] },
  { slug: "priglasitelnoye", match: [["priglasitelnoye"]] },
  { slug: "konyert",         match: [["konyert"]] },
  { slug: "papka",           match: [["papka"]] },
  { slug: "blank",           match: [["security_paper"], ["security-paper"]] },
  { slug: "diplom",          match: [["improve_logo"], ["improve-logo"]] },
  { slug: "zhurnal",         match: [["zhurnal"]] },
  { slug: "kalendar",        match: [["kalendar"]] },
  { slug: "bloknot",         match: [["two_planners"], ["two-planners"]] },
  { slug: "menu",            match: [["menu_card"], ["restaurant_table"], ["menu-card"]] },
  { slug: "ezhedneynik",     match: [["two_planners"], ["planner"]] },
  { slug: "vobler",          match: [["vobler"]] },
  { slug: "diskontnaya-karta", match: [["diskontnaya"]] },

  // Упаковка
  { slug: "upakovka",        match: [["folded_printed_box_with_lid"], ["folded-printed-box-with-lid"]] },
  { slug: "paket",           match: [["welcome_kit"], ["welcome-kit"]] },
  { slug: "nakleyka",        match: [["die-cut_stickers"], ["sticker"]] },

  // Наружная реклама
  { slug: "nарuzhnaya-reklama", match: [["product_photograph_of_lightbox"], ["lightbox_f"]] },
  { slug: "stend",           match: [["stend"]] },
  { slug: "tablichka",       match: [["tablichka"]] },

  // Мерч
  { slug: "mayka",           match: [["folded_t-shirt"], ["t-shirt"]] },
  { slug: "kepka",           match: [["kepka"]] },
  { slug: "sumka",           match: [["product_photograph_on_light_wall"], ["sumka"]] },
  { slug: "magnet",          match: [["three_fridge_magnets"], ["fridge_magnet"]] },
  { slug: "shariki",         match: [["shariki"]] },
  { slug: "kovrik-dlya-myshi", match: [["kovrik"]] },
  { slug: "avto-aromatizator", match: [["avto"]] },
  { slug: "podstavka-napitki", match: [["podstavka"]] },
  { slug: "posuda",          match: [["posuda"]] },
  { slug: "ruchka",          match: [["ruchka"]] },
  { slug: "bryelok",         match: [["bryelok"]] },

  // Транспорт
  { slug: "transport",       match: [["designer_desk_with_print_items"], ["designer-desk"]] },
  { slug: "flag",            match: [["fabric_flag"], ["flag_on_a_pole"]] },

  // Цифровые
  { slug: "cd",              match: [["cd"]] },
];

// Уже скопированные услуговые фото (не брать их для каталога)
const ALREADY_USED = new Set([
  "Offset_press_printing_in_workshop_2K_20261019101200.jpg",
  "Inkjet_printer_printing_banner_2K_20261019104034.jpg",
  "Hands_pulling_squeegee_on_screen_2K_20261019103820.jpg",
  "Lightbox_and_banner_on_building_2K_20261019110600.jpg",
  "Cutting_plotter_with_magenta_vinyl_2K_20261019104218.jpg",
  "Laminator_with_printed_cards_2K_20261019104353.jpg",
  "Die-cutting_and_folding_workspace_2K_20261019104538.jpg",
  "Business_supplies_flat_lay_on_2K_20261019105003.jpg",
  "Folded_boxes_and_wine_bottle_2K_20261019105146.jpg",
  "Product_photograph_of_tote_bag_2K_20261019113036.jpg",
  "Gloved_hand_lifts_printed_sheet_2K_20261019103545.jpg",
]);

function matches(filename, rule) {
  const name = filename.toLowerCase();
  return rule.match.some((andGroup) =>
    andGroup.every((word) => name.includes(word.toLowerCase()))
  );
}

async function main() {
  await fs.mkdir(DEST_DIR, { recursive: true });

  const files = await fs.readdir(INBOX);
  const jpgFiles = files.filter(
    (f) => /\.(jpg|jpeg|png|webp)$/i.test(f) && !ALREADY_USED.has(f)
  );

  console.log(`\n📁 Доступно для каталога: ${jpgFiles.length} файлов\n`);

  const results = { copied: [], skipped: [], ignored: [] };
  const usedFiles = new Set();

  for (const rule of RULES) {
    const destFile = path.join(DEST_DIR, `${rule.slug}.jpg`);

    // Найти подходящий файл (предпочитаем 2K, не брать уже использованный)
    const candidates = jpgFiles.filter(
      (f) => matches(f, rule) && !usedFiles.has(f)
    );
    candidates.sort((a, b) => {
      const a2k = a.includes("_2K_") ? 0 : 1;
      const b2k = b.includes("_2K_") ? 0 : 1;
      return a2k - b2k;
    });

    if (candidates.length === 0) {
      console.log(`⚠️  Нет фото для slug="${rule.slug}" — пропускаем`);
      results.skipped.push(rule.slug);
      continue;
    }

    const chosen = candidates[0];
    usedFiles.add(chosen);
    const src = path.join(INBOX, chosen);
    await fs.copyFile(src, destFile);

    console.log(`✅  ${chosen}`);
    console.log(`    → public/media/photo/catalog/${rule.slug}.jpg\n`);
    results.copied.push({ from: chosen, to: rule.slug });
  }

  // Неиспользованные
  const unused = jpgFiles.filter((f) => !usedFiles.has(f));
  if (unused.length > 0) {
    console.log("📋 Файлы без слота в каталоге:");
    unused.forEach((f) => console.log(`   · ${f}`));
  }

  console.log(`\n─────────────────────────────────────────────────────`);
  console.log(`✅ Скопировано: ${results.copied.length} слотов`);
  console.log(`⚠️  Без кандидата: ${results.skipped.length} слотов`);
  console.log(`⏭️  Неиспользованных файлов: ${unused.length}`);
  console.log(`─────────────────────────────────────────────────────\n`);
}

main().catch((err) => {
  console.error("❌ Ошибка:", err);
  process.exit(1);
});
