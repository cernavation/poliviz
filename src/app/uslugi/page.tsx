"use client";
import Link from "next/link";
import { SERVICES } from "../../../content/services.config";
import { TechPicker } from "@/components/services/TechPicker";
import { ServicesPhotoScroll } from "@/components/services/ServicesPhotoScroll";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { PrintMark } from "@/components/ui/PrintMark";
import { Win95Window } from "@/components/ui/Win95Window";
import { useLang } from "@/context/LanguageContext";

export default function ServicesHubPage() {
  const { t, lang, localize } = useLang();
  const moreLabel = lang === "ro" ? "Detalii →" : lang === "en" ? "Learn more →" : "Подробнее →";
  const pickLabel = lang === "ro" ? "Selecție" : lang === "en" ? "Selection" : "Подбор";

  return (
    <>
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />
        <div className="max-w-content mx-auto">
          <SheetLabel sheet={1} total={7} tech={t.nav.services} className="mb-8 block" />
          <h1 className="text-display text-ink mb-6 max-w-3xl">{t.services_page.hero_h1}</h1>
          <p className="text-title text-muted max-w-2xl mb-0" style={{ fontWeight: 400 }}>{t.services_page.hero_sub}</p>
        </div>
      </section>

      <ServicesPhotoScroll />
      <CMYKBar />

      {/* Services list — Win95 windows */}
      <section className="bg-paper py-12 px-6 md:px-10 border-b border-mid">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link key={service.slug} href={localize(service.href)} className="block group">
                <Win95Window
                  variant="navy"
                  title={`${service.slug}.exe`}
                  bodyClassName="p-5 flex flex-col justify-between h-full bg-[#dfdfdf]"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <SheetLabel
                      sheet={service.index}
                      total={SERVICES.length}
                      tech=""
                      className="text-muted flex-shrink-0"
                    />
                    <div>
                      <h2 className="text-headline text-ink font-700 leading-tight mb-2 group-hover:text-[#D6307F] transition-none">
                        {service.title[lang] || service.title.ru}
                      </h2>
                      <p className="text-body text-[#444]">{service.hubSpec[lang] || service.hubSpec.ru}</p>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <span className="inline-flex items-center px-4 py-2 border-2 border-t-[#ff8cc0] border-l-[#ff8cc0] border-b-[#8a1a4f] border-r-[#8a1a4f] active:border-t-[#8a1a4f] active:border-l-[#8a1a4f] active:border-b-[#ff8cc0] active:border-r-[#ff8cc0] bg-[#D6307F] text-white text-sm font-bold active:translate-y-[1px] select-none">
                      {moreLabel}
                    </span>
                  </div>
                </Win95Window>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CMYKBar />

      <section className="bg-paper py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-content mx-auto">
          <SheetLabel sheet={2} total={7} tech={pickLabel} className="mb-8 block" />
          <h2 className="text-headline text-ink mb-4">{t.services_page.picker_h2}</h2>
          <p className="text-body text-muted mb-12 max-w-prose">{t.services_page.picker_sub}</p>
          <TechPicker />
        </div>
      </section>
    </>
  );
}
