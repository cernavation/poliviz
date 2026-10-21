"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { localizeHref, type Locale } from "@/lib/routes";

export type Lang = Locale;

import ruMsg from "../../messages/ru.json";
import roMsg from "../../messages/ro.json";
import enMsg from "../../messages/en.json";

type Messages = typeof ruMsg;
const MESSAGES: Record<Lang, Messages> = { ru: ruMsg, ro: roMsg, en: enMsg };

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Messages;
  localize: (href: string) => string;
}

const LanguageContext = createContext<LangCtx>({
  lang: "ru",
  setLang: () => {},
  t: ruMsg,
  localize: (href: string) => href,
});

function getLocaleFromPath(pathname: string): Lang | null {
  if (!pathname) return null;
  if (pathname === "/ro" || pathname.endsWith("/ro")) return "ro";
  if (pathname === "/en" || pathname.endsWith("/en")) return "en";
  return null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");
  const pathname = usePathname() || "/";
  const router = useRouter();

  // Синхронизация при загрузке и смене pathname
  useEffect(() => {
    const urlLang = getLocaleFromPath(pathname);
    if (urlLang) {
      setLangState(urlLang);
      try {
        localStorage.setItem("lang", urlLang);
      } catch {}
    } else {
      try {
        const saved = localStorage.getItem("lang") as Lang | null;
        if (saved && (saved === "ro" || saved === "en" || saved === "ru")) {
          setLangState(saved);
        } else {
          setLangState("ru");
        }
      } catch {
        setLangState("ru");
      }
    }
  }, [pathname]);

  const setLang = useCallback(
    (targetLang: Lang) => {
      setLangState(targetLang);
      try {
        localStorage.setItem("lang", targetLang);
      } catch {}

      if (typeof window === "undefined") return;

      const currentPath = window.location.pathname || "/";
      const search = window.location.search || "";
      const hash = window.location.hash || "";

      // Очищаем существующий суффикс локали (/ro или /en)
      let cleanPath = currentPath.replace(/\/(ro|en)$/, "") || "/";
      if (cleanPath === "/ru") cleanPath = "/";

      let newPath = cleanPath;
      if (targetLang === "ro" || targetLang === "en") {
        newPath = cleanPath === "/" ? `/${targetLang}` : `${cleanPath}/${targetLang}`;
      }

      const newFullUrl = `${newPath}${search}${hash}`;
      try {
        window.history.pushState(null, "", newFullUrl);
        router.push(newFullUrl);
      } catch {
        window.location.href = newFullUrl;
      }
    },
    [router]
  );

  const localize = useCallback(
    (href: string) => localizeHref(href, lang),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: MESSAGES[lang], localize }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
