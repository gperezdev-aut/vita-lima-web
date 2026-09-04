/**
 * Guías de `/guias`. Contenido editorial pensado para responder lo que la
 * gente busca ANTES de decidir reservar, y para enlazar desde ahí a la página
 * del servicio que resuelve esa duda.
 *
 * Origen: el blog del sitio antiguo en Wix tenía 13 artículos. Seis se
 * rescataron aquí (reescritos donde hacía falta) y el resto redirige a la guía
 * o al servicio más cercano — ver los `redirects()` de `next.config.ts`.
 *
 * REGLA DE CONTENIDO, importante: nada aquí promete resultados médicos,
 * terapéuticos ni estéticos medibles. Vita Lima Spa es un centro de masajes y
 * bienestar, no un establecimiento de salud. Los artículos originales del blog
 * sí hacían ese tipo de promesas (la reflexología "estimula el sistema
 * inmunológico y equilibra hormonas", los masajes reductores "reducen
 * medidas"); al reescribirlos se conservó lo útil y se quitó lo que no se
 * puede sostener. Cualquier guía nueva debe mantener ese criterio.
 *
 * Las guías están solo en español, igual que /empresas y /regalos: no hay
 * versión bajo /en. Ver `UNTRANSLATED_PATHS` en lib/i18n/routes.ts.
 */

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "note"; text: string };

export type Guide = {
  slug: string;
  title: string;
  /** Frase de entrada, se usa también como meta description. */
  summary: string;
  /** Fecha de publicación o de última revisión, en ISO. */
  date: string;
  /** Minutos de lectura aproximados. */
  readingMinutes: number;
  image: string;
  body: GuideBlock[];
  /** Slugs de servicios que responden lo que plantea la guía. */
  relatedServices: string[];
  /** Slugs de otras guías. */
  relatedGuides: string[];
};

