"use client";
import { ROUTES } from "@/lib/routes";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { PrintMark } from "@/components/ui/PrintMark";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/context/LanguageContext";

export default function SpasiboPage() {
  const { lang, localize } = useLang();

  const title = lang === "ro"
    ? "Cererea a fost primită."
    : lang === "en"
    ? "Request received."
    : "Заявка принята.";

  const desc = lang === "ro"
    ? "Managerul vă va contacta în cel mai scurt timp pentru a preciza detaliile și costul."
    : lang === "en"
    ? "A manager will contact you shortly to clarify the details and provide a quote."
    : "Менеджер свяжется с вами в ближайшее время, чтобы уточнить детали и сообщить стоимость.";

  const homeBtn = lang === "ro" ? "Pagina principală" : lang === "en" ? "Home page" : "На главную";
  const servicesBtn = lang === "ro" ? "Toate serviciile" : lang === "en" ? "All services" : "Все услуги";
  const techLabel = lang === "ro" ? "Gata" : lang === "en" ? "Done" : "Готово";

  return (
    <>
      <section className="min-h-[80vh] bg-paper flex flex-col justify-center px-6 md:px-10 relative overflow-hidden">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute bottom-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute bottom-6 right-6 opacity-30" />

        <div className="max-w-content mx-auto w-full">
          <SheetLabel sheet={1} total={1} tech={techLabel} className="mb-8 block" />

          {/* Big magenta checkmark in print style */}
          <div className="mb-8" aria-hidden="true">
            <svg width={48} height={48} viewBox="0 0 48 48" fill="none">
              <rect x={0} y={0} width={48} height={48} fill="#D6307F" />
              <polyline
                points="12,26 21,35 36,16"
                stroke="#F4F1EA"
                strokeWidth={3}
                strokeLinecap="square"
                fill="none"
              />
            </svg>
          </div>

          <h1 className="text-headline text-ink mb-4 max-w-xl">
            {title}
          </h1>
          <p className="text-body text-muted max-w-md mb-10">
            {desc}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button as="a" href={localize(ROUTES.home)} variant="outline">
              {homeBtn}
            </Button>
            <Button as="a" href={localize(ROUTES.services)} variant="ghost">
              {servicesBtn}
            </Button>
          </div>
        </div>
      </section>
      <CMYKBar />
    </>
  );
}
