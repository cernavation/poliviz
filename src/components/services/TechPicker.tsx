"use client";
import { useState } from "react";
import { ROUTES } from "@/lib/routes";
import { Button } from "@/components/ui/Button";
import { PrintMark } from "@/components/ui/PrintMark";
import { useLang, type Lang } from "@/context/LanguageContext";

type Step = "material" | "size" | "quantity" | "result";
type Material = "paper" | "fabric" | "vinyl" | "banner" | "packaging";
type Size = "small" | "a3plus" | "large";
type Quantity = "small" | "medium" | "large";

interface Recommendation {
  tech: string;
  reason: string;
  href: string;
  additions?: string[];
}

function getRecommendation(
  material: Material,
  size: Size,
  quantity: Quantity,
  lang: Lang
): Recommendation {
  if (material === "fabric") {
    return {
      tech: lang === "ro" ? "Serigrafie" : lang === "en" ? "Silkscreen printing" : "Шелкография",
      reason: lang === "ro"
        ? "Pânză, metal, acril și oracal — materiale ideale pentru serigrafie. Strat gros de vopsea, imprimare saturată."
        : lang === "en"
        ? "Fabric, metal, acrylic and vinyl — optimal for silkscreen printing. Rich ink layer, vibrant output."
        : "Ткань, металл, акрил и оракал — материалы для шелкографии. Толстый слой краски, яркий оттиск.",
      href: ROUTES.serviceSilkscreen,
      additions: [
        lang === "ro" ? "Laminarea nu se aplică pe textile" : lang === "en" ? "Lamination is not applicable to textiles" : "Ламинация недоступна для ткани"
      ],
    };
  }
  if (material === "vinyl") {
    return {
      tech: lang === "ro" ? "Tăiere cu plotter" : lang === "en" ? "Plotter cutting" : "Плоттерная резка",
      reason: lang === "ro"
        ? "Autocolantele, panourile și foliile publicitare se decupează precis după contur vectorial."
        : lang === "en"
        ? "Stickers, signboards, and vinyl films are precision-cut along a vector contour."
        : "Наклейки, вывески и рекламные плёнки режутся по векторному контуру.",
      href: ROUTES.servicePlotter,
      additions: [
        lang === "ro" ? "Serigrafie pentru aplicarea culorii" : lang === "en" ? "Silkscreen printing for ink application" : "Шелкография для нанесения цвета"
      ],
    };
  }
  if (material === "banner") {
    return {
      tech: lang === "ro" ? "Tipar de format mare" : lang === "en" ? "Large format printing" : "Широкоформатная печать",
      reason: lang === "ro"
        ? "Format mai mare de A3+, lățime plotter până la 1500 mm. Ideal pentru bannere, postere și grafică interioară."
        : lang === "en"
        ? "Sizes over A3+, plotter width up to 1500 mm. For banners, posters, and indoor displays."
        : "Формат больше А3+, тираж до 500 шт, ширина плоттера до 1500 мм. Для баннеров, постеров и интерьерной печати.",
      href: ROUTES.serviceWide,
      additions: [
        lang === "ro" ? "Tăiere cu plotter pentru elemente decupate" : lang === "en" ? "Plotter cutting for shaped elements" : "Плоттерная резка для фигурных элементов"
      ],
    };
  }
  if (material === "packaging") {
    return {
      tech: lang === "ro" ? "Tipar offset" : lang === "en" ? "Offset printing" : "Офсетная печать",
      reason: lang === "ro"
        ? "Ambalajul este o sarcină tipică pentru offset. Culori precise CMYK și Pantone, cost avantajos la tiraje mari."
        : lang === "en"
        ? "Packaging is a premier offset task. Precise CMYK and Pantone colors, economical run costs."
        : "Упаковка — типичная задача для офсета. Точный цвет CMYK и Pantone, экономичная стоимость тиража.",
      href: ROUTES.serviceOffset,
      additions: [
        lang === "ro" ? "Lucrări post-tipar: ștanțare, biguire, lăcuire" : lang === "en" ? "Post-press finishing: die-cutting, creasing, varnishing" : "Послепечатные работы: высечка, биговка, лакирование"
      ],
    };
  }
  // material === "paper"
  if (size === "large") {
    return {
      tech: lang === "ro" ? "Tipar de format mare" : lang === "en" ? "Large format printing" : "Широкоформатная печать",
      reason: lang === "ro"
        ? "Formate mai mari de A3+: plotter de format mare până la 1500 mm lățime."
        : lang === "en"
        ? "Sizes beyond A3+: wide format roll printer up to 1500 mm width."
        : "Формат больше А3+: широкоформатный плоттер до 1500 мм шириной.",
      href: ROUTES.serviceWide,
      additions: [
        lang === "ro" ? "Laminare pentru protecția suprafeței" : lang === "en" ? "Lamination for surface protection" : "Ламинация для защиты поверхности"
      ],
    };
  }
  if (quantity === "small") {
    return {
      tech: lang === "ro" ? "Tipar digital" : lang === "en" ? "Digital printing" : "Цифровая печать",
      reason: lang === "ro"
        ? "Până la 500 de coli A3 în 4 culori, până la 457×311 mm (A3+). Date variabile și termen rapid."
        : lang === "en"
        ? "Up to 500 A3 sheets in 4 colors, up to 457×311 mm. Variable data and fast turnaround."
        : "До 500 листов А3 в 4 краски, формат до 457×311 мм (А3+). Переменные данные, быстрый срок.",
      href: ROUTES.serviceDigital,
      additions: [
        lang === "ro" ? "Laminare" : lang === "en" ? "Lamination" : "Ламинация",
        lang === "ro" ? "Lucrări post-tipar" : lang === "en" ? "Post-press finishing" : "Послепечатные работы"
      ],
    };
  }
  return {
    tech: lang === "ro" ? "Tipar offset" : lang === "en" ? "Offset printing" : "Офсетная печать",
    reason: lang === "ro"
      ? "Tiraj mare pe hârtie — offset. Cu cât tirajul e mai mare, cu atât prețul pe bucată este mai avantajos. CMYK + Pantone."
      : lang === "en"
      ? "High-volume paper runs — offset. The larger the volume, the lower the unit price. Accurate CMYK + Pantone."
      : "Большой тираж на бумаге — офсет. Чем больше тираж, тем ниже цена единицы. Точный цвет CMYK + Pantone.",
    href: ROUTES.serviceOffset,
    additions: [
      lang === "ro" ? "Laminare pentru protecție" : lang === "en" ? "Lamination for protection" : "Ламинация для защиты",
      lang === "ro" ? "Lucrări post-tipar: ștanțare, biguire etc." : lang === "en" ? "Post-press: die-cutting, creasing etc." : "Послепечатные работы: высечка, биговка и др."
    ],
  };
}

