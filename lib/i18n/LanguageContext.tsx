"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { counterpartPath, languageFromPathname, localizedPath } from "./routes";

export type Language = "es" | "en";

type LanguageContextValue = {
  language: Language;
  /** Cambia de idioma navegando a la misma página en la otra URL. */
  toggleLanguage: () => void;
  /**
   * Href de un enlace interno en el idioma activo. Los componentes escriben
   * siempre la ruta en español ("/servicios") y esta función la traduce.
   */
  href: (esPath: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * El idioma se deduce de la URL, no del almacenamiento local.
 *
 * Antes vivía en localStorage y el botón EN cambiaba el texto sin cambiar la
 * dirección: cómodo de programar, pero invisible para Google e imposible de
 * compartir por enlace. Ahora `/miraflores` es la página en español y
 * `/en/miraflores` la misma página en inglés, y el botón es un enlace entre
 * las dos. Como consecuencia, ya no hay estado que hidratar ni preferencia
 * que recordar: la URL es la única fuente de verdad.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const language = languageFromPathname(pathname || "/");

  useEffect(() => {
    // El <html lang> del layout raíz es estático ("es"); aquí se corrige en
    // el cliente para que los lectores de pantalla y el navegador anuncien
    // el idioma real de la página.
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      toggleLanguage: () => router.push(counterpartPath(pathname || "/")),
      href: (esPath: string) => localizedPath(esPath, language),
    }),
    [language, pathname, router],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  return ctx;
}
