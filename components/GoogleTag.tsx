"use client";

import Script from "next/script";
import { useConsent } from "@/components/ConsentContext";

// Se mantiene el ID actual como valor por defecto para no perder la medición
// ya en marcha (mismo comportamiento que antes de este cambio):
// NEXT_PUBLIC_GA_MEASUREMENT_ID lo sobrescribe por entorno y, si se deja
// vacío, se usa la propiedad real de vitalimaspa.com.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-L3PW7G43CY";

/**
 * GA4, cargado solo después de que el visitante acepta las cookies.
 *
 * Antes el script se insertaba siempre, en cuanto la página quedaba
 * interactiva. Con la Ley 29733 (Perú) el tratamiento requiere
 * consentimiento previo, así que ahora el <Script> ni siquiera se monta
 * mientras el estado del consentimiento sea "unknown" o "rejected".
 */
export default function GoogleTag() {
  const { consent } = useConsent();

  if (!GA_MEASUREMENT_ID || consent !== "accepted") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
