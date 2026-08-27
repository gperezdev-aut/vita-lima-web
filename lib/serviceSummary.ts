// Recorta el texto largo de "includes" de un servicio a una frase corta,
// cortando en un separador natural (" + " o ". "). Se usa tanto en el
// catálogo completo (/servicios) como en las tarjetas del carrusel de
// favoritos, para no mantener dos copias de la misma lógica.
//
// No corta en el PRIMER separador que encuentra: varios servicios (ej.
// "Glow Facial Plus" / "Glow Facial Premium") empiezan con una sola
// palabra genérica antes del primer "+" ("Masaje + piedras calientes...").
// Cortar ahí dejaba el mismo resumen de una palabra ("Masaje") en
// servicios distintos con precios distintos, sin decir nada útil. En vez
// de eso, avanza hasta el primer separador que ya deja un fragmento con
// sentido (MIN_SUMMARY_LENGTH caracteres), para que el resumen alcance a
// mostrar lo que realmente diferencia a un servicio de otro.
const MIN_SUMMARY_LENGTH = 30;

export function serviceSummary(includes: string) {
  const separators = [" + ", ". "];
  const boundaries: number[] = [];

  for (const separator of separators) {
    let from = 0;
    let index = includes.indexOf(separator, from);
    while (index !== -1) {
      boundaries.push(index);
      from = index + separator.length;
      index = includes.indexOf(separator, from);
    }
  }

  boundaries.sort((a, b) => a - b);
  const cut = boundaries.find((position) => position >= MIN_SUMMARY_LENGTH);

  return cut !== undefined ? includes.slice(0, cut) : includes;
}
