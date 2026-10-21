import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "../../../../content/routes";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { PrintMark } from "@/components/ui/PrintMark";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Заявка принята",
  description: "Ваша заявка принята. Менеджер свяжется с вами в ближайшее время.",
  robots: { index: false, follow: false },
};

export default function SpasiboPAge() {
  return (
    <>
      <section className="min-h-[80vh] bg-paper flex flex-col justify-center px-6 md:px-10 relative overflow-hidden">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute bottom-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute bottom-6 right-6 opacity-30" />

        <div className="max-w-content mx-auto w-full">
          <SheetLabel sheet={1} total={1} tech="Готово" className="mb-8 block" />

          {/* Big magenta checkmark in print style */}
          <div className="mb-8" aria-hidden="true">
            <svg width={48} height={48} viewBox="0 0 48 48" fill="none">
              <rect x={0} y={0} width={48} height={48} fill="#D6307F" />
              <polyline
                points="12,26 21,35 36,16"
                stroke="#F4F1EA"
                strokeWidth={3}
                strokeLinecap="square"
                fill="none"
              />
            </svg>
          </div>

          <h1 className="text-headline text-ink mb-4 max-w-xl">
            Заявка принята.
          </h1>
          <p className="text-body text-muted max-w-md mb-10">
            Менеджер свяжется с вами в ближайшее время, чтобы уточнить детали и сообщить стоимость.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button as="a" href={ROUTES.home} variant="outline">
              На главную
            </Button>
            <Button as="a" href={ROUTES.services} variant="ghost">
              Все услуги
            </Button>
          </div>
        </div>
      </section>
      <CMYKBar />
    </>
  );
}
