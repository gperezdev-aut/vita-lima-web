import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidad | Vita Lima Spa",
  description: "Cómo Vita Lima Spa recopila, usa y protege tus datos personales al reservar una cita o escribir por WhatsApp.",
  alternates: { canonical: "/politica-de-privacidad" },
  openGraph: {
    title: "Política de privacidad | Vita Lima Spa",
    description: "Cómo Vita Lima Spa recopila, usa y protege tus datos personales.",
    type: "website",
  },
};

export default function Page(){return <main className="legal"><Link href="/">← Volver</Link><h1>Política de privacidad</h1><p>Vita Lima Spa recopila únicamente los datos necesarios para responder solicitudes de información y coordinar reservas. Los datos no se venden ni se comparten con terceros salvo cuando sea necesario para prestar el servicio o cumplir una obligación legal.</p><p>El envío del formulario autoriza el contacto por WhatsApp, teléfono o correo electrónico. Puedes solicitar la actualización o eliminación de tus datos escribiendo a info@vitalimaspa.com.</p></main>}
