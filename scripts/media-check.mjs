#!/usr/bin/env node
/**
 * media:check — npm run media:check [--soft] [--fail-on-temp]
 *
 * Checks all media slots and reports:
 *   ✅ FINAL  — final file present at official path
 *   ⚡ TEMP   — temp file present at /media/_temp/{slotId}.jpg
 *   ❌ MISS   — required slot has neither final nor temp
 *   ⚠️  miss   — optional slot has neither (shows placeholder in dev)
 *
 * Flags:
 *   --soft         Always exit 0 (useful for CI warnings without blocking)
 *   --fail-on-temp Exit 1 if any temp files remain (run before launch)
 *
 * Usage:
 *   npm run media:check
 *   npm run media:check -- --soft
 *   npm run media:check -- --fail-on-temp
 */

import { existsSync, statSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = resolve(__dirname, "..");

const SOFT = process.argv.includes("--soft");
const FAIL_ON_TEMP = process.argv.includes("--fail-on-temp");

// ── Slot registry (mirrors content/media.config.ts) ──────────────────────────
const MEDIA = [
  // Videos (scroll story chapters)
  { id: "video-00-hero",        path: "/media/video/00-hero.mp4",           required: true,  ratio: "16:9" },
  { id: "video-00-hero-mobile", path: "/media/video/00-hero-m.mp4",         required: false, ratio: "9:16" },
  { id: "video-00-hero-poster", path: "/media/video/00-hero.jpg",           required: false, ratio: "16:9" },
  { id: "video-01-offset",      path: "/media/video/01-offset.mp4",         required: true,  ratio: "16:9" },
  { id: "video-01-offset-m",    path: "/media/video/01-offset-m.mp4",       required: false, ratio: "9:16" },
  { id: "video-01-offset-p",    path: "/media/video/01-offset.jpg",         required: false, ratio: "16:9" },
  { id: "video-02-digital",     path: "/media/video/02-digital.mp4",        required: true,  ratio: "16:9" },
  { id: "video-02-digital-m",   path: "/media/video/02-digital-m.mp4",      required: false, ratio: "9:16" },
  { id: "video-02-digital-p",   path: "/media/video/02-digital.jpg",        required: false, ratio: "16:9" },
  { id: "video-03-silk",        path: "/media/video/03-silkscreen.mp4",     required: true,  ratio: "16:9" },
  { id: "video-03-silk-m",      path: "/media/video/03-silkscreen-m.mp4",   required: false, ratio: "9:16" },
  { id: "video-03-silk-p",      path: "/media/video/03-silkscreen.jpg",     required: false, ratio: "16:9" },
  { id: "video-04-wide",        path: "/media/video/04-wide.mp4",           required: true,  ratio: "16:9" },
  { id: "video-04-wide-m",      path: "/media/video/04-wide-m.mp4",         required: false, ratio: "9:16" },
  { id: "video-04-wide-p",      path: "/media/video/04-wide.jpg",           required: false, ratio: "16:9" },
  { id: "video-05-plotter",     path: "/media/video/05-plotter.mp4",        required: true,  ratio: "16:9" },
  { id: "video-05-plotter-m",   path: "/media/video/05-plotter-m.mp4",      required: false, ratio: "9:16" },
  { id: "video-05-plotter-p",   path: "/media/video/05-plotter.jpg",        required: false, ratio: "16:9" },
  { id: "video-06-lam",         path: "/media/video/06-lamination.mp4",     required: true,  ratio: "16:9" },
  { id: "video-06-lam-m",       path: "/media/video/06-lamination-m.mp4",   required: false, ratio: "9:16" },
  { id: "video-06-lam-p",       path: "/media/video/06-lamination.jpg",     required: false, ratio: "16:9" },
  { id: "video-07-post",        path: "/media/video/07-postpress.mp4",      required: true,  ratio: "16:9" },
  { id: "video-07-post-m",      path: "/media/video/07-postpress-m.mp4",    required: false, ratio: "9:16" },
  { id: "video-07-post-p",      path: "/media/video/07-postpress.jpg",      required: false, ratio: "16:9" },
  { id: "video-08-finale",      path: "/media/video/08-finale.mp4",         required: false, ratio: "16:9" },
  { id: "video-09-preflight",   path: "/media/video/09-preflight.mp4",      required: false, ratio: "16:9" },
  // Service photos
  { id: "photo-service-offset",      path: "/media/photo/services/offset.jpg",      required: true,  ratio: "16:9" },
  { id: "photo-service-digital",     path: "/media/photo/services/digital.jpg",     required: true,  ratio: "16:9" },
  { id: "photo-service-silkscreen",  path: "/media/photo/services/silkscreen.jpg",  required: true,  ratio: "16:9" },
  { id: "photo-service-wide-format", path: "/media/photo/services/wide-format.jpg", required: true,  ratio: "16:9" },
  { id: "photo-service-plotter",     path: "/media/photo/services/plotter.jpg",     required: true,  ratio: "16:9" },
  { id: "photo-service-lamination",  path: "/media/photo/services/lamination.jpg",  required: true,  ratio: "16:9" },
  { id: "photo-service-postpress",   path: "/media/photo/services/postpress.jpg",   required: true,  ratio: "16:9" },
  // Brand
  { id: "brand-logo",  path: "/media/brand/logo.svg",       required: true,  ratio: "auto" },
  { id: "brand-og",    path: "/media/brand/og-image.jpg",   required: true,  ratio: "1200:630" },
  // Section photos
  { id: "photo-knolling",   path: "/media/photo/sections/knolling-all.jpg", required: false, ratio: "16:9" },
  { id: "photo-packaging",  path: "/media/photo/sections/packaging.jpg",    required: false, ratio: "16:9" },
  { id: "photo-merch",      path: "/media/photo/sections/merch.jpg",        required: false, ratio: "16:9" },
  { id: "photo-outdoor",    path: "/media/photo/sections/outdoor.jpg",      required: false, ratio: "16:9" },
  { id: "photo-horeca",     path: "/media/photo/sections/horeca.jpg",       required: false, ratio: "16:9" },
  // Team
  { id: "photo-hands",      path: "/media/photo/team/hands-operator.jpg",   required: false, ratio: "4:3" },
  // Contacts
  { id: "photo-building",   path: "/media/photo/contacts/building.jpg",     required: false, ratio: "16:9" },
  // Catalog featured (12 items for home page)
  { id: "catalog-vizitki",              path: "/media/photo/catalog/vizitki.jpg",              required: false, ratio: "4:5" },
  { id: "catalog-buklet",               path: "/media/photo/catalog/buklet.jpg",               required: false, ratio: "4:5" },
  { id: "catalog-upakovka",             path: "/media/photo/catalog/upakovka.jpg",             required: false, ratio: "4:5" },
  { id: "catalog-mayka",                path: "/media/photo/catalog/mayka.jpg",                required: false, ratio: "4:5" },
  { id: "catalog-nakleyka",             path: "/media/photo/catalog/nakleyka.jpg",             required: false, ratio: "4:5" },
  { id: "catalog-plakat",               path: "/media/photo/catalog/plakat.jpg",               required: false, ratio: "4:5" },
  { id: "catalog-ezhedneynik",          path: "/media/photo/catalog/ezhedneynik.jpg",          required: false, ratio: "4:5" },
  { id: "catalog-sumka",                path: "/media/photo/catalog/sumka.jpg",                required: false, ratio: "4:5" },
  { id: "catalog-flag",                 path: "/media/photo/catalog/flag.jpg",                 required: false, ratio: "4:5" },
  { id: "catalog-magnet",               path: "/media/photo/catalog/magnet.jpg",               required: false, ratio: "4:5" },
  { id: "catalog-menu",                 path: "/media/photo/catalog/menu.jpg",                 required: false, ratio: "4:5" },
  { id: "catalog-naruzhnaya-reklama",   path: "/media/photo/catalog/naruzhnaya-reklama.jpg",   required: false, ratio: "4:5" },
];

const COL_ID   = 30;
const COL_PATH = 46;
const COL_REQ  = 8;
const COL_SIZE = 10;

function pad(str, len) { return String(str).slice(0, len).padEnd(len); }
function fmtBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1048576) return `${(bytes/1024).toFixed(0)}KB`;
  return `${(bytes/1048576).toFixed(1)}MB`;
}

