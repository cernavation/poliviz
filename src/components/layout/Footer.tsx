"use client";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/lib/routes";
import { SITE } from "../../../content/site.config";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { telHref } from "@/lib/utils";
import { useLang, type Lang } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const FOOTER_LABELS: Record<Lang, {
  services: string;
  company: string;
  contacts: string;
  offset: string;
  digital: string;
  silkscreen: string;
  wide: string;
  plotter: string;
  lamination: string;
  postpress: string;
  catalog: string;
  prepress: string;
  clients: string;
  vacancies: string;
  contactsLink: string;
  privacy: string;
  desc: string;
}> = {
  ru: {
    services: "Услуги",
    company: "Компания",
    contacts: "Контакты",
    offset: "Офсетная печать",
    digital: "Цифровая печать",
    silkscreen: "Шелкография",
    wide: "Широкоформатная печать",
    plotter: "Плоттерная резка",
    lamination: "Ламинация",
    postpress: "Послепечатные работы",
    catalog: "Продукция",
    prepress: "Подготовка макетов",
    clients: "Клиенты",
    vacancies: "Вакансии",
    contactsLink: "Контакты",
    privacy: "Конфиденциальность",
    desc: "Типография полного цикла в Кишинёве: дизайн, печать и послепечатная обработка в одном цехе.",
  },
  ro: {
    services: "Servicii",
    company: "Companie",
    contacts: "Contacte",
    offset: "Tipar offset",
    digital: "Tipar digital",
    silkscreen: "Serigrafie",
    wide: "Tipar de format mare",
    plotter: "Tăiere plotter",
    lamination: "Laminare",
    postpress: "Prelucrare post-tipar",
    catalog: "Produse",
    prepress: "Pregătire machete",
    clients: "Clienți",
    vacancies: "Cariere",
    contactsLink: "Contacte",
    privacy: "Confidențialitate",
    desc: "Tipografie full-cycle în Chișinău: design, tipar și prelucrare postimprimare într-un singur atelier.",
  },
  en: {
    services: "Services",
    company: "Company",
    contacts: "Contacts",
    offset: "Offset printing",
    digital: "Digital printing",
    silkscreen: "Silkscreen printing",
    wide: "Large format printing",
    plotter: "Plotter cutting",
    lamination: "Lamination",
    postpress: "Post-press finishing",
    catalog: "Products",
    prepress: "Artwork guidelines",
    clients: "Clients",
    vacancies: "Careers",
    contactsLink: "Contacts",
    privacy: "Privacy policy",
    desc: "Full-cycle print shop in Chișinău: design, print and post-press finishing under one roof.",
  },
};

const LANGS: Lang[] = ["ru", "ro", "en"];

const win95Btn =
  "px-2 py-1 text-xs font-bold rounded-none border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#dfdfdf] text-[#121212] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white active:translate-y-[1px] select-none cursor-pointer transition-none";
const win95BtnActive =
  "bg-[#d0d0d0] border-t-[#808080] border-l-[#808080] border-b-white border-r-white";

export function Footer() {
  const { lang, setLang, t, localize } = useLang();
  const fl = FOOTER_LABELS[lang] || FOOTER_LABELS.ru;

  const footerLinks = [
    {
      heading: fl.services,
      links: [
        { label: fl.offset,      href: ROUTES.serviceOffset },
        { label: fl.digital,     href: ROUTES.serviceDigital },
        { label: fl.silkscreen,  href: ROUTES.serviceSilkscreen },
        { label: fl.wide,        href: ROUTES.serviceWide },
        { label: fl.plotter,     href: ROUTES.servicePlotter },
        { label: fl.lamination,  href: ROUTES.serviceLamination },
        { label: fl.postpress,   href: ROUTES.servicePostpress },
      ],
    },
    {
      heading: fl.company,
      links: [
        { label: fl.catalog,      href: ROUTES.catalog },
        { label: fl.prepress,     href: ROUTES.prepress },
        { label: fl.clients,      href: ROUTES.clients },
        { label: fl.vacancies,    href: ROUTES.vacancies },
        { label: fl.contactsLink, href: ROUTES.contacts },
        { label: fl.privacy,      href: ROUTES.privacy },
      ],
    },
  ];

  return (
    <footer className="bg-ink text-paper border-t-4 border-[#D6307F]">
      <CMYKBar />

      <div className="max-w-content mx-auto px-6 md:px-10 pt-16 pb-12">
        {/* Brand block — left-aligned */}
        <div className="mb-16 md:mb-20 flex flex-col items-start">
          <Link
            href={localize(ROUTES.home)}
            aria-label="Poliviz-Design — на главную"
            className="inline-flex items-start hover:opacity-80 transition-opacity"
          >
            <Image
              src="/polivizlogo2.png"
              alt="Poliviz Design"
              width={640}
              height={160}
              className="w-64 md:w-80 h-auto object-contain object-left -ml-6 mb-4"
            />
          </Link>
          <p className="mt-2 text-body text-mid max-w-prose">
            {fl.desc}
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-t border-mid/20 pt-12">
          {footerLinks.map((group) => (
            <div key={group.heading}>
              <p className="text-[#D6307F] font-mono font-bold mb-4 uppercase tracking-wider text-xs">
                {group.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={localize(l.href)}
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
            <p className="text-[#D6307F] font-mono font-bold mb-4 uppercase tracking-wider text-xs">
              {fl.contacts}
            </p>
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
            <p className="text-[#D6307F] font-mono font-bold mb-4 uppercase tracking-wider text-xs">
              {t.footer.lang_label}
            </p>
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
        <div className="border-t border-mid/20 pt-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <p className="sheet-label text-mid">
            © {new Date().getFullYear()} {SITE.name}. {t.footer.copyright}
          </p>
          <Link
            href={localize(ROUTES.order)}
            className="bg-[#D6307F] !text-white font-bold border-2 border-t-[#ff8cc0] border-l-[#ff8cc0] border-b-[#8a1a4f] border-r-[#8a1a4f] active:border-t-[#8a1a4f] active:border-l-[#8a1a4f] active:border-b-[#ff8cc0] active:border-r-[#ff8cc0] active:translate-y-[1px] px-5 py-2.5 inline-flex items-center justify-center text-sm rounded-none"
          >
            {t.footer.order_link}
          </Link>
        </div>
      </div>
    </footer>
  );
}
