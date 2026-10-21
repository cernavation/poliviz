"use client";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { PrintMark } from "@/components/ui/PrintMark";
import { BleedDiagram } from "@/components/prepress/BleedDiagram";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/routes";
import { SITE } from "../../../content/site.config";
import { useLang, type Lang } from "@/context/LanguageContext";

const CHECKLIST_DATA: Record<Lang, { label: string; required: boolean }[]> = {
  ru: [
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
  ],
  ro: [
    { label: "Formate: CDR (până la v14), AI/EPS (până la CS5), TIFF, PDF", required: true },
    { label: "Bleed 2 mm pe toate laturile", required: true },
    { label: "Tot textul convertit în curbe (vector)", required: true },
    { label: "Raster: 300 dpi, straturi aplatizate, CMYK sau Grayscale", required: true },
    { label: "Densitate totală cerneală: până la 300% (cretată), până la 280% (necretată)", required: true },
    { label: "Text negru — doar K. Suprafețe mari negre — C50 M40 Y40 K100", required: true },
    { label: "Elemente de design la 3–5 mm în interiorul liniei de tăiere", required: true },
    { label: "Fișier denumit în caractere latine, fără spații sau diacritice", required: true },
    { label: "Culori speciale: Pantone + echivalent CMYK", required: false },
    { label: "Marcaje pentru tăiere, fălțuire, biguire, perforare", required: false },
    { label: "În Illustrator și Photoshop: un singur produs per fișier", required: false },
    { label: "În CorelDRAW: document multipagină, un produs per pagină", required: false },
    { label: "Fonturile și imaginile colectate în foldere alături de fișier", required: false },
    { label: "Atașați previzualizare JPEG sau print de control", required: false },
  ],
  en: [
    { label: "Formats: CDR (up to v14), AI/EPS (up to CS5), TIFF, PDF", required: true },
    { label: "2 mm bleed on all sides", required: true },
    { label: "All typography outlined / converted to curves", required: true },
    { label: "Raster assets: 300 dpi, flattened layers, CMYK or Grayscale", required: true },
    { label: "Total ink coverage: max 300% (coated), max 280% (uncoated)", required: true },
    { label: "Black text — 100% K only. Rich blacks — C50 M40 Y40 K100", required: true },
    { label: "Crucial design elements placed 3–5 mm inside the cut line", required: true },
    { label: "File named in Latin characters, no spaces or special symbols", required: true },
    { label: "Spot colors: specified in Pantone + CMYK equivalent", required: false },
    { label: "Indicate marks for cutting, folding, creasing, perforation", required: false },
    { label: "In Illustrator & Photoshop: one artwork per file", required: false },
    { label: "In CorelDRAW: multi-page document, one artwork per page", required: false },
    { label: "Packaged fonts and high-res linked images included", required: false },
    { label: "Include a JPEG preview / PDF mockup", required: false },
  ],
};

const FORMATS_DATA: Record<Lang, { name: string; note: string }[]> = {
  ru: [
    { name: "CDR", note: "CorelDRAW не выше 14 версии" },
    { name: "AI / EPS", note: "Adobe Illustrator не выше CS5" },
    { name: "TIFF", note: "Без слоёв, 300 dpi, CMYK" },
    { name: "PDF", note: "Со встроенными шрифтами, CMYK" },
    { name: "По договорённости", note: "Уточните с менеджером" },
  ],
  ro: [
    { name: "CDR", note: "CorelDRAW nu mai sus de v14" },
    { name: "AI / EPS", note: "Adobe Illustrator nu mai sus de CS5" },
    { name: "TIFF", note: "Fără straturi, 300 dpi, CMYK" },
    { name: "PDF", note: "Cu fonturi încorporate, CMYK" },
    { name: "La înțelegere", note: "Consultați managerul" },
  ],
  en: [
    { name: "CDR", note: "CorelDRAW up to version 14" },
    { name: "AI / EPS", note: "Adobe Illustrator up to CS5" },
    { name: "TIFF", note: "Flattened, 300 dpi, CMYK" },
    { name: "PDF", note: "With embedded fonts, CMYK" },
    { name: "Custom", note: "Confirm with your manager" },
  ],
};

export default function PrepressPage() {
  const { t, lang, localize } = useLang();
  const checklist = CHECKLIST_DATA[lang] || CHECKLIST_DATA.ru;
  const formats = FORMATS_DATA[lang] || FORMATS_DATA.ru;

  return (
    <>
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />
        <div className="max-w-content mx-auto">
          <SheetLabel sheet={1} total={4} tech={t.nav.prepress} className="mb-8 block" />
          <h1 className="text-display text-ink mb-6 max-w-3xl">{t.prepress_page.hero_h1}</h1>
          <p className="text-title text-muted max-w-2xl" style={{ fontWeight: 400 }}>{t.prepress_page.hero_sub}</p>
        </div>
      </section>
      <CMYKBar />
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-content mx-auto">
          <div className="md:grid md:grid-cols-[1fr_1fr] md:gap-16 items-start">
            <div>
              <SheetLabel sheet={2} total={4} tech={lang === "ro" ? "Schemă" : lang === "en" ? "Diagram" : "Схема"} className="mb-6 block" />
              <h2 className="text-headline text-ink mb-8">{t.prepress_page.diagram_h2}</h2>
              <BleedDiagram />
            </div>
            <div className="mt-12 md:mt-0">
              <SheetLabel sheet={3} total={4} tech={lang === "ro" ? "Listă" : lang === "en" ? "Checklist" : "Чек-лист"} className="mb-6 block" />
              <h2 className="text-headline text-ink mb-8">{t.prepress_page.checklist_h2}</h2>
              <ul className="flex flex-col gap-3">
                {checklist.map((item, i) => (
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
            <SheetLabel sheet={4} total={4} tech={lang === "ro" ? "Formate" : lang === "en" ? "Formats" : "Форматы"} className="mb-6 block" />
            <h2 className="text-headline text-ink mb-8">{t.prepress_page.formats_h2}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {formats.map((fmt) => (
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
            <Button as="a" href={localize(ROUTES.order)} variant="primary">{t.prepress_page.upload_cta}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
