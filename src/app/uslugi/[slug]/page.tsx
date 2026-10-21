import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES, getServiceBySlug } from "../../../../content/services.config";
import { ROUTES } from "../../../../content/routes";
import { Button } from "@/components/ui/Button";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { PrintMark } from "@/components/ui/PrintMark";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { resolveMedia } from "@/lib/resolve-media";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.title.ru,
    description: service.description.ru,
  };
}

// Map Russian slugs → English photo keys (final path + temp slotId)
const PHOTO_KEY: Record<string, string> = {
  "ofsetnaya-pechat":         "offset",
  "cifrovaya-pechat":         "digital",
  "shelkografiya":            "silkscreen",
  "shirokoformatnaya-pechat": "wide-format",
  "plotternaya-rezka":        "plotter",
  "laminaciya":               "lamination",
  "poslepechatnye-raboty":    "postpress",
};

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const photoKey = PHOTO_KEY[service.slug] ?? service.slug;
  const heroMedia = resolveMedia(
    `/media/photo/services/${photoKey}.jpg`,
    `photo-service-${photoKey}`
  );

  const related = service.relatedSlugs
    .map((s) => SERVICES.find((sv) => sv.slug === s))
    .filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink text-paper overflow-hidden">
        <div className="aspect-[16/7] relative">
          <MediaSlot
            src={heroMedia?.src ?? null}
            isTemp={heroMedia?.isTemp}
            alt={service.title.ru}
            expectedRatio="16:7"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 w-full h-full"
          />
          {/* Ink overlay */}
          <div className="absolute inset-0 bg-ink/55 z-[1]" />

          {/* Registration marks */}
          <PrintMark size={18} color="#D9D4C7" className="absolute top-6 left-6 z-10 opacity-40" />
          <PrintMark size={18} color="#D9D4C7" className="absolute top-6 right-6 z-10 opacity-40" />
          <PrintMark size={18} color="#D9D4C7" className="absolute bottom-6 left-6 z-10 opacity-40" />
          <PrintMark size={18} color="#D9D4C7" className="absolute bottom-6 right-6 z-10 opacity-40" />

          {/* Photo caption — prepress style */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="sheet-label text-mid/60">
              ФОТО {String(service.index).padStart(2, "0")} · {service.shortTitle.ru.toUpperCase()}
            </span>
          </div>

          <div className="absolute inset-0 z-[2] flex flex-col justify-end px-6 md:px-10 pb-12 md:pb-16 max-w-content mx-auto">
            <SheetLabel
              sheet={service.index}
              total={SERVICES.length}
              tech={service.shortTitle.ru}
              className="text-mid mb-4 block"
            />
            <h1 className="text-display text-paper font-800 leading-none">
              {service.title.ru}
            </h1>
          </div>
        </div>
      </section>

      <CMYKBar />

      {/* Content */}
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-content mx-auto">
          <div className="md:grid md:grid-cols-[2fr_1fr] md:gap-16">
            {/* Main content */}
            <div>
              {/* What is it */}
              <div className="mb-12">
                <p className="sheet-label text-muted mb-4">Что это</p>
                <p className="text-title text-ink max-w-prose" style={{ fontWeight: 400 }}>
                  {service.description.ru}
                </p>
              </div>

              {/* When to choose */}
              <div className="mb-12 border-t border-mid pt-12">
                <p className="sheet-label text-muted mb-4">Когда выбирать</p>
                <p className="text-body text-ink max-w-prose">
                  {service.when.ru}
                </p>
              </div>

              {/* What we print */}
              <div className="mb-12 border-t border-mid pt-12">
                <p className="sheet-label text-muted mb-6">Что печатаем</p>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {service.products.ru.map((product) => (
                    <li key={product} className="text-body text-ink border border-mid px-3 py-2">
                      {product}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Parameters sidebar */}
            <div>
              <div className="border border-mid p-6 mb-8 relative">
                <PrintMark size={12} color="#7A7469" className="absolute top-2 left-2 opacity-30" />
                <PrintMark size={12} color="#7A7469" className="absolute top-2 right-2 opacity-30" />

                <p className="sheet-label text-muted mb-6">Параметры</p>
                <dl className="flex flex-col gap-4">
                  {service.params.map((param) => (
                    <div key={param.label.ru} className="border-b border-mid pb-4">
                      <dt className="text-caption text-muted mb-1">{param.label.ru}</dt>
                      <dd className="text-body text-ink font-500">{param.value.ru}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8">
                  <Button as="a" href={`${ROUTES.order}?service=${service.slug}`} variant="primary" className="w-full">
                    Рассчитать заказ
                  </Button>
                </div>
              </div>

              {/* Materials */}
              <div>
                <p className="sheet-label text-muted mb-4">Материалы</p>
                <ul className="flex flex-wrap gap-2">
                  {service.materials.ru.map((mat) => (
                    <li key={mat} className="text-caption text-ink border border-mid px-3 py-1">
                      {mat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Related services */}
          {related.length > 0 && (
            <div className="border-t border-mid pt-12 mt-12">
              <p className="sheet-label text-muted mb-6">Сочетается с</p>
              <div className="flex flex-wrap gap-4">
                {related.map(
                  (rel) =>
                    rel && (
                      <Link
                        key={rel.slug}
                        href={rel.href}
                        className="text-body text-ink border border-mid px-6 py-3 hover:bg-ink hover:text-paper transition-colors"
                      >
                        {rel.title.ru}
                      </Link>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-magenta py-12 px-6 md:px-10">
        <div className="max-w-content mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <p className="text-title text-paper font-700">Готовы рассчитать заказ?</p>
            <p className="text-body text-paper/80">Менеджер ответит и уточнит детали.</p>
          </div>
          <Button as="a" href={`${ROUTES.order}?service=${service.slug}`} variant="outline" className="border-paper text-paper hover:bg-paper hover:text-magenta flex-shrink-0">
            Рассчитать заказ
          </Button>
        </div>
      </section>
    </>
  );
}
