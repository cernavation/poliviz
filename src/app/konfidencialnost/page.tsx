"use client";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { PrintMark } from "@/components/ui/PrintMark";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { SITE } from "../../../content/site.config";
import { useLang } from "@/context/LanguageContext";

export default function PrivacyPage() {
  const { lang } = useLang();

  const title = lang === "ro"
    ? "Politica de confidențialitate"
    : lang === "en"
    ? "Privacy Policy"
    : "Политика конфиденциальности";

  const tech = lang === "ro" ? "Document" : lang === "en" ? "Document" : "Документ";

  const sec1 = lang === "ro" ? "1. Operatorul de date" : lang === "en" ? "1. Data Controller" : "1. Оператор данных";
  const sec2 = lang === "ro" ? "2. Ce date colectăm" : lang === "en" ? "2. What data we collect" : "2. Какие данные собираем";
  const sec2Desc = lang === "ro"
    ? "Prin formularul de contact colectăm numele, numărul de telefon, adresa de e-mail și fișierele de machetă atașate. Datele sunt utilizate exclusiv pentru procesarea cererii și comunicare."
    : lang === "en"
    ? "Through our inquiry forms we collect name, phone number, email address, and attached artwork files. Data is used solely for order processing and direct communication."
    : "Через форму обратной связи собираем имя, номер телефона, адрес e-mail и прикреплённые файлы макетов. Данные используются исключительно для обработки запроса и обратной связи.";

  const sec3 = lang === "ro" ? "3. Scopul prelucrării" : lang === "en" ? "3. Purpose of processing" : "3. Цели обработки";
  const sec3Desc = lang === "ro"
    ? "Calculul costului comenzii, negocierea condițiilor, perfectarea contractului. Datele nu sunt transmise terților."
    : lang === "en"
    ? "Order calculation, contract preparation, customer service. Data is never sold or transferred to third parties."
    : "Расчёт стоимости заказа, переговоры об условиях, оформление договора. Данные не передаются третьим лицам.";

  const sec4 = lang === "ro" ? "4. Perioada de păstrare" : lang === "en" ? "4. Retention period" : "4. Срок хранения";
  const sec4Desc = lang === "ro"
    ? "Datele se păstrează pe durata necesară executării comenzii, dar nu mai mult de 3 ani, conform legislației Republicii Moldova."
    : lang === "en"
    ? "Data is retained for the period necessary to fulfill the order, up to 3 years, according to Moldovan legislation."
    : "Данные хранятся в течение срока, необходимого для выполнения заказа, но не более 3 лет, если иное не предусмотрено законодательством Молдовы.";

  const sec5 = lang === "ro" ? "5. Drepturile utilizatorului" : lang === "en" ? "5. User rights" : "5. Права пользователя";
  const sec5Desc = lang === "ro"
    ? "Aveți dreptul de a solicita accesul, rectificarea sau ștergerea datelor dvs. personale."
    : lang === "en"
    ? "You have the right to request access, correction, or deletion of your personal data."
    : "Вы вправе запросить доступ, исправление или удаление своих персональных данных.";

  return (
    <>
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10 relative">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />

        <div className="max-w-content mx-auto">
          <SheetLabel sheet={1} total={1} tech={tech} className="mb-8 block" />
          <h1 className="text-headline text-ink mb-12">
            {title}
          </h1>

          <div className="max-w-prose flex flex-col gap-8 text-body text-ink">
            <div>
              <p className="sheet-label text-muted mb-3">{sec1}</p>
              <p>
                {SITE.name}, {SITE.address.street}, {SITE.address.building},{" "}
                {SITE.address.city}, {SITE.address.country}.{" "}
                E-mail: <a href={`mailto:${SITE.email}`} className="hover:text-magenta transition-colors">{SITE.email}</a>.
              </p>
            </div>

            <div>
              <p className="sheet-label text-muted mb-3">{sec2}</p>
              <p>{sec2Desc}</p>
            </div>

            <div>
              <p className="sheet-label text-muted mb-3">{sec3}</p>
              <p>{sec3Desc}</p>
            </div>

            <div>
              <p className="sheet-label text-muted mb-3">{sec4}</p>
              <p>{sec4Desc}</p>
            </div>

            <div>
              <p className="sheet-label text-muted mb-3">{sec5}</p>
              <p>
                {sec5Desc} E-mail:{" "}
                <a href={`mailto:${SITE.email}`} className="hover:text-magenta transition-colors">{SITE.email}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
      <CMYKBar />
    </>
  );
}
