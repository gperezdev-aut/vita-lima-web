import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vita Lima Spa | Masajes y bienestar en Lima",
  description: "Masajes relajantes, terapéuticos, para parejas, Gift Cards y bienestar corporativo en San Borja y Miraflores.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nueva.vitalimaspa.com"),
  openGraph: {
    title: "Vita Lima Spa",
    description: "Bienestar que se siente.",
    images: ["/images/hero/hero-san-borja.webp"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body>{children}</body></html>;
}
