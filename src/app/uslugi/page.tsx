import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "../../../content/services.config";
import { ROUTES } from "../../../content/routes";
import { TechPicker } from "@/components/services/TechPicker";
import { ServicesPhotoScroll } from "@/components/services/ServicesPhotoScroll";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { PrintMark } from "@/components/ui/PrintMark";

export const metadata: Metadata = {
  title: "Услуги типографии",
  description: "Семь технологий печати в одном цехе: офсет, цифра, шелкография, широкоформат, плоттер, ламинация, послепечать. Кишинёв.",
};

export default function ServicesHubPage() {
  return (
    <>
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />

        <div className="max-w-content mx-auto">
          <SheetLabel sheet={1} total={7} tech="Услуги" className="mb-8 block" />
          <h1 className="text-display text-ink mb-6 max-w-3xl">
            Семь технологий — один цех.
          </h1>
          <p className="text-title text-muted max-w-2xl mb-0" style={{ fontWeight: 400 }}>
            Офсет, цифра, шелкография, широкоформат, плоттер, ламинация и послепечатная обработка
            под одной крышей — без посредников.
          </p>
        </div>
      </section>

      {/* ── SERVICES PHOTO SCROLL ──────────────────────────────── */}
      <ServicesPhotoScroll />

      <CMYKBar />

      {/* Services list — big rows */}
      <section className="bg-paper border-b border-mid">
        {SERVICES.map((service, i) => (
          <Link
            key={service.slug}
            href={service.href}
            className="group block border-t border-mid hover:bg-ink transition-colors duration-300"
          >
            <div className="max-w-content mx-auto px-6 md:px-10 py-8 md:py-10 flex items-center justify-between gap-8">
              <div className="flex items-start gap-6 md:gap-10 flex-1 min-w-0">
                <SheetLabel
                  sheet={service.index}
                  total={SERVICES.length}
                  tech=""
                  className="text-muted group-hover:text-mid transition-colors flex-shrink-0 hidden md:block"
                />
                <div className="min-w-0">
                  <h2 className="text-headline text-ink font-700 group-hover:text-paper transition-colors leading-tight mb-2">
                    {service.title.ru}
                  </h2>
                  <p className="text-body text-muted group-hover:text-mid transition-colors">
                    {service.hubSpec.ru}
                  </p>
                </div>
              </div>
              <span
                className="text-muted group-hover:text-magenta transition-colors text-2xl flex-shrink-0"
                aria-hidden="true"
              >
                →
              </span>
            </div>
          </Link>
        ))}
      </section>

      <CMYKBar />

      {/* Technology picker */}
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-content mx-auto">
          <SheetLabel sheet={2} total={7} tech="Подбор" className="mb-8 block" />
          <h2 className="text-headline text-ink mb-4">
            Не знаете, какая технология подходит?
          </h2>
          <p className="text-body text-muted mb-12 max-w-prose">
            Ответьте на три вопроса — получите рекомендацию с обоснованием.
            Это ориентир; окончательно технологию подтвердит менеджер.
          </p>
          <TechPicker />
        </div>
      </section>
    </>
  );
}
