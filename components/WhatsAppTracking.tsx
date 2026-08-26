"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const TOAST_EVENT = "vita:whatsapp-toast";
const TOAST_DURATION_MS = 2400;

export function trackWhatsappClick(label: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "whatsapp_click", {
      event_category: "engagement",
      event_label: label,
    });
  }
  // Confirmación visual: cualquier CTA de WhatsApp del sitio (los <a> reales,
  // detectados abajo, y las llamadas explícitas desde ReserveForm/CartWidget
  // antes de window.open) pasan por esta función, así que un solo listener
  // en WhatsAppTracking basta para mostrar el toast en todo el sitio.
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(TOAST_EVENT));
  }
}

export default function WhatsAppTracking() {
  const [visible, setVisible] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>('a[href*="wa.me"]');
      if (!link) return;
      trackWhatsappClick(link.getAttribute("href") || "");
    }

    function handleToast() {
      setVisible(true);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = setTimeout(() => setVisible(false), TOAST_DURATION_MS);
    }

    document.addEventListener("click", handleClick, true);
    window.addEventListener(TOAST_EVENT, handleToast);
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener(TOAST_EVENT, handleToast);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  return (
    <div className={`whatsappToast${visible ? " whatsappToastVisible" : ""}`} role="status" aria-live="polite">
      {visible && <span>Te estamos redirigiendo a WhatsApp…</span>}
    </div>
  );
}
