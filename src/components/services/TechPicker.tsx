"use client";
import { useState } from "react";
import Link from "next/link";
import { ROUTES } from "../../../content/routes";
import { Button } from "@/components/ui/Button";
import { PrintMark } from "@/components/ui/PrintMark";

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
  quantity: Quantity
): Recommendation {
  // Rules strictly from FACTS section
  if (material === "fabric") {
    return {
      tech: "Шелкография",
      reason: "Ткань, металл, акрил и оракал — материалы для шелкографии. Толстый слой краски, яркий оттиск.",
      href: ROUTES.serviceSilkscreen,
      additions: ["Ламинация недоступна для ткани"],
    };
  }
  if (material === "vinyl") {
    return {
      tech: "Плоттерная резка",
      reason: "Наклейки, вывески и рекламные плёнки режутся по векторному контуру.",
      href: ROUTES.servicePlotter,
      additions: ["Шелкография для нанесения цвета"],
    };
  }
  if (material === "banner") {
    return {
      tech: "Широкоформатная печать",
      reason: "Формат больше А3+, тираж до 500 шт, ширина плоттера до 1500 мм. Для баннеров, постеров и интерьерной печати.",
      href: ROUTES.serviceWide,
      additions: ["Плоттерная резка для фигурных элементов"],
    };
  }
  if (material === "packaging") {
    return {
      tech: "Офсетная печать",
      reason: "Упаковка — типичная задача для офсета. Точный цвет CMYK и Pantone, экономичная стоимость тиража.",
      href: ROUTES.serviceOffset,
      additions: ["Послепечатные работы: высечка, биговка, лакирование"],
    };
  }
  // material === "paper"
  if (size === "large") {
    return {
      tech: "Широкоформатная печать",
      reason: "Формат больше А3+: широкоформатный плоттер до 1500 мм шириной.",
      href: ROUTES.serviceWide,
      additions: ["Ламинация для защиты поверхности"],
    };
  }
  if (quantity === "small") {
    return {
      tech: "Цифровая печать",
      reason: "До 500 листов А3 в 4 краски, формат до 457×311 мм (А3+). Переменные данные, быстрый срок.",
      href: ROUTES.serviceDigital,
      additions: ["Ламинация", "Послепечатные работы"],
    };
  }
  return {
    tech: "Офсетная печать",
    reason: "Большой тираж на бумаге — офсет. Чем больше тираж, тем ниже цена единицы. Точный цвет CMYK + Pantone.",
    href: ROUTES.serviceOffset,
    additions: ["Ламинация для защиты", "Послепечатные работы: высечка, биговка и др."],
  };
}

export function TechPicker() {
  const [step, setStep] = useState<Step>("material");
  const [material, setMaterial] = useState<Material | null>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState<Quantity | null>(null);

  const rec =
    material && size && quantity
      ? getRecommendation(material, size, quantity)
      : null;

  function reset() {
    setStep("material");
    setMaterial(null);
    setSize(null);
    setQuantity(null);
  }

  const MATERIALS: { id: Material; label: string; note: string }[] = [
    { id: "paper", label: "Бумага / картон", note: "листовки, визитки, журналы, упаковка" },
    { id: "fabric", label: "Ткань, металл, акрил, оракал", note: "майки, бейсболки, сувениры" },
    { id: "vinyl", label: "Плёнка и наклейки", note: "наклейки, вывески, рекламный винил" },
    { id: "banner", label: "Плакат или баннер крупнее А3+", note: "интерьерная печать, широкий формат" },
    { id: "packaging", label: "Упаковка", note: "коробки, пакеты, этикетки" },
  ];

  const SIZES: { id: Size; label: string }[] = [
    { id: "small", label: "А4 и меньше" },
    { id: "a3plus", label: "А3 / А3+" },
    { id: "large", label: "Больше А3+" },
  ];

  const QUANTITIES: { id: Quantity; label: string; note: string }[] = [
    { id: "small", label: "До 500 шт.", note: "цифровая или широкоформатная" },
    { id: "medium", label: "500–2000 шт.", note: "офсет" },
    { id: "large", label: "2000+ шт.", note: "офсет, самая низкая цена единицы" },
  ];

  return (
    <div className="border border-mid relative">
      <PrintMark size={12} color="#7A7469" className="absolute top-2 left-2 opacity-30" />
      <PrintMark size={12} color="#7A7469" className="absolute top-2 right-2 opacity-30" />

      <div className="p-6 md:p-8">
        {step === "material" && (
          <div>
            <p className="sheet-label text-muted mb-6">Шаг 1 из 3 — Что печатаем?</p>
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
            <p className="sheet-label text-muted mb-6">Шаг 2 из 3 — Максимальный размер?</p>
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
              ← Назад
            </button>
          </div>
        )}

        {step === "quantity" && (
          <div>
            <p className="sheet-label text-muted mb-6">Шаг 3 из 3 — Тираж?</p>
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
              ← Назад
            </button>
          </div>
        )}

        {step === "result" && rec && (
          <div>
            <p className="sheet-label text-muted mb-4">Рекомендация</p>
            <p className="text-headline text-ink font-700 mb-3">{rec.tech}</p>
            <p className="text-body text-muted mb-6">{rec.reason}</p>

            {rec.additions && rec.additions.length > 0 && (
              <div className="mb-6">
                <p className="sheet-label text-muted mb-2">Также рекомендуем</p>
                <ul className="flex flex-col gap-1">
                  {rec.additions.map((add) => (
                    <li key={add} className="text-body text-ink">+ {add}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button as="a" href={`${ROUTES.order}?service=${encodeURIComponent(rec.tech)}`} variant="primary">
                Рассчитать
              </Button>
              <Button as="a" href={rec.href} variant="outline">
                Подробнее о технологии
              </Button>
            </div>

            <p className="text-caption text-muted mt-6">
              Это ориентир. Окончательно технологию подтвердит менеджер.
            </p>

            <button onClick={reset} className="mt-4 text-caption text-muted hover:text-ink transition-colors block">
              ← Начать заново
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
