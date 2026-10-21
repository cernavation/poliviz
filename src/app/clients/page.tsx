import type { Metadata } from "next";
import { CLIENTS_BY_CATEGORY } from "../../../content/clients.config";
import { CASES_VISIBLE } from "../../../content/cases.config";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { PrintMark } from "@/components/ui/PrintMark";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "../../../content/routes";
import { SITE } from "../../../content/site.config";

export const metadata: Metadata = {
  title: "Клиенты типографии",
  description: `Более 700 компаний уже печатают с ${SITE.name}: Samsung, LG, Nokia, Pepsi, Air Moldova, Cricova и другие. Кишинёв.`,
};

export default function ClientsPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />

        <div className="max-w-content mx-auto">
          <SheetLabel sheet={1} total={2} tech="Клиенты" className="mb-8 block" />
          <h1 className="text-display text-ink mb-6 max-w-3xl">
            Более 2200 компаний уже печатают с нами.
          </h1>
          <p className="text-title text-muted max-w-2xl" style={{ fontWeight: 400 }}>
            От компаний с мировым именем до фирм, только вышедших на рынок.
          </p>
        </div>
      </section>

      <CMYKBar />

      {/* ── CLIENTS GRID BY CATEGORY ───────────────────────────── */}
      <section className="bg-paper py-12 md:py-20 px-6 md:px-10">
        <div className="max-w-content mx-auto">
          <div className="flex flex-col gap-16">
            {CLIENTS_BY_CATEGORY.map((group) => (
              <div key={group.id} className="border-t border-mid pt-10">
                {/* Category label */}
                <p className="sheet-label text-muted mb-8">{group.label}</p>

                {/* Logo grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 md:gap-8">
                  {group.clients.map((client) => (
                    <div
                      key={client.slug}
                      className="flex items-center justify-center p-4 aspect-[3/2]"
                      title={client.name}
                    >
                      <img
                        src={`/media/clients/${client.slug}.svg`}
                        alt={client.name}
                        className="max-h-10 w-full object-contain grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                        draggable={false}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases — hidden when empty */}
      {CASES_VISIBLE && (
        <section className="bg-mid py-16 px-6 md:px-10">
          <div className="max-w-content mx-auto">
            <SheetLabel sheet={2} total={2} tech="Кейсы" className="mb-8 block" />
            <h2 className="text-headline text-ink mb-8">Избранные проекты</h2>
            {/* TODO(client): добавить кейсы в cases.config.ts */}
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="bg-ink text-paper py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-content mx-auto flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div>
            <p className="text-headline text-paper font-700 mb-2">Стать клиентом</p>
            <p className="text-body text-mid">Расскажите задачу — подберём технологию и рассчитаем.</p>
          </div>
          <Button as="a" href={ROUTES.order} variant="outline" className="border-paper text-paper hover:bg-paper hover:text-ink flex-shrink-0">
            Рассчитать заказ
          </Button>
        </div>
      </section>
    </>
  );
}
