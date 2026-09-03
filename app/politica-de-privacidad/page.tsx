import type { Metadata } from "next";
import Link from "next/link";

/**
 * Política de privacidad alineada con la Ley N.º 29733 (Ley de Protección de
 * Datos Personales del Perú) y su reglamento (D.S. 003-2013-JUS).
 *
 * NOTA PARA EL DUEÑO DEL NEGOCIO: este texto cubre lo que el sitio realmente
 * hace hoy (formulario de reserva, WhatsApp, analítica y mapas bajo
 * consentimiento) y está redactado para ser claro y honesto, pero no
 * sustituye la revisión de un abogado. Antes de publicarlo conviene:
 *  1. Confirmar la razón social y el RUC del titular del banco de datos.
 *  2. Verificar si corresponde inscribir el banco de datos personales ante
 *     la Autoridad Nacional de Protección de Datos Personales.
 *  3. Definir y confirmar el plazo real de conservación de los datos.
 */

export const metadata: Metadata = {
  title: "Política de privacidad | Vita Lima Spa",
  description:
    "Cómo Vita Lima Spa recopila, usa, conserva y protege tus datos personales, y cómo ejercer tus derechos de acceso, rectificación, cancelación y oposición.",
  alternates: { canonical: "/politica-de-privacidad" },
  openGraph: {
    title: "Política de privacidad | Vita Lima Spa",
    description: "Cómo Vita Lima Spa recopila, usa y protege tus datos personales.",
    type: "website",
    url: "/politica-de-privacidad",
    locale: "es_PE",
  },
};

const UPDATED_AT = "3 de setiembre de 2026";

