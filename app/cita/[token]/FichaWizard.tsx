"use client";

import { useEffect, useRef, useState } from "react";
import { enviarFichaAction, identificarFichaAction } from "./actions";
import PantallaFinal from "./PantallaFinal";
import { site } from "@/content/site";
import { borrarBorrador, guardarBorrador, leerBorrador } from "@/lib/ficha/draft";
import { correoValido } from "@/lib/ficha/email";
import { codigoCuponParaPayload, comprobanteValido } from "@/lib/ficha/comprobante";
import { formatearFecha, formatearHora, formatearMoneda } from "@/lib/ficha/format";
import { consentimientoSaludParaPayload, consentimientoSaludValido, tieneDatosSalud } from "@/lib/ficha/health";
import { formatearMientrasEscribe, paisesOrdenados, telefonoValido, type CountryCode } from "@/lib/ficha/phone";
import { fichaText, textoCabeceraPendiente } from "@/lib/ficha/text";
import { ubicacionVisible } from "@/lib/ficha/resumen";
import {
  esExito,
  type EnviarFichaData,
  type EnviarFichaPayload,
  type EnviarFichaResult,
  type FichaData,
  type FichaRecurrenteData,
  type Idioma,
  type IdentificarFichaResult,
} from "@/lib/caja/types";

type Props = {
  ficha: FichaData;
  token: string;
};

