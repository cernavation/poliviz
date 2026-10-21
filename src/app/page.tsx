import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "../../content/site.config";
import { ROUTES } from "../../content/routes";
import { CATALOG, CATALOG_FEATURED_SLUGS } from "../../content/catalog.config";
// clients config consumed directly by ClientsTicker
import { ScrollVideo } from "@/components/home/ScrollVideo";
import { ClientsTicker } from "@/components/home/ClientsTicker";
import { Button } from "@/components/ui/Button";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { PrintMark } from "@/components/ui/PrintMark";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { resolveMedia, resolveMediaMap } from "@/lib/resolve-media";

export const metadata: Metadata = {
  title: `${SITE.tagline.ru} | ${SITE.name}`,
  description: SITE.description.ru,
  alternates: {
    canonical: `https://${SITE.domain}`,
    languages: {
      ru: `https://${SITE.domain}`,
      ro: `https://${SITE.domain}/ro`,
    },
  },
};

const FEATURED_ITEMS = CATALOG.filter((item) =>
  CATALOG_FEATURED_SLUGS.includes(item.slug)
).slice(0, 12);

export default function HomePage() {
  // Resolve catalog photos server-side — no 404 requests to client
  const catalogMedia = resolveMediaMap(
    FEATURED_ITEMS.map((item) => ({
      finalPath: `/media/photo/catalog/${item.slug}.jpg`,
      slotId: `catalog-${item.slug}`,
    }))
  );

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end pb-16 md:pb-24">
        {/* ── Full-bleed hero video ── */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/media/video/00-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />

        {/* ── Dark overlay for legibility ── */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 60%, rgba(18,18,18,0.55) 0%, rgba(18,18,18,0.75) 100%)",
          }}
          aria-hidden="true"
        />

        {/* ── Registration marks (decorative) ── */}
        <PrintMark size={18} color="#ffffff" className="absolute top-6 left-6 opacity-20 z-10 pointer-events-none" />
        <PrintMark size={18} color="#ffffff" className="absolute top-6 right-6 opacity-20 z-10 pointer-events-none" />
        <PrintMark size={18} color="#ffffff" className="absolute bottom-6 left-6 opacity-20 z-10 pointer-events-none" />
        <PrintMark size={18} color="#ffffff" className="absolute bottom-6 right-6 opacity-20 z-10 pointer-events-none" />

        {/* ── Content ── */}
        <div className="relative z-10 max-w-content mx-auto w-full px-6 md:px-10">
          <h1
            className="text-white font-sans font-bold leading-none tracking-tight mb-6"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 8.5rem)",
              letterSpacing: "-0.04em",
              textShadow: "0 2px 40px rgba(0,0,0,0.4)",
            }}
          >
            Из файла —<br />в руки.
          </h1>

          <p
            className="text-white/80 mb-10 leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", maxWidth: "36rem" }}
          >
            Типография полного цикла в Кишинёве: дизайн, печать и послепечатная обработка в одном цехе.
          </p>

          <div className="flex flex-wrap gap-4">
            {/* Primary CTA */}
            <a
              href={ROUTES.order}
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-sans font-semibold text-body transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{ backgroundColor: "#D6307F" }}
            >
              Рассчитать заказ
            </a>

            {/* Secondary CTA */}
            <a
              href={ROUTES.prepress}
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-sans font-semibold text-body border border-white/60 hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Загрузить макет
            </a>
          </div>
        </div>
      </section>

      <CMYKBar />

      {/* ── SCROLL STORY ─────────────────────────────────────── */}
      <ScrollVideo />

      <CMYKBar />

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="bg-ink text-paper py-16 md:py-24 px-6 md:px-10 relative">
        <div className="max-w-content mx-auto">
          <SheetLabel sheet={2} total={8} tech="Цифры" className="text-mid mb-12 block" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">

            {/* Win95 window 1 */}
            <div className="border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dfdfdf]">
              {/* Title bar */}
              <div className="bg-[#D6307F] flex items-center justify-between px-2 py-1">
                <span className="text-white text-xs font-bold truncate">Заказы</span>
                <span className="flex gap-[2px]">
                  <button className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] leading-none flex items-center justify-center text-[#121212]">_</button>
                  <button className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] leading-none flex items-center justify-center text-[#121212]">□</button>
                  <button className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] leading-none flex items-center justify-center text-[#121212] font-bold">X</button>
                </span>
              </div>
              {/* Content */}
              <div className="px-6 py-6">
                <p className="text-[#121212] font-bold leading-none mb-2 whitespace-nowrap" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}>
                  260 000+
                </p>
                <p className="text-caption text-[#D6307F] uppercase tracking-widest font-semibold mb-2">успешных заказов</p>
                <p className="text-body text-[#444] leading-snug">выполнено и доставлено клиентам</p>
              </div>
            </div>

            {/* Win95 window 2 */}
            <div className="border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dfdfdf]">
              <div className="bg-[#000080] flex items-center justify-between px-2 py-1">
                <span className="text-white text-xs font-bold truncate">Клиенты</span>
                <span className="flex gap-[2px]">
                  <button className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] leading-none flex items-center justify-center text-[#121212]">_</button>
                  <button className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] leading-none flex items-center justify-center text-[#121212]">□</button>
                  <button className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] leading-none flex items-center justify-center text-[#121212] font-bold">X</button>
                </span>
              </div>
              <div className="px-6 py-6">
                <p className="text-[#121212] font-bold leading-none mb-2 whitespace-nowrap" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}>
                  2 200+
                </p>
                <p className="text-caption text-[#000080] uppercase tracking-widest font-semibold mb-2">компаний</p>
                <p className="text-body text-[#444] leading-snug">регулярно доверяют нам свои тиражи</p>
              </div>
            </div>

            {/* Win95 window 3 */}
            <div className="border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dfdfdf]">
              <div className="bg-[#D6307F] flex items-center justify-between px-2 py-1">
                <span className="text-white text-xs font-bold truncate">Производство</span>
                <span className="flex gap-[2px]">
                  <button className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] leading-none flex items-center justify-center text-[#121212]">_</button>
                  <button className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] leading-none flex items-center justify-center text-[#121212]">□</button>
                  <button className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] leading-none flex items-center justify-center text-[#121212] font-bold">X</button>
                </span>
              </div>
              <div className="px-6 py-6">
                <p className="text-[#121212] font-bold leading-none mb-2 whitespace-nowrap" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}>
                  2 500+ м²
                </p>
                <p className="text-caption text-[#D6307F] uppercase tracking-widest font-semibold mb-2">площадей</p>
                <p className="text-body text-[#444] leading-snug">собственных производственных площадей</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CATALOG PREVIEW ──────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 md:px-10 bg-paper">
        <div className="max-w-content mx-auto">
          <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
            <div>
              <SheetLabel sheet={3} total={8} tech="Продукция" className="mb-4 block reveal" />
              <h2 className="text-headline text-ink font-700 reveal">
                Что мы печатаем
              </h2>
            </div>
            <Link
              href={ROUTES.catalog}
              className="text-body text-magenta hover:text-ink transition-colors font-600 reveal"
            >
              Весь каталог →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-mid">
            {FEATURED_ITEMS.map((item) => (
              <Link
                key={item.slug}
                href={`${ROUTES.catalog}?filter=${item.slug}`}
                className="bg-paper hover:bg-ink hover:text-paper transition-colors group"
              >
                {/* Catalog item photo — src resolved server-side */}
                <div className="aspect-[4/5] relative overflow-hidden">
                  <MediaSlot
                    src={catalogMedia[`catalog-${item.slug}`]?.src ?? null}
                    isTemp={catalogMedia[`catalog-${item.slug}`]?.isTemp}
                    alt={item.title.ru}
                    expectedRatio="4:5"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="absolute inset-0 w-full h-full group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="text-body font-600 group-hover:text-paper transition-colors leading-tight">
                    {item.title.ru}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CMYKBar />

      {/* ── CLIENTS TICKER ───────────────────────────────────── */}
      <section className="py-12 bg-paper border-t border-mid">
        <div className="mb-6 px-6 md:px-10">
          <SheetLabel sheet={4} total={8} tech="Клиенты" className="block" />
        </div>
        <ClientsTicker />
      </section>

      {/* ── FOR DESIGNERS ────────────────────────────────────── */}
      <section className="bg-ink text-paper py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
        {/* Halftone bg */}
        <div className="absolute inset-0 bg-halftone opacity-5 pointer-events-none" aria-hidden="true" />

        <div className="max-w-content mx-auto relative">
          <SheetLabel sheet={5} total={8} tech="Макеты" className="text-mid mb-8 block reveal" />

          <div className="md:grid md:grid-cols-2 md:gap-16 items-end">
            <div>
              <h2 className="text-headline text-paper font-700 mb-6 reveal">
                Макет прошёл — тираж вышел без сюрпризов.
              </h2>
              <p className="text-body text-mid mb-8 reveal">
                Форматы CDR, AI, EPS, TIFF, PDF. Вылеты 2 мм, безопасная зона 3–5 мм,
                текст в кривых, CMYK 300%. Интерактивная схема и чек-лист — на странице подготовки.
              </p>
              <Button as="a" href={ROUTES.prepress} variant="outline" className="border-paper text-paper hover:bg-paper hover:text-ink reveal">
                Требования к макетам
              </Button>
            </div>

            <div className="mt-12 md:mt-0">
              {/* Bleed diagram preview — stylised */}
              <div className="border border-mid/30 p-8 relative">
                <PrintMark size={14} color="#7A7469" className="absolute top-3 left-3 opacity-50" />
                <PrintMark size={14} color="#7A7469" className="absolute top-3 right-3 opacity-50" />
                <PrintMark size={14} color="#7A7469" className="absolute bottom-3 left-3 opacity-50" />
                <PrintMark size={14} color="#7A7469" className="absolute bottom-3 right-3 opacity-50" />

                <div className="border border-dashed border-magenta/60 p-6">
                  <div className="border border-mid/30 p-4 min-h-[120px] flex items-center justify-center">
                    <span className="sheet-label text-mid text-center">
                      БЕЗОПАСНАЯ ЗОНА 3–5 мм
                      <br />
                      <span className="text-mid/40 mt-1 block">от края реза</span>
                    </span>
                  </div>
                </div>
                <p className="sheet-label text-mid mt-3 text-center">ВЫЛЕТ 2 мм · ЛИНИЯ РЕЗА</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ──────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 md:px-10 bg-paper">
        <div className="max-w-content mx-auto">
          <SheetLabel sheet={6} total={8} tech="Контакт" className="mb-8 block reveal" />

          <div className="md:grid md:grid-cols-2 md:gap-16 items-start">
            <div>
              <h2 className="text-headline text-ink font-700 mb-4 reveal">
                Расскажите, что печатаем.
              </h2>
              <p className="text-body text-muted mb-8 reveal">
                Оставьте заявку или напишите напрямую — менеджер ответит и поможет выбрать технологию.
              </p>

              <div className="flex flex-col gap-3 text-body reveal">
                <a
                  href={`tel:${SITE.phone.main}`}
                  className="hover:text-magenta transition-colors"
                >
                  {SITE.phone.mainFormatted}
                </a>
                <a
                  href={`tel:${SITE.phone.mobile}`}
                  className="hover:text-magenta transition-colors"
                >
                  {SITE.phone.mobileFormatted}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-magenta transition-colors"
                >
                  {SITE.email}
                </a>
                <p className="text-muted">
                  {SITE.address.street}, {SITE.address.building},{" "}
                  {SITE.address.city}
                </p>
              </div>
            </div>

            {/* Short form */}
            <div className="mt-12 md:mt-0">
              <QuickContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function QuickContactForm() {
  return (
    /* Win95 window wrapper */
    <div className="border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dfdfdf]">
      {/* Title bar */}
      <div className="bg-[#000080] flex items-center justify-between px-2 py-1">
        <span className="text-white text-xs font-bold">Быстрая заявка</span>
        <span className="flex gap-[2px]">
          <button className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] leading-none flex items-center justify-center text-[#121212]">_</button>
          <button className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] leading-none flex items-center justify-center text-[#121212]">□</button>
          <button className="w-4 h-4 bg-[#dfdfdf] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] leading-none flex items-center justify-center text-[#121212] font-bold">X</button>
        </span>
      </div>
      {/* Form body */}
      <div className="p-4">
        <form
          action={ROUTES.order}
          method="GET"
          className="flex flex-col gap-4"
          aria-label="Быстрая заявка"
        >
          {/* Honeypot */}
          <input type="text" name="_hp" tabIndex={-1} aria-hidden="true" className="hidden" />

          <div className="flex flex-col gap-1">
            <label htmlFor="quick-name" className="sheet-label text-[#121212]">Имя</label>
            <input
              id="quick-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="bg-white text-[#121212] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white px-4 py-3 outline-none text-body"
              placeholder="Ваше имя"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="quick-phone" className="sheet-label text-[#121212]">Телефон</label>
            <input
              id="quick-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              className="bg-white text-[#121212] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white px-4 py-3 outline-none text-body"
              placeholder="+373 xx xxx xxx"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="quick-comment" className="sheet-label text-[#121212]">Что печатаем</label>
            <textarea
              id="quick-comment"
              name="comment"
              rows={3}
              className="bg-white text-[#121212] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white px-4 py-3 outline-none resize-none text-body"
              placeholder="Кратко опишите задачу"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Рассчитать заказ
          </Button>

          <p className="text-caption text-[#444]">
            Форма ведёт на страницу расчёта. Данные не передаются третьим лицам.
          </p>
        </form>
      </div>
    </div>
  );
}

