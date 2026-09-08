"use client";

import { useEffect, useRef, useState } from "react";
import { enviarFichaAction } from "./actions";
import PantallaFinal from "./PantallaFinal";
import { site } from "@/content/site";
import { borrarBorrador, guardarBorrador, leerBorrador } from "@/lib/ficha/draft";
import { correoValido } from "@/lib/ficha/email";
import { formatearFecha, formatearHora, formatearMoneda } from "@/lib/ficha/format";
import { consentimientoSaludParaPayload, consentimientoSaludValido, tieneDatosSalud } from "@/lib/ficha/health";
import { formatearMientrasEscribe, paisesOrdenados, telefonoValido, type CountryCode } from "@/lib/ficha/phone";
import { fichaText } from "@/lib/ficha/text";
import { esExito, type EnviarFichaData, type EnviarFichaPayload, type EnviarFichaResult, type FichaData, type Idioma } from "@/lib/caja/types";

type Props = {
  ficha: FichaData;
  token: string;
};

export default function FichaWizard({ ficha, token }: Props) {
  const [idioma, setIdioma] = useState<Idioma>(ficha.idioma);
  const [paso, setPaso] = useState(1);
  const [resultado, setResultado] = useState<EnviarFichaData | null>(null);

  // Paso 1
  const [editarConocido, setEditarConocido] = useState(false);
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
  const [nombre, setNombre] = useState(ficha.cliente.conocido ? ficha.cliente.nombre ?? "" : "");
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
  const cabecera = ficha.requiere.confirmacionManual ? t.cabeceraPendiente : t.cabecera;
  const cargadoRef = useRef(false);

  // Cargar borrador del dispositivo, si no venció (24h) y es de este token.
  // Nunca incluye salud: ese bloque siempre arranca vacío.
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
      setPaso(borrador.paso || 1);
      setIdioma(borrador.idioma || ficha.idioma);
      setPais((borrador.pais as CountryCode) || "PE");
      setTelefonoCrudo(borrador.telefonoCrudo || "");
      setNombre(borrador.nombre || (ficha.cliente.conocido ? ficha.cliente.nombre ?? "" : ""));
      setCorreo(borrador.correo || "");
      setCumpleDia(borrador.cumpleDia || "");
      setCumpleMes(borrador.cumpleMes || "");
      setBoletaRequiere(borrador.boletaRequiere || false);
      setBoletaTipo(borrador.boletaTipo || "DNI");
      setBoletaNumero(borrador.boletaNumero || "");
      setBoletaRazonSocial(borrador.boletaRazonSocial || "");
      setCodigoCupon(borrador.codigoCupon || "");
      setConsentDatos(borrador.consentDatos || false);
      setConsentPromos(borrador.consentPromos || false);
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
      telefonoCrudo,
      nombre,
      correo,
      cumpleDia,
      cumpleMes,
      boletaRequiere,
      boletaTipo,
      boletaNumero,
      boletaRazonSocial,
      codigoCupon,
      consentDatos,
      consentPromos,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    token,
    paso,
    idioma,
    pais,
    telefonoCrudo,
    nombre,
    correo,
    cumpleDia,
    cumpleMes,
    boletaRequiere,
    boletaTipo,
    boletaNumero,
    boletaRazonSocial,
    codigoCupon,
    consentDatos,
    consentPromos,
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

  const boletaNumeroOk =
    !boletaRequiere ||
    (boletaTipo === "DNI" ? /^\d{8}$/.test(boletaNumero.trim()) : /^\d{11}$/.test(boletaNumero.trim()) && boletaRazonSocial.trim().length > 1);
  const salud: EnviarFichaPayload["salud"] = {
    embarazo,
    presion,
    cirugiaReciente,
    alergias: alergias.trim(),
    zonasEvitar: zonasEvitar.trim(),
    notas: notas.trim(),
  };
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
      codigoCupon: ficha.requiere.codigoCupon ? codigoCupon.trim() || null : null,
      idioma,
    };

    const respuesta: EnviarFichaResult = await enviarFichaAction(token, payload);
    setEnviando(false);

    if (!esExito(respuesta)) {
      if (respuesta.error.error === "cupon_ya_usado") {
        setPaso(2);
        setErrorEnvio(t.errorEnvio.cupon_ya_usado);
        return;
      }
      if (respuesta.error.error === "validacion") {
        setErrorEnvio(t.errorEnvio.validacion);
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
          />
        </div>
      </main>
    );
  }

  return (
    <main className="fichaPage">
      <div className="fichaShell">
        <div className="fichaTopRow">
          <span className="fichaStepper">{t.stepper(paso)}</span>
          <button type="button" className="fichaLangToggle" onClick={alternarIdioma}>
            {t.idiomaBoton}
          </button>
        </div>

        {paso === 1 && (
          <div className="fichaHeaderCard">
            <span className="eyebrow">Vita Lima Spa</span>
            <strong>{cabecera.titulo}</strong>
            <p>
              {formatearFecha(ficha.cita.fecha, idioma)}, {formatearHora(ficha.cita.hora, idioma)} · {ficha.cita.sede}
            </p>
            <p>
              {ficha.cita.servicios.map((servicio) => servicio.nombre).join(", ")}, {ficha.cita.duracionTotalMin} min ·{" "}
              {ficha.pago.leyenda} {formatearMoneda(ficha.pago.adelantoRecibido, ficha.pago.moneda)}
            </p>
            <p>{cabecera.subtitulo}</p>
          </div>
        )}

        <div className="fichaCard">
          {paso === 1 && (
            <>
              <h2>{t.paso1.titulo}</h2>
              <p className="fichaCardIntro">{t.paso1.intro}</p>

              {ficha.cliente.conocido && !editarConocido ? (
                <div className="fichaKnownCard">
                  <strong>{t.paso1.holaConocido(nombre || ficha.cliente.nombre || "")}</strong>
                  <button type="button" onClick={() => setEditarConocido(true)}>
                    {t.paso1.noSoyYo}
                  </button>
                </div>
              ) : (
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
              )}

              <div className="fichaField">
                <label htmlFor="ficha-pais">{t.paso1.paisLabel}</label>
                <div className="fichaPhoneRow">
                  <select id="ficha-pais" value={pais} onChange={(evento) => setPais(evento.target.value as CountryCode)}>
                    {paises.map((opcion) => (
                      <option key={opcion.code} value={opcion.code}>
                        {opcion.name}
                      </option>
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

          {paso === 2 && (
            <>
              <h2>{t.paso2.titulo}</h2>

              <div className="fichaSummaryRow">
                <span>{formatearFecha(ficha.cita.fecha, idioma)}</span>
                <strong>{formatearHora(ficha.cita.hora, idioma)}</strong>
              </div>
              <div className="fichaSummaryRow">
                <span>{ficha.cita.sede}</span>
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

          {paso === 3 && (
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