function getFileInfo(relPath) {
  const full = join(ROOT, "public", relPath);
  if (!existsSync(full)) return null;
  try { return { size: statSync(full).size }; } catch { return null; }
}

console.log("\n📋  media:check — Poliviz-Design SRL");
if (SOFT) console.log("     --soft: will always exit 0");
if (FAIL_ON_TEMP) console.log("     --fail-on-temp: exits 1 if any temp files remain");
console.log();

console.log(pad("ID", COL_ID) + pad("STATUS", 10) + pad("SIZE", COL_SIZE) + "PATH");
console.log("─".repeat(COL_ID + 10 + COL_SIZE + 50));

let cntFinal = 0, cntTemp = 0, cntMissReq = 0, cntMissOpt = 0;

for (const slot of MEDIA) {
  const finalInfo = getFileInfo(slot.path);
  const tempInfo  = slot.id ? getFileInfo(`/media/_temp/${slot.id}.jpg`) : null;

  let status, size, displayPath;

  if (finalInfo) {
    status = "✅ FINAL";
    size   = fmtBytes(finalInfo.size);
    displayPath = slot.path;
    cntFinal++;
  } else if (tempInfo) {
    status = "⚡ TEMP";
    size   = fmtBytes(tempInfo.size);
    displayPath = `/media/_temp/${slot.id}.jpg`;
    cntTemp++;
  } else {
    if (slot.required) {
      status = "❌ MISS";
      cntMissReq++;
    } else {
      status = "⚠️  miss";
      cntMissOpt++;
    }
    size = "—";
    displayPath = slot.path;
  }

  console.log(pad(slot.id, COL_ID) + pad(status, 10) + pad(size, COL_SIZE) + displayPath);
}

console.log("─".repeat(COL_ID + 10 + COL_SIZE + 50));
console.log(`\nTotal: ${MEDIA.length}  |  ✅ Final: ${cntFinal}  |  ⚡ Temp: ${cntTemp}  |  ❌ Missing required: ${cntMissReq}  |  ⚠️  Missing optional: ${cntMissOpt}\n`);

if (FAIL_ON_TEMP && cntTemp > 0) {
  console.log(`❌ --fail-on-temp: ${cntTemp} temp file(s) remain. Replace with final images before launch.\n`);
  if (!SOFT) process.exit(1);
}

if (cntMissReq > 0) {
  console.log(`❌ ${cntMissReq} required slot(s) missing. See MEDIA_GUIDE.md.\n`);
  if (!SOFT) process.exit(1);
}

if (cntTemp > 0) {
  console.log(`⚡ ${cntTemp} temp file(s) in use. Replace with production photos before launch.\n`);
}

if (cntFinal === MEDIA.length) {
  console.log("✅ All slots have final files. Ready for launch.\n");
}

process.exit(0);
