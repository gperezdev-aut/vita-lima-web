import { site } from "@/content/site";
import { fichaText } from "@/lib/ficha/text";

type Props = {
  /** token_no_existe · token_vencido · ficha_ya_completa · cualquier otro código (fallback genérico) */
  codigo: string;
};

const CODIGOS_CONOCIDOS = ["token_no_existe", "token_vencido", "ficha_ya_completa"] as const;

/**
 * Pantallas de error de /cita/[token]. No hay idioma del cliente disponible
 * aquí —el GET falló antes de traerlo— así que se muestra en español con una
 * línea de apoyo en inglés, y salida directa a WhatsApp en los dos casos.
 */
export default function ErrorScreen({ codigo }: Props) {
  const clave = (CODIGOS_CONOCIDOS as readonly string[]).includes(codigo)
    ? (codigo as (typeof CODIGOS_CONOCIDOS)[number])
    : "generico";

  const es = fichaText.es.error[clave];
  const en = fichaText.en.error[clave];
  const whatsappUrl = `https://wa.me/${site.whatsapp}`;

  return (
    <main className="fichaErrorScreen">
      <div className="fichaErrorCard">
        <div className="fichaFinalCheck" aria-hidden="true">
          !
        </div>
        <h1>{es.titulo}</h1>
        <p>{es.texto}</p>
        <p className="fichaErrorEn">
          {en.titulo} — {en.texto}
        </p>
        <div className="fichaFinalActions">
          <a className="button fichaWhatsappButton" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            {fichaText.es.error.whatsapp}
          </a>
        </div>
      </div>
    </main>
  );
}
