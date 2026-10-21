import type { Metadata } from "next";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { PrintMark } from "@/components/ui/PrintMark";
import { SITE } from "../../../content/site.config";
import { telHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Контакты",
  description: `${SITE.name} — ${SITE.address.street}, ${SITE.address.city}. Тел. ${SITE.phone.mainFormatted}, ${SITE.phone.mobileFormatted}. ${SITE.email}.`,
};

export default function ContactsPage() {
  return (
    <>
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />

        <div className="max-w-content mx-auto">
          <SheetLabel sheet={1} total={2} tech="Контакты" className="mb-8 block" />
          <h1 className="text-display text-ink mb-0 max-w-3xl">Контакты.</h1>
        </div>
      </section>

      <CMYKBar />

      <section className="bg-paper py-12 md:py-20 px-6 md:px-10">
        <div className="max-w-content mx-auto md:grid md:grid-cols-[1fr_1fr] md:gap-16 items-start">

          {/* Contact details */}
          <div>
            <SheetLabel sheet={2} total={2} tech="Реквизиты" className="mb-8 block" />

            <dl className="flex flex-col gap-8">
              <div>
                <dt className="sheet-label text-muted mb-2">Адрес</dt>
                <dd className="text-title text-ink" style={{ fontWeight: 500 }}>
                  {SITE.address.street}
                  <br />
                  <span className="text-body text-muted">{SITE.address.building}</span>
                  <br />
                  <span className="text-body text-muted">{SITE.address.city}, {SITE.address.country}</span>
                </dd>
              </div>

              <div>
                <dt className="sheet-label text-muted mb-2">Телефоны</dt>
                <dd className="flex flex-col gap-2">
                  <a
                    href={telHref(SITE.phone.main)}
                    className="text-title text-ink hover:text-magenta transition-colors font-500"
                  >
                    {SITE.phone.mainFormatted}
                  </a>
                  <a
                    href={telHref(SITE.phone.mobile)}
                    className="text-body text-muted hover:text-ink transition-colors"
                  >
                    {SITE.phone.mobileFormatted} (моб.)
                  </a>
                  <span className="text-body text-muted">
                    Факс: {SITE.phone.faxFormatted}
                  </span>
                </dd>
              </div>

              <div>
                <dt className="sheet-label text-muted mb-2">E-mail</dt>
                <dd>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-title text-ink hover:text-magenta transition-colors font-500"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
            </dl>

            {/* Building photo — НЕ использовать сток, только реальное фото здания TODO(client) */}
            {/* Slot intentionally shows placeholder until real building photo is provided */}
            <div className="mt-12 aspect-[16/9] relative overflow-hidden">
              <div
                className="absolute inset-0 bg-mid/20 flex items-center justify-center"
                role="img"
                aria-label="Фото здания — ожидает загрузки клиентом"
              >
                <p className="sheet-label text-muted opacity-50 text-center px-4">
                  ФОТО ЗДАНИЯ<br />TODO(client)
                </p>
              </div>
            </div>
            <p className="text-caption text-muted mt-2">
              {SITE.address.street}, {SITE.address.building}
            </p>
          </div>

          {/* Map embed — lazy iframe, no SDK */}
          <div className="mt-12 md:mt-16">
            <p className="sheet-label text-muted mb-4">На карте</p>
            <div className="aspect-[4/3] bg-mid relative overflow-hidden">
              {/* Static map iframe — lazy loaded, no JS SDK */}
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=28.82,47.01,28.86,47.03&layer=mapnik&marker=${SITE.address.lat},${SITE.address.lng}`}
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                title={`Карта: ${SITE.name}, ${SITE.address.street}`}
                aria-label={`Карта с расположением ${SITE.name}`}
              />
            </div>
            <a
              href={`https://www.openstreetmap.org/?mlat=${SITE.address.lat}&mlon=${SITE.address.lng}#map=17/${SITE.address.lat}/${SITE.address.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-caption text-muted hover:text-ink transition-colors mt-2 inline-block"
            >
              Открыть в OpenStreetMap →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
