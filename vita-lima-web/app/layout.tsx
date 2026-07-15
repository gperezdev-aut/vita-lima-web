import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: { default: "Vita Lima Spa | Masajes en Lima", template: "%s | Vita Lima Spa" },
  description: "Masajes y experiencias de bienestar en San Borja, Miraflores y a domicilio. Reserva por WhatsApp.",
  openGraph: { title: "Vita Lima Spa", description: "Regálate una pausa. Tu cuerpo la necesita.", type: "website", locale: "es_PE" },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
