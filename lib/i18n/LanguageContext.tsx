"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "es" | "en";

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "vita-lima-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // El servidor siempre renderiza en español (mismo criterio que CartProvider
  // con el carrito vacío): evita un mismatch de hidratado. Si el visitante ya
  // había elegido inglés antes, lo aplicamos apenas montamos en el cliente.
  const [language, setLanguage] = useState<Language>("es");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "es") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLanguage(stored);
      }
    } catch {
      // localStorage no disponible: seguimos en español.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Sin acceso a almacenamiento local: no persistimos, pero no rompemos la UI.
    }
    document.documentElement.lang = language;
  }, [language, hydrated]);

  function toggleLanguage() {
    setLanguage((current) => (current === "es" ? "en" : "es"));
  }

  return <LanguageContext.Provider value={{ language, toggleLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  return ctx;
}
