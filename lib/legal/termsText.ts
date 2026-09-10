import type { Language } from "@/lib/i18n/LanguageContext";

export const termsText = {
  es: {
    back: "← Volver al inicio",
    title: "Términos y condiciones",
    updated: "Última actualización: 10 de setiembre de 2026",
    intro: "Estas condiciones explican cómo se separa y confirma una reserva, los adelantos aplicables y cómo coordinamos cambios de fecha.",
    confirmation: {
      title: "Separación y confirmación de la reserva",
      provisional: "Vita Lima puede separar provisionalmente un horario durante un máximo de 30 minutos mientras espera el adelanto. Esta separación provisional no equivale a una reserva confirmada.",
      release: "Si el adelanto no se registra dentro de ese plazo, el horario puede liberarse.",
      confirmed: "La reserva queda confirmada únicamente cuando Vita Lima valida la disponibilidad y registra el adelanto correspondiente.",
    },
    deposits: {
      title: "Adelantos",
      individual: (amount: number) => `Una persona: S/${amount}.`,
      group: "Dos o más personas: 50 % del precio final acordado.",
      home: "Atención a domicilio: 50 % del precio final, incluyendo la movilidad que corresponda.",
      gifts: "Gift Cards o cajas de regalo: 100 % al reservar.",
      programs: "Programas de varias sesiones: 100 % al reservar.",
      balance: "El adelanto se descuenta del precio final.",
    },
    rescheduling: {
      title: "Reprogramaciones",
      timely: "Con 24 horas o más de anticipación, el adelanto se traslada íntegramente a la nueva fecha, sin penalidad y sujeto a disponibilidad.",
      late: "Con menos de 24 horas de anticipación, el adelanto también se conserva y traslada; para confirmar la nueva fecha se cobra una penalidad adicional de S/30.",
    },
    cancellation: {
      title: "Cancelación e inasistencia",
      nonRefundable: "El adelanto no es reembolsable si el cliente cancela definitivamente o no se presenta a la cita confirmada.",
      distinction: "Esta regla no se aplica a una reprogramación tardía: en ese caso se conserva el adelanto y se aplica la penalidad de S/30.",
    },
    tolerance: {
      title: "Tolerancia",
      text: "Se otorgan 15 minutos de tolerancia. Pasado ese tiempo la sesión se realiza igual, pero termina a la hora prevista para no afectar a la cita siguiente.",
    },
    spaCancellation: {
      title: "Cancelación por parte del spa",
      text: "Si Vita Lima Spa no puede atender una cita ya confirmada, el cliente puede elegir entre la devolución total del adelanto o una reprogramación sin costo.",
    },
    conditions: {
      title: "Programas, Gift Cards, promociones y domicilio",
      programs: "Las sesiones de un programa tienen una vigencia de 3 meses desde la fecha de compra, son personales e intransferibles salvo autorización expresa del spa, y una sesión agendada y no cancelada con 24 horas de anticipación se considera utilizada.",
      gifts: "Las promociones, Gift Cards y paquetes pueden tener condiciones y vigencias específicas, que se comunican al momento de la compra.",
      home: "La atención a domicilio está sujeta a cobertura, movilidad y disponibilidad, y requiere coordinación previa.",
    },
    contact: "Las coordinaciones de reservas y cambios de fecha se realizan mediante el WhatsApp oficial de Vita Lima Spa.",
    contactLink: "Escribir por WhatsApp",
  },
  en: {
    back: "← Back to home",
    title: "Terms and conditions",
    updated: "Last updated: September 10, 2026",
    intro: "These terms explain how a booking is held and confirmed, the applicable deposits, and how we coordinate date changes.",
    confirmation: {
      title: "Booking hold and confirmation",
      provisional: "Vita Lima may hold a time slot provisionally for up to 30 minutes while awaiting the deposit. This provisional hold does not mean that the booking is confirmed.",
      release: "If the deposit is not recorded within that period, the time slot may be released.",
      confirmed: "A booking is confirmed only when Vita Lima validates availability and records the applicable deposit.",
    },
    deposits: {
      title: "Deposits",
      individual: (amount: number) => `One person: S/${amount}.`,
      group: "Two or more people: 50% of the agreed final price.",
      home: "At-home service: 50% of the final price, including the applicable travel fee.",
      gifts: "Gift Cards or gift boxes: 100% when booking.",
      programs: "Multi-session programs: 100% when booking.",
      balance: "The deposit is deducted from the final price.",
    },
    rescheduling: {
      title: "Rescheduling",
      timely: "With 24 hours' notice or more, the deposit is transferred in full to the new date, with no penalty and subject to availability.",
      late: "With less than 24 hours' notice, the deposit is also kept and transferred; an additional S/30 penalty is charged to confirm the new date.",
    },
    cancellation: {
      title: "Cancellation and no-shows",
      nonRefundable: "The deposit is non-refundable if the client cancels permanently or does not attend a confirmed appointment.",
      distinction: "This rule does not apply to a late rescheduling: in that case the deposit is kept and the S/30 penalty applies.",
    },
    tolerance: {
      title: "Grace period",
      text: "A 15-minute grace period is granted. After that time, the session still takes place but ends at the scheduled time so it does not affect the following appointment.",
    },
    spaCancellation: {
      title: "Cancellation by the spa",
      text: "If Vita Lima Spa cannot provide a confirmed appointment, the client may choose between a full refund of the deposit or a rescheduling at no cost.",
    },
    conditions: {
      title: "Programs, Gift Cards, promotions and at-home service",
      programs: "Program sessions are valid for 3 months from the date of purchase, are personal and non-transferable unless expressly authorized by the spa, and a scheduled session that is not cancelled at least 24 hours in advance is considered used.",
      gifts: "Promotions, Gift Cards and packages may have specific terms and expiry dates, which are communicated at the time of purchase.",
      home: "At-home service is subject to service-area coverage, travel fees and availability, and requires prior coordination.",
    },
    contact: "Bookings and date changes are coordinated through Vita Lima Spa's official WhatsApp.",
    contactLink: "Message us on WhatsApp",
  },
} as const satisfies Record<Language, unknown>;

export type TermsLanguage = keyof typeof termsText;
