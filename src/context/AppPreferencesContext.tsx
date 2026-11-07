"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { DICTIONARY, type Dictionary, type Locale } from "@/i18n/dictionary";
import { trackGAEvent } from "@/lib/analytics";

export type ThemeMode = "dark" | "light";
export type ComingSoonSource = "ios" | "android" | "freelancer";

interface AppPreferencesContextValue {
  locale: Locale;
  dir: "rtl" | "ltr";
  theme: ThemeMode;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  comingSoonOpen: boolean;
  comingSoonSource: ComingSoonSource;
  openComingSoon: (source?: ComingSoonSource) => void;
  setComingSoonOpen: (open: boolean) => void;
  categoryModalOpen: boolean;
  categoryModalCategory: string;
  openCategoryModal: (category?: string) => void;
  setCategoryModalOpen: (open: boolean) => void;
}

const AppPreferencesContext = createContext<AppPreferencesContextValue | null>(
  null
);

export function AppPreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Default: Arabic ("ar") & Dark Mode ("dark" -> #12171D)
  const [locale, setLocaleState] = useState<Locale>("ar");
  const [theme, setThemeState] = useState<ThemeMode>("dark");
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonSource, setComingSoonSource] =
    useState<ComingSoonSource>("ios");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [categoryModalCategory, setCategoryModalCategory] = useState("all");

  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem("moawen_locale");
      const savedTheme = localStorage.getItem("moawen_theme");
      // One-time post-mount rehydration from localStorage. Doing this in the
      // effect (rather than a lazy useState initializer) keeps the server
      // render and the first client render identical (ar/dark), which is
      // what makes hydration deterministic — hence the targeted override.
      if (savedLocale === "ar" || savedLocale === "en") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only localStorage rehydration, see comment above
        setLocaleState(savedLocale);
      }
      if (savedTheme === "dark" || savedTheme === "light") {
        setThemeState(savedTheme);
      }
    } catch {
      // ignore storage read errors
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const dir = locale === "ar" ? "rtl" : "ltr";
    root.lang = locale;
    root.dir = dir;

    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    try {
      localStorage.setItem("moawen_locale", locale);
      localStorage.setItem("moawen_theme", theme);
    } catch {
      // ignore storage write errors
    }
  }, [locale, theme]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    trackGAEvent("language_switch", { locale: next });
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === "ar" ? "en" : "ar";
      trackGAEvent("language_switch", { locale: next });
      return next;
    });
  }, []);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
    trackGAEvent("theme_switch", { theme: next });
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      trackGAEvent("theme_switch", { theme: next });
      return next;
    });
  }, []);

  const openComingSoon = useCallback((source: ComingSoonSource = "ios") => {
    setComingSoonSource(source);
    setComingSoonOpen(true);
    trackGAEvent("app_download_click", { store: source });
  }, []);

  const openCategoryModal = useCallback((category: string = "all") => {
    setCategoryModalCategory(category);
    setCategoryModalOpen(true);
    trackGAEvent("category_card_click", { category });
  }, []);

  return (
    <AppPreferencesContext.Provider
      value={{
        locale,
        dir: locale === "ar" ? "rtl" : "ltr",
        theme,
        t: DICTIONARY[locale],
        setLocale,
        toggleLocale,
        setTheme,
        toggleTheme,
        comingSoonOpen,
        comingSoonSource,
        openComingSoon,
        setComingSoonOpen,
        categoryModalOpen,
        categoryModalCategory,
        openCategoryModal,
        setCategoryModalOpen,
      }}
    >
      {children}
    </AppPreferencesContext.Provider>
  );
}

export function useAppPreferences() {
  const ctx = useContext(AppPreferencesContext);
  if (!ctx) {
    throw new Error(
      "useAppPreferences must be used within AppPreferencesProvider"
    );
  }
  return ctx;
}
