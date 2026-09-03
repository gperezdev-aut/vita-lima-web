import type { Metadata } from "next";
// Serif de marca para títulos, precios y citas (reemplaza a Georgia, que
// queda como fallback). Se sirve desde el propio paquete @fontsource
// (self-hosted) en vez de next/font/google: así el build no depende de
// alcanzar fonts.googleapis.com en redes con salida restringida.
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "./globals.css";
import GoogleTag from "@/components/GoogleTag";
import WhatsAppTracking from "@/components/WhatsAppTracking";
import { CartProvider } from "@/components/CartContext";
import CartWidget from "@/components/CartWidget";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { ConsentProvider } from "@/components/ConsentContext";
import CookieBanner from "@/components/CookieBanner";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nueva.vitalimaspa.com";

export const metadata: Metadata = {
  title: "Vita Lima Spa | Masajes y bienestar en Lima",
  description: "Masajes relajantes, terapéuticos, para parejas, Gift Cards y bienestar corporativo en San Borja y Miraflores.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Vita Lima Spa",
    description: "Es momento de volver a ti. Masajes y bienestar premium en Lima.",
    type: "website",
    url: "/",
    locale: "es_PE",
    siteName: "Vita Lima Spa",
    images: ["/images/signature/hero.webp"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Vita Lima Spa",
    description: "Es momento de volver a ti. Masajes y bienestar premium en Lima.",
    images: ["/images/signature/hero.webp"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          {/* ConsentProvider va por dentro de LanguageProvider porque el
              banner de cookies se muestra en el idioma activo, y por fuera
              de todo lo que carga terceros (GoogleTag, mapas). */}
          <ConsentProvider>
            <GoogleTag />
            <WhatsAppTracking />
            <CartProvider>
              {children}
              <CartWidget />
            </CartProvider>
            <CookieBanner />
          </ConsentProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
