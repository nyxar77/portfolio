import { useEffect, useState } from "react";
import { french } from "../data/translations";

export type Language = "en" | "fr";
export type LanguagePreference = Language | "auto";
const storageKey = "portfolio-language";

export function detectLanguage(languages: readonly string[]): Language {
  for (const locale of languages) {
    const base = locale.toLowerCase().split(/[-_]/)[0];
    if (base === "en" || base === "fr") return base;
  }
  return "en";
}

export function translate(text: string, language: Language): string {
  return language === "fr" ? french[text] ?? text : text;
}

export function timeAgo(date: string, language: Language): string {
  const parsed = new Date(date).getTime();
  if (!Number.isFinite(parsed)) return translate("recently", language);
  const days = Math.max(0, Math.floor((Date.now() - parsed) / 86400000));
  const formatter = new Intl.RelativeTimeFormat(language, { numeric: "auto", style: "short" });
  if (days < 7) return formatter.format(-days, "day");
  if (days < 30) return formatter.format(-Math.floor(days / 7), "week");
  if (days < 365) return formatter.format(-Math.floor(days / 30), "month");
  return formatter.format(-Math.floor(days / 365), "year");
}

function readPreference(): LanguagePreference {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === "en" || saved === "fr") return saved;
  } catch { /* Browser storage can be disabled. */ }
  return "auto";
}

function browserLanguage(): Language {
  return detectLanguage(navigator.languages?.length ? navigator.languages : [navigator.language]);
}

export function useLanguage() {
  const [preference, setPreference] = useState<LanguagePreference>(readPreference);
  const [detected, setDetected] = useState<Language>(browserLanguage);
  const language = preference === "auto" ? detected : preference;

  useEffect(() => {
    const update = () => setDetected(browserLanguage());
    window.addEventListener("languagechange", update);
    return () => window.removeEventListener("languagechange", update);
  }, []);

  useEffect(() => {
    try {
      if (preference === "auto") localStorage.removeItem(storageKey);
      else localStorage.setItem(storageKey, preference);
    } catch { /* Keep the selection working for this visit without storage. */ }
  }, [preference]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `Abderrahmane Drissi - ${translate("Software Developer", language)}`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", translate(
      "Portfolio of Abderrahmane Drissi, a software developer focused on systems, tooling, automation, and web interfaces.",
      language,
    ));
  }, [language]);

  return { language, preference, setPreference };
}
