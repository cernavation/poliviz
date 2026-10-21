import Link from "next/link";
import { ROUTES } from "../../content/routes";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { PrintMark } from "@/components/ui/PrintMark";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <CMYKBar />
      <section className="min-h-[80vh] bg-paper flex flex-col justify-center px-6 md:px-10 relative overflow-hidden">
        <PrintMark size={18} color="#7A7469" className="absolute top-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute top-6 right-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute bottom-6 left-6 opacity-30" />
        <PrintMark size={18} color="#7A7469" className="absolute bottom-6 right-6 opacity-30" />

        {/* Decorative 404 as print sheet */}
        <div className="max-w-content mx-auto w-full">
          <SheetLabel sheet={4} total={4} tech="Ошибка" className="mb-8 block" />

          <p
            className="text-[20vw] md:text-[14vw] font-sans font-900 text-mid leading-none select-none mb-0"
            aria-hidden="true"
            style={{ letterSpacing: "-0.05em" }}
          >
            404
          </p>

          <div className="border-t border-mid pt-8 mt-4">
            <h1 className="text-headline text-ink mb-4">
              Страница не найдена
            </h1>
            <p className="text-body text-muted max-w-md mb-10">
              Возможно, адрес устарел или был изменён. Проверьте URL или перейдите в нужный раздел.
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-mid mb-10">
              {[
                { label: "Главная", href: ROUTES.home },
                { label: "Услуги", href: ROUTES.services },
                { label: "Продукция", href: ROUTES.catalog },
                { label: "Подготовка макетов", href: ROUTES.prepress },
                { label: "Клиенты", href: ROUTES.clients },
                { label: "Контакты", href: ROUTES.contacts },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="bg-paper px-6 py-4 text-body text-ink hover:bg-ink hover:text-paper transition-colors"
                >
                  {l.label} →
                </Link>
              ))}
            </div>

            <Button as="a" href={ROUTES.order} variant="primary">
              Рассчитать заказ
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
