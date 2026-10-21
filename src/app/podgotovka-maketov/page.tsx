"use client";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { PrintMark } from "@/components/ui/PrintMark";
import { BleedDiagram } from "@/components/prepress/BleedDiagram";
import { Button } from "@/components/ui/Button";
import { Win95Window } from "@/components/ui/Win95Window";
import { ROUTES } from "../../../content/routes";
import { SITE } from "../../../content/site.config";
import { useLang } from "@/context/LanguageContext";

const CHECKLIST = [
  { label: "Форматы: CDR (до 14 вер.), AI/EPS (до CS5), TIFF, PDF", required: true },
  { label: "Вылеты 2 мм со всех сторон", required: true },
  { label: "Весь текст в кривых (для вектора)", required: true },
  { label: "Растр: 300 dpi, слои слиты, CMYK или Grayscale", required: true },
  { label: "Суммарная красочность: до 300% (мелованная), до 280% (немелованная)", required: true },
  { label: "Чёрный текст — одна краска K. Крупные чёрные области — C50 M40 Y40 K100", required: true },
  { label: "Элементы дизайна на 3–5 мм внутрь от линии реза", required: true },
  { label: "Файл назван латиницей, без пробелов и кириллицы", required: true },
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
  const { t } = useLang();
  return (
    <>
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />
        <div className="max-w-content mx-auto">
          <SheetLabel sheet={1} total={4} tech="Макеты" className="mb-8 block" />
          <h1 className="text-display text-ink mb-6 max-w-3xl">{t.prepress_page.hero_h1}</h1>
          <p className="text-title text-muted max-w-2xl" style={{ fontWeight: 400 }}>{t.prepress_page.hero_sub}</p>
        </div>
      </section>
      <CMYKBar />
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-content mx-auto">
          <div className="md:grid md:grid-cols-[1fr_1fr] md:gap-16 items-start">
            <div>
              <SheetLabel sheet={2} total={4} tech="Схема" className="mb-6 block" />
              <h2 className="text-headline text-ink mb-8">{t.prepress_page.diagram_h2}</h2>
              <BleedDiagram />
            </div>
            <div className="mt-12 md:mt-0">
              <SheetLabel sheet={3} total={4} tech="Чек-лист" className="mb-6 block" />
              <h2 className="text-headline text-ink mb-8">{t.prepress_page.checklist_h2}</h2>
              <ul className="flex flex-col gap-3">
                {CHECKLIST.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 border-b border-mid pb-3">
                    <span className={`flex-shrink-0 text-caption font-mono px-2 py-0.5 mt-0.5 ${
                      item.required ? "bg-[#D6307F] text-white border-2 border-t-[#ff8cc0] border-l-[#ff8cc0] border-b-[#8a1a4f] border-r-[#8a1a4f]" : "border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dfdfdf] text-[#121212]"
                    }`}>
                      {item.required ? "✓" : "○"}
                    </span>
                    <span className="text-body text-ink">{item.label}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-4 items-center">
                <span className="inline-flex items-center gap-2 text-caption text-muted">
                  <span className="bg-[#D6307F] text-white px-2 py-0.5 text-xs font-bold">✓</span> {t.prepress_page.required}
                </span>
                <span className="inline-flex items-center gap-2 text-caption text-muted">
                  <span className="border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dfdfdf] text-[#121212] px-2 py-0.5 text-xs">○</span> {t.prepress_page.optional}
                </span>
              </div>
            </div>
          </div>
          <div className="border-t border-mid pt-12 mt-16">
            <SheetLabel sheet={4} total={4} tech="Форматы" className="mb-6 block" />
            <h2 className="text-headline text-ink mb-8">{t.prepress_page.formats_h2}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {FORMATS.map((fmt) => (
                <div key={fmt.name} className="border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dfdfdf] p-4">
                  <p className="text-title font-700 text-[#121212] mb-1">{fmt.name}</p>
                  <p className="text-caption text-[#444]">{fmt.note}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-mid pt-12 mt-12">
            <p className="text-headline text-ink font-700 mb-4">{t.prepress_page.upload_h2}</p>
            <p className="text-body text-muted mb-8 max-w-prose">{t.prepress_page.upload_body} Max {SITE.maxUploadMb} MB.</p>
            <Button as="a" href={ROUTES.order} variant="primary">{t.prepress_page.upload_cta}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
