# IMPLEMENTATION PLAN — Poliviz-Design SRL Website 2.0

## Art Direction

**Concept:** The page IS a print sheet. Registration crosses in corners, CMYK colour bars as dividers,
halftone dot patterns in backgrounds, bleed marks, monospaced technical captions. The site does not
simulate print — it is laid out the way a printer lays out a press sheet.

**Idea sentence:** On this page, the mechanics of offset prepress become the navigation and visual
language of the site — registration marks, colour bars, and sheet signatures guide the visitor the
way they guide an operator.

**Stack decision:** Next.js 15 (App Router) + TypeScript + Tailwind CSS v3 + GSAP + ScrollTrigger +
Lenis. next-intl for ru/ro i18n. No Three.js, no Framer Motion — removed from new build.

## Palette

| Role | Hex | Usage |
|------|-----|-------|
| Paper | `#F4F1EA` | Page ground, light sections |
| Ink | `#121212` | Body text, borders, dark sections bg |
| Magenta | `#D6307F` | Primary accent, CTAs, active states |
| Cyan | `#00A3E0` | CMYK scheme only, rare accent |
| Yellow | `#FFD400` | CMYK scheme only, rare accent |
| Warm Mid | `#D9D4C7` | Dividers, secondary surfaces |

## Typography

| Role | Family | Notes |
|------|--------|-------|
| Display / Body | Onest | cyrillic + latin-ext subsets |
| Technical captions | JetBrains Mono | cyrillic subset |

Sizes: display 80–120px, headline 40–60px, body 16–18px. Max 5 steps.

## Folder Tree

