"use client";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { PrintMark } from "@/components/ui/PrintMark";
import { Win95Window } from "@/components/ui/Win95Window";
import { SITE } from "../../../content/site.config";
import { CATALOG } from "../../../content/catalog.config";
import { OrderFormClient } from "@/components/form/OrderFormClient";
import { useLang } from "@/context/LanguageContext";

export default function OrderPage() {
  const { t, lang } = useLang();
  const catalogOptions = CATALOG.map((item) => ({
    value: item.slug,
    label: item.title[lang] || item.title.ru,
  }));

  return (
    <>
      <section className="bg-paper py-16 md:py-20 px-6 md:px-10 relative overflow-hidden">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />
        <div className="max-w-content mx-auto">
          <SheetLabel sheet={1} total={1} tech={t.nav.order} className="mb-8 block" />
          <h1 className="text-display text-ink mb-4 max-w-3xl">{t.order_page.hero_h1}</h1>
          <p className="text-title text-muted max-w-xl" style={{ fontWeight: 400 }}>{t.order_page.hero_sub}</p>
        </div>
      </section>
      <CMYKBar />
      <section className="bg-paper py-12 md:py-20 px-6 md:px-10">
        <div className="max-w-content mx-auto md:grid md:grid-cols-[2fr_1fr] md:gap-16 items-start">
          <OrderFormClient catalogOptions={catalogOptions} maxUploadMb={SITE.maxUploadMb} />
          <aside className="mt-12 md:mt-0">
            <Win95Window title={t.order_page.contacts_title} variant="dark" bodyClassName="p-5">
              <dl className="flex flex-col gap-5">
                <div>
                  <dt className="text-caption text-[#808080] mb-1">{t.order_page.phone}</dt>
                  <dd><a href={`tel:${SITE.phone.main}`} className="text-body text-[#121212] hover:text-[#D6307F] transition-colors font-500">{SITE.phone.mainFormatted}</a></dd>
                </div>
                <div>
                  <dt className="text-caption text-[#808080] mb-1">{t.order_page.mobile}</dt>
                  <dd><a href={`tel:${SITE.phone.mobile}`} className="text-body text-[#121212] hover:text-[#D6307F] transition-colors">{SITE.phone.mobileFormatted}</a></dd>
                </div>
                <div>
                  <dt className="text-caption text-[#808080] mb-1">E-mail</dt>
                  <dd><a href={`mailto:${SITE.email}`} className="text-body text-[#121212] hover:text-[#D6307F] transition-colors">{SITE.email}</a></dd>
                </div>
                <div>
                  <dt className="text-caption text-[#808080] mb-1">{t.order_page.address}</dt>
                  <dd className="text-body text-[#444]">{SITE.address.street}, {SITE.address.building}<br />{SITE.address.city}</dd>
                </div>
              </dl>
            </Win95Window>
          </aside>
        </div>
      </section>
    </>
  );
}
