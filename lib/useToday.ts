"use client";

import { useEffect, useState } from "react";

/**
 * La fecha de hoy en formato YYYY-MM-DD, para el `min` de los campos de fecha:
 * sin él se puede pedir una cita para ayer.
 *
 * Se calcula tras el montaje y no durante el render por dos razones: leer el
 * reloj en el render es impuro (`react-hooks/purity` lo marca) y, en un sitio
 * estático como este, lo que se calculara en el servidor quedaría horneado en
 * el HTML con la fecha del build.
 *
 * Se usa la hora local del visitante, no UTC: en Lima (UTC-5) `toISOString()`
 * a secas devolvería el día siguiente durante toda la tarde.
 */
export function useToday() {
  const [today, setToday] = useState("");

  useEffect(() => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    // Mismo caso que la lectura de localStorage en CartContext: el valor solo
    // puede conocerse en el cliente, así que entra por estado tras el montaje.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(local.toISOString().slice(0, 10));
  }, []);

  // Cadena vacía hasta el montaje: el atributo `min` simplemente no se aplica
  // todavía, que es el comportamiento correcto para un campo sin restricción.
  return today || undefined;
}
