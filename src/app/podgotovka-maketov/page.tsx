import type { Metadata } from "next";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { PrintMark } from "@/components/ui/PrintMark";
import { BleedDiagram } from "@/components/prepress/BleedDiagram";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "../../../content/routes";
import { SITE } from "../../../content/site.config";

export const metadata: Metadata = {
  title: "Подготовка макетов",
  description: "Требования к макетам для печати в Poliviz-Design: форматы CDR, AI, EPS, TIFF, PDF. Вылеты, CMYK, разрешение, шрифты в кривых.",
};

const CHECKLIST = [
  // Обязательные
  { label: "Форматы: CDR (до 14 вер.), AI/EPS (до CS5), TIFF, PDF", required: true },
  { label: "Вылеты 2 мм со всех сторон", required: true },
  { label: "Весь текст в кривых (для вектора)", required: true },
  { label: "Растр: 300 dpi, слои слиты, CMYK или Grayscale", required: true },
  { label: "Суммарная красочность: до 300% (мелованная), до 280% (немелованная)", required: true },
  { label: "Чёрный текст — одна краска K. Крупные чёрные области — C50 M40 Y40 K100", required: true },
  { label: "Элементы дизайна на 3–5 мм внутрь от линии реза", required: true },
  { label: "Файл назван латиницей, без пробелов и кириллицы", required: true },
  // Желательные
  { label: "Особые цвета: Pantone + CMYK-эквивалент", required: false },
  { label: "Пометки мест резки, фальцовки, биговки, перфорации", required: false },
  { label: "В Illustrator и Photoshop: одно изделие на файл", required: false },
  { label: "В CorelDRAW: многостраничный документ, одно изделие на страницу", required: false },
  { label: "Шрифты и изображения собраны в папках рядом с файлом", required: false },
  { label: "Приложить распечатку и JPEG-превью", required: false },
];

const FORMATS = [
  { name: "CDR", note: "CorelDRAW не выше 14 версии" },
  { name: "AI / EPS", note: "Adobe Illustrator не выше CS5" },
  { name: "TIFF", note: "Без слоёв, 300 dpi, CMYK" },
  { name: "PDF", note: "Со встроенными шрифтами, CMYK" },
  { name: "По договорённости", note: "Уточните с менеджером" },
];

export default function PrepressPage() {
  return (
    <>
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />

        <div className="max-w-content mx-auto">
          <SheetLabel sheet={1} total={4} tech="Макеты" className="mb-8 block" />
          <h1 className="text-display text-ink mb-6 max-w-3xl">
            Подготовка макетов.
          </h1>
          <p className="text-title text-muted max-w-2xl" style={{ fontWeight: 400 }}>
            Следуйте требованиям — и тираж выйдет без остановок на пересогласование.
          </p>
        </div>
      </section>

      <CMYKBar />

      <section className="bg-paper py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-content mx-auto">
          <div className="md:grid md:grid-cols-[1fr_1fr] md:gap-16 items-start">

            {/* Interactive bleed diagram */}
            <div>
              <SheetLabel sheet={2} total={4} tech="Схема" className="mb-6 block" />
              <h2 className="text-headline text-ink mb-8">Вылеты и безопасная зона</h2>
              <BleedDiagram />
            </div>

            {/* Checklist */}
            <div className="mt-12 md:mt-0">
              <SheetLabel sheet={3} total={4} tech="Чек-лист" className="mb-6 block" />
              <h2 className="text-headline text-ink mb-8">Что проверить перед отправкой</h2>

              <ul className="flex flex-col gap-3">
                {CHECKLIST.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 border-b border-mid pb-3">
                    <span
                      className={`flex-shrink-0 text-caption font-mono px-2 py-0.5 mt-0.5 ${
                        item.required
                          ? "bg-magenta text-paper"
                          : "border border-mid text-muted"
                      }`}
                    >
                      {item.required ? "✓" : "○"}
                    </span>
                    <span className="text-body text-ink">{item.label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-4 items-center">
                <span className="inline-flex items-center gap-2 text-caption text-muted">
                  <span className="bg-magenta text-paper px-2 py-0.5">✓</span> Обязательно
                </span>
                <span className="inline-flex items-center gap-2 text-caption text-muted">
                  <span className="border border-mid text-muted px-2 py-0.5">○</span> Желательно
                </span>
              </div>
            </div>
          </div>

          {/* File formats */}
          <div className="border-t border-mid pt-12 mt-16">
            <SheetLabel sheet={4} total={4} tech="Форматы" className="mb-6 block" />
            <h2 className="text-headline text-ink mb-8">Принимаемые форматы</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-mid">
              {FORMATS.map((fmt) => (
                <div key={fmt.name} className="bg-paper p-4">
                  <p className="text-title font-700 text-ink mb-1">{fmt.name}</p>
                  <p className="text-caption text-muted">{fmt.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upload CTA */}
          <div className="border-t border-mid pt-12 mt-12">
            <p className="text-headline text-ink font-700 mb-4">Готов макет?</p>
            <p className="text-body text-muted mb-8 max-w-prose">
              Загрузите файл через форму расчёта. Принимаем CDR, AI, EPS, TIFF, PDF.
              Максимальный размер файла — {SITE.maxUploadMb} МБ.
            </p>
            <Button as="a" href={ROUTES.order} variant="primary">
              Загрузить макет и рассчитать
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
