"use client";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "../../../content/routes";
import { SITE } from "../../../content/site.config";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { telHref } from "@/lib/utils";
import { useLang, type Lang } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = [
  { heading: "Услуги", links: [
    { label: "Офсетная печать",        href: ROUTES.serviceOffset },
    { label: "Цифровая печать",        href: ROUTES.serviceDigital },
    { label: "Шелкография",            href: ROUTES.serviceSilkscreen },
    { label: "Широкоформатная печать", href: ROUTES.serviceWide },
    { label: "Плоттерная резка",       href: ROUTES.servicePlotter },
    { label: "Ламинация",              href: ROUTES.serviceLamination },
    { label: "Послепечатные работы",   href: ROUTES.servicePostpress },
  ]},
  { heading: "Компания", links: [
    { label: "Продукция",          href: ROUTES.catalog },
    { label: "Подготовка макетов", href: ROUTES.prepress },
    { label: "Клиенты",           href: ROUTES.clients },
    { label: "Вакансии",          href: ROUTES.vacancies },
    { label: "Контакты",          href: ROUTES.contacts },
    { label: "Конфиденциальность", href: ROUTES.privacy },
  ]},
];

const LANGS: Lang[] = ["ru", "ro", "en"];

const win95Btn =
  "px-2 py-1 text-xs font-bold rounded-none border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dfdfdf] text-[#121212] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white active:translate-y-[1px] select-none cursor-pointer transition-none";
const win95BtnActive =
  "bg-[#d0d0d0] border-t-[#808080] border-l-[#808080] border-b-white border-r-white";

export function Footer() {
  const { lang, setLang, t } = useLang();

  return (
    <footer className="bg-ink text-paper">
      <CMYKBar />

      <div className="max-w-content mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Brand block — left-aligned */}
        <div className="mb-16 md:mb-24 flex flex-col items-start">
          <Link href={ROUTES.home} aria-label="Poliviz-Design — на главную" className="inline-flex hover:opacity-80 transition-opacity">
            <Image
              src="/polivizlogo2.png"
              alt="Poliviz Design"
              width={320}
              height={80}
              className="h-20 max-h-20 w-auto object-contain"
            />
          </Link>
          <p className="mt-4 text-body text-mid max-w-prose">
            {SITE.description.ru}
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-t border-mid/20 pt-12">
          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
              <p className="sheet-label text-mid mb-4">{group.heading}</p>
              <ul className="flex flex-col gap-3">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-body text-paper/70 hover:text-paper transition-colors duration-250"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contacts */}
          <div>
            <p className="sheet-label text-mid mb-4">Контакты</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={telHref(SITE.phone.main)}
                  className="text-body text-paper/70 hover:text-paper transition-colors"
                >
                  {SITE.phone.mainFormatted}
                </a>
              </li>
              <li>
                <a
                  href={telHref(SITE.phone.mobile)}
                  className="text-body text-paper/70 hover:text-paper transition-colors"
                >
                  {SITE.phone.mobileFormatted}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-body text-paper/70 hover:text-paper transition-colors"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="text-body text-paper/50 leading-tight">
                {SITE.address.street}, {SITE.address.building}
                <br />
                {SITE.address.city}, {SITE.address.country}
              </li>
            </ul>
          </div>

          {/* Language switcher */}
          <div>
            <p className="sheet-label text-mid mb-4">{t.footer.lang_label}</p>
            <div className="flex gap-2 items-center flex-wrap">
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(win95Btn, lang === l && win95BtnActive)}
                  aria-pressed={lang === l}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-mid/20 pt-8 flex flex-col md:flex-row gap-4 justify-between items-start">
          <p className="sheet-label text-mid">
            © {new Date().getFullYear()} {SITE.name}. {t.footer.copyright}
          </p>
          <Link
            href={ROUTES.order}
            className="text-caption text-magenta hover:text-paper transition-colors font-600 uppercase tracking-wider"
          >
            {t.footer.order_link}
          </Link>
        </div>
      </div>
    </footer>
  );
}
