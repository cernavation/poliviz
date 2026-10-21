# LINK_MAP.md — Аудит всех ссылок и интерактивных элементов

Последнее обновление: 2026-10-18. Статус: ✅ OK | ❌ Мёртвая | 🚫 Запрещено | ⏸ Неактивно

---

## Шапка (Header)

| Где | Текст | Куда | Статус |
|-----|-------|------|--------|
| Header — логотип | Poliviz. | `/` | ✅ OK |
| Header — nav | Услуги | `/uslugi` | ✅ OK |
| Header — nav | Продукция | `/produkciya` | ✅ OK |
| Header — nav | Макеты | `/podgotovka-maketov` | ✅ OK |
| Header — nav | Клиенты | `/klienty` | ✅ OK |
| Header — nav | Контакты | `/kontakty` | ✅ OK |
| Header — CTA | Рассчитать заказ | `/raschet` | ✅ OK |
| Header mobile — логотип | Poliviz. | `/` | ✅ OK |
| Header mobile — nav | Услуги | `/uslugi` | ✅ OK |
| Header mobile — nav | Продукция | `/produkciya` | ✅ OK |
| Header mobile — nav | Макеты | `/podgotovka-maketov` | ✅ OK |
| Header mobile — nav | Клиенты | `/klienty` | ✅ OK |
| Header mobile — nav | Контакты | `/kontakty` | ✅ OK |
| Header mobile — CTA | Рассчитать заказ | `/raschet` | ✅ OK |
| Header mobile — телефон | +373 22 93 02 70 | `tel:+37322930270` | ✅ OK |

---

## Футер (Footer)

| Где | Текст | Куда | Статус |
|-----|-------|------|--------|
| Footer — Услуги | Офсетная печать | `/uslugi/ofsetnaya-pechat` | ✅ OK |
| Footer — Услуги | Цифровая печать | `/uslugi/cifrovaya-pechat` | ✅ OK |
| Footer — Услуги | Шелкография | `/uslugi/shelkografiya` | ✅ OK |
| Footer — Услуги | Широкоформатная печать | `/uslugi/shirokoformatnaya-pechat` | ✅ OK |
| Footer — Услуги | Плоттерная резка | `/uslugi/plotternaya-rezka` | ✅ OK |
| Footer — Услуги | Ламинация | `/uslugi/laminaciya` | ✅ OK |
| Footer — Услуги | Послепечатные работы | `/uslugi/poslepechatnye-raboty` | ✅ OK |
| Footer — Компания | Продукция | `/produkciya` | ✅ OK |
| Footer — Компания | Подготовка макетов | `/podgotovka-maketov` | ✅ OK |
| Footer — Компания | Клиенты | `/klienty` | ✅ OK |
| Footer — Компания | Вакансии | `/vakansii` | ✅ OK |
| Footer — Компания | Контакты | `/kontakty` | ✅ OK |
| Footer — Компания | Конфиденциальность | `/konfidencialnost` | ✅ OK |
| Footer — Контакты | +373 22 93 02 70 | `tel:+37322930270` | ✅ OK |
| Footer — Контакты | +373 67 13 59 99 | `tel:+37367135999` | ✅ OK |
| Footer — Контакты | info@poliviz.md | `mailto:info@poliviz.md` | ✅ OK |
| Footer — Язык | RU | (активная, без href) | ✅ OK |
| Footer — Язык | RO скоро | (неактивная, без href, title) | ⏸ Неактивно |
| Footer — bottom | Рассчитать заказ → | `/raschet` | ✅ OK |

---

## Главная страница (/)

| Где | Текст | Куда | Статус |
|-----|-------|------|--------|
| Hero | Рассчитать заказ | `/raschet` | ✅ OK |
| Hero | Загрузить макет | `/podgotovka-maketov` | ✅ OK |
| ScrollVideo — каждый раздел | Подробнее → | `/uslugi/{slug}` (×7) | ✅ OK |
| Каталог preview — карточки | (клик) | `/produkciya?filter={slug}` | ✅ OK |
| Каталог preview — ссылка | Весь каталог → | `/produkciya` | ✅ OK |
| Макеты — CTA | Требования к макетам | `/podgotovka-maketov` | ✅ OK |
| Контакты | +373 22 93 02 70 | `tel:...` | ✅ OK |
| Контакты | +373 67 13 59 99 | `tel:...` | ✅ OK |
| Контакты | info@poliviz.md | `mailto:...` | ✅ OK |
| Quick form | submit | `/raschet` (GET fallback) | ✅ OK |

---

## /uslugi — Хаб услуг

