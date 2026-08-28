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
//
// Ese primer intento (buscar el primer separador >= MIN_SUMMARY_LENGTH
// sin importar cuál sea) tenía un caso sin cubrir: varios paquetes en
// pareja (Relax, Renace, Royale, Supreme...) empiezan con una frase de
// tipo de masaje ya larga por sí sola (ej. "Masaje relajante y/o
// descontracturante (full body)", 48 caracteres) — esa frase sola ya
// supera MIN_SUMMARY_LENGTH, así que el resumen se cortaba ahí mismo y
// terminaba mostrando un solo ítem (solo el tipo de masaje), sin ningún
// extra (piedras calientes, reflexología, aromaterapia, copa de vino...),
// que es justo lo que distingue a estos paquetes más completos. Por eso
// ahora se descarta siempre el primer separador como punto de corte
// posible (para garantizar mínimo 2 ítems en el resumen) y recién desde
// el segundo separador en adelante se aplica la regla de los
// MIN_SUMMARY_LENGTH caracteres.
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

  // Con 0 o 1 separador no hay margen para cortar sin perder contenido
  // real (cortar en el único separador dejaría un solo ítem) — se
  // devuelve el texto completo tal cual.
  if (boundaries.length < 2) return includes;

  const fromSecondItem = boundaries.slice(1);
  const cut = fromSecondItem.find((position) => position >= MIN_SUMMARY_LENGTH) ?? fromSecondItem[0];

  return includes.slice(0, cut);
}
