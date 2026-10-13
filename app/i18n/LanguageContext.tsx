"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  LanguageCode,
  LanguageOption,
  SUPPORTED_LANGUAGES,
} from "./constants";
import en from "./locales/en.json";
import te from "./locales/te.json";
import hi from "./locales/hi.json";

type TranslationsDictionary = Record<string, string>;

const TRANSLATIONS: Record<LanguageCode, TranslationsDictionary> = {
  en: en as TranslationsDictionary,
  te: te as TranslationsDictionary,
  hi: hi as TranslationsDictionary,
};

export interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  supportedLanguages: LanguageOption[];
  isReady: boolean;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): LanguageCode {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode | null;
    if (stored && (stored === "en" || stored === "te" || stored === "hi")) {
      return stored;
    }
  } catch {
    // LocalStorage might be disabled or blocked
  }
  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [isReady, setIsReady] = useState(false);

  // Sync stored language once client mounts to avoid hydration mismatch
  useEffect(() => {
    const saved = getInitialLanguage();
    if (saved !== language) {
      setLanguageState(saved);
    }
    setIsReady(true);
  }, []);

  const setLanguage = useCallback((nextLang: LanguageCode) => {
    setLanguageState(nextLang);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLang);
      }
    } catch (e) {
      console.warn("Failed to save language in localStorage", e);
    }
  }, []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const activeDict = TRANSLATIONS[language];
      if (activeDict && activeDict[key]) {
        return activeDict[key];
      }
      // Fallback to English dictionary
      if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
        return TRANSLATIONS.en[key];
      }
      return fallback !== undefined ? fallback : key;
    },
    [language]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t,
      supportedLanguages: SUPPORTED_LANGUAGES,
      isReady,
    }),
    [language, setLanguage, t, isReady]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback if called outside provider (e.g. during build/prerender)
    return {
      language: DEFAULT_LANGUAGE,
      setLanguage: () => {},
      t: (key: string, fallback?: string) =>
        (en as TranslationsDictionary)[key] || fallback || key,
      supportedLanguages: SUPPORTED_LANGUAGES,
      isReady: true,
    };
  }
  return context;
}
