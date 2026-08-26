// Recorta el texto largo de "includes" de un servicio a una frase corta,
// cortando en el primer separador natural (" + " o ". "). Se usa tanto en
// el catálogo completo (/servicios) como en las tarjetas del carrusel de
// favoritos, para no mantener dos copias de la misma lógica.
export function serviceSummary(includes: string) {
  const separators = [" + ", ". "];
  const end = separators
    .map((separator) => includes.indexOf(separator))
    .filter((index) => index > 0)
    .sort((a, b) => a - b)[0];

  return end ? includes.slice(0, end) : includes;
}
