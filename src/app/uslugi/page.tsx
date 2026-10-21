"use client";
import Link from "next/link";
import { SERVICES } from "../../../content/services.config";
import { TechPicker } from "@/components/services/TechPicker";
import { ServicesPhotoScroll } from "@/components/services/ServicesPhotoScroll";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { PrintMark } from "@/components/ui/PrintMark";
import { useLang } from "@/context/LanguageContext";

export default function ServicesHubPage() {
  const { t, lang } = useLang();
  const l = lang === "en" ? "ro" : (lang as "ru" | "ro");

  return (
    <>
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />
        <div className="max-w-content mx-auto">
          <SheetLabel sheet={1} total={7} tech="Услуги" className="mb-8 block" />
          <h1 className="text-display text-ink mb-6 max-w-3xl">{t.services_page.hero_h1}</h1>
          <p className="text-title text-muted max-w-2xl mb-0" style={{ fontWeight: 400 }}>{t.services_page.hero_sub}</p>
        </div>
      </section>

      <ServicesPhotoScroll />
      <CMYKBar />

      {/* Services list — Win95 raised rows */}
      <section className="bg-paper border-b border-mid">
        {SERVICES.map((service) => (
          <Link key={service.slug} href={service.href}
            className="group block border-t border-mid hover:bg-[#dfdfdf] transition-none">
            <div className="max-w-content mx-auto px-6 md:px-10 py-8 md:py-10 flex items-center justify-between gap-8">
              <div className="flex items-start gap-6 md:gap-10 flex-1 min-w-0">
                <SheetLabel sheet={service.index} total={SERVICES.length} tech=""
                  className="text-muted group-hover:text-[#808080] flex-shrink-0 hidden md:block" />
                <div className="min-w-0">
                  <h2 className="text-headline text-ink font-700 leading-tight mb-2">
                    {service.title[l]}
                  </h2>
                  <p className="text-body text-muted">{service.hubSpec[l]}</p>
                </div>
              </div>
              {/* Win95-style arrow */}
              <span className="inline-flex items-center px-3 py-1 border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dfdfdf] text-[#121212] text-lg font-bold select-none flex-shrink-0"
                aria-hidden="true">→</span>
            </div>
          </Link>
        ))}
      </section>

      <CMYKBar />

      <section className="bg-paper py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-content mx-auto">
          <SheetLabel sheet={2} total={7} tech="Подбор" className="mb-8 block" />
          <h2 className="text-headline text-ink mb-4">{t.services_page.picker_h2}</h2>
          <p className="text-body text-muted mb-12 max-w-prose">{t.services_page.picker_sub}</p>
          <TechPicker />
        </div>
      </section>
    </>
  );
}