| Где | Текст | Куда | Статус |
|-----|-------|------|--------|
| Каждая строка (×7) | {название услуги} → | `/uslugi/{slug}` | ✅ OK |
| TechPicker результат | Рассчитать | `/raschet?service={tech}` | ✅ OK |
| TechPicker результат | Подробнее о технологии | `/uslugi/{slug}` | ✅ OK |
| TechPicker — шаги | ← Назад | (onClick, prev step) | ✅ OK |
| TechPicker — сброс | ← Начать заново | (onClick, reset) | ✅ OK |

---

## /uslugi/[slug] — Страница услуги (×7)

| Где | Текст | Куда | Статус |
|-----|-------|------|--------|
| Параметры | Рассчитать заказ | `/raschet?service={slug}` | ✅ OK |
| Похожие услуги | {название} | `/uslugi/{slug}` | ✅ OK |
| CTA strip | Рассчитать заказ | `/raschet?service={slug}` | ✅ OK |

---

## /produkciya — Каталог

| Где | Текст | Куда | Статус |
|-----|-------|------|--------|
| Фильтры категорий | (кнопки) | (onClick, фильтр без навигации) | ✅ OK |
| Фильтры технологий | (кнопки) | (onClick, фильтр без навигации) | ✅ OK |
| Карточка товара | (изображение) | (onClick, открыть панель) | ✅ OK |
| Карточка товара | Хочу такое | `/raschet?product={slug}&name={name}` | ✅ OK |
| Панель товара | ← Закрыть | (onClick, закрыть панель) | ✅ OK |
| Панель товара | Хочу такое — рассчитать | `/raschet?product={slug}&name={name}` | ✅ OK |

---

## /podgotovka-maketov — Подготовка макетов

| Где | Текст | Куда | Статус |
|-----|-------|------|--------|
| BleedDiagram | кнопки слоёв | (onClick, toggle SVG слоёв) | ✅ OK |
| CTA | Загрузить макет и рассчитать | `/raschet` | ✅ OK |

---

## /klienty — Клиенты

| Где | Текст | Куда | Статус |
|-----|-------|------|--------|
| CTA | Рассчитать заказ | `/raschet` | ✅ OK |

---

## /vakansii — Вакансии

| Где | Текст | Куда | Статус |
|-----|-------|------|--------|
| Форма | submit | `mailto:` (action) | ✅ OK |
| Форма | info@poliviz.md | `mailto:...` | ✅ OK |

---

## /kontakty — Контакты

| Где | Текст | Куда | Статус |
|-----|-------|------|--------|
| Телефон | +373 22 93 02 70 | `tel:...` | ✅ OK |
| Телефон | +373 67 13 59 99 | `tel:...` | ✅ OK |
| Email | info@poliviz.md | `mailto:...` | ✅ OK |
| Карта | Открыть в OpenStreetMap | `https://openstreetmap.org/...` | ✅ OK |

---

## /raschet — Расчёт заказа

| Где | Текст | Куда | Статус |
|-----|-------|------|--------|
| Форма | submit | `POST /raschet/api` → redirect `/raschet/spasibo` | ✅ OK |
| Форма — согласие | политикой конфиденциальности | `/konfidencialnost` | ✅ OK |
| Боковая панель | +373 22 93 02 70 | `tel:...` | ✅ OK |
| Боковая панель | +373 67 13 59 99 | `tel:...` | ✅ OK |
| Боковая панель | info@poliviz.md | `mailto:...` | ✅ OK |

---

## /raschet/spasibo — Заявка принята

| Где | Текст | Куда | Статус |
|-----|-------|------|--------|
| CTA | На главную | `/` | ✅ OK |
| CTA | Все услуги | `/uslugi` | ✅ OK |

---

## /konfidencialnost — Конфиденциальность

| Где | Текст | Куда | Статус |
|-----|-------|------|--------|
| Оператор | info@poliviz.md | `mailto:...` | ✅ OK |
| Права | info@poliviz.md | `mailto:...` | ✅ OK |

---

## /404 — Страница не найдена

| Где | Текст | Куда | Статус |
|-----|-------|------|--------|
| Навигационная сетка | Главная | `/` | ✅ OK |
| Навигационная сетка | Услуги | `/uslugi` | ✅ OK |
| Навигационная сетка | Продукция | `/produkciya` | ✅ OK |
| Навигационная сетка | Подготовка макетов | `/podgotovka-maketov` | ✅ OK |
| Навигационная сетка | Клиенты | `/klienty` | ✅ OK |
| Навигационная сетка | Контакты | `/kontakty` | ✅ OK |
| CTA | Рассчитать заказ | `/raschet` | ✅ OK |

---

## Итог

| | Количество |
|--|--|
| Всего ссылок проверено | **72** |
| ✅ Активные и корректные | **70** |
| ⏸ Намеренно неактивные (RO) | **1** |
| ❌ Мёртвые ссылки (href="#" или пустые) | **0** |
| ❌ Несуществующие маршруты | **0** |
