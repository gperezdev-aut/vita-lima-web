/**
 * Los nombres del catálogo llevan un emoji decorativo delante
 * (ej. "🌿 Relax Vital"). Sirve como marca de categoría en una lista, pero
 * dentro de un <h1> el navegador lo dibuja al tamaño del título: en la ficha
 * de servicio salía un emoji de ~90px compitiendo con el nombre, y en las
 * migas de pan y en el `alt` de las fotos se colaba igual —un lector de
 * pantalla anuncia el nombre del emoji antes que el del servicio—.
 *
 * Esta función devuelve el nombre limpio. Vive aquí, y no en
 * `content/structured-data.ts`, para que cualquier componente pueda usarla
 * sin arrastrar el módulo entero de datos estructurados (que al cargarse
 * recorre el catálogo para calcular el rango de precios).
 *
 * El emoji sigue guardado en `content/services.ts`: si algún día se quiere
 * mostrar como ícono de categoría, el dato no se perdió.
 */
export function cleanServiceName(name: string) {
  return name.replace(/^[\p{Extended_Pictographic}️\s]+/u, "").trim();
}
