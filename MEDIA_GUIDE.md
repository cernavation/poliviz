# MEDIA_GUIDE.md — Poliviz-Design SRL

> Единственный источник правды о медиафайлах сайта.
> Статус каждого слота: `npm run media:check`

---

## Система приоритетов (MediaSlot)

Каждое изображение работает по цепочке:
```
1. Финальный файл →  /media/photo/…/{filename}.jpg   ← положите финальное фото
2. Временный файл →  /media/_temp/{slotId}.jpg        ← Unsplash-заглушка (скачана)
3. Print-mark     →  заглушка с крестами регистрации
```

**Как заменить временный файл финальным:**
1. Найдите нужный слот в таблице ниже → скопируйте «Финальный путь»
2. Положите файл в `public/media/` по указанному пути
3. Временный файл из `_temp/` игнорируется автоматически
4. Проверьте: `npm run media:check` → статус меняется с `⚡ TEMP` на `✅ FINAL`
5. Перед деплоем: `npm run media:check -- --fail-on-temp`

Реестр временных файлов: [`docs/TEMP_MEDIA_CREDITS.md`](docs/TEMP_MEDIA_CREDITS.md)

---

## Статус слотов

| Символ | Значение |
|--------|---------|
| ✅ FINAL | Финальный файл подключён |
| ⚡ TEMP | Временная заглушка Unsplash (бейдж «TEMP» в dev-режиме) |
| ❌ MISS | Обязательный файл отсутствует — нужен для запуска |
| ⚠️ miss | Необязательный отсутствует — показывается print-mark заглушка |

---

## Структура папок

```
public/media/
├── video/
│   ├── 00-hero.mp4       + 00-hero-m.mp4   + 00-hero.jpg    (постер)
│   ├── 01-offset.mp4     + 01-offset-m.mp4 + 01-offset.jpg
│   ├── 02-digital.mp4    + 02-digital-m.mp4 + 02-digital.jpg
│   ├── 03-silkscreen.mp4 + 03-silkscreen-m.mp4 + 03-silkscreen.jpg
│   ├── 04-wide.mp4       + 04-wide-m.mp4   + 04-wide.jpg
│   ├── 05-plotter.mp4    + 05-plotter-m.mp4 + 05-plotter.jpg
│   ├── 06-lamination.mp4 + 06-lamination-m.mp4 + 06-lamination.jpg
│   ├── 07-postpress.mp4  + 07-postpress-m.mp4 + 07-postpress.jpg
│   ├── 08-finale.mp4     (необязательно)
│   └── 09-preflight.mp4  (необязательно, страница макетов)
├── photo/
│   ├── services/
│   │   ├── offset.jpg
│   │   ├── digital.jpg
│   │   ├── silkscreen.jpg
│   │   ├── wide-format.jpg
│   │   ├── plotter.jpg
│   │   ├── lamination.jpg
│   │   └── postpress.jpg
│   ├── catalog/
│   │   └── {slug}.jpg    (4:5, по одному на позицию каталога — 38 файлов)
│   ├── sections/
│   │   ├── knolling-all.jpg
│   │   ├── packaging.jpg
│   │   ├── merch.jpg
│   │   ├── horeca.jpg
│   │   └── outdoor.jpg
│   ├── team/
│   │   └── hands-operator.jpg
│   └── contacts/
│       └── building.jpg
└── brand/
    ├── logo.svg
    ├── logo-mark.svg
    └── og-image.jpg
```

---

## Спецификации по каждому слоту

### Видео (скролл-история главной страницы)

| Слот | Путь | Соотношение | Разрешение | Длительность | Макс. вес | Обязателен |
|------|------|------------|----------|----------|----------|----------|
| 00-hero | `video/00-hero.mp4` | 16:9 | 1920×1080 | 8–10 с | 15 МБ | **ДА** |
| 01-offset | `video/01-offset.mp4` | 16:9 | 1920×1080 | 8–10 с | 15 МБ | **ДА** |
| 02-digital | `video/02-digital.mp4` | 16:9 | 1920×1080 | 8–10 с | 15 МБ | **ДА** |
| 03-silkscreen | `video/03-silkscreen.mp4` | 16:9 | 1920×1080 | 8–10 с | 15 МБ | **ДА** |
| 04-wide | `video/04-wide.mp4` | 16:9 | 1920×1080 | 8–10 с | 15 МБ | **ДА** |
| 05-plotter | `video/05-plotter.mp4` | 16:9 | 1920×1080 | 8–10 с | 15 МБ | **ДА** |
| 06-lamination | `video/06-lamination.mp4` | 16:9 | 1920×1080 | 8–10 с | 15 МБ | **ДА** |
| 07-postpress | `video/07-postpress.mp4` | 16:9 | 1920×1080 | 8–10 с | 15 МБ | **ДА** |
| 08-finale | `video/08-finale.mp4` | 16:9 | 1920×1080 | 8–10 с | 15 МБ | нет |
| 09-preflight | `video/09-preflight.mp4` | 16:9 | 1920×1080 | 8–10 с | 15 МБ | нет |