export default function FichaWizard({ ficha, token }: Props) {
  const [idioma, setIdioma] = useState<Idioma>(ficha.idioma);
  const [paso, setPaso] = useState(1);
  const [flujo, setFlujo] = useState<"identificar" | "decision" | "rapida" | "completa">("identificar");
  const [identificacion, setIdentificacion] = useState<FichaRecurrenteData | null>(null);
  const [identificando, setIdentificando] = useState(false);
  const [errorIdentificacion, setErrorIdentificacion] = useState<string | null>(null);
  const [observacionNueva, setObservacionNueva] = useState("");
  const [usarComprobanteAnterior, setUsarComprobanteAnterior] = useState(false);
  const [resultado, setResultado] = useState<EnviarFichaData | null>(null);

  // Paso 1
  const [pais, setPais] = useState<CountryCode>("PE");
  // Arranca con solo Perú (el país por defecto, sin depender de Intl) y se
  // completa después del montaje: Intl.DisplayNames no garantiza el mismo
  // texto entre el Node del servidor y el ICU del navegador (por ejemplo,
  // "RAE de Hong Kong (China)" contra "Hong Kong" para el mismo código), y
  // calcular la lista completa durante el render del servidor rompería la
  // hidratación.
  const [paises, setPaises] = useState<{ code: CountryCode; name: string }[]>([
    { code: "PE", name: ficha.idioma === "es" ? "Perú" : "Peru" },
  ]);
  const [telefonoCrudo, setTelefonoCrudo] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [cumpleDia, setCumpleDia] = useState("");
  const [cumpleMes, setCumpleMes] = useState("");
  const [mostrarErroresPaso1, setMostrarErroresPaso1] = useState(false);

  // Paso 2
  const [codigoCupon, setCodigoCupon] = useState("");
  const [mostrarErroresPaso2, setMostrarErroresPaso2] = useState(false);

  // Paso 3 — salud
  const [ningunaSalud, setNingunaSalud] = useState(false);
  const [embarazo, setEmbarazo] = useState(false);
  const [presion, setPresion] = useState(false);
  const [cirugiaReciente, setCirugiaReciente] = useState(false);
  const [alergias, setAlergias] = useState("");
  const [zonasEvitar, setZonasEvitar] = useState("");
  const [notas, setNotas] = useState("");

  // Paso 3 — boleta y consentimientos
  const [boletaRequiere, setBoletaRequiere] = useState(false);
  const [boletaTipo, setBoletaTipo] = useState<"DNI" | "RUC">("DNI");
  const [boletaNumero, setBoletaNumero] = useState("");
  const [boletaRazonSocial, setBoletaRazonSocial] = useState("");
  const [consentDatos, setConsentDatos] = useState(false);
  const [consentSalud, setConsentSalud] = useState(false);
  const [consentPromos, setConsentPromos] = useState(false);

  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  const t = fichaText[idioma];
  const cabecera = ficha.requiere.confirmacionManual
    ? textoCabeceraPendiente(idioma, ficha.requiere.motivoConfirmacion)
    : t.cabecera;
  const ubicacion = ubicacionVisible(ficha.cita);
  const cargadoRef = useRef(false);

  // Cargar únicamente preferencias no sensibles. Tras recargar se vuelve a
  // pedir WhatsApp y los datos recuperados nunca se restauran desde disco.
  //
  // Se hace en un efecto (y no con un initializer perezoso de useState) a
  // propósito: localStorage no existe durante el render en el servidor, así
  // que leerlo ahí evita un mismatch de hidratación —el servidor y el primer
  // pintado del cliente muestran el formulario vacío, y recién después del
  // montaje se aplica el borrador—.
  useEffect(() => {
    const borrador = leerBorrador(token);
    if (borrador) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restaurar el borrador guardado es justo lo que este efecto sincroniza desde localStorage.
      setIdioma(borrador.idioma || ficha.idioma);
      setPais((borrador.pais as CountryCode) || "PE");
      setCodigoCupon(borrador.codigoCupon || "");
    }
    cargadoRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (!cargadoRef.current || resultado) return;
    guardarBorrador(token, {
      paso,
      idioma,
      pais,
      codigoCupon,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    token,
    paso,
    idioma,
    pais,
    codigoCupon,
  ]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza la lista de países con Intl, que solo puede leerse sin riesgo de hidratación después del montaje (ver el comentario junto al useState de arriba).
    setPaises(paisesOrdenados(idioma));
  }, [idioma]);

  // Caja es la única fuente de verdad sobre qué campos son obligatorios.
  // El país del teléfono no añade por sí solo una exigencia de correo.
  const correoRequerido = ficha.requiere.correoObligatorio;
  const telefonoOk = telefonoValido(telefonoCrudo, pais);
  const nombreOk = nombre.trim().length > 1;
  const correoOk = correoValido(correo, correoRequerido);
  const paso1Valido = telefonoOk && nombreOk && correoOk;

  const cuponOk = !ficha.requiere.codigoCupon || /^[A-Za-z0-9-]{4,20}$/.test(codigoCupon.trim());

  const boletaNumeroOk = comprobanteValido({
    requiere: boletaRequiere,
    tipo: boletaTipo,
    numero: boletaNumero,
    razonSocial: boletaRazonSocial,
  });
  const saludBase: EnviarFichaPayload["salud"] = {
    embarazo,
    presion,
    cirugiaReciente,
    alergias: alergias.trim(),
    zonasEvitar: zonasEvitar.trim(),
    notas: notas.trim(),
  };
  const salud: EnviarFichaPayload["salud"] = flujo === "rapida" && observacionNueva.trim()
    ? {
        ...saludBase,
        notas: [saludBase.notas, observacionNueva.trim()].filter(Boolean).join("\n"),
      }
    : saludBase;
  const hayDatosSalud = tieneDatosSalud(salud);
  const paso3Valido = consentDatos && consentimientoSaludValido(salud, consentSalud) && boletaNumeroOk;

  function alternarIdioma() {
    setIdioma((actual) => (actual === "es" ? "en" : "es"));
  }

  function marcarNingunaSalud() {
    setNingunaSalud(true);
    setEmbarazo(false);
    setPresion(false);
    setCirugiaReciente(false);
    setAlergias("");
    setZonasEvitar("");
    setNotas("");
    setConsentSalud(false);
  }

  function textoErrorIdentificacion(codigo: string) {
    const errores = t.identificar.error;
    if (codigo === "identificacion_no_valida") return errores.identificacion_no_valida;
    if (codigo === "rate_limited") return errores.rate_limited;
    if (codigo === "token_no_existe") return errores.token_no_existe;
    if (codigo === "token_vencido") return errores.token_vencido;
    if (codigo === "ficha_ya_completa") return errores.ficha_ya_completa;
    if (codigo === "configuracion") return errores.configuracion;
    if (codigo === "no_autorizado") return errores.no_autorizado;
    if (codigo === "contrato_incompatible") return errores.contrato_incompatible;
    return errores.generico;
  }

  function aplicarIdentificacion(data: FichaRecurrenteData) {
    setIdentificacion(data);
    setNombre(data.cliente.nombre ?? "");
    setCorreo(data.cliente.correo ?? "");
    setCumpleDia(data.cliente.cumple?.dia ? String(data.cliente.cumple.dia) : "");
    setCumpleMes(data.cliente.cumple?.mes ? String(data.cliente.cumple.mes) : "");
    setConsentPromos(false);
    setConsentDatos(false);
    setConsentSalud(false);
    setUsarComprobanteAnterior(false);
    setBoletaRequiere(false);
    setBoletaNumero("");
    setBoletaRazonSocial("");
    setBoletaTipo("DNI");
    setObservacionNueva("");

    const saludAnterior = data.saludAnterior;
    setNingunaSalud(Boolean(saludAnterior?.sinCondicionesDeclaradas));
    setEmbarazo(Boolean(saludAnterior?.embarazo));
    setPresion(Boolean(saludAnterior?.presion));
    setCirugiaReciente(Boolean(saludAnterior?.cirugiaReciente));
    setAlergias(saludAnterior?.alergias ?? "");
    setZonasEvitar(saludAnterior?.zonasEvitar ?? "");
    setNotas(saludAnterior?.notas ?? "");
  }

  async function identificar() {
    if (!telefonoOk) {
      setMostrarErroresPaso1(true);
      return;
    }
    setIdentificando(true);
    setErrorIdentificacion(null);
    const respuesta: IdentificarFichaResult = await identificarFichaAction(token, { crudo: telefonoCrudo, pais });
    setIdentificando(false);
    if (!esExito(respuesta)) {
      setErrorIdentificacion(textoErrorIdentificacion(respuesta.error.error));
      return;
    }
    aplicarIdentificacion(respuesta.data);
    setFlujo(respuesta.data.clienteRecurrente ? "decision" : "completa");
    setPaso(1);
  }

  function cambiarUsoComprobanteAnterior(usar: boolean) {
    setUsarComprobanteAnterior(usar);
    const comprobante = identificacion?.comprobanteAnterior;
    if (!usar || !comprobante) {
      setBoletaRequiere(false);
      setBoletaNumero("");
      setBoletaRazonSocial("");
      setBoletaTipo("DNI");
      return;
    }
    setBoletaRequiere(true);
    setBoletaTipo(comprobante.tipoDocumento);
    setBoletaNumero(comprobante.numeroDocumento);
    setBoletaRazonSocial(comprobante.razonSocial ?? "");
  }

  async function enviar() {
    if (!paso3Valido) return;
    setErrorEnvio(null);
    setEnviando(true);

    const payload: EnviarFichaPayload = {
      telefono: { crudo: telefonoCrudo, pais },
      nombre: nombre.trim(),
      correo: correo.trim() || null,
      cumple: cumpleDia && cumpleMes ? { dia: Number(cumpleDia), mes: Number(cumpleMes) } : null,
      boleta: {
        requiere: boletaRequiere,
        tipo: boletaRequiere ? boletaTipo : null,
        numero: boletaRequiere ? boletaNumero.trim() : null,
        razonSocial: boletaRequiere && boletaTipo === "RUC" ? boletaRazonSocial.trim() : null,
      },
      salud,
      consentimientos: {
        datos: consentDatos,
        salud: consentimientoSaludParaPayload(salud, consentSalud),
        promociones: consentPromos,
      },
      codigoCupon: codigoCuponParaPayload(ficha.requiere.codigoCupon, codigoCupon),
      idioma,
    };

    const respuesta: EnviarFichaResult = await enviarFichaAction(token, payload);
    setEnviando(false);

    if (!esExito(respuesta)) {
      if (respuesta.error.error === "cupon_ya_usado") {
        if (flujo === "completa") setPaso(2);
        setErrorEnvio(t.errorEnvio.cupon_ya_usado);
        return;
      }
      if (respuesta.error.error === "validacion") {
        setErrorEnvio(t.errorEnvio.validacion);
        return;
      }
      if (respuesta.error.error === "contrato_incompatible") {
        setErrorEnvio(t.errorEnvio.contrato_incompatible);
        return;
      }
      setErrorEnvio(t.errorEnvio.generico);
      return;
    }

    borrarBorrador(token);
    setResultado(respuesta.data);
  }

  if (resultado) {
    return (
      <main className="fichaPage">
        <div className="fichaShell">
          <PantallaFinal
            idioma={idioma}
            resultado={resultado}
            politicaCancelacionUrl={ficha.politicaCancelacionUrl}
            confirmacionManual={ficha.requiere.confirmacionManual}
            motivoConfirmacion={ficha.requiere.motivoConfirmacion}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="fichaPage">
      <div className="fichaShell">
        <div className="fichaTopRow">
          <span className="fichaStepper">
            {flujo === "completa" ? t.stepper(paso) : flujo === "identificar" ? t.identificar.titulo : t.identificar.verificada}
          </span>
          <button type="button" className="fichaLangToggle" onClick={alternarIdioma}>
            {t.idiomaBoton}
          </button>
        </div>

        {(flujo !== "completa" || paso === 1) && (
          <div className="fichaHeaderCard">
            <span className="eyebrow">Vita Lima Spa</span>
            <strong>{cabecera.titulo}</strong>
            <p>
              {formatearFecha(ficha.cita.fecha, idioma)}, {formatearHora(ficha.cita.hora, idioma)} · {ubicacion}
            </p>
            <p>
              {ficha.cita.servicios.map((servicio) => servicio.nombre).join(", ")}, {ficha.cita.duracionTotalMin} min ·{" "}
              {ficha.pago.leyenda} {formatearMoneda(ficha.pago.adelantoRecibido, ficha.pago.moneda)}
            </p>
            <p>{cabecera.subtitulo}</p>
          </div>
        )}

        <div className="fichaCard">
          {flujo === "identificar" && (
            <>
              <h2>{t.identificar.titulo}</h2>
              <p className="fichaCardIntro">{t.identificar.intro}</p>

              <div className="fichaField">
                <label htmlFor="ficha-pais">{t.paso1.paisLabel}</label>
                <div className="fichaPhoneRow">
                  <select id="ficha-pais" value={pais} onChange={(evento) => setPais(evento.target.value as CountryCode)}>
                    {paises.map((opcion) => (
                      <option key={opcion.code} value={opcion.code}>{opcion.name}</option>
                    ))}
                  </select>
                  <input
                    aria-label={t.paso1.telefonoLabel}
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={telefonoCrudo}
                    onChange={(evento) => setTelefonoCrudo(formatearMientrasEscribe(evento.target.value, pais))}
                  />
                </div>
                {mostrarErroresPaso1 && !telefonoOk && <span className="fichaErrorText">{t.paso1.telefonoError}</span>}
              </div>

              {errorIdentificacion && <div className="fichaBanner">{errorIdentificacion}</div>}
              <div className="fichaButtonRow">
                <button type="button" className="button orangeButton" onClick={identificar} disabled={identificando}>
                  {identificando ? t.identificar.verificando : t.identificar.continuar}
                </button>
              </div>
            </>
          )}

          {flujo === "decision" && identificacion && (
            <>
              <h2>{t.identificar.encontrada}</h2>
              <p className="fichaCardIntro">{t.identificar.pregunta}</p>

              <div className="fichaReviewCard">
                <strong>{identificacion.cliente.nombre ?? "—"}</strong>
                {identificacion.cliente.correo && <span>{identificacion.cliente.correo}</span>}
                {identificacion.cliente.cumple && <span>{identificacion.cliente.cumple.dia}/{identificacion.cliente.cumple.mes}</span>}
              </div>
              <div className="fichaReviewCard">
                <strong>{t.identificar.resumenSalud}</strong>
                {identificacion.saludAnterior?.sinCondicionesDeclaradas || !identificacion.saludAnterior ? (
                  <span>{t.identificar.sinCondiciones}</span>
                ) : (
                  <span>
                    {[
                      identificacion.saludAnterior.embarazo ? t.paso3.salud.embarazo : null,
                      identificacion.saludAnterior.presion ? t.paso3.salud.presion : null,
                      identificacion.saludAnterior.cirugiaReciente ? t.paso3.salud.cirugiaReciente : null,
                      identificacion.saludAnterior.alergias,
                      identificacion.saludAnterior.zonasEvitar,
                      identificacion.saludAnterior.notas,
                    ].filter(Boolean).join(" · ")}
                  </span>
                )}
              </div>
              {identificacion.comprobanteAnterior && (
                <div className="fichaReviewCard">
                  <strong>{identificacion.comprobanteAnterior.tipoComprobante}</strong>
                  <span>{identificacion.comprobanteAnterior.tipoDocumento} · {identificacion.comprobanteAnterior.numeroDocumento}</span>
                  {identificacion.comprobanteAnterior.razonSocial && <span>{identificacion.comprobanteAnterior.razonSocial}</span>}
                </div>
              )}

              <div className="fichaButtonStack">
                <button type="button" className="button orangeButton" onClick={() => setFlujo("rapida")}>{t.identificar.igual}</button>
                <button type="button" className="button fichaBackButton" onClick={() => { setFlujo("completa"); setPaso(1); }}>{t.identificar.actualizar}</button>
              </div>
            </>
          )}

          {flujo === "rapida" && identificacion && (
            <>
              <h2>{t.identificar.encontrada}</h2>
              <p className="fichaCardIntro">{t.identificar.pregunta}</p>

              <div className="fichaField">
                <label htmlFor="ficha-observacion-rapida">
                  {t.identificar.observacionLabel} <span className="fichaHint">({t.identificar.observacionHint})</span>
                </label>
                <textarea id="ficha-observacion-rapida" rows={3} value={observacionNueva} onChange={(evento) => setObservacionNueva(evento.target.value)} />
              </div>

              {identificacion.comprobanteAnterior && (
                <label className="fichaConsent">
                  <input type="checkbox" checked={usarComprobanteAnterior} onChange={(evento) => cambiarUsoComprobanteAnterior(evento.target.checked)} />
                  <span>{t.identificar.comprobante}</span>
                </label>
              )}

              {ficha.requiere.codigoCupon && (
                <div className={`fichaField fichaCuponField${mostrarErroresPaso2 && !cuponOk ? " fichaFieldError" : ""}`}>
                  <label htmlFor="ficha-cupon-rapido">{t.paso2.cuponLabel}</label>
                  <input id="ficha-cupon-rapido" type="text" autoCapitalize="characters" value={codigoCupon} onChange={(evento) => setCodigoCupon(evento.target.value)} />
                  {mostrarErroresPaso2 && !cuponOk && <span className="fichaErrorText">{t.paso2.cuponError}</span>}
                </div>
              )}

              <div className="fichaConsentGroup">
                <label className="fichaConsent">
                  <input type="checkbox" checked={consentDatos} onChange={(evento) => setConsentDatos(evento.target.checked)} />
                  <span>{t.paso3.consentimientos.datos} <a href="/politica-de-privacidad" target="_blank" rel="noopener noreferrer">{t.paso3.consentimientos.datosLink}</a></span>
                </label>
                {hayDatosSalud && (
                  <label className="fichaConsent fichaConsentSalud">
                    <input type="checkbox" checked={consentSalud} onChange={(evento) => setConsentSalud(evento.target.checked)} />
                    <span>{t.paso3.consentimientos.salud}</span>
                  </label>
                )}
                <label className="fichaConsent">
                  <input type="checkbox" checked={consentPromos} onChange={(evento) => setConsentPromos(evento.target.checked)} />
                  <span>{t.paso3.consentimientos.promociones}</span>
                </label>
              </div>
              {errorEnvio && <div className="fichaBanner">{errorEnvio}</div>}
              <div className="fichaButtonRow">
                <button type="button" className="button fichaBackButton" onClick={() => setFlujo("decision")} disabled={enviando}>{t.identificar.volver}</button>
                <button type="button" className="button orangeButton" onClick={() => { if (cuponOk) enviar(); else setMostrarErroresPaso2(true); }} disabled={enviando || !paso3Valido}>
                  {enviando ? t.paso3.enviando : t.identificar.enviarRapido}
                </button>
              </div>
            </>
          )}

          {flujo === "completa" && paso === 1 && (
            <>
              <h2>{t.paso1.titulo}</h2>
              <p className="fichaCardIntro">{t.paso1.intro}</p>

              <div className={`fichaField${mostrarErroresPaso1 && !nombreOk ? " fichaFieldError" : ""}`}>
                <label htmlFor="ficha-nombre">{t.paso1.nombreLabel}</label>
                <input
                  id="ficha-nombre"
                  type="text"
                  autoComplete="name"
                  value={nombre}
                  onChange={(evento) => setNombre(evento.target.value)}
                />
              </div>

              <div className="fichaVerifiedPhone">✓ {t.identificar.verificada}</div>

              <div className={`fichaField${mostrarErroresPaso1 && !correoOk ? " fichaFieldError" : ""}`}>
                <label htmlFor="ficha-correo">
                  {t.paso1.correoLabel} {!correoRequerido && <span className="fichaHint">({t.paso1.correoOpcionalHint})</span>}
                </label>
                <input
                  id="ficha-correo"
                  type="email"
                  autoComplete="email"
                  value={correo}
                  onChange={(evento) => setCorreo(evento.target.value)}
                />
                {mostrarErroresPaso1 && !correoOk && <span className="fichaErrorText">{t.paso1.correoError}</span>}
              </div>

              <div className="fichaField">
                <label>{t.paso1.cumpleLabel}</label>
                <div className="fichaTwoCol">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={31}
                    placeholder={t.paso1.cumpleDiaPlaceholder}
                    value={cumpleDia}
                    onChange={(evento) => setCumpleDia(evento.target.value)}
                  />
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={12}
                    placeholder={t.paso1.cumpleMesPlaceholder}
                    value={cumpleMes}
                    onChange={(evento) => setCumpleMes(evento.target.value)}
                  />
                </div>
              </div>

              <div className="fichaButtonRow">
                <button
                  type="button"
                  className="button orangeButton"
                  onClick={() => (paso1Valido ? setPaso(2) : setMostrarErroresPaso1(true))}
                >
                  {t.paso1.continuar}
                </button>
              </div>
            </>
          )}

          {flujo === "completa" && paso === 2 && (
            <>
              <h2>{t.paso2.titulo}</h2>

              <div className="fichaSummaryRow">
                <span>{formatearFecha(ficha.cita.fecha, idioma)}</span>
                <strong>{formatearHora(ficha.cita.hora, idioma)}</strong>
              </div>
              <div className="fichaSummaryRow">
                <span>{ubicacion}</span>
                <strong>{t.paso2.personas(ficha.cita.personas)}</strong>
              </div>
              <div className="fichaSummaryRow">
                <span>{ficha.cita.servicios.map((servicio) => servicio.nombre).join(", ")}</span>
                <strong>{ficha.cita.duracionTotalMin != null ? `${ficha.cita.duracionTotalMin} min` : "—"}</strong>
              </div>
              <div className="fichaSummaryRow">
                <span>{ficha.pago.leyenda}</span>
                <strong>{formatearMoneda(ficha.pago.adelantoRecibido, ficha.pago.moneda)}</strong>
              </div>

              <a className="fichaChangeLink" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
                {t.paso2.cambiar} →
              </a>

              {ficha.requiere.codigoCupon && (
                <div className={`fichaField fichaCuponField${mostrarErroresPaso2 && !cuponOk ? " fichaFieldError" : ""}`}>
                  <label htmlFor="ficha-cupon">{t.paso2.cuponLabel}</label>
                  <input
                    id="ficha-cupon"
                    type="text"
                    autoCapitalize="characters"
                    value={codigoCupon}
                    onChange={(evento) => setCodigoCupon(evento.target.value)}
                  />
                  {t.paso2.cuponHint(ficha.cupon?.vigenteHasta) && (
                    <span className="fichaHint">{t.paso2.cuponHint(ficha.cupon?.vigenteHasta)}</span>
                  )}
                  {mostrarErroresPaso2 && !cuponOk && <span className="fichaErrorText">{t.paso2.cuponError}</span>}
                </div>
              )}

              {errorEnvio && <div className="fichaBanner">{errorEnvio}</div>}

              <div className="fichaButtonRow">
                <button type="button" className="button fichaBackButton" onClick={() => setPaso(1)}>
                  {t.paso2.atras}
                </button>
                <button
                  type="button"
                  className="button orangeButton"
                  onClick={() => (cuponOk ? setPaso(3) : setMostrarErroresPaso2(true))}
                >
                  {t.paso2.continuar}
                </button>
              </div>
            </>
          )}

          {flujo === "completa" && paso === 3 && (
            <>
              <h2>{t.paso3.titulo}</h2>
              <p className="fichaCardIntro">{t.paso3.intro}</p>

              {!ningunaSalud ? (
                <>
                  <button type="button" className="fichaSkipAll" onClick={marcarNingunaSalud}>
                    {t.paso3.ningunaDeLasAnteriores}
                  </button>

                  <div className="fichaHealthGrid">
                    <label className="fichaCheckboxRow">
                      <input type="checkbox" checked={embarazo} onChange={(evento) => setEmbarazo(evento.target.checked)} />
                      <span>{t.paso3.salud.embarazo}</span>
                    </label>
                    <label className="fichaCheckboxRow">
                      <input type="checkbox" checked={presion} onChange={(evento) => setPresion(evento.target.checked)} />
                      <span>{t.paso3.salud.presion}</span>
                    </label>
                    <label className="fichaCheckboxRow">
                      <input
                        type="checkbox"
                        checked={cirugiaReciente}
                        onChange={(evento) => setCirugiaReciente(evento.target.checked)}
                      />
                      <span>{t.paso3.salud.cirugiaReciente}</span>
                    </label>
                  </div>

                  <div className="fichaField">
                    <label htmlFor="ficha-alergias">{t.paso3.salud.alergiasLabel}</label>
                    <input id="ficha-alergias" type="text" value={alergias} onChange={(evento) => setAlergias(evento.target.value)} />
                  </div>
                  <div className="fichaField">
                    <label htmlFor="ficha-zonas">{t.paso3.salud.zonasEvitarLabel}</label>
                    <input id="ficha-zonas" type="text" value={zonasEvitar} onChange={(evento) => setZonasEvitar(evento.target.value)} />
                  </div>
                  <div className="fichaField">
                    <label htmlFor="ficha-notas">{t.paso3.salud.notasLabel}</label>
                    <textarea id="ficha-notas" rows={2} value={notas} onChange={(evento) => setNotas(evento.target.value)} />
                  </div>
                </>
              ) : (
                <button type="button" className="fichaSkipAll" onClick={() => setNingunaSalud(false)}>
                  ✓ {t.paso3.ningunaDeLasAnteriores}
                </button>
              )}

              {ficha.requiere.documentoParaBoleta === "opcional" && (
                <div className="fichaBoletaFields">
                  <label className="fichaCheckboxRow">
                    <input type="checkbox" checked={boletaRequiere} onChange={(evento) => setBoletaRequiere(evento.target.checked)} />
                    <span>{t.paso3.boleta.requiereLabel}</span>
                  </label>

                  {boletaRequiere && (
                    <>
                      <div className="fichaField">
                        <label htmlFor="ficha-boleta-tipo">{t.paso3.boleta.tipoLabel}</label>
                        <select
                          id="ficha-boleta-tipo"
                          value={boletaTipo}
                          onChange={(evento) => setBoletaTipo(evento.target.value as "DNI" | "RUC")}
                        >
                          <option value="DNI">DNI</option>
                          <option value="RUC">RUC</option>
                        </select>
                      </div>
                      <div className={`fichaField${!boletaNumeroOk ? " fichaFieldError" : ""}`}>
                        <label htmlFor="ficha-boleta-numero">
                          {boletaTipo === "DNI" ? t.paso3.boleta.numeroLabelDni : t.paso3.boleta.numeroLabelRuc}
                        </label>
                        <input
                          id="ficha-boleta-numero"
                          type="text"
                          inputMode="numeric"
                          value={boletaNumero}
                          onChange={(evento) => setBoletaNumero(evento.target.value)}
                        />
                        {!boletaNumeroOk && <span className="fichaErrorText">{t.paso3.boleta.numeroError}</span>}
                      </div>
                      {boletaTipo === "RUC" && (
                        <div className="fichaField">
                          <label htmlFor="ficha-boleta-razon">{t.paso3.boleta.razonSocialLabel}</label>
                          <input
                            id="ficha-boleta-razon"
                            type="text"
                            value={boletaRazonSocial}
                            onChange={(evento) => setBoletaRazonSocial(evento.target.value)}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              <div className="fichaConsentGroup">
                <label className="fichaConsent">
                  <input type="checkbox" checked={consentDatos} onChange={(evento) => setConsentDatos(evento.target.checked)} />
                  <span>
                    {t.paso3.consentimientos.datos}{" "}
                    <a href="/politica-de-privacidad" target="_blank" rel="noopener noreferrer">
                      {t.paso3.consentimientos.datosLink}
                    </a>
                  </span>
                </label>
                {hayDatosSalud && (
                  <label className="fichaConsent fichaConsentSalud">
                    <input type="checkbox" checked={consentSalud} onChange={(evento) => setConsentSalud(evento.target.checked)} />
                    <span>{t.paso3.consentimientos.salud}</span>
                  </label>
                )}
                <label className="fichaConsent">
                  <input type="checkbox" checked={consentPromos} onChange={(evento) => setConsentPromos(evento.target.checked)} />
                  <span>{t.paso3.consentimientos.promociones}</span>
                </label>
              </div>

              {errorEnvio && <div className="fichaBanner">{errorEnvio}</div>}

              <div className="fichaButtonRow">
                <button type="button" className="button fichaBackButton" onClick={() => setPaso(2)} disabled={enviando}>
                  {t.paso3.atras}
                </button>
                <button type="button" className="button orangeButton" onClick={enviar} disabled={enviando || !paso3Valido}>
                  {enviando ? t.paso3.enviando : t.paso3.enviar}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
