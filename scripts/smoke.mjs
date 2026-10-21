#!/usr/bin/env node
/**
 * smoke — npm run smoke
 * Requires a running server at BASE_URL (default: http://localhost:3010)
 *
 * For every route:
 *   1. Fetches HTML and checks status 200
 *   2. Extracts <link rel="stylesheet">, <script src>, <img src>, <source src>
 *   3. Checks each asset returns 200
 *   4. Verifies at least one CSS file exists and is > 5 KB
 *
 * Any failure → exit 1
 */

import { execSync } from "child_process";

const BASE = process.env.BASE_URL ?? "http://localhost:3010";

const ROUTES = [
  "/",
  "/uslugi",
  "/uslugi/ofsetnaya-pechat",
  "/uslugi/cifrovaya-pechat",
  "/uslugi/shelkografiya",
  "/uslugi/shirokoformatnaya-pechat",
  "/uslugi/plotternaya-rezka",
  "/uslugi/laminaciya",
  "/uslugi/poslepechatnye-raboty",
  "/produkciya",
  "/podgotovka-maketov",
  "/klienty",
  "/vakansii",
  "/kontakty",
  "/raschet",
  "/raschet/spasibo",
  "/konfidencialnost",
];

function curl(url, opts = "") {
  try {
    return execSync(
      `curl -s --max-time 10 ${opts} "${url}"`,
      { encoding: "utf8", timeout: 15000, maxBuffer: 4 * 1024 * 1024 }
    );
  } catch {
    return "";
  }
}

function curlStatus(url) {
  try {
    return parseInt(
      execSync(`curl -s -o /dev/null -w "%{http_code}" --max-time 10 "${url}"`,
        { encoding: "utf8", timeout: 12000 }).trim(), 10
    );
  } catch { return 0; }
}

function curlSize(url) {
  try {
    const body = execSync(
      `curl -s --max-time 10 "${url}"`,
      { encoding: "utf8", timeout: 12000, maxBuffer: 4 * 1024 * 1024 }
    );
    return body.length;
  } catch { return 0; }
}

function extractAssets(html) {
  const assets = new Set();
  // CSS
  for (const m of html.matchAll(/href="([^"]*\.css[^"]*)"/g)) {
    const u = m[1];
    if (u.startsWith("/") || u.startsWith("http")) assets.add(u.startsWith("/") ? BASE + u : u);
  }
  // Scripts
  for (const m of html.matchAll(/src="([^"]*\.js[^"]*)"/g)) {
    const u = m[1];
    if (u.startsWith("/")) assets.add(BASE + u);
  }
  // Images
  for (const m of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    const u = m[1];
    if (u.startsWith("/") && !u.startsWith("/_next/static/media")) assets.add(BASE + u);
  }
  // Sources (video/picture)
  for (const m of html.matchAll(/<source[^>]+src="([^"]+)"/g)) {
    const u = m[1];
    if (u.startsWith("/")) assets.add(BASE + u);
  }
  return [...assets];
}

let failures = 0;
let cssFound = false;
let cssMinSize = 0;

console.log(`\n🔥  smoke — Poliviz-Design SRL`);
console.log(`    Base: ${BASE}\n`);

for (const route of ROUTES) {
  const url = BASE + route;
  const status = curlStatus(url);
  const ok200 = status === 200;

  if (!ok200) {
    console.log(`❌ ${route}  [${status}]`);
    failures++;
    continue;
  }

  const html = curl(url);
  const assets = extractAssets(html);

  const assetFailures = [];
  for (const asset of assets) {
    const aStatus = curlStatus(asset);
    if (aStatus < 200 || aStatus >= 400) {
      assetFailures.push(`  ❌ asset [${aStatus}] ${asset.replace(BASE, "")}`);
      failures++;
    }
    // Check CSS size
    if (asset.includes(".css")) {
      const size = curlSize(asset);
      if (size > 5120) {
        cssFound = true;
        cssMinSize = Math.max(cssMinSize, size);
      } else {
        assetFailures.push(`  ❌ CSS too small (${size}B < 5KB): ${asset.replace(BASE, "")}`);
        failures++;
      }
    }
  }

  if (assetFailures.length === 0) {
    console.log(`✅ ${route}  [${assets.length} assets]`);
  } else {
    console.log(`⚠️  ${route}  [${status}]`);
    assetFailures.forEach((f) => console.log(f));
  }
}

console.log();
if (!cssFound) {
  console.log("❌ No CSS file > 5KB found!");
  failures++;
} else {
  console.log(`✅ CSS found, largest: ${(cssMinSize / 1024).toFixed(1)} KB`);
}

console.log();
if (failures === 0) {
  console.log(`✅ Smoke test passed — ${ROUTES.length} routes, all assets OK\n`);
} else {
  console.log(`❌ Smoke test FAILED — ${failures} issue(s)\n`);
  process.exit(1);
}
