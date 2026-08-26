import type { Metadata } from "next";
import "./globals.css";
import GoogleTag from "@/components/GoogleTag";
import WhatsAppTracking from "@/components/WhatsAppTracking";
import { CartProvider } from "@/components/CartContext";
import CartWidget from "@/components/CartWidget";

export const metadata: Metadata = {
  title: "Vita Lima Spa | Masajes y bienestar en Lima",
  description: "Masajes relajantes, terapéuticos, para parejas, Gift Cards y bienestar corporativo en San Borja y Miraflores.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nueva.vitalimaspa.com"),
  openGraph: {
    title: "Vita Lima Spa",
    description: "Es momento de volver a ti. Masajes y bienestar premium en Lima.",
    images: ["/images/signature/hero.webp"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <GoogleTag />
        <WhatsAppTracking />
        <CartProvider>
          {children}
          <CartWidget />
        </CartProvider>
      </body>
    </html>
  );
}
