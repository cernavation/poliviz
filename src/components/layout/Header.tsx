"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "../../../content/routes";
import { SITE } from "../../../content/site.config";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useLang, type Lang } from "@/context/LanguageContext";

const NAV_KEYS = [
  { key: "services" as const, href: ROUTES.services },
  { key: "catalog"  as const, href: ROUTES.catalog  },
  { key: "prepress" as const, href: ROUTES.prepress  },
  { key: "clients"  as const, href: "/clients"       },
  { key: "contacts" as const, href: ROUTES.contacts  },
];

const LANGS: Lang[] = ["ru", "ro", "en"];

/* ── Win95 nav button ── */
const win95Nav =
  "inline-flex items-center justify-center px-3 py-1.5 rounded-none font-bold text-[#121212] bg-[#dfdfdf] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white active:translate-y-[1px] select-none cursor-pointer text-sm leading-none whitespace-nowrap transition-none";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-paper border-b border-mid">
        <div className="max-w-content mx-auto px-6 md:px-10 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href={ROUTES.home}
            className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0"
            aria-label="Poliviz-Design — на главную"
          >
            <Image
              src="/polivizlogo.png"
              alt="Poliviz Design"
              width={140}
              height={36}
              className="h-9 max-h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2 flex-wrap" aria-label="Основная навигация">
            {NAV_KEYS.map((link) => (
              <Link key={link.href} href={link.href} className={win95Nav}>
                {t.nav[link.key]}
              </Link>
            ))}
          </nav>

          {/* Lang switcher + CTA + burger */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Language switcher */}
            <div className="hidden md:flex items-center gap-1">
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    win95Nav,
                    "text-xs px-2 py-1",
                    lang === l && "bg-[#d0d0d0] border-t-[#808080] border-l-[#808080] border-b-white border-r-white"
                  )}
                  aria-pressed={lang === l}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <Button
              as="a"
              href={ROUTES.order}
              variant="primary"
              className="hidden md:inline-flex text-caption"
            >
              {t.nav.order}
            </Button>

            {/* Mobile burger — Win95 style */}
            <button
              className={cn(win95Nav, "md:hidden p-2")}
              aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block w-5 h-[2px] bg-[#121212]" />
                <span className="block w-5 h-[2px] bg-[#121212]" />
                <span className="block w-5 h-[2px] bg-[#121212]" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={cn("mobile-menu", mobileOpen && "open")}
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between mb-16">
          <Link
            href={ROUTES.home}
            className="flex items-center hover:opacity-80 transition-opacity"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/polivizlogo2.png"
              alt="Poliviz Design"
              width={140}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button
            className="text-paper p-1"
            aria-label="Закрыть меню"
            onClick={() => setMobileOpen(false)}
          >
            <span className="block w-8 h-px bg-paper rotate-45 translate-y-px" />
            <span className="block w-8 h-px bg-paper -rotate-45" />
          </button>
        </div>

        <nav className="flex flex-col gap-8" aria-label="Мобильная навигация">
          {NAV_KEYS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-headline text-paper hover:text-magenta transition-colors font-700 leading-none"
              onClick={() => setMobileOpen(false)}
            >
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>

        {/* Mobile lang switcher */}
        <div className="mt-8 flex gap-2">
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                "px-3 py-1.5 text-sm font-bold border-2 rounded-none",
                lang === l
                  ? "bg-[#D6307F] text-white border-t-[#ff8cc0] border-l-[#ff8cc0] border-b-[#8a1a4f] border-r-[#8a1a4f]"
                  : "bg-[#dfdfdf] text-[#121212] border-t-white border-l-white border-b-[#808080] border-r-[#808080]"
              )}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-12">
          <Button
            as="a"
            href={ROUTES.order}
            variant="outline"
            className="w-full"
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.order}
          </Button>
          <div className="mt-8 text-caption text-muted font-mono">
            <a href={`tel:${SITE.phone.main}`} className="hover:text-paper transition-colors">
              {SITE.phone.mainFormatted}
            </a>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-14" aria-hidden="true" />
    </>
  );
}
