"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES, getServiceBySlug } from "../../../../content/services.config";
import { ROUTES } from "../../../../content/routes";
import { Button } from "@/components/ui/Button";
import { Win95Window } from "@/components/ui/Win95Window";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { PrintMark } from "@/components/ui/PrintMark";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { resolveMedia } from "@/lib/resolve-media";
import { useLang } from "@/context/LanguageContext";

const PHOTO_KEY: Record<string, string> = {
  "ofsetnaya-pechat":         "offset",
  "cifrovaya-pechat":         "digital",
  "shelkografiya":            "silkscreen",
  "shirokoformatnaya-pechat": "wide-format",
  "plotternaya-rezka":        "plotter",
  "laminaciya":               "lamination",
  "poslepechatnye-raboty":    "postpress",
};

/* Win95 accent button link classes */
const win95Link =
  "inline-flex items-center px-4 py-2 rounded-none border-2 font-bold text-body bg-[#dfdfdf] text-[#121212] border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white active:translate-y-[1px] select-none transition-none";

export default function ServicePageClient({ slug }: { slug: string }) {
  const { lang } = useLang();
  const l = lang === "en" ? "ro" : (lang as "ru" | "ro");

  const service = getServiceBySlug(slug);
  if (!service) return notFound();

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
            alt={service.title[l]}
            expectedRatio="16:7"
            fill priority sizes="100vw"
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-ink/55 z-[1]" />
          <PrintMark size={18} color="#D9D4C7" className="absolute top-6 left-6 z-10 opacity-40" />
          <PrintMark size={18} color="#D9D4C7" className="absolute top-6 right-6 z-10 opacity-40" />
          <PrintMark size={18} color="#D9D4C7" className="absolute bottom-6 left-6 z-10 opacity-40" />
          <PrintMark size={18} color="#D9D4C7" className="absolute bottom-6 right-6 z-10 opacity-40" />

          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="sheet-label text-mid/60">
              ФОТО {String(service.index).padStart(2, "0")} · {service.shortTitle[l].toUpperCase()}
            </span>
          </div>

          <div className="absolute inset-0 z-[2] flex flex-col justify-end px-6 md:px-10 pb-12 md:pb-16 max-w-content mx-auto">
            <SheetLabel sheet={service.index} total={SERVICES.length} tech={service.shortTitle[l]} className="text-mid mb-4 block" />
            <h1 className="text-display text-paper font-800 leading-none">{service.title[l]}</h1>
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
              <div className="mb-12">
                <p className="sheet-label text-muted mb-4">
                  {lang === "ru" ? "Что это" : lang === "ro" ? "Ce este" : "What it is"}
                </p>
                <p className="text-title text-ink max-w-prose" style={{ fontWeight: 400 }}>
                  {service.description[l]}
                </p>
              </div>
              <div className="mb-12 border-t border-mid pt-12">
                <p className="sheet-label text-muted mb-4">
                  {lang === "ru" ? "Когда выбирать" : lang === "ro" ? "Când să alegi" : "When to choose"}
                </p>
                <p className="text-body text-ink max-w-prose">{service.when[l]}</p>
              </div>
              <div className="mb-12 border-t border-mid pt-12">
                <p className="sheet-label text-muted mb-6">
                  {lang === "ru" ? "Что печатаем" : lang === "ro" ? "Ce tipărim" : "What we print"}
                </p>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {service.products[l].map((product) => (
                    <li key={product} className="text-body text-[#121212] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dfdfdf] px-3 py-2">
                      {product}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Parameters sidebar — Win95 window */}
            <div>
              <Win95Window title={lang === "ru" ? "Параметры" : lang === "ro" ? "Parametri" : "Parameters"} variant="navy" bodyClassName="p-6">
                <dl className="flex flex-col gap-4">
                  {service.params.map((param) => (
                    <div key={param.label[l]} className="border-b-2 border-b-[#808080] border-r-[#808080] pb-4">
                      <dt className="text-caption text-[#808080] mb-1">{param.label[l]}</dt>
                      <dd className="text-body text-[#121212] font-500">{param.value[l]}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6">
                  <Button as="a" href={`${ROUTES.order}?service=${service.slug}`} variant="primary" className="w-full">
                    {lang === "ru" ? "Рассчитать заказ" : lang === "ro" ? "Calculează comanda" : "Get a quote"}
                  </Button>
                </div>
              </Win95Window>

              {/* Materials */}
              <div className="mt-6">
                <p className="sheet-label text-muted mb-4">
                  {lang === "ru" ? "Материалы" : lang === "ro" ? "Materiale" : "Materials"}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {service.materials[l].map((mat) => (
                    <li key={mat} className="text-caption text-[#121212] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dfdfdf] px-3 py-1">
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
              <p className="sheet-label text-muted mb-6">
                {lang === "ru" ? "Сочетается с" : lang === "ro" ? "Se combină cu" : "Pairs with"}
              </p>
              <div className="flex flex-wrap gap-4">
                {related.map(
                  (rel) => rel && (
                    <Link key={rel.slug} href={rel.href} className={win95Link}>
                      {rel.title[l]}
                    </Link>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[#D6307F] py-12 px-6 md:px-10">
        <div className="max-w-content mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <p className="text-title text-white font-700">
              {lang === "ru" ? "Готовы рассчитать заказ?" : lang === "ro" ? "Gata să calculați comanda?" : "Ready to get a quote?"}
            </p>
            <p className="text-body text-white/80">
              {lang === "ru" ? "Менеджер ответит и уточнит детали." : lang === "ro" ? "Managerul va răspunde și va clarifica detaliile." : "A manager will respond and clarify the details."}
            </p>
          </div>
          <Button as="a" href={`${ROUTES.order}?service=${service.slug}`} variant="outline" className="flex-shrink-0 bg-[#dfdfdf] !text-[#121212] border-t-white border-l-white border-b-[#808080] border-r-[#808080]">
            {lang === "ru" ? "Рассчитать заказ" : lang === "ro" ? "Calculează comanda" : "Get a quote"}
          </Button>
        </div>
      </section>
    </>
  );
}
