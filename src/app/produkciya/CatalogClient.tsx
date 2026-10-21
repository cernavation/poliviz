"use client";
import { useState, useMemo } from "react";
import { CATALOG, CATALOG_FILTER_LABELS, TECH_FILTER_LABELS } from "../../../content/catalog.config";
import type { CatalogCategory, TechTag } from "../../../content/catalog.config";
import { ROUTES } from "@/lib/routes";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Button } from "@/components/ui/Button";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { PrintMark } from "@/components/ui/PrintMark";
import { Win95Window } from "@/components/ui/Win95Window";
import type { MediaResult } from "@/lib/resolve-media";
import { useLang } from "@/context/LanguageContext";

interface CatalogClientProps {
  resolvedMedia: Record<string, MediaResult>;
}

export function CatalogClient({ resolvedMedia }: CatalogClientProps) {
  const { t, lang, localize } = useLang();
  const [activeCat, setActiveCat] = useState<CatalogCategory | null>(null);
  const [activeTech, setActiveTech] = useState<TechTag | null>(null);
  const [panel, setPanel] = useState<(typeof CATALOG)[0] | null>(null);

  const filtered = useMemo(() => {
    return CATALOG.filter((item) => {
      const catOk = !activeCat || item.category === activeCat;
      const techOk = !activeTech || item.technologies.includes(activeTech);
      return catOk && techOk;
    });
  }, [activeCat, activeTech]);

  const categories = Object.entries(CATALOG_FILTER_LABELS) as [CatalogCategory, { ru: string; ro: string; en: string }][];
  const techs = Object.entries(TECH_FILTER_LABELS) as [TechTag, { ru: string; ro: string; en: string }][];

  return (
    <>
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10 relative">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />
        <div className="max-w-content mx-auto">
          <SheetLabel sheet={1} total={4} tech={t.nav.catalog} className="mb-8 block" />
          <h1 className="text-display text-ink mb-4">{t.catalog_page.hero_h1}</h1>
          <p className="text-title text-muted max-w-2xl" style={{ fontWeight: 400 }}>
            {CATALOG.length} {t.catalog_page.positions}. {t.catalog_page.hero_sub}
          </p>
        </div>
      </section>

      <CMYKBar />

      {/* Filters */}
      <section className="bg-paper border-b border-mid px-6 md:px-10 py-6">
        <div className="max-w-content mx-auto">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setActiveCat(null)}
              className={`text-caption px-4 py-2 border border-mid transition-colors ${!activeCat ? "bg-ink text-paper" : "text-muted hover:border-ink hover:text-ink"}`}
            >
              {t.catalog_page.all_types}
            </button>
            {categories.map(([id, labels]) => (
              <button
                key={id}
                onClick={() => setActiveCat(activeCat === id ? null : id)}
                className={`text-caption px-4 py-2 border border-mid transition-colors ${activeCat === id ? "bg-ink text-paper" : "text-muted hover:border-ink hover:text-ink"}`}
              >
                {labels[lang] || labels.ru}
              </button>
            ))}
          </div>

          {/* Tech filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTech(null)}
              className={`text-caption px-4 py-2 border border-mid transition-colors ${!activeTech ? "bg-magenta text-paper" : "text-muted hover:border-magenta hover:text-magenta"}`}
            >
              {t.catalog_page.all_tech}
            </button>
            {techs.map(([id, labels]) => (
              <button
                key={id}
                onClick={() => setActiveTech(activeTech === id ? null : id)}
                className={`text-caption px-4 py-2 border border-mid transition-colors ${activeTech === id ? "bg-magenta text-paper border-magenta" : "text-muted hover:border-magenta hover:text-magenta"}`}
              >
                {labels[lang] || labels.ru}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-paper py-8 px-6 md:px-10">
        <div className="max-w-content mx-auto">
          <p className="text-caption text-muted mb-6">
            {filtered.length} {t.catalog_page.positions}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filtered.map((item) => {
              const itemTitle = item.title[lang] || item.title.ru;
              return (
                <div
                  key={item.slug}
                  className="block group"
                >
                  <Win95Window
                    variant="navy"
                    title={`${item.slug}.jpg`}
                    bodyClassName="p-2 bg-[#dfdfdf] flex flex-col h-full"
                  >
                    <button
                      onClick={() => setPanel(item)}
                      className="aspect-[4/5] mb-2 relative overflow-hidden border border-[#808080] bg-[#F4F1EA] block w-full hover:opacity-95"
                      aria-label={`Открыть: ${itemTitle}`}
                    >
                      <MediaSlot
                        src={resolvedMedia[`catalog-${item.slug}`]?.src ?? null}
                        isTemp={resolvedMedia[`catalog-${item.slug}`]?.isTemp}
                        alt={itemTitle}
                        slotId={`catalog-${item.slug}`}
                        expectedRatio="4:5"
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="absolute inset-0 w-full h-full"
                      />
                    </button>
                    <p className="text-body font-bold text-[#121212] mb-3 flex-1">{itemTitle}</p>
                    <Button
                      as="a"
                      href={localize(`${ROUTES.order}?product=${item.slug}&name=${encodeURIComponent(itemTitle)}`)}
                      variant="primary"
                      className="text-caption w-full text-center"
                    >
                      {t.catalog_page.want_this}
                    </Button>
                  </Win95Window>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-title text-muted">{t.catalog_page.empty}</p>
              <button
                onClick={() => { setActiveCat(null); setActiveTech(null); }}
                className="mt-4 text-body text-magenta hover:text-ink transition-colors"
              >
                {t.catalog_page.reset}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Slide-out panel */}
      {panel && (
        <>
          <div
            className="fixed inset-0 bg-ink/50 z-40"
            onClick={() => setPanel(null)}
            aria-hidden="true"
          />
          <aside
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#dfdfdf] border-l-2 border-l-white border-t-2 border-t-white border-b-2 border-b-[#808080] z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label={panel.title[lang] || panel.title.ru}
          >
            <div className="p-6 md:p-8">
              <button
                onClick={() => setPanel(null)}
                className="mb-8 text-caption text-muted hover:text-ink transition-colors"
                aria-label="Закрыть"
              >
                {t.catalog_page.close}
              </button>

              <div className="aspect-[4/5] mb-6 relative overflow-hidden">
                <MediaSlot
                  src={resolvedMedia[`catalog-${panel.slug}`]?.src ?? null}
                  isTemp={resolvedMedia[`catalog-${panel.slug}`]?.isTemp}
                  alt={panel.title[lang] || panel.title.ru}
                  slotId={`catalog-${panel.slug}`}
                  expectedRatio="4:5"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              <h2 className="text-headline font-700 text-ink mb-4">{panel.title[lang] || panel.title.ru}</h2>

              <div className="mb-6">
                <p className="sheet-label text-muted mb-3">{t.catalog_page.technologies}</p>
                <div className="flex flex-wrap gap-2">
                  {panel.technologies.map((tech) => (
                    <span key={tech} className="text-caption text-ink border border-mid px-3 py-1">
                      {TECH_FILTER_LABELS[tech][lang] || TECH_FILTER_LABELS[tech].ru}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                as="a"
                href={localize(`${ROUTES.order}?product=${panel.slug}&name=${encodeURIComponent(panel.title[lang] || panel.title.ru)}`)}
                variant="primary"
                className="w-full"
              >
                {t.catalog_page.want_this_long}
              </Button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
