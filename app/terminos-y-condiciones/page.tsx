import type { Metadata } from "next";
import Link from "next/link";
import { ADELANTO_INDIVIDUAL } from "@/content/deposits";

export const metadata: Metadata = {
  title: "Términos y condiciones | Vita Lima Spa",
  description:
    "Condiciones de reserva, adelantos, cancelaciones, reprogramación, promociones, Gift Cards y servicios a domicilio de Vita Lima Spa.",
  alternates: { canonical: "/terminos-y-condiciones" },
  openGraph: {
    title: "Términos y condiciones | Vita Lima Spa",
    description: "Condiciones de reserva, adelantos y cancelaciones de Vita Lima Spa.",
    type: "website",
  },
};

/**
 * La política de adelantos que se publica aquí es la que aplica el negocio, y
 * tiene que estar visible ANTES de que se cobre el primer adelanto: es la
 * condición que hace exigible la parte de "no hay devolución".
 *
 * El monto del adelanto individual sale de content/deposits.ts para que el
 * texto legal y lo que calcula el carrito no puedan desalinearse.
 */
export default function Page() {
  return (
    <main className="legal">
      <Link href="/">← Volver</Link>
      <h1>Términos y condiciones</h1>

      <h2>Confirmación de la reserva</h2>
      <p>
        La solicitud enviada desde la web o por WhatsApp no reserva el horario por sí sola. La cita
        queda agendada únicamente cuando Vita Lima Spa confirma la disponibilidad y se registra el
        adelanto correspondiente. La constancia del pago es lo que confirma la reserva.
      </p>

      <h2>Adelantos</h2>
      <ul>
        <li>
          Sesiones individuales, faciales y servicios de mirada y belleza: <strong>S/{ADELANTO_INDIVIDUAL}</strong>{" "}
          por servicio.
        </li>
        <li>
          Reservas para dos o más personas, y paquetes para dos: <strong>50 % del precio</strong>.
        </li>
        <li>
          Masajes a domicilio, programas de varias sesiones y cajas de regalo: se abonan{" "}
          <strong>por el total</strong> al reservar.
        </li>
      </ul>
      <p>
        El adelanto se descuenta del precio final. El saldo se paga en el local el día de la cita.
        Los medios de pago del adelanto son Yape, Plin o transferencia bancaria, a la cuenta que se
        indica al confirmar la cita.
      </p>

      <h2>Reprogramación</h2>
      <p>
        La cita puede reprogramarse avisando con al menos <strong>24 horas</strong> de anticipación.
        En ese caso el adelanto se traslada íntegro a la nueva fecha, sujeta a disponibilidad.
      </p>

      <h2>Cancelación e inasistencia</h2>
      <p>
        <strong>El adelanto no es reembolsable.</strong> Si la reserva se cancela, o si la persona no
        se presenta a la cita confirmada, el adelanto no se devuelve: cubre el horario y al personal
        que quedaron reservados y no pudieron asignarse a otra cita.
      </p>

      <h2>Tolerancia</h2>
      <p>
        Se otorgan <strong>15 minutos</strong> de tolerancia. Pasado ese tiempo la sesión se realiza
        igual, pero termina a la hora prevista para no afectar a la cita siguiente.
      </p>

      <h2>Cancelación por parte del spa</h2>
      <p>
        Si Vita Lima Spa no puede atender una cita ya confirmada, se devuelve el 100 % del adelanto o
        se reprograma sin costo, a elección de la persona.
      </p>

      <h2>Programas, Gift Cards y promociones</h2>
      <p>
        Las sesiones de un programa tienen una vigencia de <strong>3 meses</strong> desde la fecha de
        compra, son personales e intransferibles salvo autorización expresa del spa, y una sesión
        agendada y no cancelada con 24 horas de anticipación se considera utilizada. Las promociones,
        Gift Cards y paquetes pueden tener condiciones y vigencias específicas, que se comunican al
        momento de la compra.
      </p>

      <h2>Servicios a domicilio</h2>
      <p>
        Están sujetos a cobertura, recargo y disponibilidad, y requieren reserva previa. Se abonan
        por el total al reservar.
      </p>
    </main>
  );
}
