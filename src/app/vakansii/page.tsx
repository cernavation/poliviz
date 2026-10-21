import type { Metadata } from "next";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { PrintMark } from "@/components/ui/PrintMark";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "../../../content/routes";
import { SITE } from "../../../content/site.config";
import { resolveMedia } from "@/lib/resolve-media";

export const metadata: Metadata = {
  title: "Вакансии",
  description: `Вакансии в типографии ${SITE.name}, Кишинёв. Открытых вакансий сейчас нет — пришлите резюме.`,
};

export default function VacanciesPage() {
  const handsMedia = resolveMedia("/media/photo/team/hands-operator.jpg", "photo-hands");

  return (
    <>
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />

        <div className="max-w-content mx-auto">
          <SheetLabel sheet={1} total={2} tech="Вакансии" className="mb-8 block" />
          <h1 className="text-display text-ink mb-6 max-w-3xl">Вакансии.</h1>
          <p className="text-title text-muted max-w-2xl" style={{ fontWeight: 400 }}>
            Сейчас открытых вакансий нет.
          </p>
        </div>
      </section>

      <CMYKBar />

      <section className="bg-paper py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-content mx-auto md:grid md:grid-cols-[1fr_1fr] md:gap-16 items-start">
          <div>
            <SheetLabel sheet={2} total={2} tech="Резюме" className="mb-6 block" />
            <h2 className="text-headline text-ink mb-4">
              Хотите работать в типографии?
            </h2>
            <p className="text-body text-muted mb-8 max-w-prose">
              Пришлите резюме — сохраним в базе и свяжемся при появлении подходящей позиции.
            </p>

            <form
              action={`mailto:${SITE.email}?subject=Резюме`}
              method="GET"
              className="flex flex-col gap-4"
              aria-label="Форма отправки резюме"
            >
              {/* Honeypot */}
              <input type="text" name="_hp" tabIndex={-1} aria-hidden="true" className="hidden" />

              <div className="flex flex-col gap-1">
                <label htmlFor="vac-name" className="sheet-label text-muted">Имя</label>
                <input
                  id="vac-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="border border-mid bg-transparent px-4 py-3 text-body text-ink focus:outline-none focus:border-ink transition-colors"
                  placeholder="Ваше имя"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="vac-email" className="sheet-label text-muted">E-mail</label>
                <input
                  id="vac-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="border border-mid bg-transparent px-4 py-3 text-body text-ink focus:outline-none focus:border-ink transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="vac-position" className="sheet-label text-muted">Специальность</label>
                <input
                  id="vac-position"
                  name="position"
                  type="text"
                  required
                  className="border border-mid bg-transparent px-4 py-3 text-body text-ink focus:outline-none focus:border-ink transition-colors"
                  placeholder="Например: оператор офсетной печати"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="vac-message" className="sheet-label text-muted">О себе кратко</label>
                <textarea
                  id="vac-message"
                  name="message"
                  rows={4}
                  className="border border-mid bg-transparent px-4 py-3 text-body text-ink focus:outline-none focus:border-ink transition-colors resize-none"
                  placeholder="Опыт, специализация, ожидания"
                />
              </div>

              <Button type="submit" variant="primary">
                Отправить резюме
              </Button>

              <p className="text-caption text-muted">
                Или напишите напрямую:{" "}
                <a href={`mailto:${SITE.email}`} className="hover:text-ink transition-colors underline">
                  {SITE.email}
                </a>
              </p>
            </form>
          </div>

          {/* Photo of operator hands */}
          <div className="mt-12 md:mt-0">
            <div className="aspect-[4/3] relative overflow-hidden">
              <MediaSlot
                src={handsMedia?.src ?? null}
                isTemp={handsMedia?.isTemp}
                alt="Руки оператора типографии за работой"
                expectedRatio="4:3"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <p className="text-caption text-muted mt-3">
              Производство, {SITE.address.city}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
