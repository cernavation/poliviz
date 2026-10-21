"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "ru" | "ro" | "en";

/* ── Inline message bundles (no dynamic import needed) ── */
import ru from "../../messages/ru.json";
import ro from "../../messages/ro.json";
import en from "../../messages/en.json";

const MESSAGES: Record<Lang, typeof ru> = { ru, ro, en };

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof ru;
}

const LanguageContext = createContext<LangCtx>({
  lang: "ru",
  setLang: () => {},
  t: ru,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && ["ru", "ro", "en"].includes(saved)) setLangState(saved);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("lang", l);
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
