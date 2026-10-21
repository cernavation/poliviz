"use client";
import Image from "next/image";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { PrintMark } from "@/components/ui/PrintMark";
import { Win95Window } from "@/components/ui/Win95Window";
import { SITE } from "../../../content/site.config";
import { telHref } from "@/lib/utils";
import { useLang } from "@/context/LanguageContext";

export default function ContactsPage() {
  const { t, lang } = useLang();
  return (
    <>
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />
        <div className="max-w-content mx-auto">
          <SheetLabel sheet={1} total={2} tech={t.nav.contacts} className="mb-8 block" />
          <h1 className="text-display text-ink mb-0 max-w-3xl">{t.contacts_page.hero_h1}</h1>
        </div>
      </section>
      <CMYKBar />
      <section className="bg-paper py-12 md:py-20 px-6 md:px-10">
        <div className="max-w-content mx-auto md:grid md:grid-cols-[1fr_1fr] md:gap-16 items-start">
          <div>
            <SheetLabel sheet={2} total={2} tech={lang === "ro" ? "Detalii" : lang === "en" ? "Details" : "Реквизиты"} className="mb-8 block" />
            <Win95Window title={t.contacts_page.address} variant="navy" bodyClassName="p-5">
              <dl className="flex flex-col gap-6">
                <div>
                  <dt className="sheet-label text-[#808080] mb-2">{t.contacts_page.address}</dt>
                  <dd className="text-body text-[#121212] font-500">
                    {SITE.address.street}<br />
                    <span className="text-[#444]">{SITE.address.building}</span><br />
                    <span className="text-[#444]">{SITE.address.city}, {SITE.address.country}</span>
                  </dd>
                </div>
                <div>
                  <dt className="sheet-label text-[#808080] mb-2">{t.contacts_page.phones}</dt>
                  <dd className="flex flex-col gap-2">
                    <a href={telHref(SITE.phone.main)} className="text-body text-[#121212] hover:text-[#D6307F] transition-colors font-500">{SITE.phone.mainFormatted}</a>
                    <a href={telHref(SITE.phone.mobile)} className="text-body text-[#444] hover:text-[#121212] transition-colors">{SITE.phone.mobileFormatted} {t.contacts_page.mob}</a>
                    <span className="text-body text-[#444]">{t.contacts_page.fax} {SITE.phone.faxFormatted}</span>
                  </dd>
                </div>
                <div>
                  <dt className="sheet-label text-[#808080] mb-2">E-mail</dt>
                  <dd><a href={`mailto:${SITE.email}`} className="text-body text-[#121212] hover:text-[#D6307F] transition-colors font-500">{SITE.email}</a></dd>
                </div>
              </dl>
            </Win95Window>

            <div className="mt-8">
              <Win95Window variant="navy" title="poliviz_factory.jpg" bodyClassName="p-2 bg-[#dfdfdf]">
                <div className="aspect-[16/9] relative overflow-hidden border border-[#808080] bg-black">
                  <Image
                    src="/media/photo/services/offset.jpg"
                    alt="Производство Poliviz"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </Win95Window>
            </div>
          </div>
          <div className="mt-12 md:mt-16">
            <p className="sheet-label text-muted mb-4">{t.contacts_page.on_map}</p>
            <div className="aspect-[4/3] relative overflow-hidden border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#F4F1EA]">
              {/* Branded loading background shown while map loads */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none" aria-hidden="true">
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #7A7469 1px, transparent 1px), linear-gradient(to bottom, #7A7469 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <PrintMark size={14} color="#7A7469" className="absolute top-3 left-3 opacity-30" />
                <PrintMark size={14} color="#7A7469" className="absolute top-3 right-3 opacity-30" />
                <PrintMark size={14} color="#7A7469" className="absolute bottom-3 left-3 opacity-30" />
                <PrintMark size={14} color="#7A7469" className="absolute bottom-3 right-3 opacity-30" />
                <div className="relative z-0 flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-[#7A7469]/30 bg-[#EAE5D9] flex items-center justify-center text-[#D6307F]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#544E45] uppercase tracking-wider">
                    {lang === "ro" ? "Se încarcă harta…" : lang === "en" ? "Loading map…" : "Загрузка карты…"}
                  </span>
                  <span className="font-mono text-[11px] text-[#7A7469]">
                    {SITE.address.street}, {SITE.address.building}
                  </span>
                </div>
              </div>

              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=28.82,47.01,28.86,47.03&layer=mapnik&marker=${SITE.address.lat},${SITE.address.lng}`}
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full border-0 relative z-10"
                loading="eager"
                title={`Карта: ${SITE.name}`}
              />
            </div>
            <a
              href={`https://www.openstreetmap.org/?mlat=${SITE.address.lat}&mlon=${SITE.address.lng}#map=17/${SITE.address.lat}/${SITE.address.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-caption text-muted hover:text-ink transition-colors mt-2 inline-block"
            >
              {t.contacts_page.open_map}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
