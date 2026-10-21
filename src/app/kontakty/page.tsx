"use client";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { PrintMark } from "@/components/ui/PrintMark";
import { Win95Window } from "@/components/ui/Win95Window";
import { SITE } from "../../../content/site.config";
import { telHref } from "@/lib/utils";
import { useLang } from "@/context/LanguageContext";

export default function ContactsPage() {
  const { t } = useLang();
  return (
    <>
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />
        <div className="max-w-content mx-auto">
          <SheetLabel sheet={1} total={2} tech="Контакты" className="mb-8 block" />
          <h1 className="text-display text-ink mb-0 max-w-3xl">{t.contacts_page.hero_h1}</h1>
        </div>
      </section>
      <CMYKBar />
      <section className="bg-paper py-12 md:py-20 px-6 md:px-10">
        <div className="max-w-content mx-auto md:grid md:grid-cols-[1fr_1fr] md:gap-16 items-start">
          <div>
            <SheetLabel sheet={2} total={2} tech="Реквизиты" className="mb-8 block" />
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
            <div className="mt-12 aspect-[16/9] relative overflow-hidden border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dfdfdf]">
              <div className="absolute inset-0 bg-[#dfdfdf] flex items-center justify-center" role="img" aria-label="Фото здания">
                <p className="sheet-label text-[#808080] opacity-50 text-center px-4">ФОТО ЗДАНИЯ<br />TODO(client)</p>
              </div>
            </div>
          </div>
          <div className="mt-12 md:mt-16">
            <p className="sheet-label text-muted mb-4">{t.contacts_page.on_map}</p>
            <div className="aspect-[4/3] relative overflow-hidden border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080]">
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=28.82,47.01,28.86,47.03&layer=mapnik&marker=${SITE.address.lat},${SITE.address.lng}`}
                width="100%" height="100%" className="absolute inset-0 w-full h-full border-0"
                loading="lazy" title={`Карта: ${SITE.name}`}
              />
            </div>
            <a href={`https://www.openstreetmap.org/?mlat=${SITE.address.lat}&mlon=${SITE.address.lng}#map=17/${SITE.address.lat}/${SITE.address.lng}`}
              target="_blank" rel="noopener noreferrer"
              className="text-caption text-muted hover:text-ink transition-colors mt-2 inline-block">
              {t.contacts_page.open_map}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
