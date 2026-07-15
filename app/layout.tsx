import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nueva.vitalimaspa.com"),
  title: { default: "Vita Lima Spa | Masajes y bienestar en Lima", template: "%s | Vita Lima Spa" },
  description: "Masajes de relajación y bienestar en San Borja, Miraflores y a domicilio. Reserva tu experiencia en Vita Lima Spa.",
  openGraph: { title: "Vita Lima Spa", description: "Regálate una pausa. Tu cuerpo la necesita.", type: "website", locale: "es_PE" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
