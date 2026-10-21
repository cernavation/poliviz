"use client";
import Link from "next/link";
import { SITE } from "../../../content/site.config";
import { ROUTES } from "@/lib/routes";
import { ScrollVideo } from "@/components/home/ScrollVideo";
import { ClientsTicker } from "@/components/home/ClientsTicker";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { PrintMark } from "@/components/ui/PrintMark";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Win95Window } from "@/components/ui/Win95Window";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/context/LanguageContext";
import type { MediaResult } from "@/lib/resolve-media";

/* Win95 Hero button classes */
const heroBtnPrimary =
  "bg-[#D6307F] !text-white font-bold border-2 border-t-[#ff8cc0] border-l-[#ff8cc0] border-b-[#8a1a4f] border-r-[#8a1a4f] active:border-t-[#8a1a4f] active:border-l-[#8a1a4f] active:border-b-[#ff8cc0] active:border-r-[#ff8cc0] active:translate-y-[1px] px-6 py-3 rounded-none";

const heroBtnSecondary =
  "bg-[#dfdfdf] !text-[#121212] font-bold border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:bg-[#d0d0d0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white active:translate-y-[1px] px-6 py-3 rounded-none";

interface Props {
  featuredItems: { slug: string; title: { ru: string; ro: string; en: string } }[];
  catalogMedia: Record<string, MediaResult>;
}

/* Win95 inline form */
function QuickContactForm() {
  const { t, localize } = useLang();
  return (
    <Win95Window title={t.quick_form.title} variant="navy" bodyClassName="p-4">
      <form
        action={localize(ROUTES.order)}
        method="GET"
        className="flex flex-col gap-4"
        aria-label={t.quick_form.title}
      >
        <input type="text" name="_hp" tabIndex={-1} aria-hidden="true" className="hidden" />

        <div className="flex flex-col gap-1">
          <label htmlFor="quick-name" className="sheet-label text-[#121212]">{t.quick_form.name}</label>
          <input id="quick-name" name="name" type="text" autoComplete="name" required
            className="bg-white text-[#121212] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white px-4 py-3 outline-none text-body"
            placeholder={t.quick_form.name_ph} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="quick-phone" className="sheet-label text-[#121212]">{t.quick_form.phone}</label>
          <input id="quick-phone" name="phone" type="tel" autoComplete="tel" required
            className="bg-white text-[#121212] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white px-4 py-3 outline-none text-body"
            placeholder={t.quick_form.phone_ph} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="quick-comment" className="sheet-label text-[#121212]">{t.quick_form.what}</label>
          <textarea id="quick-comment" name="comment" rows={3}
            className="bg-white text-[#121212] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white px-4 py-3 outline-none resize-none text-body"
            placeholder={t.quick_form.what_ph} />
        </div>

        <Button type="submit" variant="primary" className="w-full">{t.quick_form.submit}</Button>
        <p className="text-caption text-[#444]">{t.quick_form.disclaimer}</p>
      </form>
    </Win95Window>
  );
}

