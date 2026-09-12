import { formatearFecha, formatearHora, formatearMoneda } from "@/lib/ficha/format";
import { fichaText, textoFinalPendiente } from "@/lib/ficha/text";
import { duracionVisible, puedeMostrarMapaSede, ubicacionVisible } from "@/lib/ficha/resumen";
import { nombresServiciosVisibles } from "@/lib/ficha/presentation";
import type { EnviarFichaData, Idioma, MotivoConfirmacion } from "@/lib/caja/types";

type Props = {
  idioma: Idioma;
  resultado: EnviarFichaData;
  politicaCancelacionUrl: string | null;
  confirmacionManual: boolean;
  motivoConfirmacion: MotivoConfirmacion;
};

/**
 * Se muestra apenas caja confirma el envío (fetch del servidor, no
 * window.open): el cambio de pantalla no depende de si el botón de
 * WhatsApp de abajo logra abrirse o el navegador lo bloquea.
 */
export default function PantallaFinal({ idioma, resultado, politicaCancelacionUrl, confirmacionManual, motivoConfirmacion }: Props) {
  const t = fichaText[idioma].final;
  const encabezado = confirmacionManual ? textoFinalPendiente(idioma, motivoConfirmacion) : t;
  const { resumen } = resultado;
  const ubicacion = ubicacionVisible(resumen);
  const total = resumen.adelantoRecibido + resumen.saldo;

  return (
    <div className="fichaCard fichaFinalCard">
      <div className="fichaFinalCheck" aria-hidden="true">
        ✓
      </div>
      <h2>{encabezado.titulo}</h2>
      <p className="fichaCardIntro">{encabezado.subtitulo}</p>

      <div className="fichaSummaryRow">
        <span>{confirmacionManual ? t.cuandoPendiente : idioma === "es" ? "Cuándo" : "When"}</span>
        <strong>
          {formatearFecha(resumen.fecha, idioma)}, {formatearHora(resumen.hora, idioma)}
        </strong>
      </div>
      <div className="fichaSummaryRow">
        <span>{idioma === "es" ? "Dónde" : "Where"}</span>
        <strong>{ubicacion}</strong>
      </div>
      <div className="fichaSummaryRow">
        <span>{nombresServiciosVisibles(resumen.servicios)}</span>
        <strong>{duracionVisible(resumen)} min</strong>
      </div>
      <div className="fichaSummaryRow">
        <span>{t.total}</span>
        <strong>{formatearMoneda(total, resumen.moneda)}</strong>
      </div>
      <div className="fichaSummaryRow">
        <span>{t.adelanto}</span>
        <strong>{formatearMoneda(resumen.adelantoRecibido, resumen.moneda)}</strong>
      </div>
      <div className="fichaSummaryRow">
        <span>{t.saldo}</span>
        <strong>{formatearMoneda(resumen.saldo, resumen.moneda)}</strong>
      </div>

      {puedeMostrarMapaSede(resumen) && resumen.sedeMapsUrl && (
        <a className="fichaChangeLink" href={resumen.sedeMapsUrl} target="_blank" rel="noopener noreferrer">
          📍 {t.direccion}
        </a>
      )}

      <div className="fichaFinalActions">
        <a className="button orangeButton" href={resultado.icsUrl}>
          {t.calendario}
        </a>
        <a className="button fichaWhatsappButton" href={resultado.whatsappUrl} target="_blank" rel="noopener noreferrer">
          {t.whatsapp}
        </a>
      </div>

      <p className="fichaHint fichaFinalPolicy">
        {t.politica}{" "}
        {politicaCancelacionUrl && <a href={politicaCancelacionUrl}>{t.politicaLink}</a>}
      </p>
    </div>
  );
}