```
/
├── IMPLEMENTATION_PLAN.md        ← this file
├── MEDIA_GUIDE.md                ← media documentation
├── content/                      ← all copy, configs (single source of truth)
│   ├── site.config.ts            ← company facts, flags (SHOW_YEARS etc.)
│   ├── routes.ts                 ← all slugs, 301 redirects
│   ├── services.config.ts        ← 7 services data
│   ├── catalog.config.ts         ← 38 product categories
│   ├── clients.config.ts         ← client list
│   ├── cases.config.ts           ← 0 cases for now, hidden
│   └── media.config.ts           ← all media slots
├── public/
│   └── media/
│       ├── video/                ← 10 video chapters + mobile + posters
│       ├── photo/
│       │   ├── services/         ← 7 service hero photos
│       │   ├── catalog/          ← 38 catalog images
│       │   ├── sections/         ← 6 editorial section photos
│       │   ├── team/             ← hands-operator.jpg
│       │   └── contacts/         ← building.jpg
│       └── brand/                ← logo.svg, logo-mark.svg, og-image.jpg
├── src/
│   ├── app/
│   │   ├── layout.tsx            ← root layout, fonts, Lenis
│   │   ├── page.tsx              ← / (home with scroll story)
│   │   ├── uslugi/
│   │   │   ├── page.tsx          ← service hub + tech picker
│   │   │   └── [slug]/page.tsx   ← service page template
│   │   ├── produkciya/page.tsx   ← catalog with filters + panel
│   │   ├── podgotovka-maketov/page.tsx
│   │   ├── klienty/page.tsx
│   │   ├── vakansii/page.tsx
│   │   ├── kontakty/page.tsx
│   │   ├── raschet/
│   │   │   ├── page.tsx          ← order form
│   │   │   └── api/route.ts      ← form API handler
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx        ← nav with mobile fullscreen menu
│   │   │   └── Footer.tsx        ← contacts, sitemap, lang switch
│   │   ├── home/
│   │   │   ├── ScrollVideo.tsx   ← pinned scroll story
│   │   │   ├── VideoChapter.tsx  ← one chapter annotation
│   │   │   ├── StatsBar.tsx      ← "700+ clients" etc.
│   │   │   ├── CatalogGrid.tsx   ← 12-item preview grid
│   │   │   ├── ClientsTicker.tsx ← marquee of client names
│   │   │   └── ContactCTA.tsx    ← final CTA section
│   │   ├── services/
│   │   │   ├── TechPicker.tsx    ← interactive technology selector
│   │   │   └── ServiceRow.tsx    ← single service line in hub
│   │   ├── catalog/
│   │   │   ├── CatalogFilter.tsx
│   │   │   ├── CatalogCard.tsx
│   │   │   └── CatalogPanel.tsx  ← slide-out detail panel
│   │   ├── prepress/
│   │   │   ├── BleedDiagram.tsx  ← interactive SVG bleed/safe zone
│   │   │   └── ChecklistItem.tsx
│   │   ├── form/
│   │   │   ├── OrderForm.tsx     ← full order form
│   │   │   └── FileUpload.tsx    ← file upload with validation
│   │   └── ui/
│   │       ├── PrintMark.tsx     ← registration cross SVG
│   │       ├── CMYKBar.tsx       ← CMYK colour strip divider
│   │       ├── HalftoneOverlay.tsx ← dot pattern overlay
│   │       ├── MediaSlot.tsx     ← image/video with placeholder
│   │       ├── Button.tsx
│   │       └── SheetLabel.tsx    ← "ЛИСТ 03/08 · ОФСЕТ" caption
│   ├── lib/
│   │   ├── lenis.ts              ← Lenis singleton + provider
│   │   ├── gsap.ts               ← GSAP + ScrollTrigger registration
│   │   └── utils.ts              ← cn() and misc helpers
│   └── types/
│       └── index.ts
├── scripts/
│   └── media-check.mjs          ← npm run media:check
├── next.config.mjs               ← redirects, image domains
├── tailwind.config.ts
└── tsconfig.json
```

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/uslugi` | Services hub |
| `/uslugi/ofsetnaya-pechat` | Offset |
| `/uslugi/cifrovaya-pechat` | Digital |
| `/uslugi/shelkografiya` | Silkscreen |
| `/uslugi/shirokoformatnaya-pechat` | Wide-format |
| `/uslugi/plotternaya-rezka` | Plotter cut |
| `/uslugi/laminaciya` | Lamination |
| `/uslugi/poslepechatnye-raboty` | Post-print |
| `/produkciya` | Catalog |
| `/podgotovka-maketov` | Prepress guide |
| `/klienty` | Clients |
| `/vakansii` | Vacancies |
| `/kontakty` | Contacts |
| `/raschet` | Order form |

## Build Phases

### Phase 1 — Foundation
- Install new dependencies (Lenis, next-intl, @gsap/react, sharp)
- Remove old deps (three, framer-motion, canvas-confetti, lucide-react, @react-three/*)
- Create content/ config files
- Create tailwind.config.ts with tokens
- Create globals.css with font loading + CSS custom properties
- Create root layout.tsx
- Create UI primitives (Button, PrintMark, CMYKBar, MediaSlot, SheetLabel)
- Create Header + Footer
- `git commit` → `npm run build`

### Phase 2 — Home page
- ScrollVideo component (scroll-driven, with placeholder fallback)
- All home sections
- `git commit` → `npm run build`

### Phase 3 — Service pages
- Service hub + TechPicker
- Service page template + all 7 routes
- `git commit` → `npm run build`

### Phase 4 — Catalog + Prepress
- Catalog with filters and slide-out panel
- Prepress page with interactive SVG diagram
- `git commit` → `npm run build`

### Phase 5 — Remaining pages + forms
- Clients, Vacancies, Contacts, Order form + API route
- `git commit` → `npm run build`

### Phase 6 — SEO + Media system
- sitemap.ts, robots.ts, JSON-LD, hreflang
- media.config.ts, MEDIA_GUIDE.md, media:check script
- 301 redirects in next.config.mjs
- `git commit` → `npm run build`

### Phase 7 — Motion layer
- Lenis smooth scroll
- GSAP ScrollTrigger entrance animations per section
- Section scroll reveals (heading → text → image, 60–90ms stagger)
- Client ticker marquee animation
- prefers-reduced-motion fallbacks
- `git commit` → `npm run build`

---

## Process Rules (добавлено Фаза 9)

### Правило 1 — Dev и Build нельзя совмещать
> **НИКОГДА не запускать `npm run build` при работающем `npm run dev`.**
> Next.js пишет в одну папку `.next/` — совместный запуск кorrumpирует кеш и CSS перестаёт компилироваться.
>
> Правильный порядок для проверки сборки:
> ```
> 1. Останови dev  →  kill $(lsof -ti:PORT)
> 2. npm run build
> 3. rm -rf .next   (после проверки build, перед новым dev)
> 4. npm run dev -- -p PORT
> ```

### Правило 2 — @import в CSS первым
> `@import url(...)` должен быть **абсолютно первой строкой** `globals.css` — перед любыми
> комментариями и `@tailwind`-директивами. Браузер и PostCSS игнорируют `@import` после
> любого другого CSS-контента.

### Правило 3 — .mobile-menu всегда hidden by default
> Оверлей мобильного меню скрыт через `transform: translateX(100%)` в CSS.
> Без этого при отсутствии стилей меню видно постоянно → «дублирование шапки».
