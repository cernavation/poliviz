import type { Metadata } from "next";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { PrintMark } from "@/components/ui/PrintMark";
import { SITE } from "../../../content/site.config";
import { CATALOG } from "../../../content/catalog.config";
import { OrderFormClient } from "@/components/form/OrderFormClient";

export const metadata: Metadata = {
  title: "Рассчитать заказ",
  description: `Рассчитайте стоимость полиграфии в ${SITE.name}. Загрузите макет, укажите тираж — менеджер свяжется и уточнит детали.`,
};

export default function OrderPage() {
  const catalogOptions = CATALOG.map((item) => ({
    value: item.slug,
    label: item.title.ru,
  }));

  return (
    <>
      <section className="bg-paper py-16 md:py-20 px-6 md:px-10 relative overflow-hidden">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />

        <div className="max-w-content mx-auto">
          <SheetLabel sheet={1} total={1} tech="Расчёт" className="mb-8 block" />
          <h1 className="text-display text-ink mb-4 max-w-3xl">
            Рассчитать заказ.
          </h1>
          <p className="text-title text-muted max-w-xl" style={{ fontWeight: 400 }}>
            Заполните форму — менеджер ответит и уточнит детали.
            Файл до {SITE.maxUploadMb} МБ: CDR, AI, EPS, TIFF, PDF, JPG.
          </p>
        </div>
      </section>

      <CMYKBar />

      <section className="bg-paper py-12 md:py-20 px-6 md:px-10">
        <div className="max-w-content mx-auto md:grid md:grid-cols-[2fr_1fr] md:gap-16 items-start">
          <OrderFormClient catalogOptions={catalogOptions} maxUploadMb={SITE.maxUploadMb} />

          {/* Side info */}
          <aside className="mt-12 md:mt-0 border border-mid p-6 relative">
            <PrintMark size={12} color="#7A7469" className="absolute top-2 left-2 opacity-30" />
            <PrintMark size={12} color="#7A7469" className="absolute top-2 right-2 opacity-30" />

            <p className="sheet-label text-muted mb-6">Контакты для связи</p>
            <dl className="flex flex-col gap-5">
              <div>
                <dt className="text-caption text-muted mb-1">Телефон</dt>
                <dd>
                  <a href={`tel:${SITE.phone.main}`} className="text-body text-ink hover:text-magenta transition-colors font-500">
                    {SITE.phone.mainFormatted}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-caption text-muted mb-1">Мобильный</dt>
                <dd>
                  <a href={`tel:${SITE.phone.mobile}`} className="text-body text-ink hover:text-magenta transition-colors">
                    {SITE.phone.mobileFormatted}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-caption text-muted mb-1">E-mail</dt>
                <dd>
                  <a href={`mailto:${SITE.email}`} className="text-body text-ink hover:text-magenta transition-colors">
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-caption text-muted mb-1">Адрес</dt>
                <dd className="text-body text-muted">
                  {SITE.address.street}, {SITE.address.building}
                  <br />{SITE.address.city}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
