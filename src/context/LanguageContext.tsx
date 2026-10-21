"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "ru" | "ro" | "en";

import ruMsg from "../../messages/ru.json";
import roMsg from "../../messages/ro.json";
import enMsg from "../../messages/en.json";

type Messages = typeof ruMsg;
const MESSAGES: Record<Lang, Messages> = { ru: ruMsg, ro: roMsg, en: enMsg };

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Messages;
}

const LanguageContext = createContext<LangCtx>({
  lang: "ru",
  setLang: () => {},
  t: ruMsg,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    // Detect from URL path
    const path = window.location.pathname;
    let detected: Lang = "ru";
    if (path.startsWith("/ro")) detected = "ro";
    else if (path.startsWith("/en")) detected = "en";
    else {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved && ["ru", "ro", "en"].includes(saved)) detected = saved;
    }
    setLangState(detected);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("lang", l);
    // Update URL without reload
    const path = window.location.pathname;
    const strippedPath = path.replace(/^\/(ru|ro|en)(\/|$)/, "/") || "/";
    const newPath = l === "ru" ? strippedPath : `/${l}${strippedPath === "/" ? "" : strippedPath}`;
    window.history.pushState({}, "", newPath);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: MESSAGES[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