export function TechPicker() {
  const { lang, localize } = useLang();
  const [step, setStep] = useState<Step>("material");
  const [material, setMaterial] = useState<Material | null>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState<Quantity | null>(null);

  const rec =
    material && size && quantity
      ? getRecommendation(material, size, quantity, lang)
      : null;

  function reset() {
    setStep("material");
    setMaterial(null);
    setSize(null);
    setQuantity(null);
  }

  const step1Title = lang === "ro" ? "Pasul 1 din 3 — Ce tipărim?" : lang === "en" ? "Step 1 of 3 — What are we printing?" : "Шаг 1 из 3 — Что печатаем?";
  const step2Title = lang === "ro" ? "Pasul 2 din 3 — Dimensiunea maximă?" : lang === "en" ? "Step 2 of 3 — Maximum size?" : "Шаг 2 из 3 — Максимальный размер?";
  const step3Title = lang === "ro" ? "Pasul 3 din 3 — Tirajul?" : lang === "en" ? "Step 3 of 3 — Quantity?" : "Шаг 3 из 3 — Тираж?";

  const backBtn = lang === "ro" ? "← Înapoi" : lang === "en" ? "← Back" : "← Назад";
  const resetBtn = lang === "ro" ? "← Reîncepe" : lang === "en" ? "← Start over" : "← Начать заново";
  const recLabel = lang === "ro" ? "Recomandare" : lang === "en" ? "Recommendation" : "Рекомендация";
  const addLabel = lang === "ro" ? "De asemenea recomandăm" : lang === "en" ? "Also recommended" : "Также рекомендуем";
  const quoteBtn = lang === "ro" ? "Calculează" : lang === "en" ? "Get a quote" : "Рассчитать";
  const moreBtn = lang === "ro" ? "Detalii despre tehnologie" : lang === "en" ? "More on technology" : "Подробнее о технологии";
  const discl = lang === "ro" ? "Este o orientare. Managerul va confirma tehnologia finală." : lang === "en" ? "This is a guidance. A manager will confirm the exact technology." : "Это ориентир. Окончательно технологию подтвердит менеджер.";

  const MATERIALS: { id: Material; label: string; note: string }[] = [
    {
      id: "paper",
      label: lang === "ro" ? "Hârtie / carton" : lang === "en" ? "Paper / cardboard" : "Бумага / картон",
      note: lang === "ro" ? "pliante, cărți de vizită, reviste, ambalaje" : lang === "en" ? "flyers, business cards, catalogs, boxes" : "листовки, визитки, журналы, упаковка",
    },
    {
      id: "fabric",
      label: lang === "ro" ? "Pânză, metal, acril, autocolant" : lang === "en" ? "Fabric, metal, acrylic, vinyl" : "Ткань, металл, акрил, оракал",
      note: lang === "ro" ? "tricouri, șepci, suvenire promoționale" : lang === "en" ? "t-shirts, caps, promotional merch" : "майки, бейсболки, сувениры",
    },
    {
      id: "vinyl",
      label: lang === "ro" ? "Pelicole și autocolante" : lang === "en" ? "Vinyl films & stickers" : "Плёнка и наклейки",
      note: lang === "ro" ? "stickere, reclame, inscripționări vitrine" : lang === "en" ? "stickers, shop signage, decals" : "наклейки, вывески, рекламный винил",
    },
    {
      id: "banner",
      label: lang === "ro" ? "Poster sau banner mai mare de A3+" : lang === "en" ? "Poster or banner larger than A3+" : "Плакат или баннер крупнее А3+",
      note: lang === "ro" ? "tipar interior, format mare" : lang === "en" ? "indoor graphics, large displays" : "интерьерная печать, широкий формат",
    },
    {
      id: "packaging",
      label: lang === "ro" ? "Ambalaje" : lang === "en" ? "Packaging" : "Упаковка",
      note: lang === "ro" ? "cutii, pungi, etichete de produs" : lang === "en" ? "boxes, custom bags, labels" : "коробки, пакеты, этикетки",
    },
  ];

  const SIZES: { id: Size; label: string }[] = [
    { id: "small", label: lang === "ro" ? "A4 și mai mic" : lang === "en" ? "A4 and smaller" : "А4 и меньше" },
    { id: "a3plus", label: "A3 / A3+" },
    { id: "large", label: lang === "ro" ? "Mai mare de A3+" : lang === "en" ? "Larger than A3+" : "Больше А3+" },
  ];

  const QUANTITIES: { id: Quantity; label: string; note: string }[] = [
    {
      id: "small",
      label: lang === "ro" ? "Până la 500 buc." : lang === "en" ? "Up to 500 pcs." : "До 500 шт.",
      note: lang === "ro" ? "digital sau format mare" : lang === "en" ? "digital or wide format" : "цифровая или широкоформатная",
    },
    {
      id: "medium",
      label: "500–2000 buc.",
      note: lang === "ro" ? "offset" : lang === "en" ? "offset" : "офсет",
    },
    {
      id: "large",
      label: "2000+ buc.",
      note: lang === "ro" ? "offset, cel mai mic preț per bucată" : lang === "en" ? "offset, lowest unit cost" : "офсет, самая низкая цена единицы",
    },
  ];

  return (
    <div className="border border-mid relative">
      <PrintMark size={12} color="#7A7469" className="absolute top-2 left-2 opacity-30" />
      <PrintMark size={12} color="#7A7469" className="absolute top-2 right-2 opacity-30" />

      <div className="p-6 md:p-8">
        {step === "material" && (
          <div>
            <p className="sheet-label text-muted mb-6">{step1Title}</p>
            <div className="flex flex-col gap-2">
              {MATERIALS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setMaterial(m.id);
                    if (m.id === "fabric" || m.id === "vinyl" || m.id === "banner" || m.id === "packaging") {
                      setSize("a3plus");
                      setQuantity("small");
                      setStep("result");
                    } else {
                      setStep("size");
                    }
                  }}
                  className="text-left border border-mid px-4 py-3 hover:bg-ink hover:text-paper hover:border-ink transition-colors"
                >
                  <span className="text-body font-500">{m.label}</span>
                  <span className="text-caption text-muted ml-2">{m.note}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "size" && (
          <div>
            <p className="sheet-label text-muted mb-6">{step2Title}</p>
            <div className="flex flex-col gap-2">
              {SIZES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSize(s.id);
                    if (s.id === "large") {
                      setQuantity("small");
                      setStep("result");
                    } else {
                      setStep("quantity");
                    }
                  }}
                  className="text-left border border-mid px-4 py-3 hover:bg-ink hover:text-paper hover:border-ink transition-colors text-body"
                >
                  {s.label}
                </button>
              ))}
            </div>
            <button onClick={() => setStep("material")} className="mt-4 text-caption text-muted hover:text-ink transition-colors">
              {backBtn}
            </button>
          </div>
        )}

        {step === "quantity" && (
          <div>
            <p className="sheet-label text-muted mb-6">{step3Title}</p>
            <div className="flex flex-col gap-2">
              {QUANTITIES.map((q) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setQuantity(q.id);
                    setStep("result");
                  }}
                  className="text-left border border-mid px-4 py-3 hover:bg-ink hover:text-paper hover:border-ink transition-colors"
                >
                  <span className="text-body font-500">{q.label}</span>
                  <span className="text-caption text-muted ml-2">{q.note}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep("size")} className="mt-4 text-caption text-muted hover:text-ink transition-colors">
              {backBtn}
            </button>
          </div>
        )}

        {step === "result" && rec && (
          <div>
            <p className="sheet-label text-muted mb-4">{recLabel}</p>
            <p className="text-headline text-ink font-700 mb-3">{rec.tech}</p>
            <p className="text-body text-muted mb-6">{rec.reason}</p>

            {rec.additions && rec.additions.length > 0 && (
              <div className="mb-6">
                <p className="sheet-label text-muted mb-2">{addLabel}</p>
                <ul className="flex flex-col gap-1">
                  {rec.additions.map((add) => (
                    <li key={add} className="text-body text-ink">+ {add}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button as="a" href={localize(`${ROUTES.order}?service=${encodeURIComponent(rec.tech)}`)} variant="primary">
                {quoteBtn}
              </Button>
              <Button as="a" href={localize(rec.href)} variant="outline">
                {moreBtn}
              </Button>
            </div>

            <p className="text-caption text-muted mt-6">
              {discl}
            </p>

            <button onClick={reset} className="mt-4 text-caption text-muted hover:text-ink transition-colors block">
              {resetBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
