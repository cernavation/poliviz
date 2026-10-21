/**
 * distribute-photos.mjs
 * Сопоставляет фото из media-inbox/ со слотами media.config.ts по именам файлов
 * и раскидывает их по папкам public/media/photo/
 */

import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const INBOX = path.join(ROOT, "media-inbox");

// ─── Таблица сопоставления ─────────────────────────────────────────────────
// Ключ: массив слов/подстрок, которые ДОЛЖНЫ присутствовать в имени файла
//       (регистронезависимо, OR внутри группы — AND между группами)
// Значение: целевой путь относительно public/
//
// Слоты photo из media.config.ts:
//   /media/photo/services/offset.jpg
//   /media/photo/services/digital.jpg
//   /media/photo/services/silkscreen.jpg
//   /media/photo/services/wide-format.jpg
//   /media/photo/services/plotter.jpg
//   /media/photo/services/lamination.jpg
//   /media/photo/services/postpress.jpg
//   /media/photo/sections/knolling-all.jpg
//   /media/photo/sections/packaging.jpg
//   /media/photo/sections/merch.jpg
//   /media/photo/sections/outdoor.jpg
//   /media/photo/team/hands-operator.jpg
//   /media/photo/contacts/building.jpg

const RULES = [
  // ─── SERVICES ───────────────────────────────────────────────────────────
  {
    // Офсетная печать: offset_press, gloved_hand_lifts_printed_sheet, operator_loading
    match: [["offset"]],
    // Prefer the 2K version; among multiple matches the first wins
    dest: "media/photo/services/offset.jpg",
  },
  {
    // Цифровая печать: inkjet_printer_printing_banner
    match: [["inkjet", "printer"]],
    dest: "media/photo/services/digital.jpg",
  },
  {
    // Шелкография: hands_pulling_squeegee_on_screen
    match: [["squeegee"]],
    dest: "media/photo/services/silkscreen.jpg",
  },
  {
    // Широкоформатная: lightbox_and_banner_on_building, product_photograph_of_lightbox
    // Prefer the outdoor banner on a building
    match: [["banner", "building"]],
    dest: "media/photo/services/wide-format.jpg",
  },
  {
    // Плоттерная резка: cutting_plotter_with_magenta_vinyl
    match: [["cutting", "plotter"]],
    dest: "media/photo/services/plotter.jpg",
  },
  {
    // Ламинация: laminator_with_printed_cards
    match: [["laminator"]],
    dest: "media/photo/services/lamination.jpg",
  },
  {
    // Послепечатные работы: die-cutting_and_folding_workspace
    match: [["die-cutting", "folding"]],
    dest: "media/photo/services/postpress.jpg",
  },

  // ─── SECTIONS ────────────────────────────────────────────────────────────
  {
    // Knolling / ассортимент: welcome_kit_with_printed_products (всё разложено)
    // или business_supplies_flat_lay
    match: [["flat_lay"], ["flat-lay"]],
    dest: "media/photo/sections/knolling-all.jpg",
  },
  {
    // Упаковка: folded_boxes, folded_printed_box_with_lid
    match: [["folded_boxes"], ["folded_printed_box"]],
    dest: "media/photo/sections/packaging.jpg",
  },
  {
    // Мерч: folded_t-shirt, product_photograph_of_tote_bag
    match: [["tote_bag"], ["tote-bag"]],
    dest: "media/photo/sections/merch.jpg",
  },
  {
    // Наружная реклама: lightbox_and_banner_on_building
    match: [["lightbox", "banner"]],
    dest: "media/photo/sections/outdoor.jpg",
  },

  // ─── TEAM ────────────────────────────────────────────────────────────────
  {
    // Руки оператора: gloved_hand_lifts_printed_sheet
    match: [["gloved", "hand"]],
    dest: "media/photo/team/hands-operator.jpg",
  },
];

// ─── Вспомогательная функция сопоставления ────────────────────────────────

/**
 * Проверяет, соответствует ли имя файла правилу.
 * Правило `match` — массив OR-групп, каждая группа — массив AND-слов.
 * Файл подходит, если хотя бы одна OR-группа полностью совпала.
 */
function matches(filename, rule) {
  const name = filename.toLowerCase();
  return rule.match.some((andGroup) =>
    andGroup.every((word) => name.includes(word.toLowerCase()))
  );
}

// ─── Главная логика ───────────────────────────────────────────────────────

async function main() {
  const files = await fs.readdir(INBOX);
  const jpgFiles = files.filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));

  console.log(`\n📁 Найдено ${jpgFiles.length} файлов в media-inbox/\n`);

  const results = {
    copied: [],
    skipped: [],
  };

  // Для каждого правила — находим первый подходящий файл
  for (const rule of RULES) {
    const destAbs = path.join(ROOT, "public", rule.dest);
    const destDir = path.dirname(destAbs);

    // Найти первый подходящий файл
    // Предпочитаем 2K-версии (они содержат "_2K_" в имени)
    const candidates = jpgFiles.filter((f) => matches(f, rule));
    
    // Сортируем: сначала 2K, потом остальные
    candidates.sort((a, b) => {
      const a2k = a.includes("_2K_") ? 0 : 1;
      const b2k = b.includes("_2K_") ? 0 : 1;
      return a2k - b2k;
    });

    if (candidates.length === 0) {
      console.log(`⚠️  Нет кандидатов для → ${rule.dest}`);
      results.skipped.push(rule.dest);
      continue;
    }

    const chosen = candidates[0];
    const src = path.join(INBOX, chosen);

    await fs.mkdir(destDir, { recursive: true });
    await fs.copyFile(src, destAbs);

    console.log(`✅  ${chosen}`);
    console.log(`    → public/${rule.dest}\n`);
    results.copied.push({ from: chosen, to: rule.dest });
  }

  // ─── Репорт о файлах без слота ────────────────────────────────────────
  const usedFiles = new Set(results.copied.map((r) => r.from));
  const unused = jpgFiles.filter((f) => !usedFiles.has(f));

  if (unused.length > 0) {
    console.log("\n📋 Файлы без слота (проигнорированы):");
    unused.forEach((f) => console.log(`   · ${f}`));
  }

  console.log(
    `\n─────────────────────────────────────────────────────`
  );
  console.log(`✅ Скопировано: ${results.copied.length} файлов`);
  console.log(`⚠️  Не найдено слотов: ${results.skipped.length}`);
  console.log(`⏭️  Проигнорировано: ${unused.length} файлов`);
  console.log(`─────────────────────────────────────────────────────\n`);
}

main().catch((err) => {
  console.error("❌ Ошибка:", err);
  process.exit(1);
});
