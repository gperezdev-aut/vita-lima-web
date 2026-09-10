import type { EnviarFichaResumen, FichaData } from "@/lib/caja/types";

type CitaResumen = FichaData["cita"] | EnviarFichaResumen;

export function duracionVisible(cita: CitaResumen) {
  return cita.duracionTotalMin;
}

export function ubicacionVisible(cita: CitaResumen) {
  if (cita.tipoAtencion === "domicilio" && cita.domicilio) {
    return ["Atención a domicilio", cita.domicilio.distrito, cita.domicilio.direccion,
      cita.domicilio.referencia ? `Referencia: ${cita.domicilio.referencia}` : null]
      .filter(Boolean)
      .join(" · ");
  }
  return cita.sede ?? cita.sedeDireccion ?? "—";
}

export function puedeMostrarMapaSede(cita: CitaResumen) {
  return cita.tipoAtencion === "sede" && Boolean(cita.sedeMapsUrl);
}
