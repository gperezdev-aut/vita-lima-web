import type { Metadata } from "next";
import { getFicha } from "@/lib/caja/client";
import { esExito, type FichaResult } from "@/lib/caja/types";
import ErrorScreen from "./ErrorScreen";
import FichaWizard from "./FichaWizard";

// El token cambia el contenido en cada visita y nunca debe cachearse ni
// servirse desde el edge: la llamada a caja necesita el runtime de Node
// para leer CAJA_API_SECRET del entorno del servidor.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Enlace privado de un solo cliente: no debe indexarse ni aparecer en Google.
export const metadata: Metadata = {
  title: "Completa tu ficha de cita | Vita Lima Spa",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ token: string }>;
};

export default async function Page({ params }: PageProps) {
  const { token } = await params;
  const resultado: FichaResult = await getFicha(token);

  if (!esExito(resultado)) {
    return <ErrorScreen codigo={resultado.error.error} />;
  }

  // Defensa adicional ante una respuesta equivocada o cacheada aguas arriba:
  // nunca renderizar datos cuyo token no sea exactamente el de esta URL.
  if (resultado.data.token !== token) {
    return <ErrorScreen codigo="contrato_incompatible" />;
  }

  return <FichaWizard ficha={resultado.data} token={token} />;
}
