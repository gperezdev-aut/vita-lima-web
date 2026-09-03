"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * Consentimiento de cookies y analítica.
 *
 * Ley 29733 (Protección de Datos Personales, Perú) y su reglamento exigen
 * consentimiento previo, informado, expreso e inequívoco antes de tratar
 * datos personales. Por eso:
 *  - GA4 no se carga hasta que el visitante acepta (ver components/GoogleTag).
 *  - Los mapas de Google se cargan solo con un clic explícito del visitante
 *    (ver components/ConsentMap).
 *  - El formulario de reserva pide una casilla de autorización no marcada
 *    por defecto (ver components/ReserveForm).
 *
 * "unknown" = todavía no decidió (o el navegador no permite almacenamiento).
 * Mientras el estado sea "unknown" no se carga nada de terceros.
 */
export type ConsentState = "unknown" | "accepted" | "rejected";

type ConsentContextValue = {
  consent: ConsentState;
  /** true solo después de leer localStorage, para no parpadear el banner en SSR. */
  hydrated: boolean;
  accept: () => void;
  reject: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);
const STORAGE_KEY = "vita-lima-consent";

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>("unknown");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "rejected") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setConsent(stored);
      }
    } catch {
      // Sin acceso a localStorage (modo privado, cookies bloqueadas):
      // se mantiene "unknown", que es el estado más conservador.
    }
    setHydrated(true);
  }, []);

  function persist(value: Exclude<ConsentState, "unknown">) {
    setConsent(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // No se puede persistir: la decisión vale para esta visita.
    }
  }

  return (
    <ConsentContext.Provider
      value={{ consent, hydrated, accept: () => persist("accepted"), reject: () => persist("rejected") }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent debe usarse dentro de ConsentProvider");
  return ctx;
}
