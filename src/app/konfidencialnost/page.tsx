import type { Metadata } from "next";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { PrintMark } from "@/components/ui/PrintMark";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { SITE } from "../../../content/site.config";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: `Политика конфиденциальности ${SITE.name}.`,
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-paper py-16 md:py-24 px-6 md:px-10 relative">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />

        <div className="max-w-content mx-auto">
          <SheetLabel sheet={1} total={1} tech="Документ" className="mb-8 block" />
          <h1 className="text-headline text-ink mb-12">
            Политика конфиденциальности
          </h1>

          <div className="max-w-prose flex flex-col gap-8 text-body text-ink">
            <div>
              <p className="sheet-label text-muted mb-3">1. Оператор данных</p>
              <p>
                {SITE.name}, {SITE.address.street}, {SITE.address.building},{" "}
                {SITE.address.city}, {SITE.address.country}.{" "}
                E-mail: <a href={`mailto:${SITE.email}`} className="hover:text-magenta transition-colors">{SITE.email}</a>.
              </p>
            </div>

            <div>
              <p className="sheet-label text-muted mb-3">2. Какие данные собираем</p>
              <p>
                Через форму обратной связи собираем имя, номер телефона, адрес e-mail
                и прикреплённые файлы макетов. Данные используются исключительно для
                обработки запроса и обратной связи.
              </p>
            </div>

            <div>
              <p className="sheet-label text-muted mb-3">3. Цели обработки</p>
              <p>
                Расчёт стоимости заказа, переговоры об условиях, оформление договора.
                Данные не передаются третьим лицам.
              </p>
            </div>

            <div>
              <p className="sheet-label text-muted mb-3">4. Срок хранения</p>
              <p>
                Данные хранятся в течение срока, необходимого для выполнения заказа,
                но не более 3 лет, если иное не предусмотрено законодательством Молдовы.
              </p>
            </div>

            <div>
              <p className="sheet-label text-muted mb-3">5. Права пользователя</p>
              <p>
                Вы вправе запросить доступ, исправление или удаление своих персональных данных.
                Для этого напишите на{" "}
                <a href={`mailto:${SITE.email}`} className="hover:text-magenta transition-colors">{SITE.email}</a>.
              </p>
            </div>

            <div>
              <p className="sheet-label text-muted mb-3">6. Юридическая основа</p>
              {/* TODO(client): подтвердить соответствие законодательству Молдовы о защите персональных данных */}
              <p className="text-muted italic">
                TODO(client): юридический текст согласно требованиям законодательства Республики Молдова.
              </p>
            </div>

            <div className="border-t border-mid pt-6 text-caption text-muted">
              Последнее обновление: {new Date().toLocaleDateString("ru-MD", { year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
        </div>
      </section>
      <CMYKBar />
    </>
  );
}
