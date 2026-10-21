# TEMP_MEDIA_CREDITS.md — Временные медиафайлы

Все файлы из [Unsplash](https://unsplash.com/license) (Unsplash License).
**Коммерческое использование разрешено. Атрибуция необязательна, но приветствуется.**

> ⚠️ Эти файлы — временные заглушки. Замените их на собственные фотографии компании.
> Как заменить: положите файл с правильным именем в `public/media/` (финальный путь из media.config.ts) — временный автоматически перестанет использоваться.

Реестр временных файлов: `public/media/_temp/`

| Слот | Файл | Поисковый запрос | Лицензия | Источник / Автор |
|------|------|-----------------|----------|-----------------|
| photo-service-offset | `_temp/photo-service-offset.jpg` | offset printing press machine | Unsplash License | https://unsplash.com/photos/BEEyeib-am8 |
| photo-service-digital | `_temp/photo-service-digital.jpg` | digital production printer | Unsplash License | https://unsplash.com/photos/oMpAz-DN-9I |
| photo-service-silkscreen | `_temp/photo-service-silkscreen.jpg` | screen printing squeegee fabric | Unsplash License | https://unsplash.com/photos/lw9LrnpUmAk |
| photo-service-wide-format | `_temp/photo-service-wide-format.jpg` | large format printer banner roll | Unsplash License | https://unsplash.com/photos/jPeO-YAyqLE |
| photo-service-plotter | `_temp/photo-service-plotter.jpg` | vinyl cutter plotter machine | Unsplash License | https://unsplash.com/photos/SgX8MVKTXU4 |
| photo-service-lamination | `_temp/photo-service-lamination.jpg` | laminating machine paper | Unsplash License | https://unsplash.com/photos/Zo3-bTG6Bdk |
| photo-service-postpress | `_temp/photo-service-postpress.jpg` | die cutting folding paper stack | Unsplash License | https://unsplash.com/photos/WkfDrhxDMC8 |
| photo-knolling | `_temp/photo-knolling.jpg` | stationery flat lay business cards | Unsplash License | https://unsplash.com/photos/FoKO4DpXamQ |
| photo-packaging | `_temp/photo-packaging.jpg` | packaging boxes kraft | Unsplash License | https://unsplash.com/photos/9GBKOthokpo |
| photo-merch | `_temp/photo-merch.jpg` | branded t-shirts merchandise | Unsplash License | https://unsplash.com/photos/v0_JWMBx8L4 |
| photo-outdoor | `_temp/photo-outdoor.jpg` | outdoor billboard advertising | Unsplash License | https://unsplash.com/photos/g1Kr4Ozfoac |
| photo-hands | `_temp/photo-hands.jpg` | hands printing press operator | Unsplash License | https://unsplash.com/photos/YMdjtWoJGnQ |
| brand-og | `_temp/brand-og.jpg` | printing press ink paper close up | Unsplash License | https://unsplash.com/photos/1p6NVBI0M7k |
| catalog-vizitki | `_temp/catalog-vizitki.jpg` | business cards stack design | Unsplash License | https://unsplash.com/photos/DI_sFkFERkY |
| catalog-buklet | `_temp/catalog-buklet.jpg` | brochure tri-fold design | Unsplash License | https://unsplash.com/photos/Oaqk7qqNh_c |
| catalog-upakovka | `_temp/catalog-upakovka.jpg` | product packaging boxes | Unsplash License | https://unsplash.com/photos/9GBKOthokpo |
| catalog-mayka | `_temp/catalog-mayka.jpg` | white t-shirt plain merch | Unsplash License | https://unsplash.com/photos/v0_JWMBx8L4 |
| catalog-nakleyka | `_temp/catalog-nakleyka.jpg` | sticker sheet printed | Unsplash License | https://unsplash.com/photos/TDnKTePGl_A |
| catalog-plakat | `_temp/catalog-plakat.jpg` | poster design printed wall | Unsplash License | https://unsplash.com/photos/c333d6YEhi0 |
| catalog-ezhedneynik | `_temp/catalog-ezhedneynik.jpg` | planner agenda notebook desk | Unsplash License | https://unsplash.com/photos/5bYxXawHOQg |
| catalog-sumka | `_temp/catalog-sumka.jpg` | tote canvas bag shopping | Unsplash License | https://unsplash.com/photos/oMpAz-DN-9I |
| catalog-flag | `_temp/catalog-flag.jpg` | flags banners outdoor event | Unsplash License | https://unsplash.com/photos/lNl1GwLivyk |
| catalog-magnet | `_temp/catalog-magnet.jpg` | fridge magnets colorful | Unsplash License | https://unsplash.com/photos/H3giJcTw__w |
| catalog-menu | `_temp/catalog-menu.jpg` | restaurant menu table dining | Unsplash License | https://unsplash.com/photos/08bOYnH_r_E |
| catalog-naruzhnaya-reklama | `_temp/catalog-naruzhnaya-reklama.jpg` | outdoor advertising billboard city | Unsplash License | https://unsplash.com/photos/g1Kr4Ozfoac |

---

## Как заменить временный файл финальным

1. Найдите слот в [`content/media.config.ts`](../content/media.config.ts) и скопируйте поле `path`
2. Положите файл по этому пути (относительно `/public/`): например `public/media/photo/services/offset.jpg`
3. Временный файл из `_temp/` автоматически перестанет использоваться — приоритет у финального
4. Запустите `npm run media:check` — слот изменится с `⚡ TEMP` на `✅ FINAL`
5. Перед запуском в production проверьте `npm run media:check --fail-on-temp`

---

## Дата скачивания

2026-10-19. Все файлы — Unsplash, ширина 800–1920px, качество 80.
