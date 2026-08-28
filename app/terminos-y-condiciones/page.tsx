import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y condiciones | Vita Lima Spa",
  description: "Condiciones de reserva, reprogramación, promociones, Gift Cards y servicios a domicilio de Vita Lima Spa.",
  alternates: { canonical: "/terminos-y-condiciones" },
  openGraph: {
    title: "Términos y condiciones | Vita Lima Spa",
    description: "Condiciones de reserva, reprogramación y servicios de Vita Lima Spa.",
    type: "website",
  },
};

export default function Page(){return <main className="legal"><Link href="/">← Volver</Link><h1>Términos y condiciones</h1><p>Las reservas están sujetas a confirmación de disponibilidad y al pago del adelanto indicado por Vita Lima Spa. Las reprogramaciones deben solicitarse con la anticipación comunicada al confirmar la cita.</p><p>Las promociones, Gift Cards y paquetes pueden tener condiciones y vigencias específicas. Los servicios a domicilio están sujetos a cobertura, recargo y disponibilidad.</p></main>}