export function HomePageClient({ featuredItems, catalogMedia }: Props) {
  const { t, lang, localize } = useLang();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end pb-16 md:pb-24 bg-[#121212]">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/media/video/00-hero.mp4"
          autoPlay loop muted playsInline aria-hidden="true"
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(18,18,18,0.55) 0%, rgba(18,18,18,0.75) 100%)" }}
          aria-hidden="true"
        />
        <PrintMark size={18} color="#ffffff" className="absolute top-6 left-6 opacity-20 z-10 pointer-events-none" />
        <PrintMark size={18} color="#ffffff" className="absolute top-6 right-6 opacity-20 z-10 pointer-events-none" />
        <PrintMark size={18} color="#ffffff" className="absolute bottom-6 left-6 opacity-20 z-10 pointer-events-none" />
        <PrintMark size={18} color="#ffffff" className="absolute bottom-6 right-6 opacity-20 z-10 pointer-events-none" />

        <div className="relative z-10 max-w-content mx-auto w-full px-6 md:px-10">
          <SheetLabel sheet={1} total={6} tech={lang === "ro" ? "Tipografie" : lang === "en" ? "Typography" : "Типография"} className="text-white/80 mb-6 block" />
          <h1
            className="text-white font-sans font-bold leading-none tracking-tight mb-6"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8.5rem)", letterSpacing: "-0.04em", textShadow: "0 2px 40px rgba(0,0,0,0.4)" }}
          >
            {t.hero.headline.split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h1>
          <p
            className="text-white/80 mb-10 leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", maxWidth: "36rem" }}
          >
            {t.hero.subline}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={localize(ROUTES.order)}
              className="bg-[#D6307F] !text-white font-bold border-2 border-t-[#ff8cc0] border-l-[#ff8cc0] border-b-[#8a1a4f] border-r-[#8a1a4f] active:border-t-[#8a1a4f] active:border-l-[#8a1a4f] active:border-b-[#ff8cc0] active:border-r-[#ff8cc0] active:translate-y-[1px] px-6 py-3 rounded-none"
            >
              {t.hero.cta_order}
            </a>
            <a
              href={localize(ROUTES.prepress)}
              className="bg-[#dfdfdf] !text-[#121212] font-bold border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:bg-[#d0d0d0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white active:translate-y-[1px] px-6 py-3 rounded-none"
            >
              {t.hero.cta_prepress}
            </a>
          </div>
        </div>
      </section>

      {/* ── SCROLL STORY ─────────────────────────────────────── */}
      <ScrollVideo />

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="bg-[#121212] text-paper py-16 md:py-24 px-6 md:px-10 relative">
        <div className="max-w-content mx-auto">
          <SheetLabel sheet={2} total={6} tech={t.stats.orders_win} className="text-white/80 mb-12 block" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">

            <Win95Window title={t.stats.orders_win} variant="navy" bodyClassName="px-6 py-6">
              <p className="text-[#121212] font-bold leading-none mb-2 whitespace-nowrap" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}>
                {t.stats.orders_num}
              </p>
              <p className="text-caption text-[#D6307F] uppercase tracking-widest font-semibold mb-2">{t.stats.orders_label}</p>
              <p className="text-body text-[#444] leading-snug">{t.stats.orders_sub}</p>
            </Win95Window>

            <Win95Window title={t.stats.clients_win} variant="navy" bodyClassName="px-6 py-6">
              <p className="text-[#121212] font-bold leading-none mb-2 whitespace-nowrap" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}>
                {t.stats.clients_num}
              </p>
              <p className="text-caption text-[#D6307F] uppercase tracking-widest font-semibold mb-2">{t.stats.clients_label}</p>
              <p className="text-body text-[#444] leading-snug">{t.stats.clients_sub}</p>
            </Win95Window>

            <Win95Window title={t.stats.area_win} variant="navy" bodyClassName="px-6 py-6">
              <p className="text-[#121212] font-bold leading-none mb-2 whitespace-nowrap" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}>
                {t.stats.area_num}
              </p>
              <p className="text-caption text-[#D6307F] uppercase tracking-widest font-semibold mb-2">{t.stats.area_label}</p>
              <p className="text-body text-[#444] leading-snug">{t.stats.area_sub}</p>
            </Win95Window>

          </div>
        </div>
      </section>

      {/* ── CATALOG PREVIEW ──────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 md:px-10 bg-paper">
        <div className="max-w-content mx-auto">
          <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
            <div>
              <SheetLabel sheet={3} total={6} tech={t.catalog_section.label} className="mb-4 block reveal" />
              <h2 className="text-headline text-ink font-700 reveal">{t.catalog_section.heading}</h2>
            </div>
            <Link href={localize(ROUTES.catalog)} className="text-body text-magenta hover:text-ink transition-colors font-600 reveal">
              {t.catalog_section.all_link}
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {featuredItems.map((item) => {
              const itemTitle = (item.title as any)[lang] || item.title.ru;
              return (
                <Link
                  key={item.slug}
                  href={localize(`${ROUTES.catalog}?filter=${item.slug}`)}
                  className="block hover:opacity-95 transition-none group"
                >
                  <Win95Window
                    variant="navy"
                    title={`${item.slug}.jpg`}
                    bodyClassName="p-2 bg-[#dfdfdf]"
                  >
                    <div className="aspect-[4/5] relative overflow-hidden border border-[#808080] bg-white">
                      <MediaSlot
                        src={catalogMedia[`catalog-${item.slug}`]?.src ?? null}
                        isTemp={catalogMedia[`catalog-${item.slug}`]?.isTemp}
                        alt={itemTitle}
                        expectedRatio="4:5"
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                    <div className="pt-2 px-1">
                      <p className="text-body font-bold text-[#121212] leading-tight truncate">{itemTitle}</p>
                    </div>
                  </Win95Window>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CMYKBar />

      {/* ── CLIENTS TICKER ───────────────────────────────────── */}
      <section className="py-12 bg-paper border-t border-mid">
        <div className="mb-6 px-6 md:px-10">
          <SheetLabel sheet={4} total={6} tech={t.nav.clients} className="block" />
        </div>
        <ClientsTicker />
      </section>

      {/* ── FOR DESIGNERS ────────────────────────────────────── */}
      <section className="bg-[#121212] text-paper py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
        <div className="max-w-content mx-auto relative">
          <SheetLabel sheet={5} total={6} tech={t.nav.prepress} className="text-white/80 mb-8 block reveal" />
          <div className="md:grid md:grid-cols-2 md:gap-16 items-end">
            <div>
              <h2 className="text-headline text-paper font-700 mb-6 reveal">{t.prepress_section.heading}</h2>
              <p className="text-body text-white/90 mb-8 reveal">{t.prepress_section.body}</p>
              <a href={localize(ROUTES.prepress)} className={heroBtnSecondary + " reveal"}>{t.prepress_section.cta}</a>
            </div>
            <div className="mt-12 md:mt-0">
              <Win95Window variant="navy" title="maket.cdr" bodyClassName="p-4 bg-[#dfdfdf]">
                <div className="border border-[#808080] p-6 relative bg-white">
                  <PrintMark size={14} color="#7A7469" className="absolute top-3 left-3 opacity-50" />
                  <PrintMark size={14} color="#7A7469" className="absolute top-3 right-3 opacity-50" />
                  <PrintMark size={14} color="#7A7469" className="absolute bottom-3 left-3 opacity-50" />
                  <PrintMark size={14} color="#7A7469" className="absolute bottom-3 right-3 opacity-50" />
                  <div className="border border-dashed border-[#D6307F] p-6">
                    <div className="border border-[#808080]/40 p-4 min-h-[120px] flex items-center justify-center">
                      <span className="sheet-label text-[#121212] text-center font-bold">
                        {lang === "ro" ? "ZONĂ DE SIGURANȚĂ 3–5 mm" : lang === "en" ? "SAFETY ZONE 3–5 mm" : "БЕЗОПАСНАЯ ЗОНА 3–5 мм"}<br />
                        <span className="text-[#666] font-normal mt-1 block">
                          {lang === "ro" ? "de la linia de tăiere" : lang === "en" ? "from cut line" : "от края реза"}
                        </span>
                      </span>
                    </div>
                  </div>
                  <p className="sheet-label text-[#121212] font-bold mt-3 text-center">
                    {lang === "ro" ? "BLEED 2 mm · LINIE DE TĂIERE" : lang === "en" ? "BLEED 2 mm · CUT LINE" : "ВЫЛЕТ 2 мм · ЛИНИЯ РЕЗА"}
                  </p>
                </div>
              </Win95Window>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ──────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 md:px-10 bg-paper">
        <div className="max-w-content mx-auto">
          <SheetLabel sheet={6} total={6} tech={t.nav.contacts} className="mb-8 block reveal" />
          <div className="md:grid md:grid-cols-2 md:gap-16 items-start">
            <div>
              <h2 className="text-headline text-ink font-700 mb-4 reveal">{t.contact_section.heading}</h2>
              <p className="text-body text-muted mb-8 reveal">{t.contact_section.body}</p>
              <div className="flex flex-col gap-3 text-body reveal">
                <a href={`tel:${SITE.phone.main}`} className="hover:text-magenta transition-colors">{SITE.phone.mainFormatted}</a>
                <a href={`tel:${SITE.phone.mobile}`} className="hover:text-magenta transition-colors">{SITE.phone.mobileFormatted}</a>
                <a href={`mailto:${SITE.email}`} className="hover:text-magenta transition-colors">{SITE.email}</a>
                <p className="text-muted">{SITE.address.street}, {SITE.address.building}, {SITE.address.city}</p>
              </div>
            </div>
            <div className="mt-12 md:mt-0">
              <QuickContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
