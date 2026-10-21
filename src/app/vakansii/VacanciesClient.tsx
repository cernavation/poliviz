"use client";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { PrintMark } from "@/components/ui/PrintMark";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Button } from "@/components/ui/Button";
import { SITE } from "../../../content/site.config";
import type { MediaResult } from "@/lib/resolve-media";
import { useLang } from "@/context/LanguageContext";

interface Props {
  handsMedia: MediaResult;
}

export function VacanciesClient({ handsMedia }: Props) {
  const { lang } = useLang();

  const h1 = lang === "ro" ? "Cariere." : lang === "en" ? "Careers." : "Вакансии.";
  const sub = lang === "ro" ? "În prezent nu sunt poziții deschise." : lang === "en" ? "There are currently no open positions." : "Сейчас открытых вакансий нет.";
  const tech1 = lang === "ro" ? "Cariere" : lang === "en" ? "Careers" : "Вакансии";
  const tech2 = lang === "ro" ? "CV" : lang === "en" ? "Resume" : "Резюме";
  const formTitle = lang === "ro" ? "Doriți să lucrați într-o tipografie modernă?" : lang === "en" ? "Want to work in our modern print shop?" : "Хотите работать в типографии?";
  const formSub = lang === "ro"
    ? "Trimiteți CV-ul — îl vom salva în baza noastră și vă vom contacta."
    : lang === "en"
    ? "Send your resume — we will save it in our database and contact you."
    : "Пришлите резюме — сохраним в базе и свяжемся при появлении подходящей позиции.";

  const nameLabel = lang === "ro" ? "Nume" : lang === "en" ? "Name" : "Имя";
  const namePh = lang === "ro" ? "Numele dvs." : lang === "en" ? "Your name" : "Ваше имя";
  const posLabel = lang === "ro" ? "Specialitatea" : lang === "en" ? "Position / Specialization" : "Специальность";
  const posPh = lang === "ro" ? "De ex.: operator tipar offset" : lang === "en" ? "E.g.: offset press operator" : "Например: оператор офсетной печати";
  const msgLabel = lang === "ro" ? "Despre dvs. pe scurt" : lang === "en" ? "Briefly about yourself" : "О себе кратко";
  const msgPh = lang === "ro" ? "Experiență, așteptări, disponibilitate" : lang === "en" ? "Experience, background, expectations" : "Опыт, специализация, ожидания";
  const submitBtn = lang === "ro" ? "Trimite CV" : lang === "en" ? "Submit resume" : "Отправить резюме";
  const altText = lang === "ro" ? "Sau scrieți direct la:" : lang === "en" ? "Or write directly to:" : "Или напишите напрямую:";
  const photoCap = lang === "ro" ? `Producție, ${SITE.address.city}` : lang === "en" ? `Production facility, ${SITE.address.city}` : `Производство, ${SITE.address.city}`;

  return (
    <>
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />

        <div className="max-w-content mx-auto">
          <SheetLabel sheet={1} total={2} tech={tech1} className="mb-8 block" />
          <h1 className="text-display text-ink mb-6 max-w-3xl">{h1}</h1>
          <p className="text-title text-muted max-w-2xl" style={{ fontWeight: 400 }}>
            {sub}
          </p>
        </div>
      </section>

      <CMYKBar />

      <section className="bg-paper py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-content mx-auto md:grid md:grid-cols-[1fr_1fr] md:gap-16 items-start">
          <div>
            <SheetLabel sheet={2} total={2} tech={tech2} className="mb-6 block" />
            <h2 className="text-headline text-ink mb-4">
              {formTitle}
            </h2>
            <p className="text-body text-muted mb-8 max-w-prose">
              {formSub}
            </p>

            <form
              action={`mailto:${SITE.email}?subject=CV`}
              method="GET"
              className="flex flex-col gap-4"
              aria-label="Форма отправки резюме"
            >
              <input type="text" name="_hp" tabIndex={-1} aria-hidden="true" className="hidden" />

              <div className="flex flex-col gap-1">
                <label htmlFor="vac-name" className="sheet-label text-muted">{nameLabel}</label>
                <input
                  id="vac-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="border border-mid bg-transparent px-4 py-3 text-body text-ink focus:outline-none focus:border-ink transition-colors"
                  placeholder={namePh}
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
                <label htmlFor="vac-position" className="sheet-label text-muted">{posLabel}</label>
                <input
                  id="vac-position"
                  name="position"
                  type="text"
                  required
                  className="border border-mid bg-transparent px-4 py-3 text-body text-ink focus:outline-none focus:border-ink transition-colors"
                  placeholder={posPh}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="vac-message" className="sheet-label text-muted">{msgLabel}</label>
                <textarea
                  id="vac-message"
                  name="message"
                  rows={4}
                  className="border border-mid bg-transparent px-4 py-3 text-body text-ink focus:outline-none focus:border-ink transition-colors resize-none"
                  placeholder={msgPh}
                />
              </div>

              <Button type="submit" variant="primary">
                {submitBtn}
              </Button>

              <p className="text-caption text-muted">
                {altText}{" "}
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
                alt="Производство Poliviz"
                expectedRatio="4:3"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <p className="text-caption text-muted mt-3">
              {photoCap}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
