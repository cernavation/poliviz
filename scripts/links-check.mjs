#!/usr/bin/env node
/**
 * links:check — npm run links:check
 * 1. Scans source files for href="#" or empty hrefs
 * 2. Checks all routes return 200
 * 3. Checks all legacy 301 redirects
 *
 * Exit 0 = all clear. Exit 1 = failures found.
 * Requires server running at BASE_URL (default: http://localhost:3000).
 */

import { readdirSync, readFileSync, statSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC  = join(ROOT, "src");
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

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
  "/sitemap.xml",
  "/robots.txt",
];

const REDIRECTS = [
  { from: "/index.php",                               to: "/" },
  { from: "/index.php/our-services/offset",           to: "/uslugi/ofsetnaya-pechat" },
  { from: "/index.php/our-services/digital",          to: "/uslugi/cifrovaya-pechat" },
  { from: "/index.php/our-services/silkscreen",       to: "/uslugi/shelkografiya" },
  { from: "/index.php/our-services/2019-06-26-08-48-18", to: "/uslugi/shirokoformatnaya-pechat" },
  { from: "/index.php/our-services/plotter",          to: "/uslugi/plotternaya-rezka" },
  { from: "/index.php/our-services/lamination",       to: "/uslugi/laminaciya" },
  { from: "/index.php/our-services/post-print",       to: "/uslugi/poslepechatnye-raboty" },
  { from: "/index.php/samples",                       to: "/produkciya" },
  { from: "/index.php/middlemen",                     to: "/podgotovka-maketov" },
  { from: "/index.php/vacancies",                     to: "/vakansii" },
  { from: "/index.php/our-clients",                   to: "/klienty" },
  { from: "/index.php/contacts",                      to: "/kontakty" },
];

function pad(s, l) { return String(s).slice(0, l).padEnd(l); }
function curlStatus(url, opts = "") {
  try {
    return parseInt(
      execSync(`curl -s -o /dev/null -w "%{http_code}" --max-time 8 ${opts} "${url}"`,
        { encoding: "utf8", timeout: 12000 }
      ).trim(), 10
    );
  } catch { return 0; }
}

// ── Scan source for dead hrefs ───────────────────────────────────────────────
function walkSrc(dir, results = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (!["node_modules", ".next", ".git"].includes(entry)) walkSrc(full, results);
    } else if (/\.(tsx|ts)$/.test(entry)) {
      readFileSync(full, "utf8").split("\n").forEach((line, i) => {
        if (/href="#"/.test(line) || /href=""/.test(line)) {
          results.push({ file: full.replace(ROOT + "/", ""), line: i + 1, text: line.trim().slice(0, 80) });
        }
      });
    }
  }
  return results;
}

let failures = 0;

console.log(`\n🔗  links:check — Poliviz-Design SRL`);
console.log(`    Base: ${BASE_URL}\n`);

// Step 1: Dead hrefs
console.log("── Step 1: Scanning source for href=\"#\" / empty hrefs…");
const deadHrefs = walkSrc(SRC);
if (deadHrefs.length === 0) {
  console.log("    ✅ No dead hrefs found.\n");
} else {
  deadHrefs.forEach(d => console.log(`    ❌ ${d.file}:${d.line}  ${d.text}`));
  failures += deadHrefs.length;
  console.log();
}

// Step 2: Routes → 200
console.log("── Step 2: Checking routes…");
console.log(pad("Route", 42) + pad("Status", 8) + "OK?");
console.log("─".repeat(56));
for (const route of ROUTES) {
  const status = curlStatus(`${BASE_URL}${route}`);
  const ok = status >= 200 && status < 400;
  console.log(`${pad(route, 42)}${pad(status, 8)}${ok ? "✅" : "❌"}`);
  if (!ok) failures++;
}
console.log();

// Step 3: Redirects → 301/308
console.log("── Step 3: Checking 301/308 redirects…");
console.log(pad("Old URL", 55) + pad("Status", 8) + "→");
console.log("─".repeat(80));
for (const r of REDIRECTS) {
  const status = curlStatus(`${BASE_URL}${r.from}`, "--max-redirs 0");
  // Accept both 301 (HTTP/1.0) and 308 (HTTP/1.1) — Next.js uses 308 in start mode
  const ok = status === 301 || status === 308;
  console.log(`${pad(r.from, 55)}${pad(status, 8)}${ok ? "✅" : "❌"} → ${r.to}`);
  if (!ok) failures++;
}
console.log();

// Summary
const total = deadHrefs.length + ROUTES.length + REDIRECTS.length;
console.log("─".repeat(56));
if (failures === 0) {
  console.log(`\n✅ All ${total} checks passed (${ROUTES.length} routes, ${REDIRECTS.length} redirects, 0 dead hrefs).\n`);
} else {
  console.log(`\n❌ ${failures}/${total} check(s) failed.\n`);
  process.exit(1);
}
