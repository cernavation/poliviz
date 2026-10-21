"use client";
import { CLIENTS_BY_CATEGORY } from "../../../content/clients.config";
import { CASES_VISIBLE } from "../../../content/cases.config";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { PrintMark } from "@/components/ui/PrintMark";
import { Button } from "@/components/ui/Button";
import { Win95Window } from "@/components/ui/Win95Window";
import { ROUTES } from "../../../content/routes";
import { useLang } from "@/context/LanguageContext";

const CAT_LABEL: Record<string, string> = {
  tech: "cat_tech", retail: "cat_retail", transport: "cat_transport",
  wine: "cat_wine", food: "cat_food", finance: "cat_finance",
};

export default function ClientsPage() {
  const { t } = useLang();
  const cp = t.clients_page;
  return (
    <>
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />
        <div className="max-w-content mx-auto">
          <SheetLabel sheet={1} total={2} tech="Клиенты" className="mb-8 block" />
          <h1 className="text-display text-ink mb-6 max-w-3xl">{cp.hero_h1}</h1>
          <p className="text-title text-muted max-w-2xl" style={{ fontWeight: 400 }}>{cp.hero_sub}</p>
        </div>
      </section>
      <CMYKBar />
      <section className="bg-paper py-12 md:py-20 px-6 md:px-10">
        <div className="max-w-content mx-auto flex flex-col gap-10">
          {CLIENTS_BY_CATEGORY.map((group) => (
            <Win95Window key={group.id}
              title={(cp as Record<string, string>)[CAT_LABEL[group.id]] ?? group.label}
              variant="navy" bodyClassName="p-6">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6">
                {group.clients.map((client) => (
                  <div key={client.slug} className="flex items-center justify-center p-4 aspect-[3/2]" title={client.name}>
                    <img src={`/media/clients/${client.slug}.svg`} alt={client.name}
                      className="max-h-10 w-full object-contain grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                      draggable={false} loading="lazy" />
                  </div>
                ))}
              </div>
            </Win95Window>
          ))}
        </div>
      </section>
      {CASES_VISIBLE && (
        <section className="bg-mid py-16 px-6 md:px-10">
          <div className="max-w-content mx-auto">
            <h2 className="text-headline text-ink mb-8">Избранные проекты</h2>
          </div>
        </section>
      )}
      <section className="bg-ink text-paper py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-content mx-auto flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div>
            <p className="text-headline text-paper font-700 mb-2">{cp.cta_title}</p>
            <p className="text-body text-mid">{cp.cta_sub}</p>
          </div>
          <Button as="a" href={ROUTES.order} variant="primary" className="flex-shrink-0">{cp.cta_btn}</Button>
        </div>
      </section>
    </>
  );
}