**Мобильные версии** (`-m.mp4`): 9:16, 1080×1920. Необязательны, но крайне желательны.
**Постеры** (`.jpg`): тот же slug без `-m`, первый кадр видео.

#### Alt-тексты (ru / ro)

| Слот | ru | ro |
|------|----|----|
| 00-hero | Типография Poliviz-Design — общий вид цеха | Tipografie Poliviz-Design — vedere generală atelier |
| 01-offset | Офсетная печать — процесс | Tipar offset — proces |
| 02-digital | Цифровая печать — процесс | Tipar digital — proces |
| 03-silkscreen | Шелкография — процесс | Serigrafie — proces |
| 04-wide | Широкоформатная печать — процесс | Tipar larg format — proces |
| 05-plotter | Плоттерная резка — процесс | Tăiere plotter — proces |
| 06-lamination | Ламинация — процесс | Laminare — proces |
| 07-postpress | Послепечатные работы — процесс | Lucrări post-tipar — proces |

---

### Фото услуг (`photo/services/`)

| Слот | Путь | Соотношение | Разрешение | Макс. вес | Обязателен |
|------|------|------------|----------|----------|----------|
| offset.jpg | `photo/services/offset.jpg` | 16:9 | 1920×1080 | 500 КБ | **ДА** |
| digital.jpg | `photo/services/digital.jpg` | 16:9 | 1920×1080 | 500 КБ | **ДА** |
| silkscreen.jpg | `photo/services/silkscreen.jpg` | 16:9 | 1920×1080 | 500 КБ | **ДА** |
| wide-format.jpg | `photo/services/wide-format.jpg` | 16:9 | 1920×1080 | 500 КБ | **ДА** |
| plotter.jpg | `photo/services/plotter.jpg` | 16:9 | 1920×1080 | 500 КБ | **ДА** |
| lamination.jpg | `photo/services/lamination.jpg` | 16:9 | 1920×1080 | 500 КБ | **ДА** |
| postpress.jpg | `photo/services/postpress.jpg` | 16:9 | 1920×1080 | 500 КБ | **ДА** |

---

### Фото каталога (`photo/catalog/`)

Формат: 4:5, минимум 600×750 px, JPEG, до 200 КБ. По одному файлу на позицию каталога.
Имена файлов совпадают со slug-ами из `catalog.config.ts`.

Примеры: `vizitki.jpg`, `buklet.jpg`, `upakovka.jpg`, `mayka.jpg`, …

---

### Бренд (`brand/`)

| Файл | Формат | Требования |
|------|--------|-----------|
| `logo.svg` | SVG | Обязателен. Должен корректно масштабироваться. Цвет magenta #D6307F. |
| `logo-mark.svg` | SVG | Необязателен. Иконка без надписи. |
| `og-image.jpg` | JPEG | 1200×630 px, до 300 КБ. Используется для OpenGraph. |

---

## Как кодировать видео для скролл-истории

Видео должно поддерживать произвольную перемотку (scrubbing) через `currentTime`.
Для этого **каждый кадр должен быть ключевым** (all-intra / keyframe-only).

### Десктоп 16:9, 1920×1080:
```bash
ffmpeg -i input.mp4 \
  -vf scale=1920:-2 \
  -g 1 \
  -an \
  -movflags +faststart \
  -crf 22 \
  output.mp4
```

### Мобильная версия 9:16, 1080×1920 (снимать вертикально или кропить):
```bash
ffmpeg -i input.mp4 \
  -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" \
  -g 1 \
  -an \
  -movflags +faststart \
  -crf 22 \
  output-m.mp4
```

**Ключевые параметры:**
- `-g 1` — ключевой кадр на каждом кадре (позволяет scrub без артефактов)
- `-an` — убрать аудиодорожку (видео беззвучное на сайте)
- `-movflags +faststart` — метаданные в начале файла (быстрый старт потока)
- `-crf 22` — качество (22–26 — хороший баланс качество/вес)

---

## Как называть файлы

- Только латиница и цифры, без пробелов: `offset.jpg`, `00-hero.mp4`
- Slug-и каталога совпадают с полем `slug` в `catalog.config.ts`
- Мобильные видео: тот же basename + `-m.mp4`
- Постеры: тот же basename + `.jpg`

---

## Как добавить новый слот

1. Добавьте объект в `content/media.config.ts` (поля: id, path, type, ratio, required, usedIn, alt)
2. Добавьте ту же запись в массив `MEDIA` в `scripts/media-check.mjs`
3. Поместите файл в соответствующую папку `public/media/`
4. Запустите `npm run media:check` для проверки
5. Используйте `<MediaSlot>` или `<MediaPlaceholder>` в компоненте с `slotId`