export const guides: Guide[] = [
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "masaje-relajante-o-descontracturante",
    title: "Relajante o descontracturante: cuál te toca hoy",
    summary:
      "La duda más común antes de reservar. La diferencia no es cuánto aprieta la terapeuta, sino qué está buscando resolver.",
    date: "2026-09-04",
    readingMinutes: 4,
    image: "/images/alivio-integral/alivio-01-hombros.webp",
    body: [
      {
        type: "p",
        text: "Es la pregunta que más nos llega por WhatsApp, y casi siempre viene con la misma sospecha detrás: que el descontracturante es 'el bueno' y el relajante es la versión suave para quien no aguanta. No es así. Son dos trabajos distintos, y elegir mal es lo que hace que alguien salga pensando que el masaje no le sirvió.",
      },
      { type: "h2", text: "El relajante trabaja el sistema nervioso" },
      {
        type: "p",
        text: "Usa maniobras largas, continuas, con presión media y un ritmo parejo. No se detiene en los nudos: los pasa por encima. El objetivo es que el cuerpo baje revoluciones, y por eso mucha gente se queda dormida a los veinte minutos.",
      },
      {
        type: "p",
        text: "Sirve cuando lo que traes es cansancio general, semanas largas, dormir mal, la cabeza que no para. No cuando tienes una zona puntual que duele hace un mes.",
      },
      { type: "h2", text: "El descontracturante trabaja el músculo" },
      {
        type: "p",
        text: "La presión es más firme y, sobre todo, se detiene. La terapeuta encuentra la zona contracturada y vuelve sobre ella con presión sostenida hasta que cede. Se siente intenso, y es normal que la zona quede algo sensible al día siguiente, parecido a después de entrenar.",
      },
      {
        type: "p",
        text: "Sirve cuando puedes señalar con el dedo dónde molesta: el cuello de las ocho horas de laptop, la lumbar de manejar, los hombros de entrenar.",
      },
      { type: "h2", text: "La regla corta" },
      {
        type: "ul",
        items: [
          "¿Puedes señalar el punto exacto que molesta? Descontracturante.",
          "¿Es un cansancio general que no sabes ubicar? Relajante.",
          "¿Las dos cosas? Existe la sesión que combina ambos: Alivio Integral cubre el cuerpo completo con presión profunda, y Deep Balance 120 alterna las dos técnicas en dos horas.",
          "¿No estás seguro? Terapia Vita se arma en el momento según lo que traigas, después de una conversación breve con la terapeuta.",
        ],
      },
      { type: "h2", text: "Sobre la intensidad" },
      {
        type: "p",
        text: "En cualquiera de los dos, la referencia es la misma: si tienes que aguantar la respiración, es demasiado. Dilo en el momento y la terapeuta ajusta. Un masaje que te deja tenso de aguantar el dolor no está cumpliendo su función.",
      },
      {
        type: "note",
        text: "Si tienes una lesión diagnosticada, una cirugía reciente o alguna indicación médica, coméntalo antes de empezar. El masaje es un servicio de bienestar, no un tratamiento médico, y en algunos casos la terapeuta te va a recomendar consultar primero con tu especialista.",
      },
    ],
    relatedServices: ["relax-vital", "alivio-integral", "terapia-vita", "espalda-libre"],
    relatedGuides: ["el-masaje-tiene-que-doler", "cada-cuanto-hacerse-un-masaje"],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "primera-vez-masaje-que-esperar",
    title: "Tu primer masaje: qué esperar, paso a paso",
    summary:
      "Qué pasa desde que tocas la puerta hasta que sales. Sin sorpresas, para que la primera vez no se te vaya en estar pendiente de si lo estás haciendo bien.",
    date: "2026-09-04",
    readingMinutes: 5,
    image: "/images/sede-san-borja/san-borja-03.webp",
    body: [
      {
        type: "p",
        text: "Mucha gente posterga su primer masaje por cosas que nadie le explicó: si hay que desvestirse del todo, si se puede hablar, qué pasa si le da vergüenza. Nada de eso es complicado, pero saberlo de antemano cambia la experiencia, porque llegas a relajarte en vez de a averiguar.",
      },
      { type: "h2", text: "Antes de llegar" },
      {
        type: "ul",
        items: [
          "Llega cinco o diez minutos antes. Entrar corriendo se nota en el cuerpo durante los primeros veinte minutos de sesión.",
          "Evita comer pesado justo antes. Estar boca abajo una hora con el estómago lleno no es cómodo.",
          "Si vienes de entrenar, una ducha antes ayuda — pero si no alcanzas, tampoco es impedimento.",
        ],
      },
      { type: "h2", text: "Al llegar" },
      {
        type: "p",
        text: "Te reciben en recepción, dejas tus cosas en la sala y la terapeuta te hace unas preguntas cortas: qué zonas te molestan, si tienes alguna lesión, si prefieres más o menos presión. Ese minuto de conversación es el que define la sesión, así que vale la pena ser concreto.",
      },
      { type: "h2", text: "La ropa" },
      {
        type: "p",
        text: "Te quedas en ropa interior, o te damos ropa desechable si la prefieres. En todo momento estás cubierto con una toalla y solo se descubre la zona que se está trabajando. La terapeuta sale de la sala mientras te acomodas, y toca la puerta antes de entrar.",
      },
      {
        type: "p",
        text: "Si hay alguna zona que prefieres que no se toque, dilo. Es completamente normal y no hace falta explicar por qué.",
      },
      { type: "h2", text: "Durante" },
      {
        type: "p",
        text: "Puedes hablar o no hablar. Hay quien conversa toda la hora y quien no dice una palabra; las dos cosas están bien. Lo único que sí conviene decir es si algo incomoda: si la presión es mucha, si tienes frío, si la posición te molesta. La terapeuta no puede adivinarlo.",
      },
      {
        type: "p",
        text: "Es normal que el estómago suene, que te dé sueño o que te quedes dormido. También es normal que en algún momento se te escape un suspiro largo. Nada de eso llama la atención de nadie que trabaje en un spa.",
      },
      { type: "h2", text: "Al terminar" },
      {
        type: "p",
        text: "Tómate un par de minutos antes de pararte, sobre todo si te quedaste dormido. Toma agua. Y si puedes, no agendes nada exigente justo después: el efecto se aprovecha mucho más si el resto del día va lento.",
      },
      {
        type: "p",
        text: "Si es tu primera vez y no sabes qué reservar, Relax Vital es el punto de entrada: una hora, cuerpo completo, presión media y reflexología podal al final.",
      },
    ],
    relatedServices: ["relax-vital", "espalda-libre", "reflexologia"],
    relatedGuides: ["masaje-relajante-o-descontracturante", "el-masaje-tiene-que-doler"],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "el-masaje-tiene-que-doler",
    title: "¿El masaje tiene que doler para que funcione?",
    summary:
      "El mito de «si no duele, no sirve» es viejo y hace daño. Un masaje que te deja aguantando la respiración no está trabajando mejor: está trabajando mal.",
    date: "2026-09-04",
    readingMinutes: 3,
    image: "/images/relax-vital/relax-02-pressure.webp",
    body: [
      {
        type: "p",
        text: "Si alguna vez pensaste que «si no duele, no funciona», vale la pena romper con esa idea. Es de las creencias más extendidas sobre el masaje y también de las que más gente aleja de la camilla.",
      },
      { type: "h2", text: "El dolor no es medida de eficacia" },
      {
        type: "p",
        text: "Un masaje busca soltar tensión y ayudarte a descansar. Nada de eso requiere que lo pases mal. De hecho, cuando la presión pasa cierto umbral el cuerpo hace lo contrario de lo que se busca: se contrae para defenderse. Terminas más tenso que cuando entraste.",
      },
      { type: "h2", text: "Cuándo sí es normal sentir molestia" },
      {
        type: "p",
        text: "En un descontracturante, al trabajar sobre una zona muy cargada, es esperable sentir una presión intensa. Hay una diferencia entre eso y el dolor: la presión intensa se puede respirar. El dolor no.",
      },
      {
        type: "p",
        text: "Esa es la referencia práctica y sirve para cualquier sesión: si estás conteniendo la respiración o apretando los puños, es demasiado. Y decirlo no arruina nada — la terapeuta prefiere mil veces que hables a que aguantes.",
      },
      { type: "h2", text: "Cómo saber si el masaje es el adecuado para ti" },
      {
        type: "ul",
        items: [
          "Habla al inicio y durante. Es la única forma de que la presión se ajuste a ti.",
          "El objetivo es alivio, no resistencia. Salir adolorido de la sesión no es señal de que funcionó.",
          "Distintos masajes, distintas intensidades. El relajante es fluido y parejo; el terapéutico aplica más presión en puntos concretos, pero sin llegar al dolor.",
        ],
      },
      {
        type: "p",
        text: "Si en algún momento evitaste reservar por miedo a pasarla mal, esto es lo que hay que saber: la sesión se adapta a ti, no al revés.",
      },
    ],
    relatedServices: ["relax-vital", "alivio-integral", "terapia-vita"],
    relatedGuides: ["masaje-relajante-o-descontracturante", "primera-vez-masaje-que-esperar"],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "beneficios-del-masaje-relajante",
    title: "Qué hace realmente un masaje relajante",
    summary:
      "Más allá de la hora agradable: qué cambia en el cuerpo, cuánto dura el efecto y para qué tipo de cansancio sirve de verdad.",
    date: "2026-09-04",
    readingMinutes: 4,
    image: "/images/main-hero/hero-01-masaje-relajante.webp",
    body: [
      {
        type: "p",
        text: "El masaje relajante usa movimientos largos y rítmicos, con presión media y constante, sobre todo el cuerpo. Suena simple, y lo es. Lo interesante es lo que pasa mientras: el ritmo repetido y previsible le da al sistema nervioso permiso para bajar la guardia, que es algo que en un día normal casi nunca ocurre.",
      },
      { type: "h2", text: "Lo que se siente durante y después" },
      {
        type: "ul",
        items: [
          "Menos tensión acumulada, sobre todo en espalda, cuello y hombros, que es donde se concentra el trabajo de escritorio.",
          "Sensación de calor y circulación en las zonas trabajadas.",
          "Sueño más profundo esa noche. Es de los efectos que más nos comentan al día siguiente.",
          "Una calma que dura horas, no minutos: mucha gente describe el resto del día como «más lento».",
        ],
      },
      { type: "h2", text: "Para qué tipo de cansancio sirve" },
      {
        type: "p",
        text: "Funciona bien con el cansancio difuso, ese que no se ubica en un punto: semanas largas, tráfico, pantallas, dormir mal. Si en cambio tienes una zona concreta que duele desde hace semanas, el descontracturante va a rendir más.",
      },
      { type: "h2", text: "Cuánto dura el efecto" },
      {
        type: "p",
        text: "La sensación inmediata dura entre uno y tres días. La diferencia real aparece con continuidad: una sesión suelta cada varios meses se disfruta, pero no cambia mucho; una cada dos o tres semanas sí sostiene la espalda distinta. Por eso existen los programas de 5 y 10 sesiones, que bajan bastante el precio por visita.",
      },
      {
        type: "note",
        text: "El masaje es un servicio de bienestar. Acompaña el descanso y ayuda a soltar tensión muscular, pero no reemplaza atención médica ni fisioterapia. Si tienes dolor persistente, consulta con un profesional de la salud.",
      },
      { type: "h2", text: "Dónde" },
      {
        type: "p",
        text: "Atendemos en San Borja (Av. Aviación 3358, oficina 204) y en Miraflores (Av. Larco 812, oficina 306). En San Borja está el catálogo completo; Miraflores trabaja con reserva previa y es la más cómoda si te hospedas por la zona.",
      },
    ],
    relatedServices: ["relax-vital", "balance-plus", "programa-relajante-5-sesiones", "aroma-zen"],
    relatedGuides: ["masaje-relajante-o-descontracturante", "cada-cuanto-hacerse-un-masaje"],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "que-es-la-reflexologia-podal",
    title: "Qué es la reflexología podal (y qué esperar de ella)",
    summary:
      "Una técnica de presión sobre puntos del pie, con siglos de tradición detrás. Qué se siente, para quién funciona bien y qué conviene no esperar.",
    date: "2026-09-04",
    readingMinutes: 4,
    image: "/images/main-hero/hero-03-reflexologia-podal.webp",
    body: [
      {
        type: "p",
        text: "La reflexología podal aplica presión firme y sostenida sobre puntos concretos del pie: planta, arco, empeine, dedos y tobillo. Es una práctica de tradición antigua —se le rastrea en la medicina china y en la egipcia— que hoy se ofrece en spas de todo el mundo como técnica de relajación.",
      },
      { type: "h2", text: "Cómo se siente" },
      {
        type: "p",
        text: "Distinto a un masaje corporal. No hay deslizamiento largo: la terapeuta se detiene en un punto, mantiene la presión unos segundos y pasa al siguiente. Al principio algunas zonas pueden sentirse sensibles, y esa sensibilidad suele bajar en la misma sesión.",
      },
      {
        type: "p",
        text: "No da cosquillas, aunque mucha gente lo teme. Las cosquillas las produce el roce ligero, no la presión firme, y por eso la terapeuta trabaja con presión sostenida desde el primer momento.",
      },
      { type: "h2", text: "Para quién funciona bien" },
      {
        type: "ul",
        items: [
          "Para quien pasa el día de pie o caminando mucho.",
          "Para quien tiene poco tiempo: media hora alcanza para recorrer el pie completo.",
          "Para quien prefiere no desvestirse — solo se descubren los pies.",
          "Como primera experiencia, si un masaje de cuerpo completo te parece demasiado.",
        ],
      },
      { type: "h2", text: "Qué esperar, y qué no" },
      {
        type: "p",
        text: "Lo que la gente describe después de una sesión es concreto: pies descansados, sensación de ligereza en las piernas y una calma general que ayuda a dormir mejor esa noche.",
      },
      {
        type: "p",
        text: "Conviene ser claro con lo otro: vas a encontrar mucho material en internet que le atribuye a la reflexología efectos sobre órganos, hormonas o el sistema inmunológico. Nosotros no la ofrecemos con esas promesas. La ofrecemos por lo que sí sostiene: es una técnica de relajación profunda que se siente muy bien y que a mucha gente le resulta más efectiva que un masaje convencional para desconectar.",
      },
      {
        type: "note",
        text: "Ante cualquier diagnóstico de pie —fascitis, espolón, neuropatía— o si estás embarazada, consulta primero con tu médico y coméntalo al reservar.",
      },
      { type: "h2", text: "En Vita Lima" },
      {
        type: "p",
        text: "La sesión estándar es de 30 minutos. La versión Plus, de 45, permite volver dos o tres veces sobre los puntos más sensibles y suma trabajo de tobillo y pantorrilla baja. Además, varios de nuestros masajes de una hora ya cierran con reflexología incluida.",
      },
    ],
    relatedServices: ["reflexologia", "reflexologia-plus", "relax-vital", "alivio-integral"],
    relatedGuides: ["primera-vez-masaje-que-esperar", "beneficios-del-masaje-relajante"],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "masaje-prenatal-cuando-si",
    title: "Masaje prenatal: cuándo sí, cuándo no y cómo es la sesión",
    summary:
      "El embarazo carga la espalda baja, la cadera y las piernas. El masaje prenatal ayuda con eso, pero tiene reglas claras — empezando por la autorización de tu médico.",
    date: "2026-09-04",
    readingMinutes: 4,
    image: "/images/servicios/servicio-04.webp",
    body: [
      {
        type: "p",
        text: "Durante el embarazo el cuerpo cambia semana a semana: aumenta el peso, se desplaza el centro de gravedad y la curva lumbar se acentúa. El resultado más común es una espalda baja cargada, cadera molesta y piernas cansadas. El masaje prenatal está pensado exactamente para eso.",
      },
      { type: "h2", text: "Lo primero: pregúntale a tu médico" },
      {
        type: "p",
        text: "Esto no es una formalidad. Hay situaciones en las que el masaje no corresponde —embarazo de riesgo, presión alta, sangrado, indicación de reposo— y solo tu médico puede evaluarlas. Consúltalo antes de reservar y cuéntanos cualquier indicación que te haya dado.",
      },
      {
        type: "p",
        text: "Lo habitual es que se autorice a partir del segundo trimestre, pero la referencia siempre es tu especialista, no una regla general de internet.",
      },
      { type: "h2", text: "Cómo es la sesión" },
      {
        type: "p",
        text: "Se trabaja en posición lateral, con cojines de soporte que sostienen la barriga, la pierna de arriba y la cabeza. No boca abajo, y no boca arriba de forma prolongada.",
      },
      {
        type: "p",
        text: "La presión es suave y constante, con foco en lumbares, cadera, piernas y hombros. Se evitan las zonas y maniobras que no corresponden en gestación. Y el ritmo lo marcas tú: si necesitas cambiar de posición, sentarte, ir al baño o parar un momento, se hace sin problema.",
      },
      { type: "h2", text: "Detalles prácticos" },
      {
        type: "ul",
        items: [
          "Usamos productos sin aroma fuerte: el olfato suele estar mucho más sensible.",
          "La sesión dura una hora, y se puede acortar si te resulta largo.",
          "Puedes venir acompañada; quien te acompañe espera en recepción o reserva su propia sesión en paralelo.",
          "Está disponible en paquete de 2 sesiones por S/ 128.",
        ],
      },
      {
        type: "note",
        text: "El masaje prenatal es un servicio de bienestar orientado al descanso y al alivio de la tensión muscular. No trata ni previene ninguna condición del embarazo, y no sustituye el control obstétrico ni la fisioterapia.",
      },
    ],
    relatedServices: ["masaje-prenatal", "reflexologia", "espalda-libre"],
    relatedGuides: ["primera-vez-masaje-que-esperar", "masaje-relajante-o-descontracturante"],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "bajar-el-estres-sin-formulas-magicas",
    title: "Bajar el estrés sin fórmulas mágicas",
    summary:
      "Tres cosas que sí se sostienen en el tiempo, sin apps ni retiros de fin de semana. Una de ellas la puedes empezar hoy en cinco minutos.",
    date: "2026-09-04",
    readingMinutes: 4,
    image: "/images/signature/ambience.webp",
    body: [
      {
        type: "p",
        text: "El estrés sostenido se nota primero en el cuerpo: la mandíbula apretada, los hombros subidos, el sueño que no repara. Y casi siempre llega antes de que uno se dé cuenta de que está estresado.",
      },
      {
        type: "p",
        text: "No hay una solución única, pero sí hay cosas que funcionan por acumulación. Estas tres son las que más rinden por el esfuerzo que cuestan.",
      },
      { type: "h2", text: "1. Cinco minutos, no treinta" },
      {
        type: "p",
        text: "Casi todo el mundo que intenta meditar empieza por veinte o treinta minutos, se aburre a los tres días y lo abandona. Empieza por cinco. Sentado, con los ojos cerrados, siguiendo la respiración y volviendo a ella cada vez que la cabeza se va —que se va a ir, todo el tiempo, y eso no es fallar—.",
      },
      {
        type: "p",
        text: "Cinco minutos todos los días rinden mucho más que media hora los domingos. Al mes puedes subir a diez si te nace.",
      },
      { type: "h2", text: "2. Moverse, aunque sea caminar" },
      {
        type: "p",
        text: "No hace falta gimnasio. Caminar treinta minutos sin audífonos, mirando la calle, es de lo más subestimado que hay. El cuerpo descarga tensión moviéndose; si el día entero transcurre entre una silla y un auto, esa tensión no tiene por dónde salir.",
      },
      { type: "h2", text: "3. Soltar la tensión que ya está acumulada" },
      {
        type: "p",
        text: "Meditar y caminar ayudan a que no se acumule más. Pero lo que ya está —esos hombros que llevan meses subidos— cuesta soltarlo solo. Ahí es donde entra el masaje: una hora en la que el cuerpo recibe en vez de sostener.",
      },
      {
        type: "p",
        text: "El efecto no es solo del momento. Muchas personas nos dicen que lo que más notan es el sueño de esa noche, que es justo lo que el estrés sostenido suele arruinar primero.",
      },
      {
        type: "note",
        text: "Si el estrés se volvió constante, te cuesta funcionar en el día a día o notas síntomas que te preocupan, vale la pena hablarlo con un profesional de salud mental. El masaje acompaña, no reemplaza.",
      },
    ],
    relatedServices: ["relax-vital", "aroma-zen", "sacro-craneal", "programa-relajante-5-sesiones"],
    relatedGuides: ["beneficios-del-masaje-relajante", "cada-cuanto-hacerse-un-masaje"],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "que-es-la-bambuterapia",
    title: "Qué es la bambuterapia y cómo se siente",
    summary:
      "Cañas de bambú de distintos grosores en vez de manos, para presión profunda y pareja. Qué la distingue y para quién funciona.",
    date: "2026-09-04",
    readingMinutes: 3,
    image: "/images/servicios/servicio-02.webp",
    body: [
      {
        type: "p",
        text: "En la bambuterapia la terapeuta reemplaza parte del trabajo manual por cañas de bambú de varios diámetros. Suena raro la primera vez que uno lo escucha, y se entiende mejor al probarlo: la caña permite sostener una presión profunda y pareja que con las manos costaría mantener durante toda la sesión.",
      },
      { type: "h2", text: "Cómo se siente" },
      {
        type: "p",
        text: "Más rítmico que un masaje convencional. Son deslizamientos largos y firmes sobre la piel aceitada, alternados con trabajo manual en los puntos que piden más detalle. La presión es constante, sin los picos y valles que tiene la mano.",
      },
      {
        type: "p",
        text: "Cubre bien las zonas grandes —muslos, glúteos, espalda— que son justamente donde un masaje manual suele quedarse corto por cansancio de la terapeuta.",
      },
      { type: "h2", text: "Para quién" },
      {
        type: "ul",
        items: [
          "Para quien busca presión profunda y sostenida.",
          "Para quien hace deporte y tiene las piernas cargadas.",
          "Para quien ya probó el masaje clásico y quiere algo distinto.",
        ],
      },
      { type: "h2", text: "Sobre el «modelado corporal»" },
      {
        type: "p",
        text: "La bambuterapia aparece mucho en protocolos de modelado y de reducción de medidas. Vale la pena ser honestos: nosotros la ofrecemos como lo que es, una técnica de masaje con efecto de drenaje y activación circulatoria que se siente muy bien. No prometemos reducción de medidas ni resultados estéticos medibles, porque eso depende de alimentación, actividad física y factores que un masaje no controla.",
      },
      {
        type: "p",
        text: "Si alguien te promete centímetros con solo masajes, desconfía.",
      },
      { type: "h2", text: "Dónde encontrarla" },
      {
        type: "p",
        text: "Existe como sesión propia de 60 minutos, y también forma parte de las experiencias Respira, Renova y Bioenergético Oriental.",
      },
    ],
    relatedServices: ["bambuterapia", "respira", "renova", "bioenergetico-oriental"],
    relatedGuides: ["masaje-relajante-o-descontracturante", "piedras-calientes-para-quien"],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "piedras-calientes-para-quien",
    title: "Piedras calientes: qué son y por qué cambian el masaje",
    summary:
      "El calor abre el músculo antes de que la terapeuta insista con las manos. Eso hace que la presión llegue más profundo y se sienta menos brusca.",
    date: "2026-09-04",
    readingMinutes: 3,
    image: "/images/balance-plus/balance-01-piedras-calientes.webp",
    body: [
      {
        type: "p",
        text: "Son piedras de basalto, una roca volcánica que retiene el calor mucho tiempo. Se calientan a temperatura controlada y la terapeuta las apoya y desliza sobre la espalda, alternando con trabajo de manos entre pasada y pasada.",
      },
      { type: "h2", text: "Por qué funcionan" },
      {
        type: "p",
        text: "El calor hace que el músculo ceda antes. Eso tiene una consecuencia práctica que se nota enseguida: la presión se siente más suave de lo que en realidad es, y a la vez llega más profundo. Es la razón por la que las piedras son la opción favorita de quien tiene la espalda dura pero no tolera bien un descontracturante fuerte.",
      },
      { type: "h2", text: "Preguntas que siempre nos hacen" },
      {
        type: "ul",
        items: [
          "¿Queman? No. La terapeuta prueba el contacto sobre su propia mano y sobre tu piel antes de dejarlas apoyadas. Si las sientes muy calientes, se retiran en el momento.",
          "¿Se usan en todo el cuerpo? Sobre todo en la espalda, que es donde más rinde el calor.",
          "¿Hay casos en que no conviene? Sí: problemas circulatorios, várices marcadas, piel muy sensible o embarazo. Coméntalo al reservar y te sugerimos otra opción.",
        ],
      },
      { type: "h2", text: "En qué sesiones vienen" },
      {
        type: "p",
        text: "Existen como sesión propia de 60 minutos, y están incluidas en Balance Plus, Deep Balance 120, Coco Premium y en la mayoría de las experiencias para dos.",
      },
      {
        type: "p",
        text: "Un dato de estación: en los meses de humedad en Lima son de lo más pedido, y tiene sentido. El frío húmedo tensa el cuerpo de una forma que el calor seco de las piedras compensa bien.",
      },
    ],
    relatedServices: ["piedras-calientes", "balance-plus", "deep-balance-120", "relax"],
    relatedGuides: ["que-es-la-bambuterapia", "masaje-relajante-o-descontracturante"],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "cada-cuanto-hacerse-un-masaje",
    title: "¿Cada cuánto conviene hacerse un masaje?",
    summary:
      "Depende de para qué. No es lo mismo darse un gusto de vez en cuando que trabajar una zona que se carga siempre.",
    date: "2026-09-04",
    readingMinutes: 3,
    image: "/images/signature/room-stone.webp",
    body: [
      {
        type: "p",
        text: "No hay una frecuencia correcta para todo el mundo. Hay tres situaciones distintas y cada una tiene su ritmo.",
      },
      { type: "h2", text: "Si es para darte un gusto" },
      {
        type: "p",
        text: "Una vez al mes o cada dos meses está perfecto. No busca resolver nada: busca que tengas una hora tuya. En ese caso conviene elegir la sesión por lo que te apetezca ese día más que por criterio técnico.",
      },
      { type: "h2", text: "Si tienes una zona que se carga siempre" },
      {
        type: "p",
        text: "Aquí la frecuencia sí cambia el resultado. Un descontracturante suelto cada seis meses se siente bien un par de días y después la zona vuelve a donde estaba. Lo que funciona es continuidad: cada una o dos semanas al principio, y luego espaciar a cada tres o cuatro cuando la zona se estabiliza.",
      },
      {
        type: "p",
        text: "Es exactamente para eso que existen los programas de sesiones: el precio por visita baja bastante y permite sostener el ritmo sin que se vuelva un gasto que uno postergue.",
      },
      { type: "h2", text: "Si estás en una temporada intensa" },
      {
        type: "p",
        text: "Cierre de mes, mudanza, exámenes, un proyecto largo. Ahí una sesión semanal durante esas semanas rinde mucho, y después se vuelve al ritmo normal. No hay que sostenerlo para siempre.",
      },
      { type: "h2", text: "Una señal práctica" },
      {
        type: "p",
        text: "Si llegas a la camilla y la terapeuta encuentra la zona exactamente igual de dura que la última vez, pasó demasiado tiempo. Si la encuentra notoriamente mejor, vas bien.",
      },
      {
        type: "note",
        text: "Si una zona duele de forma persistente, se irradia o te limita el movimiento, no es un tema de frecuencia de masajes: consulta con un profesional de la salud.",
      },
    ],
    relatedServices: [
      "programa-terapia-muscular-5-sesiones",
      "programa-relajante-5-sesiones",
      "alivio-integral",
      "espalda-libre",
    ],
    relatedGuides: ["masaje-relajante-o-descontracturante", "beneficios-del-masaje-relajante"],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "como-regalar-un-masaje",
    title: "Cómo regalar un masaje sin equivocarte",
    summary:
      "Gift card, sesión reservada o caja de regalo: cuál conviene según cuánto sepas de la persona y del calendario.",
    date: "2026-09-04",
    readingMinutes: 3,
    image: "/images/relax/relax-03-vino-o-infusion.webp",
    body: [
      {
        type: "p",
        text: "Regalar un masaje sale bien casi siempre, pero hay una forma de arruinarlo: elegir la modalidad equivocada. Estas son las tres y cuándo va cada una.",
      },
      { type: "h2", text: "Si no sabes qué día puede ir: gift card" },
      {
        type: "p",
        text: "Es la opción más segura. La persona elige el servicio y la fecha cuando le acomode. Sirve para quien tiene agenda impredecible, para quien vive lejos o simplemente cuando no quieres preguntar y arruinar la sorpresa.",
      },
      { type: "h2", text: "Si ya sabes la fecha: sesión reservada" },
      {
        type: "p",
        text: "Los servicios Para Regalar de 60 y 80 minutos vienen con oso de peluche y bebida incluidos, que se entregan el día de la cita. Se reservan a nombre de la otra persona: nos das su nombre, coordinamos con ella y llega a una sesión que ya está pagada.",
      },
      {
        type: "p",
        text: "Es más lindo de recibir que un voucher, porque hay algo físico y una fecha concreta.",
      },
      { type: "h2", text: "Si quieres que se vea: caja de regalo" },
      {
        type: "p",
        text: "Tenemos cajas —Clásico, Suculentas, Flores, Vino, Wellness— que combinan la sesión con un detalle presentado. Es lo que conviene cuando el regalo se entrega delante de gente: cumpleaños, aniversario, Día de la Madre.",
      },
      {
        type: "note",
        text: "Las cajas físicas necesitan coordinación previa. Si estás sobre la fecha, avísanos por WhatsApp y vemos qué alcanza.",
      },
      { type: "h2", text: "Dos consejos que evitan errores" },
      {
        type: "ul",
        items: [
          "Si la persona nunca se hizo un masaje, no regales la sesión más intensa del catálogo. Relax Vital o una experiencia para dos son mejores primeras veces que un descontracturante profundo.",
          "Para pareja, revisa que ambos quieran. Suena obvio, pero el regalo para dos funciona cuando los dos tenían ganas, no cuando uno arrastra al otro.",
        ],
      },
      {
        type: "p",
        text: "Para fechas altas —Día de la Madre, San Valentín, diciembre— conviene coordinar con semanas de anticipación: los horarios se llenan antes de lo que uno cree.",
      },
    ],
    relatedServices: ["para-regalar-60", "para-regalar-80", "relax", "esencia"],
    relatedGuides: ["primera-vez-masaje-que-esperar", "masaje-relajante-o-descontracturante"],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

/** Guías ordenadas de más reciente a más antigua. */
export const guidesByDate = [...guides].sort((a, b) => b.date.localeCompare(a.date));