export default function Page() {
  return (
    <main className="legal">
      <Link className="legalBack" href="/">
        ← Volver al inicio
      </Link>

      <h1>Política de privacidad</h1>
      <p className="legalUpdated">Última actualización: {UPDATED_AT}</p>

      <p>
        En Vita Lima Spa tratamos tus datos personales conforme a la Ley N.º 29733, Ley de Protección de Datos
        Personales del Perú, y su reglamento aprobado por Decreto Supremo N.º 003-2013-JUS. Esta política explica qué
        datos recogemos, para qué los usamos, con quién los compartimos, cuánto tiempo los conservamos y cómo puedes
        ejercer tus derechos.
      </p>

      <h2>1. Quién es responsable de tus datos</h2>
      <p>
        El responsable del tratamiento es Vita Lima Spa, con sedes en Av. Aviación 3358, oficina 204, San Borja, y Av.
        Larco 812, oficina 306, Miraflores (Lima, Perú). Para cualquier consulta sobre esta política puedes escribirnos
        a <a href="mailto:info@vitalimaspa.com">info@vitalimaspa.com</a> o al WhatsApp{" "}
        <a href="https://wa.me/51907308415" target="_blank" rel="noreferrer">
          +51 907 308 415
        </a>
        .
      </p>

      <h2>2. Qué datos recogemos</h2>
      <ul>
        <li>
          <strong>Datos que tú nos das.</strong> Al completar el formulario de reserva: nombre, número de WhatsApp,
          correo electrónico si decides incluirlo (es opcional), sede, servicio de interés, fecha y horario preferidos
          y el comentario que escribas. Al escribirnos directamente por WhatsApp, correo o redes sociales: los datos
          que incluyas en ese mensaje.
        </li>
        <li>
          <strong>Datos de uso del sitio.</strong> Si aceptas las cookies, recogemos datos estadísticos de navegación
          a través de Google Analytics: páginas vistas, tiempo de permanencia, tipo de dispositivo y origen de la
          visita. Estos datos se tratan de forma agregada y con la dirección IP anonimizada.
        </li>
      </ul>
      <p>
        No solicitamos ni necesitamos datos sensibles. Te pedimos que no compartas por este medio información de salud,
        documentos de identidad ni datos de tarjetas: si algún servicio requiere una precisión sobre tu estado de
        salud, se conversa directamente con la terapeuta al momento de la sesión.
      </p>

      <h2>3. Para qué usamos tus datos</h2>
      <ul>
        <li>Responder tu solicitud y coordinar contigo la reserva: sede, horario, servicio y condiciones.</li>
        <li>Confirmarte, recordarte o reprogramar una cita ya agendada.</li>
        <li>Atender consultas, reclamos o solicitudes posteriores relacionadas con el servicio.</li>
        <li>
          Entender cómo se usa el sitio para mejorarlo, únicamente en forma estadística y solo si aceptaste las
          cookies.
        </li>
      </ul>
      <p>
        No usamos tus datos para enviarte publicidad salvo que nos autorices expresamente y por separado. No vendemos
        ni cedemos tus datos a terceros con fines comerciales.
      </p>

      <h2>4. Base legal del tratamiento</h2>
      <p>
        El tratamiento se realiza sobre la base de tu consentimiento previo, informado, expreso e inequívoco, que
        otorgas al marcar la casilla de autorización del formulario o al escribirnos voluntariamente. También tratamos
        datos cuando es necesario para ejecutar la relación de servicio que solicitas, y cuando una norma nos obliga a
        conservarlos.
      </p>
      <p>
        Puedes retirar tu consentimiento en cualquier momento escribiéndonos a{" "}
        <a href="mailto:info@vitalimaspa.com">info@vitalimaspa.com</a>. El retiro no afecta la licitud del tratamiento
        realizado antes de esa solicitud.
      </p>

      <h2>5. Con quién compartimos tus datos</h2>
      <p>
        Solo con proveedores que nos permiten prestar el servicio, y siempre limitados a lo necesario:
      </p>
      <ul>
        <li>
          <strong>WhatsApp (Meta Platforms).</strong> La coordinación de reservas ocurre por WhatsApp, de modo que la
          conversación queda alojada en ese servicio conforme a sus propias políticas.
        </li>
        <li>
          <strong>Google Analytics (Google LLC).</strong> Solo si aceptaste las cookies. Recibe datos de navegación
          anonimizados, no tu nombre ni tu número.
        </li>
        <li>
          <strong>Google Maps (Google LLC).</strong> El mapa de cada sede no se carga solo: se inserta únicamente
          cuando pulsas el botón para verlo, y en ese momento Google puede instalar sus propias cookies.
        </li>
        <li>
          <strong>Proveedor de alojamiento web.</strong> El sitio se aloja en un servidor contratado para operar la
          página; el proveedor puede registrar datos técnicos de conexión.
        </li>
      </ul>
      <p>
        Algunos de estos proveedores están ubicados fuera del Perú, por lo que el tratamiento puede implicar un flujo
        transfronterizo de datos personales hacia países que cuentan con los mecanismos de protección exigidos por sus
        propias políticas y por la normativa aplicable.
      </p>

      <h2>6. Cuánto tiempo conservamos tus datos</h2>
      <p>
        Conservamos los datos de una solicitud mientras dure la coordinación y por el tiempo necesario para atender
        consultas o reclamos posteriores relacionados con el servicio, y luego durante los plazos que exija la
        normativa aplicable. Cumplido ese periodo, los eliminamos o los anonimizamos. Si nos pides antes la supresión
        de tus datos, la atendemos salvo que exista una obligación legal de conservarlos.
      </p>

      <h2>7. Tus derechos</h2>
      <p>
        Como titular de los datos puedes ejercer en cualquier momento tus derechos de <strong>acceso</strong> (saber
        qué datos tuyos tenemos), <strong>rectificación</strong> (corregirlos si son inexactos),{" "}
        <strong>cancelación o supresión</strong> (pedir que los eliminemos) y <strong>oposición</strong> (pedir que
        dejemos de tratarlos), además de los derechos de información y de tratamiento objetivo reconocidos por la Ley
        N.º 29733.
      </p>
      <p>
        Para ejercerlos, escríbenos a <a href="mailto:info@vitalimaspa.com">info@vitalimaspa.com</a> indicando tu
        nombre, el número de WhatsApp con el que nos contactaste y qué derecho deseas ejercer. Responderemos dentro de
        los plazos previstos por la normativa. Si consideras que tu solicitud no fue atendida correctamente, puedes
        acudir a la Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia y Derechos
        Humanos.
      </p>

      <h2>8. Cookies</h2>
      <p>
        Al entrar por primera vez te mostramos un aviso donde puedes aceptar o rechazar las cookies que no son
        imprescindibles. Si rechazas, el sitio funciona igual: simplemente no se carga la analítica.
      </p>
      <ul>
        <li>
          <strong>Necesarias.</strong> Guardamos en tu navegador tu decisión sobre las cookies, tu preferencia de
          idioma y los servicios que agregas a &laquo;Mi selección&raquo;. Esta información se queda en tu equipo y no
          la recibimos nosotros.
        </li>
        <li>
          <strong>Analíticas.</strong> Google Analytics, solo con tu aceptación, para entender de forma agregada cómo
          se usa el sitio.
        </li>
        <li>
          <strong>De terceros incrustados.</strong> Google Maps, solo cuando pulsas el botón para abrir el mapa de una
          sede.
        </li>
      </ul>
      <p>
        Puedes cambiar de opinión en cualquier momento borrando los datos de sitio de tu navegador para vitalimaspa.com:
        el aviso volverá a aparecer en tu siguiente visita.
      </p>

      <h2>9. Seguridad</h2>
      <p>
        Aplicamos medidas razonables para proteger la información que nos entregas, y limitamos el acceso a las
        personas del equipo que necesitan usarla para coordinar tu reserva. Ningún sistema es infalible: si detectamos
        un incidente que afecte tus datos, actuaremos conforme a la normativa vigente.
      </p>

      <h2>10. Menores de edad</h2>
      <p>
        Nuestros servicios están dirigidos a personas mayores de edad. Las reservas para menores deben ser gestionadas
        y autorizadas por su padre, madre o apoderado.
      </p>

      <h2>11. Cambios en esta política</h2>
      <p>
        Si modificamos esta política, actualizaremos la fecha del encabezado. Te recomendamos revisarla cada cierto
        tiempo. Los cambios sustanciales en la finalidad del tratamiento se comunicarán y, cuando corresponda,
        solicitaremos tu consentimiento nuevamente.
      </p>

      <p className="legalFootNote">
        Si tienes cualquier duda sobre cómo tratamos tu información, escríbenos a{" "}
        <a href="mailto:info@vitalimaspa.com">info@vitalimaspa.com</a>. Puedes revisar también nuestros{" "}
        <Link href="/terminos-y-condiciones">términos y condiciones</Link>.
      </p>
    </main>
  );
}
