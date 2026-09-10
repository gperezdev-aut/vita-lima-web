import type { Idioma, MotivoConfirmacion } from "@/lib/caja/types";

/**
 * Textos de /cita/[token]. Diccionario propio y aparte de lib/i18n/translations
 * (que cubre header, home y /servicios): aquí el idioma no viene de la URL —
 * viene del JSON de caja y de un selector que solo cambia el texto en cliente,
 * ver docs/encargo-web-ficha-cita.md.
 */
export const fichaText = {
  es: {
    idiomaBoton: "English",
    stepper: (paso: number) => `Paso ${paso} de 3`,
    cabecera: {
      titulo: "Tu cita está reservada.",
      subtitulo: "Solo faltan tus datos — toma menos de un minuto.",
    },
    cabeceraPendiente: {
      domicilio: {
        titulo: "Tu solicitud de cita fue registrada.",
        subtitulo: "Vita Lima confirmará por WhatsApp la cobertura de la zona y la disponibilidad de terapistas.",
      },
      convenio: {
        titulo: "Tu solicitud de cita fue registrada.",
        subtitulo: "Vita Lima validará el código o beneficio y te responderá por WhatsApp.",
      },
      generico: {
        titulo: "Tu solicitud de cita fue registrada.",
        subtitulo: "Vita Lima revisará tu solicitud y te responderá por WhatsApp.",
      },
    },
    identificar: {
      titulo: "Confirma tu WhatsApp",
      intro: "Primero verificaremos que esta ficha corresponde a ti.",
      continuar: "Continuar",
      verificando: "Verificando…",
      encontrada: "Encontramos tu ficha anterior",
      pregunta: "¿Toda tu información continúa igual?",
      igual: "Sí, todo sigue igual",
      actualizar: "Necesito actualizar mis datos",
      resumenSalud: "Información de salud anterior",
      sinCondiciones: "No registraste condiciones anteriormente.",
      comprobante: "Usar los mismos datos para mi comprobante",
      observacionLabel: "¿Tienes alguna nueva observación o indicación para esta atención?",
      observacionHint: "Opcional",
      enviarRapido: "Enviar mi ficha",
      volver: "Volver",
      verificada: "WhatsApp verificado",
      perfilIncompleto: "Necesitamos que completes tus datos antes de enviar la ficha.",
      error: {
        identificacion_no_valida: "No pudimos verificar tus datos. Revisa el país y WhatsApp e inténtalo nuevamente.",
        rate_limited: "Hiciste varios intentos. Espera unos minutos antes de volver a intentarlo.",
        token_no_existe: "Este enlace no existe.",
        token_vencido: "Este enlace venció.",
        ficha_ya_completa: "Esta ficha ya fue completada.",
        configuracion: "La ficha no está configurada en este momento.",
        no_autorizado: "No pudimos verificar la ficha en este momento.",
        contrato_incompatible: "Recibimos una respuesta incompatible. Escríbenos por WhatsApp mientras lo revisamos.",
        generico: "No pudimos conectarnos. Intenta nuevamente en un momento.",
      },
    },
    paso1: {
      titulo: "Quién eres",
      intro: "Para confirmar tu cita y mandarte el recordatorio.",
      holaConocido: (nombre: string) => `Hola, ${nombre} 👋`,
      noSoyYo: "¿No eres tú?",
      telefonoLabel: "Tu WhatsApp",
      paisLabel: "País",
      telefonoError: "Revisa el número, no parece válido para ese país.",
      nombreLabel: "Nombre completo",
      correoLabel: "Correo",
      correoOpcionalHint: "Opcional",
      correoError: "Escribe un correo válido.",
      cumpleLabel: "Cumpleaños (opcional)",
      cumpleDiaPlaceholder: "Día",
      cumpleMesPlaceholder: "Mes",
      continuar: "Continuar",
    },
    paso2: {
      titulo: "Tu cita",
      cambiar: "¿Necesitas cambiar algo? Escríbenos",
      personas: (n: number) => (n > 1 ? `${n} personas` : "1 persona"),
      cuponLabel: "Código de cupón",
      cuponHint: (vigenteHasta?: string) => (vigenteHasta ? `Válido hasta el ${vigenteHasta}` : undefined),
      cuponError: "Escribe el código tal como aparece en la plataforma.",
      atras: "Atrás",
      continuar: "Continuar",
    },
    paso3: {
      titulo: "Salud y permisos",
      intro: "Nos ayuda a cuidarte mejor durante la sesión.",
      ningunaDeLasAnteriores: "Ninguna de las anteriores",
      salud: {
        embarazo: "Estoy embarazada",
        presion: "Tengo la presión alta o baja",
        cirugiaReciente: "Tuve una cirugía en los últimos 3 meses",
        alergiasLabel: "Alergia a aceites o cremas (opcional)",
        zonasEvitarLabel: "Zonas a evitar (opcional)",
        notasLabel: "Algo más que debamos saber (opcional)",
      },
      boleta: {
        requiereLabel: "Necesito comprobante",
        tipoLabel: "Tipo de comprobante",
        numeroLabelDni: "DNI (8 dígitos)",
        numeroLabelRuc: "RUC (11 dígitos)",
        razonSocialLabel: "Razón social",
        numeroError: "Revisa el número de documento.",
      },
      consentimientos: {
        datos: "Acepto el tratamiento de mis datos según la",
        datosLink: "política de privacidad",
        salud: "Acepto que registren la información de salud que compartí arriba, para cuidarme mejor durante la sesión",
        promociones: "Quiero recibir promociones y novedades de Vita Lima (opcional)",
      },
      consentimientosError: "Falta aceptar el tratamiento de datos y el de salud.",
      atras: "Atrás",
      enviar: "Enviar mi ficha",
      enviando: "Enviando…",
    },
    errorEnvio: {
      cupon_ya_usado: "Este código de cupón ya fue usado. Revísalo o escríbenos por WhatsApp y te ayudamos.",
      validacion: "Algo no cuadra en tus datos. Revísalos e intenta de nuevo.",
      contrato_incompatible: "No mostraremos datos incompletos de tu cita. Escríbenos por WhatsApp mientras lo revisamos.",
      generico: "No pudimos enviar tu ficha. Intenta de nuevo o escríbenos por WhatsApp.",
    },
    final: {
      titulo: "¡Listo, tu ficha quedó completa!",
      subtitulo: "Te esperamos en la fecha y hora acordadas.",
      pendiente: {
        domicilio: {
          titulo: "Recibimos tu ficha.",
          subtitulo:
            "Tu atención todavía está pendiente de confirmación. Vita Lima verificará la cobertura de la zona y la disponibilidad de terapistas y te responderá por WhatsApp.",
        },
        convenio: {
          titulo: "Recibimos tu ficha.",
          subtitulo: "Tu atención está pendiente de validación del código o beneficio. Vita Lima te responderá por WhatsApp.",
        },
        generico: {
          titulo: "Recibimos tu ficha.",
          subtitulo: "Tu solicitud está pendiente de revisión. Vita Lima te responderá por WhatsApp.",
        },
      },
      cuandoPendiente: "Fecha y hora solicitadas",
      direccion: "Cómo llegar",
      adelanto: "Adelanto recibido",
      saldo: "Saldo a pagar al llegar",
      calendario: "Agregar a mi calendario",
      politica: "Puedes cancelar o reprogramar hasta con 24 horas de anticipación, escribiéndonos por WhatsApp.",
      politicaLink: "Ver política de cancelación",
      whatsapp: "¿Necesitas cambiar algo? Escríbenos",
    },
    error: {
      token_no_existe: {
        titulo: "Este enlace no existe",
        texto: "Puede que esté mal copiado. Escríbenos por WhatsApp y te ayudamos a encontrar tu cita.",
      },
      token_vencido: {
        titulo: "Este enlace venció",
        texto: "Los enlaces de ficha vencen después de la fecha de la cita. Escríbenos por WhatsApp si necesitas ayuda.",
      },
      ficha_ya_completa: {
        titulo: "Esta ficha ya está completa",
        texto: "Ya recibimos tus datos para esta cita. Si necesitas cambiar algo, escríbenos por WhatsApp.",
      },
      configuracion: {
        titulo: "La ficha no está configurada",
        texto: "Falta completar la configuración segura del servidor. Escríbenos por WhatsApp mientras lo resolvemos.",
      },
      contrato_incompatible: {
        titulo: "La ficha recibió una respuesta incompatible",
        texto: "No mostraremos datos incompletos de tu cita. Escríbenos por WhatsApp mientras lo revisamos.",
      },
      generico: {
        titulo: "No pudimos cargar tu ficha",
        texto: "Intenta de nuevo en un momento, o escríbenos por WhatsApp y te ayudamos directamente.",
      },
      whatsapp: "Escribir por WhatsApp",
    },
  },
  en: {
    idiomaBoton: "Español",
    stepper: (paso: number) => `Step ${paso} of 3`,
    cabecera: {
      titulo: "Your appointment is booked.",
      subtitulo: "Just need your details — takes less than a minute.",
    },
    cabeceraPendiente: {
      domicilio: {
        titulo: "Your appointment request has been received.",
        subtitulo: "Vita Lima will confirm service-area coverage and therapist availability via WhatsApp.",
      },
      convenio: {
        titulo: "Your appointment request has been received.",
        subtitulo: "Vita Lima will validate the code or benefit and contact you via WhatsApp.",
      },
      generico: {
        titulo: "Your appointment request has been received.",
        subtitulo: "Vita Lima will review your request and contact you via WhatsApp.",
      },
    },
    identificar: {
      titulo: "Confirm your WhatsApp",
      intro: "First, we'll verify that this form belongs to you.",
      continuar: "Continue",
      verificando: "Verifying…",
      encontrada: "We found your previous form",
      pregunta: "Is all your information still the same?",
      igual: "Yes, everything is the same",
      actualizar: "I need to update my details",
      resumenSalud: "Previous health information",
      sinCondiciones: "You did not report any previous conditions.",
      comprobante: "Use the same details for my receipt or invoice",
      observacionLabel: "Do you have any new note or instruction for this appointment?",
      observacionHint: "Optional",
      enviarRapido: "Send my form",
      volver: "Back",
      verificada: "WhatsApp verified",
      perfilIncompleto: "Please complete your details before sending the form.",
      error: {
        identificacion_no_valida: "We could not verify your details. Check the country and WhatsApp number, then try again.",
        rate_limited: "You made several attempts. Please wait a few minutes before trying again.",
        token_no_existe: "This link does not exist.",
        token_vencido: "This link expired.",
        ficha_ya_completa: "This form has already been completed.",
        configuracion: "This form is not configured right now.",
        no_autorizado: "We could not verify this form right now.",
        contrato_incompatible: "We received an incompatible response. Message us on WhatsApp while we review it.",
        generico: "We could not connect. Please try again in a moment.",
      },
    },
    paso1: {
      titulo: "Who you are",
      intro: "To confirm your appointment and send you a reminder.",
      holaConocido: (nombre: string) => `Hi, ${nombre} 👋`,
      noSoyYo: "Not you?",
      telefonoLabel: "Your WhatsApp",
      paisLabel: "Country",
      telefonoError: "Check the number, it doesn't look valid for that country.",
      nombreLabel: "Full name",
      correoLabel: "Email",
      correoOpcionalHint: "Optional",
      correoError: "Enter a valid email.",
      cumpleLabel: "Birthday (optional)",
      cumpleDiaPlaceholder: "Day",
      cumpleMesPlaceholder: "Month",
      continuar: "Continue",
    },
    paso2: {
      titulo: "Your appointment",
      cambiar: "Need to change something? Message us",
      personas: (n: number) => (n > 1 ? `${n} people` : "1 person"),
      cuponLabel: "Coupon code",
      cuponHint: (vigenteHasta?: string) => (vigenteHasta ? `Valid until ${vigenteHasta}` : undefined),
      cuponError: "Enter the code exactly as it appears on the platform.",
      atras: "Back",
      continuar: "Continue",
    },
    paso3: {
      titulo: "Health and permissions",
      intro: "This helps us take better care of you during the session.",
      ningunaDeLasAnteriores: "None of the above",
      salud: {
        embarazo: "I'm pregnant",
        presion: "I have high or low blood pressure",
        cirugiaReciente: "I had surgery in the last 3 months",
        alergiasLabel: "Allergy to oils or creams (optional)",
        zonasEvitarLabel: "Areas to avoid (optional)",
        notasLabel: "Anything else we should know (optional)",
      },
      boleta: {
        requiereLabel: "I need a receipt or invoice",
        tipoLabel: "Receipt type",
        numeroLabelDni: "DNI (8 digits)",
        numeroLabelRuc: "RUC (11 digits)",
        razonSocialLabel: "Business name",
        numeroError: "Check the document number.",
      },
      consentimientos: {
        datos: "I accept the processing of my data per the",
        datosLink: "privacy policy",
        salud: "I agree that the health information I shared above is recorded, to take better care of me during the session",
        promociones: "I want to receive promotions and news from Vita Lima (optional)",
      },
      consentimientosError: "You need to accept both the data and health consents.",
      atras: "Back",
      enviar: "Send my form",
      enviando: "Sending…",
    },
    errorEnvio: {
      cupon_ya_usado: "This coupon code was already used. Double-check it or message us on WhatsApp and we'll help.",
      validacion: "Something doesn't add up in your details. Check them and try again.",
      contrato_incompatible: "We will not show incomplete appointment details. Message us on WhatsApp while we review it.",
      generico: "We couldn't send your form. Try again or message us on WhatsApp.",
    },
    final: {
      titulo: "All done, your form is complete!",
      subtitulo: "See you on the agreed date and time.",
      pendiente: {
        domicilio: {
          titulo: "We received your form.",
          subtitulo:
            "Your appointment is still pending confirmation. Vita Lima will verify service-area coverage and therapist availability and contact you via WhatsApp.",
        },
        convenio: {
          titulo: "We received your form.",
          subtitulo: "Your appointment is pending code or benefit validation. Vita Lima will contact you via WhatsApp.",
        },
        generico: {
          titulo: "We received your form.",
          subtitulo: "Your request is pending review. Vita Lima will contact you via WhatsApp.",
        },
      },
      cuandoPendiente: "Requested date and time",
      direccion: "How to get there",
      adelanto: "Deposit received",
      saldo: "Balance to pay on arrival",
      calendario: "Add to my calendar",
      politica: "You can cancel or reschedule up to 24 hours in advance by messaging us on WhatsApp.",
      politicaLink: "View cancellation policy",
      whatsapp: "Need to change something? Message us",
    },
    error: {
      token_no_existe: {
        titulo: "This link doesn't exist",
        texto: "It might be mistyped. Message us on WhatsApp and we'll help you find your appointment.",
      },
      token_vencido: {
        titulo: "This link expired",
        texto: "Form links expire after the appointment date. Message us on WhatsApp if you need help.",
      },
      ficha_ya_completa: {
        titulo: "This form is already complete",
        texto: "We already received your details for this appointment. Message us on WhatsApp if you need to change something.",
      },
      configuracion: {
        titulo: "This form is not configured",
        texto: "The secure server configuration is incomplete. Message us on WhatsApp while we resolve it.",
      },
      contrato_incompatible: {
        titulo: "This form received an incompatible response",
        texto: "We will not show incomplete appointment details. Message us on WhatsApp while we review it.",
      },
      generico: {
        titulo: "We couldn't load your form",
        texto: "Try again in a moment, or message us on WhatsApp and we'll help you directly.",
      },
      whatsapp: "Message on WhatsApp",
    },
  },
} satisfies Record<Idioma, unknown>;

export function textoCabeceraPendiente(idioma: Idioma, motivo: MotivoConfirmacion) {
  return fichaText[idioma].cabeceraPendiente[motivo ?? "generico"];
}

export function textoFinalPendiente(idioma: Idioma, motivo: MotivoConfirmacion) {
  return fichaText[idioma].final.pendiente[motivo ?? "generico"];
}
