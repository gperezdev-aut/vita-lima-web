import type { Service, ServiceCategory } from "@/content/services";

/**
 * Contenido largo de cada servicio, usado por las páginas individuales
 * `/servicios/[slug]`. El catálogo (`content/services.ts`) sigue siendo la
 * única fuente de precio, duración, categoría y nombre: aquí solo vive el
 * texto editorial que no cabe en una tarjeta.
 *
 * Todo el texto está escrito en español (idioma principal del sitio). Los
 * campos opcionales `*En` quedan disponibles para una futura traducción; si
 * no están definidos, la versión en inglés del sitio muestra el texto en
 * español como respaldo, igual que hace `lib/i18n/serviceText.ts` con el
 * catálogo.
 *
 * Nota de contenido: ningún texto promete resultados médicos ni terapéuticos
 * verificables. Vita Lima Spa es un centro de masajes y bienestar, no un
 * establecimiento de salud, y el contenido de estas páginas lo refleja.
 */

export type ServiceFaq = {
  q: string;
  a: string;
};

export type ServiceDetail = {
  /** Frase corta que acompaña al título en el hero de la página. */
  tagline: string;
  /** Dos o tres párrafos de descripción larga. */
  intro: string[];
  /** Para quién está pensado el servicio. */
  forWhom: string;
  /** Qué se lleva la persona de la sesión (3-4 puntos). */
  benefits: string[];
  /** Cómo transcurre la sesión, en una frase larga. */
  session: string;
  /** Preguntas frecuentes propias del servicio (alimentan el FAQPage JSON-LD). */
  faqs: ServiceFaq[];
  /** Title de la página. Si no está, se arma con el nombre del servicio. */
  seoTitle?: string;
  /** Meta description. Si no está, se arma con el tagline. */
  seoDescription?: string;
};

export const serviceDetails: Record<string, ServiceDetail> = {
  // ─────────────────────────────────────────────────────────────────────
  // INDIVIDUALES
  // ─────────────────────────────────────────────────────────────────────
  "relax-vital": {
    tagline: "El más elegido: masaje relajante de cuerpo completo con reflexología podal para cerrar.",
    intro: [
      "Relax Vital es la sesión con la que la mayoría conoce Vita Lima, y no es casualidad: en una hora recorre todo el cuerpo con presión media, sin prisa y sin momentos incómodos. La terapeuta trabaja espalda, cuello, hombros, brazos y piernas con maniobras largas y aceite tibio, ajustando la fuerza a lo que tu cuerpo va pidiendo.",
      "Los últimos minutos son de reflexología podal. Es el cierre que la gente recuerda: después de una hora de trabajo corporal, la presión en los puntos del pie termina de bajar el ritmo y muchas personas salen con esa sensación de haber dormido sin haber dormido.",
    ],
    forWhom:
      "Para quien nunca se ha hecho un masaje y no sabe por dónde empezar, y para quien viene cargado de una semana larga de escritorio, tráfico y pantallas.",
    benefits: [
      "Cuerpo completo en una sola sesión, sin tener que elegir zona",
      "Presión media, cómoda incluso si es tu primera vez",
      "Cierre con reflexología podal, incluido en el precio",
      "Disponible en San Borja y en Miraflores",
    ],
    session:
      "Llegas, conversas un minuto con la terapeuta sobre qué zonas te molestan más, y a partir de ahí la sesión es continua: aceite tibio, luz baja, música suave y una hora sin interrupciones.",
    faqs: [
      {
        q: "¿Es muy fuerte el masaje?",
        a: "No. Relax Vital trabaja con presión media y constante. Si quieres más intensidad en una zona concreta, avísale a la terapeuta al inicio y la ajusta; si prefieres algo claramente más profundo, Alivio Integral es la opción descontracturante.",
      },
      {
        q: "¿Necesito llevar algo?",
        a: "Nada. En el spa te damos toalla, ropa desechable si la prefieres y un lugar para dejar tus cosas. Lo único recomendable es llegar cinco minutos antes para no entrar apurado.",
      },
      {
        q: "¿Puedo pedirlo para dos personas?",
        a: "Relax Vital es individual. Para dos camillas en la misma sala, revisa las experiencias de la categoría Para dos: Break Time y Relax son las más cercanas a esta sesión.",
      },
    ],
  },

  "espalda-libre": {
    tagline: "45 minutos concentrados en espalda alta, cuello y hombros.",
    intro: [
      "Espalda Libre no intenta cubrir todo el cuerpo: se concentra donde de verdad duele después de ocho horas frente a una laptop. Toda la sesión se va en espalda alta, trapecios, cuello y hombros, que es donde se acumula la tensión de trabajar sentado.",
      "Puedes elegir enfoque relajante, con maniobras largas y presión media, o descontracturante, con trabajo más puntual sobre los nudos. La terapeuta te pregunta al inicio y ajusta según lo que encuentre.",
    ],
    forWhom:
      "Para quien trabaja sentado, maneja mucho o duerme mal y siente que la carga está siempre en el mismo triángulo entre cuello, hombros y omóplatos.",
    benefits: [
      "Sesión corta que entra en un espacio libre del día",
      "Todo el tiempo dedicado a la zona que más molesta",
      "Eliges intensidad: relajante o descontracturante",
      "La opción más accesible del catálogo individual",
    ],
    session:
      "Trabajo boca abajo casi toda la sesión, con foco en trapecios y zona escapular, y unos minutos finales de cuello con la cabeza apoyada.",
    faqs: [
      {
        q: "¿45 minutos alcanzan?",
        a: "Para la zona alta, sí: al no repartir el tiempo en todo el cuerpo, la espalda recibe más trabajo que en un masaje completo de una hora.",
      },
      {
        q: "¿Sirve si mi dolor es lumbar?",
        a: "Espalda Libre se enfoca en la parte superior. Si la molestia es lumbar o está repartida, conviene Terapia Vita o Alivio Integral, que trabajan la espalda completa.",
      },
      {
        q: "¿Puedo volver seguido?",
        a: "Sí, muchas personas la usan como mantenimiento quincenal. Si ese es tu caso, el Programa Terapia Muscular sale bastante más a cuenta por sesión.",
      },
    ],
  },

  "alivio-integral": {
    tagline: "Masaje descontracturante de cuerpo completo, con reflexología podal al final.",
    intro: [
      "Alivio Integral es la versión profunda de nuestro masaje de una hora. La presión es más firme que en Relax Vital y el trabajo se detiene en los puntos de tensión en vez de pasar de largo: hombros trabados, lumbares cargadas, cuello rígido de dormir mal.",
      "Cierra con reflexología podal, que después de una hora de trabajo profundo funciona como una bajada gradual. Es la sesión que más piden quienes entrenan, quienes cargan peso y quienes llevan meses postergando el tema.",
    ],
    forWhom:
      "Para cuerpos con carga real: entrenamiento, trabajo físico, o muchos meses de tensión acumulada que un masaje suave no alcanza a mover.",
    benefits: [
      "Presión profunda sobre los puntos que de verdad molestan",
      "Cubre el cuerpo completo, no solo la espalda",
      "Reflexología podal incluida para cerrar",
      "Se puede combinar en programas de 5 o 10 sesiones",
    ],
    session:
      "La terapeuta recorre el cuerpo, identifica las zonas contracturadas y vuelve sobre ellas con presión sostenida; si en algún punto es demasiado, lo dices y baja la intensidad al instante.",
    faqs: [
      {
        q: "¿Duele?",
        a: "Un descontracturante bien hecho se siente intenso, no doloroso. La referencia es simple: si tienes que aguantar la respiración, es demasiado. Dilo y la terapeuta ajusta.",
      },
      {
        q: "¿Puedo quedar adolorido al día siguiente?",
        a: "Es posible sentir la zona trabajada algo sensible durante un día, parecido a después de entrenar. Tomar agua y evitar esfuerzo fuerte esa tarde ayuda.",
      },
      {
        q: "¿Cada cuánto conviene repetirlo?",
        a: "Si la carga es constante, cada dos o tres semanas mantiene la zona suelta. Para eso existe el Programa Terapia Muscular, que baja bastante el precio por sesión.",
      },
    ],
  },

  "terapia-vita": {
    tagline: "Sesión terapéutica personalizada: se arma según lo que tu cuerpo necesita ese día.",
    intro: [
      "Terapia Vita no tiene una rutina fija. La sesión empieza con unas preguntas concretas —dónde molesta, desde cuándo, qué movimiento lo empeora— y a partir de ahí la terapeuta decide qué técnica usar y cuánto tiempo dedicarle a cada zona.",
      "Puede terminar siendo una hora casi completa sobre la zona lumbar, o un recorrido general con trabajo puntual en cuello y cadera. Es la opción para cuando sabes que algo no está bien pero no sabes qué pedir.",
    ],
    forWhom:
      "Para quien llega con una molestia específica, o con varias, y prefiere que la sesión se adapte en vez de elegir un paquete cerrado.",
    benefits: [
      "La sesión se arma en función de tu molestia, no al revés",
      "Combina técnicas según lo que la terapeuta encuentre",
      "Buena primera sesión si no sabes qué servicio pedir",
      "Misma duración y precio que un masaje completo estándar",
    ],
    session:
      "Empieza con una conversación breve y honesta sobre tu cuerpo, y sigue con el trabajo manual que esa conversación indique: puede ser presión sostenida, movilización suave o maniobras largas, según el caso.",
    faqs: [
      {
        q: "¿En qué se diferencia de Alivio Integral?",
        a: "Alivio Integral es descontracturante de cuerpo completo con una estructura definida. Terapia Vita no tiene estructura fija: se decide en el momento según lo que traigas.",
      },
      {
        q: "¿Sirve si tengo una lesión diagnosticada?",
        a: "Comenta siempre cualquier lesión, cirugía reciente o indicación médica antes de empezar. El masaje es un servicio de bienestar, no un tratamiento médico, y en algunos casos la terapeuta puede recomendarte consultar primero con tu especialista.",
      },
      {
        q: "¿Puedo pedir que se enfoque en una sola zona?",
        a: "Sí. Si quieres la hora completa en espalda y cuello, se hace así.",
      },
    ],
  },

  "balance-plus": {
    tagline: "70 minutos con piedras calientes, exfoliación de espalda y reflexología.",
    intro: [
      "Balance Plus es el paso siguiente al masaje de una hora: diez minutos más y tres elementos que cambian bastante la experiencia. Empieza con masaje relajante o descontracturante —tú eliges—, sigue con piedras calientes sobre la espalda y termina con exfoliación de espalda y reflexología podal.",
      "Las piedras calientes hacen buena parte del trabajo por sí solas: el calor abre el músculo antes de que la terapeuta insista con las manos, así que la presión se siente menos brusca y llega más profundo.",
    ],
    forWhom:
      "Para quien ya conoció el masaje básico y quiere algo más completo sin llegar todavía a una sesión de dos horas.",
    benefits: [
      "Piedras calientes: el calor abre el músculo antes del trabajo manual",
      "Exfoliación de espalda incluida, la piel queda notoriamente más suave",
      "Eliges enfoque relajante o descontracturante",
      "Buen punto medio entre la sesión estándar y las premium",
    ],
    session:
      "Masaje corporal, luego las piedras apoyadas y deslizadas sobre la espalda, exfoliación con producto en la zona posterior y cierre con reflexología podal.",
    faqs: [
      {
        q: "¿Las piedras queman?",
        a: "No. Se calientan a una temperatura controlada y la terapeuta siempre prueba el contacto antes de apoyarlas. Si sientes que están muy calientes para ti, se retiran de inmediato.",
      },
      {
        q: "¿La exfoliación deja la piel irritada?",
        a: "No debería. Es una exfoliación suave de espalda, con producto de grano fino. Si tienes la piel muy sensible o alguna lesión en la zona, avísalo antes.",
      },
      {
        q: "¿Puedo pedirlo con más tiempo?",
        a: "Sí: Deep Balance 120 es la versión de dos horas, con compresas calientes además de las piedras.",
      },
    ],
  },

  "glow-facial": {
    tagline: "Masaje corporal más limpieza facial express con mascarilla de colágeno.",
    intro: [
      "Glow Facial resuelve dos cosas en una sola visita: el cuerpo y la cara. Primero un masaje relajante o descontracturante, y después una limpieza facial express que termina con mascarilla de colágeno.",
      "Es la sesión que más se pide antes de un evento —una boda, una reunión importante, un viaje— porque combina el efecto del masaje con una cara visiblemente más descansada al salir.",
    ],
    forWhom:
      "Para quien tiene una fecha en el calendario y quiere llegar descansado y con buena cara, sin sacar dos citas distintas.",
    benefits: [
      "Cuerpo y rostro en una sola sesión de 75 minutos",
      "Mascarilla de colágeno incluida",
      "Eliges enfoque relajante o descontracturante en el masaje",
      "Efecto visible el mismo día",
    ],
    session:
      "Masaje corporal boca abajo y boca arriba, y luego el trabajo facial: limpieza, extracción suave si hace falta y mascarilla con unos minutos de reposo.",
    faqs: [
      {
        q: "¿Puedo maquillarme después?",
        a: "Mejor esperar unas horas. La piel queda hidratada y con los poros abiertos; darle un rato antes del maquillaje hace que el resultado dure más.",
      },
      {
        q: "¿Sirve para piel sensible?",
        a: "La limpieza express es suave. Avisa si usas ácidos, retinol o tuviste algún procedimiento dermatológico reciente: en esos casos la esteticista adapta o recomienda esperar.",
      },
      {
        q: "¿Hay una versión más completa?",
        a: "Sí: Glow Facial Plus suma piedras calientes y bebida, y Glow Facial Premium reemplaza el colágeno por mascarilla lifting de ácido hialurónico y sérum antioxidante.",
      },
    ],
  },

  "deep-balance-120": {
    tagline: "Dos horas completas: masaje, piedras calientes, compresas y reflexología.",
    intro: [
      "Deep Balance 120 es la sesión individual más larga del catálogo, y la diferencia no es solo el tiempo: con dos horas la terapeuta puede trabajar el cuerpo completo sin apurar ninguna zona, alternando maniobras relajantes y descontracturantes según lo que va encontrando.",
      "En el camino entran las piedras calientes y las compresas calientes, que mantienen el músculo abierto todo el tiempo. Cierra con reflexología podal. Es la sesión de quien no se hace un masaje hace mucho y quiere resolverlo de una vez.",
    ],
    forWhom:
      "Para cuerpos con tensión acumulada de meses, y para quien quiere desconectar de verdad y no mirar el reloj.",
    benefits: [
      "Dos horas: alcanza para cuerpo completo sin apurar nada",
      "Combina relajante y descontracturante en la misma sesión",
      "Calor sostenido con piedras y compresas",
      "Reflexología podal incluida al cierre",
    ],
    session:
      "Un recorrido largo y sin cortes: espalda, piernas, brazos, cuello y cabeza, con las piedras y las compresas entrando donde el músculo lo pide.",
    faqs: [
      {
        q: "¿Dos horas no es demasiado?",
        a: "La mayoría de personas pierde la noción del tiempo a los veinte minutos. Si en algún momento quieres cambiar de posición o hacer una pausa, se hace sin problema.",
      },
      {
        q: "¿Conviene reservar con anticipación?",
        a: "Sí. Es un bloque largo de camilla, así que hay menos horarios disponibles que para una sesión de 60 minutos.",
      },
      {
        q: "¿Puedo hacerlo en pareja?",
        a: "Esta es individual. Para dos personas con esta duración, Supreme (150 minutos) es la experiencia equivalente.",
      },
    ],
  },

  "aroma-zen": {
    tagline: "Masaje con aromaterapia y vela de soja artesanal, que te llevas de regalo.",
    intro: [
      "Aroma Zen suma a la sesión algo que no se ve en la lista de precios: el olor. La aromaterapia acompaña todo el masaje, y la vela Indalo de soja que se enciende en tu sala te la llevas a casa al terminar.",
      "El masaje puede ser relajante o descontracturante y cierra con reflexología podal. Es la sesión para cuando el objetivo no es solo el músculo, sino bajar el ruido mental de una semana intensa.",
    ],
    forWhom:
      "Para quien busca un momento de calma más que una sesión terapéutica, y para quien quiere llevarse algo del spa a casa.",
    benefits: [
      "Vela Indalo de soja incluida, para llevar",
      "Aromaterapia durante toda la sesión",
      "Reflexología podal al cierre",
      "Excelente como autorregalo o detalle",
    ],
    session:
      "Se enciende la vela al empezar, la sala se llena de aroma y el masaje avanza en ese ambiente hasta la reflexología final.",
    faqs: [
      {
        q: "¿Puedo elegir el aroma?",
        a: "Hay varias opciones disponibles según stock; coméntalo al llegar y la terapeuta te muestra las que hay ese día.",
      },
      {
        q: "¿La vela es realmente para llevar?",
        a: "Sí, la vela de soja va incluida en el precio y te la llevas al terminar.",
      },
      {
        q: "¿Y si soy sensible a los olores fuertes?",
        a: "Avísalo al reservar. Se puede hacer la sesión con aroma muy tenue o directamente sin aromaterapia.",
      },
    ],
  },

  "coco-premium": {
    tagline: "80 minutos con exfoliación de coco, piedras calientes y copa de vino.",
    intro: [
      "Coco Premium es la sesión con más elementos del catálogo individual de rango medio: masaje relajante o descontracturante, piedras calientes, exfoliación corporal de coco, reflexología podal, aromaterapia y una copa de vino o infusión para cerrar.",
      "La exfoliación de coco es lo que la distingue. Deja la piel suave y el aroma se queda un buen rato; es la sesión que la gente elige cuando quiere que se note que se dio un gusto.",
    ],
    forWhom:
      "Para un cumpleaños, un cierre de mes difícil o simplemente para regalarse una tarde completa.",
    benefits: [
      "Exfoliación corporal de coco incluida",
      "Piedras calientes y aromaterapia en la misma sesión",
      "Copa de vino o infusión al terminar",
      "80 minutos: tiempo real para no apurar nada",
    ],
    session:
      "Masaje, piedras, exfoliación de coco y reflexología, y al final unos minutos sentado con la copa antes de volver a la calle.",
    faqs: [
      {
        q: "¿La exfoliación es de cuerpo completo?",
        a: "Se trabaja la zona posterior y las extremidades. Si prefieres concentrarla en una zona, coméntalo al inicio.",
      },
      {
        q: "¿Puedo pedir infusión en vez de vino?",
        a: "Sí, siempre. La bebida se elige al momento.",
      },
      {
        q: "¿Existe en versión para dos?",
        a: "Sí: Coco Premium en Pareja, con dos camillas en la misma sala y dos copas.",
      },
    ],
  },

  "piedras-calientes": {
    tagline: "Masaje relajante con piedras calientes de basalto sobre la espalda.",
    intro: [
      "Una sesión construida alrededor del calor. Las piedras de basalto se calientan a temperatura controlada y se apoyan y deslizan sobre la espalda mientras la terapeuta trabaja con las manos entre pasada y pasada.",
      "El calor hace que el músculo ceda antes, así que la presión se siente más suave de lo que en realidad es. Es una de las sesiones favoritas de quienes tienen la espalda dura pero no toleran bien un descontracturante fuerte.",
    ],
    forWhom:
      "Para quien tiene frío en el cuerpo, tensión de fondo y prefiere una sesión intensa sin presión agresiva.",
    benefits: [
      "El calor abre el músculo y hace la presión más tolerable",
      "Sensación de relajación que dura horas después",
      "Ideal en época de humedad limeña",
      "Sesión de 60 minutos a precio de masaje estándar",
    ],
    session:
      "Alternancia entre piedras apoyadas, piedras en movimiento y trabajo manual, casi todo en posición boca abajo.",
    faqs: [
      {
        q: "¿A qué temperatura están las piedras?",
        a: "A una temperatura tibia-caliente controlada. La terapeuta siempre las prueba sobre su propia mano y luego sobre tu piel antes de dejarlas apoyadas.",
      },
      {
        q: "¿Hay casos en los que no conviene?",
        a: "Comenta si tienes problemas circulatorios, várices marcadas, piel muy sensible o si estás embarazada: en esos casos la terapeuta te sugiere otra opción.",
      },
      {
        q: "¿Se puede combinar con otras técnicas?",
        a: "Sí. Balance Plus, Deep Balance 120 y Coco Premium ya incluyen piedras calientes junto con otros elementos.",
      },
    ],
  },

  bambuterapia: {
    tagline: "Masaje con cañas de bambú de distintos grosores para trabajo profundo.",
    intro: [
      "En la bambuterapia la terapeuta reemplaza parte del trabajo manual por cañas de bambú de varios diámetros. La caña permite aplicar una presión profunda y pareja que con las manos costaría sostener durante toda la sesión, y llega bien a zonas grandes como muslos, glúteos y espalda.",
      "Se siente distinto a un masaje convencional: más rítmico, con deslizamientos largos y firmes. Es una técnica muy pedida por quienes hacen deporte y por quienes buscan trabajo de contorno corporal.",
    ],
    forWhom:
      "Para quien busca presión profunda y sostenida, y para quien ya probó el masaje clásico y quiere algo diferente.",
    benefits: [
      "Presión profunda y pareja, difícil de lograr solo con las manos",
      "Trabajo eficiente en zonas grandes: piernas, glúteos y espalda",
      "Sensación de drenaje y ligereza al terminar",
      "También se incluye en las experiencias Respira, Renova y Bioenergético Oriental",
    ],
    session:
      "Deslizamientos largos con las cañas sobre la zona aceitada, alternados con maniobras manuales en los puntos que necesitan más detalle.",
    faqs: [
      {
        q: "¿Es doloroso?",
        a: "Es firme, no doloroso. La terapeuta empieza con presión moderada y sube según lo que tú digas.",
      },
      {
        q: "¿Sirve para celulitis o modelado?",
        a: "La bambuterapia se usa mucho en protocolos de modelado por su efecto de drenaje y activación circulatoria, pero es un servicio de bienestar: no promete resultados estéticos medibles ni reemplaza un tratamiento especializado.",
      },
      {
        q: "¿Puedo quedar con marcas?",
        a: "No es lo habitual. Si tu piel marca con facilidad, avísalo y se trabaja con menos presión.",
      },
    ],
  },

  shiatsu: {
    tagline: "Presión con dedos y palmas sobre puntos concretos, sin aceite.",
    intro: [
      "El shiatsu es una técnica japonesa que trabaja por presión: la terapeuta usa dedos, palmas y a veces antebrazos sobre puntos y líneas del cuerpo, manteniendo la presión unos segundos en cada uno en vez de deslizar.",
      "Se hace con ropa cómoda y sin aceite, lo que lo convierte en una buena opción si no quieres salir con el cuerpo aceitado o si vuelves directo al trabajo.",
    ],
    forWhom:
      "Para quien prefiere presión puntual en vez de maniobras deslizantes, y para quien quiere un masaje sin aceite.",
    benefits: [
      "Se realiza con ropa cómoda, sin aceite",
      "Presión sostenida sobre puntos específicos",
      "Buena opción a media jornada, sin necesidad de ducharse después",
      "Trabajo de estiramientos suaves incluido",
    ],
    session:
      "Presión mantenida punto por punto a lo largo de espalda, cadera, piernas y hombros, con algunos estiramientos asistidos entre secuencias.",
    faqs: [
      {
        q: "¿Qué ropa debo llevar?",
        a: "Algo cómodo y elástico. Si vienes de la oficina, en el spa te damos ropa desechable adecuada para la sesión.",
      },
      {
        q: "¿Se siente menos que un masaje con aceite?",
        a: "Se siente distinto, no menos. La presión sostenida en un punto suele percibirse más intensa que un deslizamiento.",
      },
      {
        q: "¿Puedo combinarlo con reflexología?",
        a: "Sí, coméntalo al reservar y la terapeuta reparte el tiempo entre ambas técnicas.",
      },
    ],
  },

  "drenaje-linfatico": {
    tagline: "Maniobras suaves y rítmicas para favorecer la circulación y la sensación de ligereza.",
    intro: [
      "El drenaje linfático no se parece a ningún otro masaje del catálogo: la presión es muy suave y el ritmo, lento y repetitivo. No busca soltar contracturas, sino acompañar el recorrido natural del sistema linfático con maniobras en una dirección determinada.",
      "La sensación durante la sesión es casi hipnótica, y al terminar la mayoría describe piernas y abdomen más livianos. Es de los servicios más pedidos después de viajes largos o de días de mucho estar de pie.",
    ],
    forWhom:
      "Para quien siente pesadez o hinchazón en piernas, para después de viajes largos y para quien no tolera bien la presión fuerte.",
    benefits: [
      "Presión muy suave, apta para quien no soporta el masaje profundo",
      "Sensación de ligereza en piernas y abdomen",
      "Ritmo constante que induce relajación profunda",
      "Se puede repetir con frecuencia",
    ],
    session:
      "Maniobras lentas, superficiales y repetidas siguiendo siempre la misma dirección, empezando por las zonas de drenaje y avanzando hacia las extremidades.",
    faqs: [
      {
        q: "¿Voy a sentir que no me están haciendo nada?",
        a: "Al principio sorprende lo suave que es. El efecto no está en la fuerza sino en la repetición y la dirección de las maniobras.",
      },
      {
        q: "¿Sirve después de una cirugía?",
        a: "El drenaje postoperatorio es un procedimiento clínico que debe indicar y supervisar tu médico. Nuestro servicio es de bienestar: si tuviste una cirugía reciente, consulta primero con tu especialista.",
      },
      {
        q: "¿Cada cuánto conviene?",
        a: "Quienes lo usan por sensación de pesadez suelen repetirlo cada una o dos semanas.",
      },
    ],
  },

  "masaje-prenatal": {
    tagline: "Masaje suave y seguro para gestantes, en posición lateral con soporte.",
    intro: [
      "El masaje prenatal está pensado para el cuerpo que cambia semana a semana. Se trabaja en posición lateral, con cojines de soporte, y la presión es suave y constante, con foco en lumbares, cadera, piernas y hombros, que son las zonas que más se cargan durante el embarazo.",
      "Se evitan las zonas y maniobras que no corresponden en gestación, y el ritmo lo marcas tú: si necesitas cambiar de posición, sentarte o parar un momento, se hace.",
      "Está disponible también en paquete de 2 sesiones por S/ 128.",
    ],
    forWhom:
      "Para gestantes con molestias lumbares, piernas cansadas o dificultad para descansar, con autorización de su médico.",
    benefits: [
      "Posición lateral con soporte, cómoda en cualquier trimestre avanzado",
      "Presión suave, sin maniobras contraindicadas",
      "Foco en lumbares, cadera y piernas",
      "Paquete de 2 sesiones por S/ 128",
    ],
    session:
      "Instalación cómoda de costado con cojines, y trabajo pausado sobre espalda baja, cadera, piernas y hombros, con pausas cuando las necesites.",
    faqs: [
      {
        q: "¿Desde qué semana puedo tomarlo?",
        a: "Lo habitual es a partir del segundo trimestre, pero la referencia siempre es tu médico. Consúltale antes de reservar y avísanos de cualquier indicación.",
      },
      {
        q: "¿Hay casos en los que no se puede hacer?",
        a: "Sí. Ante embarazo de riesgo, presión alta, sangrado o cualquier indicación de reposo, el masaje no corresponde. Si tienes dudas, pregunta a tu médico antes.",
      },
      {
        q: "¿Puedo venir acompañada?",
        a: "Claro. Tu acompañante puede esperar en recepción o reservar su propia sesión en paralelo.",
      },
    ],
  },

  "bioenergetico-esferas-solo": {
    tagline: "Masaje con esferas chinas: presión, calor y vibración sobre puntos de tensión.",
    intro: [
      "El masaje bioenergético con esferas chinas usa esferas metálicas que la terapeuta hace rodar y presionar sobre la espalda y las extremidades. La combinación de peso, temperatura y movimiento circular se siente muy distinta a la mano abierta.",
      "Es una sesión de 70 minutos, pausada, que suele describirse más como un ritual que como un masaje deportivo. Buena elección si buscas algo diferente a lo que ya conoces.",
    ],
    forWhom:
      "Para quien ya probó los masajes clásicos y quiere una experiencia distinta, con un componente más ritual.",
    benefits: [
      "Técnica poco común en Lima",
      "Combinación de presión, peso y movimiento circular",
      "70 minutos de sesión pausada",
      "También forma parte de Bioenergético Oriental y de Renace",
    ],
    session:
      "Recorridos circulares con las esferas sobre la zona aceitada, alternando con presión puntual y trabajo manual.",
    faqs: [
      {
        q: "¿Las esferas están frías?",
        a: "Se atemperan antes de empezar. Si prefieres el contacto más cálido, avísalo.",
      },
      {
        q: "¿Es un tratamiento energético?",
        a: "El nombre viene de la tradición de la técnica. Nosotros lo ofrecemos como lo que es: una sesión de masaje con una herramienta y un ritmo particulares, sin promesas más allá del bienestar.",
      },
      {
        q: "¿Hay una versión más completa?",
        a: "Sí: Bioenergético Oriental suma bambuterapia, reflexología y armonización con cuencos por el mismo precio.",
      },
    ],
  },

  ventosas: {
    tagline: "Masaje combinado con ventosas de succión sobre las zonas más cargadas.",
    intro: [
      "La sesión combina masaje relajante o descontracturante con ventosas. La ventosa genera succión sobre la piel y el músculo, lo que produce una sensación de tirón que muchos describen como el opuesto exacto de la presión de un masaje normal.",
      "Se usan sobre todo en espalda y hombros, donde la tensión es más terca. Es una técnica muy popular entre deportistas.",
    ],
    forWhom:
      "Para espaldas muy cargadas, para deportistas y para quien ya probó todo lo demás y busca otra vía.",
    benefits: [
      "Sensación de descarga distinta a cualquier masaje de presión",
      "Combinada con masaje manual en la misma sesión",
      "Muy usada en zonas de tensión persistente",
      "Sesión de 60 minutos",
    ],
    session:
      "Primero masaje para preparar el tejido, luego las ventosas apoyadas o deslizadas sobre la zona elegida, y cierre con trabajo manual.",
    faqs: [
      {
        q: "¿Deja marcas?",
        a: "Sí, es frecuente que queden círculos rojizos o morados durante algunos días. No duelen, pero conviene tenerlo en cuenta si tienes un evento cerca o vas a la playa.",
      },
      {
        q: "¿Duele?",
        a: "Se siente como un tirón sostenido, no como un pellizco. La intensidad de la succión se regula.",
      },
      {
        q: "¿Puedo pedir que no se usen en cierta zona?",
        a: "Por supuesto. Se aplican solo donde tú aceptes.",
      },
    ],
  },

  reflexologia: {
    tagline: "30 minutos de presión sobre los puntos reflejos del pie.",
    intro: [
      "La reflexología podal trabaja el pie completo: planta, empeine, dedos y tobillo, con presión firme sobre puntos concretos. Media hora alcanza para recorrerlo entero sin apurar.",
      "Es la sesión más corta del catálogo y una de las más pedidas por quienes pasan el día de pie o caminando. También es una buena primera experiencia si un masaje de cuerpo completo te parece demasiado.",
    ],
    forWhom:
      "Para quien está mucho tiempo de pie, para quien tiene poco tiempo, y para quien prefiere no desvestirse.",
    benefits: [
      "Sesión corta que entra en cualquier agenda",
      "No requiere desvestirse",
      "Alivio inmediato para pies cansados",
      "La opción de menor precio del catálogo",
    ],
    session:
      "Sentado o recostado, con los pies apoyados: lavado inicial, presión punto por punto y estiramientos suaves de dedos y tobillo.",
    faqs: [
      {
        q: "¿Tengo que desvestirme?",
        a: "No. Solo se descubren los pies.",
      },
      {
        q: "¿Hace cosquillas?",
        a: "La presión firme de la reflexología no produce cosquillas; el roce ligero sí. Por eso la terapeuta trabaja con presión sostenida desde el principio.",
      },
      {
        q: "¿Existe una versión más larga?",
        a: "Sí, Reflexología Plus, de 45 minutos, que permite trabajar con más detalle cada zona.",
      },
    ],
  },

  "reflexologia-plus": {
    tagline: "45 minutos de reflexología podal, con más detalle en cada zona.",
    intro: [
      "La versión extendida de la reflexología. Con quince minutos más, la terapeuta puede detenerse en las zonas que están más sensibles en vez de recorrer el pie a ritmo parejo, y sumar trabajo de tobillo y pantorrilla baja.",
      "Es la elección de quienes ya probaron la sesión de 30 minutos y sintieron que se les hizo corta.",
    ],
    forWhom:
      "Para quien camina o está de pie muchas horas al día y quiere un trabajo más detallado que la sesión estándar.",
    benefits: [
      "15 minutos más para insistir donde de verdad molesta",
      "Incluye trabajo de tobillo y pantorrilla baja",
      "Sigue sin requerir desvestirse",
      "Precio accesible para lo que dura",
    ],
    session:
      "Igual que la reflexología estándar, pero con tiempo real para volver dos o tres veces sobre los puntos más sensibles.",
    faqs: [
      {
        q: "¿Vale la pena frente a la de 30 minutos?",
        a: "Si tus pies te molestan seguido, sí: la diferencia se nota sobre todo en el trabajo de la planta y del arco.",
      },
      {
        q: "¿Puedo combinarla con un masaje de espalda?",
        a: "Sí. Coméntalo al reservar y armamos la combinación, o revisa Espalda Libre y Relax Vital, que ya incluyen ambas cosas.",
      },
      {
        q: "¿Sirve si tengo fascitis?",
        a: "Ante cualquier diagnóstico de pie, consulta primero con tu médico. La reflexología es un servicio de bienestar y no sustituye un tratamiento.",
      },
    ],
  },

  "para-regalar-60": {
    tagline: "Sesión de 60 minutos que llega con oso de peluche y bebida incluidos.",
    intro: [
      "Para Regalar existe porque muchas veces la sesión es el regalo, y un voucher suelto no se siente como uno. Incluye masaje relajante, piedras calientes y reflexología podal, más un oso de peluche y una bebida que se entregan el día de la cita.",
      "Se puede reservar para otra persona: nos das su nombre, coordinamos la fecha con ella y llega a una sesión que ya está pagada y con el detalle listo.",
    ],
    forWhom:
      "Para cumpleaños, Día de la Madre, aniversarios o cualquier ocasión en la que quieras regalar algo que se disfrute, no que se guarde.",
    benefits: [
      "Oso de peluche y bebida incluidos en el precio",
      "Masaje, piedras calientes y reflexología en 60 minutos",
      "Se puede reservar a nombre de otra persona",
      "Alternativa a la gift card cuando ya sabes la fecha",
    ],
    session:
      "Una sesión completa de 60 minutos, y al final la entrega del detalle junto con la bebida.",
    faqs: [
      {
        q: "¿Cómo lo regalo si no sé qué día puede ir?",
        a: "En ese caso conviene una Gift Card: se compra ahora y la persona elige la fecha después. Escríbenos por WhatsApp y te explicamos las opciones.",
      },
      {
        q: "¿Puedo agregar una tarjeta con dedicatoria?",
        a: "Sí, coméntalo al reservar y la preparamos.",
      },
      {
        q: "¿Hay una versión más completa?",
        a: "Sí: Para Regalar Plus, de 80 minutos, que además incluye exfoliación de espalda.",
      },
    ],
  },

  "para-regalar-80": {
    tagline: "80 minutos con exfoliación de espalda, oso de peluche y bebida.",
    intro: [
      "La versión larga del regalo. A los 60 minutos de masaje, piedras calientes y reflexología se le suman veinte minutos y una exfoliación de espalda, que es lo que convierte la sesión en algo claramente más completo.",
      "Incluye el mismo detalle: oso de peluche y bebida el día de la cita.",
    ],
    forWhom:
      "Para un regalo importante —un cumpleaños redondo, un aniversario— donde quieres que se note la diferencia.",
    benefits: [
      "80 minutos: exfoliación de espalda además de todo lo anterior",
      "Oso de peluche y bebida incluidos",
      "Se puede reservar a nombre de otra persona",
      "La opción de regalo más completa fuera de las cajas",
    ],
    session:
      "Masaje relajante, piedras calientes, exfoliación de espalda y reflexología podal, con la entrega del detalle al final.",
    faqs: [
      {
        q: "¿Se puede combinar con una caja de regalo?",
        a: "Sí. Las cajas (Clásico, Suculentas, Flores, Vino, Wellness) están en la sección Gift Cards y se pueden coordinar junto con la sesión.",
      },
      {
        q: "¿La exfoliación es de cuerpo completo?",
        a: "Se trabaja la espalda. Para exfoliación más amplia, Coco Premium es la opción.",
      },
      {
        q: "¿Con cuánta anticipación conviene reservar?",
        a: "Para fechas altas como el Día de la Madre, mientras antes mejor: los horarios se llenan con semanas de anticipación.",
      },
    ],
  },

  "bioenergetico-oriental": {
    tagline: "Esferas chinas, bambuterapia, reflexología y armonización con cuencos.",
    intro: [
      "Bioenergético Oriental reúne en 70 minutos cuatro elementos de tradición oriental: esferas chinas, cañas de bambú, reflexología podal y armonización final con cuencos.",
      "El orden está pensado para ir de lo más físico a lo más sutil: primero las esferas y el bambú trabajan el músculo con presión y peso, después la reflexología baja el ritmo, y los cuencos cierran la sesión con vibración y sonido.",
    ],
    forWhom:
      "Para quien busca una experiencia distinta a un masaje convencional, con un componente ritual y sensorial.",
    benefits: [
      "Cuatro técnicas en una sola sesión de 70 minutos",
      "Combina trabajo muscular profundo con cierre sonoro",
      "Poco común en Lima",
      "Buen regalo para alguien que ya probó los masajes clásicos",
    ],
    session:
      "Esferas y bambú sobre espalda y piernas, reflexología podal, y unos minutos finales de cuencos con el cuerpo ya en reposo.",
    faqs: [
      {
        q: "¿Qué son los cuencos?",
        a: "Cuencos metálicos que al frotarse producen un sonido sostenido y vibración. Se colocan cerca del cuerpo en el cierre de la sesión.",
      },
      {
        q: "¿Tiene algún efecto terapéutico comprobado?",
        a: "Lo ofrecemos como una experiencia de bienestar y relajación, sin atribuirle efectos médicos.",
      },
      {
        q: "¿Puedo pedir solo una parte?",
        a: "Sí: Bioenergético con Esferas Chinas y Bambuterapia existen como sesiones sueltas.",
      },
    ],
  },

  "glow-facial-plus": {
    tagline: "80 minutos: masaje con piedras calientes, limpieza facial y bebida.",
    intro: [
      "Glow Facial Plus estira la propuesta de Glow Facial: el masaje ahora incluye piedras calientes y la sesión llega a 80 minutos, con limpieza facial completa y una bebida al final.",
      "Es la combinación que más se pide para un día libre completo: sales con el cuerpo suelto, la cara limpia y sin apuro.",
    ],
    forWhom:
      "Para quien quiere resolver cuerpo y rostro con calma y tiene la tarde disponible.",
    benefits: [
      "Piedras calientes sumadas al masaje corporal",
      "Limpieza facial completa incluida",
      "Bebida al cierre",
      "80 minutos sin apurar ninguna parte",
    ],
    session:
      "Masaje con piedras, y después el bloque facial: limpieza, tonificación y mascarilla, con la bebida al terminar.",
    faqs: [
      {
        q: "¿Cuál es la diferencia con Glow Facial?",
        a: "Glow Facial dura 75 minutos con limpieza express y mascarilla de colágeno. Plus suma piedras calientes al masaje y bebida al cierre.",
      },
      {
        q: "¿Y con Glow Facial Premium?",
        a: "Premium reemplaza la mascarilla de colágeno por una mascarilla lifting de ácido hialurónico y suma sérum antioxidante.",
      },
      {
        q: "¿Conviene si tengo la piel con acné activo?",
        a: "Coméntalo al reservar. En brotes activos la esteticista suele recomendar una limpieza más específica o esperar.",
      },
    ],
  },

  "glow-facial-premium": {
    tagline: "90 minutos con mascarilla lifting de ácido hialurónico y sérum antioxidante.",
    intro: [
      "La versión más completa de la línea Glow. Masaje con piedras calientes, y luego un protocolo facial con mascarilla lifting de ácido hialurónico y sérum antioxidante, en vez de la mascarilla de colágeno de las versiones anteriores.",
      "Noventa minutos en total. Es la sesión que se reserva antes de un evento importante o cuando se quiere un resultado visible el mismo día.",
    ],
    forWhom:
      "Para pieles que se ven apagadas o cansadas, y para quien quiere el mejor resultado facial del catálogo combinado con masaje.",
    benefits: [
      "Mascarilla lifting de ácido hialurónico",
      "Sérum antioxidante incluido",
      "Masaje con piedras calientes en la misma sesión",
      "90 minutos: el protocolo facial más completo",
    ],
    session:
      "Bloque corporal con piedras, y bloque facial largo: limpieza, exfoliación, mascarilla lifting con reposo y sérum final.",
    faqs: [
      {
        q: "¿Cuánto dura el efecto?",
        a: "El aspecto de piel hidratada y descansada suele notarse durante varios días. Como cualquier tratamiento cosmético, no es permanente.",
      },
      {
        q: "¿Puedo hacerlo el mismo día del evento?",
        a: "Sí, y de hecho es lo más común. Deja unas horas antes de maquillarte.",
      },
      {
        q: "¿Es compatible con retinol o ácidos?",
        a: "Avísanos si los usas. Según el caso, la esteticista adapta el protocolo o sugiere espaciar los tratamientos.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // PARA DOS
  // ─────────────────────────────────────────────────────────────────────
  "break-time": {
    tagline: "50 minutos para dos, en la misma sala, con dos terapeutas.",
    intro: [
      "Break Time es la puerta de entrada a las experiencias para dos: dos camillas en la misma sala, dos terapeutas trabajando en paralelo y masaje relajante o descontracturante, según lo que cada uno prefiera.",
      "Es la opción más accesible de la categoría y funciona bien cuando no es una ocasión especial sino simplemente ganas de hacerlo juntos.",
    ],
    forWhom:
      "Para parejas, amigas, madre e hija: cualquier par que quiera compartir la sesión sin gastar en una experiencia larga.",
    benefits: [
      "Dos camillas en la misma sala privada",
      "Cada persona elige su tipo de masaje",
      "El precio más accesible de las experiencias para dos",
      "Cabe en un espacio corto del día",
    ],
    session:
      "Ambas personas entran juntas, se instalan en camillas paralelas y las dos terapeutas trabajan al mismo ritmo durante los 50 minutos.",
    faqs: [
      {
        q: "¿Podemos elegir masajes distintos?",
        a: "Sí. Una persona puede pedir relajante y la otra descontracturante sin problema.",
      },
      {
        q: "¿El precio es por los dos?",
        a: "Sí, el precio publicado corresponde a las dos personas.",
      },
      {
        q: "¿Hay algo más completo?",
        a: "Sí, toda la categoría Para dos: Relax, Vita, Esencia, Deluxe, Royale y Supreme suman piedras, reflexología, aromaterapia y bebidas.",
      },
    ],
  },

  "sacro-craneal": {
    tagline: "Trabajo sacro-craneal con compresa herbal, para dos personas.",
    intro: [
      "Sacro Craneal es la experiencia más suave de la categoría para dos. El trabajo sacro-craneal usa contacto sostenido y muy poca presión en la base del cráneo, el cuello y la zona sacra, y se combina con compresa herbal caliente, masaje relajante, reflexología podal y aromaterapia.",
      "Es la elección de quienes llegan con la cabeza más cargada que el cuerpo: dormir mal, pantallas hasta tarde, semanas de estrés sostenido.",
    ],
    forWhom:
      "Para dos personas que buscan bajar revoluciones más que trabajar el músculo, y para quien no tolera la presión fuerte.",
    benefits: [
      "Técnica muy suave, de contacto sostenido",
      "Compresa herbal caliente incluida",
      "Reflexología podal y aromaterapia en la misma sesión",
      "Ambas personas en la misma sala",
    ],
    session:
      "Contacto suave y prolongado en cabeza, cuello y zona sacra, con la compresa herbal apoyada, y cierre con reflexología.",
    faqs: [
      {
        q: "¿Se siente muy poco?",
        a: "La presión es mínima a propósito. La mayoría lo describe como profundamente relajante, distinto a cualquier masaje de fuerza.",
      },
      {
        q: "¿Qué es la compresa herbal?",
        a: "Un atado de hierbas envuelto en tela que se calienta y se apoya sobre el cuerpo; suma calor y aroma.",
      },
      {
        q: "¿Sirve para dolores de cabeza tensionales?",
        a: "Muchas personas lo buscan por eso, pero es una sesión de bienestar: si tienes dolores de cabeza frecuentes, consúltalo con tu médico.",
      },
    ],
  },

  respira: {
    tagline: "Masaje relajante con bambuterapia, hidratación corporal y copa de vino, para dos.",
    intro: [
      "Respira combina masaje relajante con bambuterapia, hidratación corporal completa, reflexología podal y una copa de vino o infusión para cada uno.",
      "La hidratación corporal es lo que la distingue dentro del rango: al terminar la piel queda visiblemente distinta, no solo el músculo suelto.",
    ],
    forWhom:
      "Para una pareja o dos amigas que quieren una experiencia completa sin llegar al rango premium.",
    benefits: [
      "Bambuterapia incluida, presión profunda y pareja",
      "Hidratación corporal completa",
      "Reflexología podal y copa de vino o infusión",
      "Una hora para los dos en la misma sala",
    ],
    session:
      "Masaje con manos y cañas de bambú, hidratación de todo el cuerpo, reflexología podal y unos minutos finales con la bebida.",
    faqs: [
      {
        q: "¿Qué es la hidratación corporal?",
        a: "Aplicación de crema o manteca corporal con maniobras de masaje suave sobre todo el cuerpo, al final de la sesión.",
      },
      {
        q: "¿La bambuterapia es para los dos?",
        a: "Sí, ambos reciben la misma experiencia. Si uno prefiere solo manos, se puede ajustar.",
      },
      {
        q: "¿Se puede pedir sin alcohol?",
        a: "Sí, la infusión es siempre una alternativa.",
      },
    ],
  },

  relax: {
    tagline: "Masaje a elección con piedras calientes, reflexología y copa de vino, para dos.",
    intro: [
      "Relax es la experiencia para dos más pedida del catálogo. Cada persona elige masaje relajante o descontracturante, y a eso se suman piedras calientes, reflexología podal, aromaterapia y una copa de vino o infusión.",
      "Tiene todo lo que se espera de una sesión en pareja sin entrar todavía en el rango de los paquetes largos: una hora, en la misma sala, con los elementos que hacen la diferencia.",
    ],
    forWhom:
      "Para un aniversario, un cumpleaños o un plan de fin de semana en pareja.",
    benefits: [
      "Cada persona elige el tipo de masaje",
      "Piedras calientes y aromaterapia incluidas",
      "Reflexología podal para cerrar",
      "Copa de vino o infusión para cada uno",
    ],
    session:
      "Los dos en camillas paralelas: masaje, piedras sobre la espalda, reflexología y aromaterapia, y la bebida al final.",
    faqs: [
      {
        q: "¿Es la mejor opción para un aniversario?",
        a: "Es la más elegida por relación entre lo que incluye y lo que cuesta. Si quieres algo claramente más largo, Vita, Esencia o Deluxe suben la apuesta.",
      },
      {
        q: "¿Se puede reservar como regalo sorpresa?",
        a: "Sí. Escríbenos por WhatsApp y coordinamos la fecha contigo.",
      },
      {
        q: "¿Hay sala privada?",
        a: "Sí, la sesión para dos se hace en una sala privada con dos camillas.",
      },
    ],
  },

  vita: {
    tagline: "70 minutos para dos, con exfoliación de chocolate o durazno.",
    intro: [
      "Vita suma a la fórmula de Relax una exfoliación posterior con aroma a chocolate o durazno —eliges al momento— y diez minutos más de sesión.",
      "Es de las experiencias que más se recuerdan por el olor: la sala queda con ese aroma durante toda la sesión.",
    ],
    forWhom:
      "Para dos personas que quieren algo más largo y con un elemento que se recuerde, sin pasar a las experiencias de dos horas.",
    benefits: [
      "Exfoliación posterior de chocolate o durazno",
      "Piedras calientes, reflexología y aromaterapia",
      "70 minutos, diez más que la sesión estándar",
      "Copa de vino o infusión incluida",
    ],
    session:
      "Masaje relajante, piedras calientes, exfoliación de la zona posterior con el aroma elegido, reflexología y bebida final.",
    faqs: [
      {
        q: "¿Podemos elegir aromas distintos?",
        a: "Sí, cada uno elige el suyo.",
      },
      {
        q: "¿La exfoliación deja la piel pegajosa?",
        a: "No: se retira por completo antes de continuar con la sesión.",
      },
      {
        q: "¿Cuál es la diferencia con Renova?",
        a: "Renova cuesta lo mismo pero reemplaza la exfoliación por bambuterapia y masaje bioenergético con esferas chinas.",
      },
    ],
  },

  renova: {
    tagline: "Masaje herbal con bambuterapia y esferas chinas, para dos.",
    intro: [
      "Renova es la versión más técnica del rango medio para dos: masaje relajante herbal, bambuterapia, reflexología podal, aromaterapia y masaje bioenergético con esferas chinas, más una copa de vino o infusión.",
      "A diferencia de Vita, aquí no hay exfoliación: todo el tiempo se va en trabajo corporal con distintas herramientas.",
    ],
    forWhom:
      "Para dos personas que prefieren más masaje y menos ritual estético.",
    benefits: [
      "Tres técnicas distintas: herbal, bambú y esferas chinas",
      "70 minutos de trabajo corporal continuo",
      "Reflexología podal y aromaterapia",
      "Copa de vino o infusión para cada uno",
    ],
    session:
      "Masaje herbal, cañas de bambú, esferas chinas y reflexología, encadenados sin pausas largas.",
    faqs: [
      {
        q: "¿Qué es el masaje herbal?",
        a: "Un masaje relajante con aceites y productos de base herbal, con un aroma más vegetal que dulce.",
      },
      {
        q: "¿Es más intenso que Vita?",
        a: "Sí, en términos de trabajo muscular. Vita tiene más componente sensorial; Renova, más técnica.",
      },
      {
        q: "¿Podemos pedir presión distinta cada uno?",
        a: "Sí, cada terapeuta ajusta con su persona.",
      },
    ],
  },

  renace: {
    tagline: "65 minutos para dos, con sesión TENS y exfoliación de espalda.",
    intro: [
      "Renace es la única experiencia para dos que incorpora sesión TENS —electroestimulación de baja intensidad— junto con masaje descontracturante o relajante, exfoliación de espalda, masaje bioenergético con esferas chinas, reflexología podal y aromaterapia.",
      "Incluye dos copas de vino o infusión para cada persona, no una. Es de las experiencias más completas por debajo del rango premium.",
    ],
    forWhom:
      "Para dos personas con tensión muscular real, que quieren algo más que una sesión de relajación.",
    benefits: [
      "Sesión TENS incluida, única en el catálogo para dos",
      "Exfoliación de espalda y esferas chinas",
      "Dos bebidas por persona",
      "Muy completa para su rango de precio",
    ],
    session:
      "Masaje, aplicación de TENS sobre la zona cargada, exfoliación, esferas y reflexología, con las bebidas a lo largo del cierre.",
    faqs: [
      {
        q: "¿Qué es el TENS?",
        a: "Un equipo que aplica impulsos eléctricos suaves sobre el músculo mediante electrodos. Se siente como un hormigueo o vibración; la intensidad la regulas tú.",
      },
      {
        q: "¿Hay casos en los que no se puede usar?",
        a: "Sí. No se aplica en personas con marcapasos, embarazo, epilepsia o lesiones en la piel de la zona. Avísanos antes y se hace la sesión sin ese componente.",
      },
      {
        q: "¿Es doloroso?",
        a: "No. Si sientes molestia, se baja la intensidad o se retira.",
      },
    ],
  },

  esencia: {
    tagline: "70 minutos para dos, con vela de soja artesanal como aromaterapia.",
    intro: [
      "Esencia es la experiencia para dos construida alrededor del aroma. La aromaterapia viene de una vela de soja artesanal que se enciende al comenzar la sesión, y el resto es masaje relajante, piedras calientes, reflexología podal y una copa de vino o infusión.",
      "Es la más elegida para pedidas de mano, aniversarios y fechas en las que el ambiente importa tanto como el masaje.",
    ],
    forWhom:
      "Para una ocasión especial en pareja, cuando quieres que la sala se sienta distinta desde que entras.",
    benefits: [
      "Vela de soja artesanal como fuente de aromaterapia",
      "Piedras calientes y reflexología podal",
      "70 minutos en sala privada",
      "Copa de vino o infusión para cada uno",
    ],
    session:
      "Se enciende la vela, la sala se prepara con luz baja, y la sesión avanza sin cortes hasta la reflexología y la bebida final.",
    faqs: [
      {
        q: "¿La vela se la lleva alguno de los dos?",
        a: "En Esencia la vela es parte del ambiente de la sala. Si quieres una vela para llevar, Aroma Zen (individual) la incluye como regalo.",
      },
      {
        q: "¿Se puede decorar la sala para una ocasión especial?",
        a: "Coméntanoslo al reservar por WhatsApp y vemos qué se puede coordinar.",
      },
      {
        q: "¿Cuál es la diferencia con Relax?",
        a: "Diez minutos más y la vela artesanal en lugar de la aromaterapia estándar.",
      },
    ],
  },

  deluxe: {
    tagline: "90 minutos para dos, con limpieza facial express incluida.",
    intro: [
      "Deluxe es donde empieza el rango premium para dos. Noventa minutos con masaje relajante y descontracturante —los dos, no uno u otro—, piedras calientes, reflexología podal, aromaterapia, limpieza facial express con mascarilla de colágeno y copa de vino o infusión.",
      "Es la primera experiencia del catálogo para dos que incluye trabajo facial, y eso cambia bastante cómo se sale.",
    ],
    forWhom:
      "Para una fecha importante en pareja, o para dos personas que quieren cuerpo y rostro resueltos el mismo día.",
    benefits: [
      "Masaje relajante y descontracturante en la misma sesión",
      "Limpieza facial express con mascarilla de colágeno",
      "Piedras calientes, reflexología y aromaterapia",
      "90 minutos en sala privada",
    ],
    session:
      "Bloque corporal largo con piedras y reflexología, y bloque facial al final para ambos, con la bebida en el cierre.",
    faqs: [
      {
        q: "¿El facial es para las dos personas?",
        a: "Sí, ambos reciben la limpieza facial express.",
      },
      {
        q: "¿Cuál es la diferencia con Royale?",
        a: "Royale dura 120 minutos, reemplaza el facial express por mascarilla de ácido hialurónico y suma exfoliación de espalda e hidratación de manos.",
      },
      {
        q: "¿Con cuánta anticipación reservar?",
        a: "Al ser un bloque de 90 minutos con dos terapeutas, conviene reservar con varios días de anticipación, sobre todo para fines de semana.",
      },
    ],
  },

  royale: {
    tagline: "Dos horas para dos, con mascarilla de ácido hialurónico y exfoliación de espalda.",
    intro: [
      "Royale son 120 minutos de trabajo continuo para dos personas: masaje relajante o descontracturante de cuerpo completo, piedras calientes, exfoliación de espalda, mascarilla facial de ácido hialurónico, reflexología podal, hidratación de manos y aromaterapia.",
      "El nivel de detalle es lo que la distingue: la hidratación de manos, por ejemplo, es un gesto pequeño que casi nadie incluye y que la gente recuerda.",
    ],
    forWhom:
      "Para un aniversario importante, una luna de miel o un regalo grande en pareja.",
    benefits: [
      "Dos horas completas para dos personas",
      "Mascarilla facial de ácido hialurónico",
      "Exfoliación de espalda e hidratación de manos",
      "Masaje de cuerpo completo con piedras calientes",
    ],
    session:
      "Una secuencia larga y ordenada: cuerpo completo, exfoliación, facial con reposo de mascarilla, reflexología y detalle de manos al final.",
    faqs: [
      {
        q: "¿Se hace todo en la misma sala?",
        a: "Sí, los dos permanecen juntos en la sala privada durante toda la experiencia.",
      },
      {
        q: "¿Incluye bebida?",
        a: "Royale se centra en el protocolo corporal y facial. Si quieres la copa de vino incluida además del descanso final, Supreme es la opción.",
      },
      {
        q: "¿Se puede regalar?",
        a: "Sí. Escríbenos por WhatsApp y coordinamos el regalo con la fecha que necesites.",
      },
    ],
  },

  supreme: {
    tagline: "150 minutos para dos: la experiencia más completa del catálogo.",
    intro: [
      "Supreme es la experiencia más larga que ofrecemos. Dos horas y media para dos personas, con masaje de cuerpo completo relajante o descontracturante, piedras calientes, exfoliación de espalda, mascarilla facial de ácido hialurónico, reflexología podal, hidratación corporal y aromaterapia con vela de soja artesanal.",
      "Lo que la separa de Royale no es solo la media hora extra: incluye un descanso final en la sala de pareja con una copa de vino o infusión, sin apuro por desocupar la camilla. Ese cierre es el que la gente describe cuando la recomienda.",
    ],
    forWhom:
      "Para la ocasión grande: aniversario redondo, pedida de mano, o un regalo que se quiere que no se olvide.",
    benefits: [
      "150 minutos, la sesión más larga del catálogo",
      "Descanso final en sala de pareja con bebida",
      "Vela de soja artesanal como aromaterapia",
      "Protocolo corporal y facial completo",
    ],
    session:
      "Un recorrido de dos horas y media que termina sentados, sin prisa, en la misma sala privada.",
    faqs: [
      {
        q: "¿Es mucho tiempo?",
        a: "Es una tarde. Vale la pena reservar sin nada agendado inmediatamente después.",
      },
      {
        q: "¿Cuánta anticipación necesita?",
        a: "Es el bloque más largo de agenda con dos terapeutas: conviene reservar con bastantes días, especialmente en fines de semana y fechas altas.",
      },
      {
        q: "¿Se puede pedir decoración especial?",
        a: "Coméntanoslo por WhatsApp al reservar y vemos qué se puede coordinar para la fecha.",
      },
    ],
  },

  "facial-express-2p": {
    tagline: "70 minutos para dos, con limpieza facial express y dos copas por persona.",
    intro: [
      "Facial Express en Pareja resuelve cuerpo y rostro para dos en 70 minutos: masaje, piedras calientes, limpieza facial express con mascarilla de colágeno, reflexología podal, aromaterapia y dos copas de vino o infusión para cada uno.",
      "Es la puerta de entrada a las experiencias para dos con componente facial.",
    ],
    forWhom:
      "Para dos personas con un evento cerca, o que simplemente quieren salir con mejor cara además del cuerpo suelto.",
    benefits: [
      "Limpieza facial express para ambos",
      "Piedras calientes y reflexología incluidas",
      "Dos bebidas por persona",
      "70 minutos en sala privada",
    ],
    session:
      "Bloque corporal con piedras, bloque facial con mascarilla de colágeno y cierre con reflexología y bebidas.",
    faqs: [
      {
        q: "¿Cuál es la diferencia con Deluxe?",
        a: "Deluxe dura 90 minutos e incluye masaje relajante y descontracturante; esta versión es más corta y directa.",
      },
      {
        q: "¿Y con Facial Full Body en Pareja?",
        a: "Full Body dura 90 minutos, cambia la mascarilla por ácido hialurónico y suma exfoliación de espalda e hidratación de manos.",
      },
      {
        q: "¿Sirve para piel sensible?",
        a: "La limpieza express es suave, pero avisa si usas ácidos o retinol o tuviste un procedimiento reciente.",
      },
    ],
  },

  "facial-full-body-2p": {
    tagline: "90 minutos para dos, con mascarilla de ácido hialurónico e hidratación de manos.",
    intro: [
      "La versión completa del facial en pareja: masaje de cuerpo completo, piedras calientes, exfoliación de espalda, mascarilla de ácido hialurónico, reflexología podal, hidratación de manos, aromaterapia y dos copas de vino o infusión para cada uno.",
      "Noventa minutos que cubren cuerpo, rostro y detalle, en sala privada para los dos.",
    ],
    forWhom:
      "Para dos personas que quieren el protocolo facial más completo sin llegar a las dos horas de Royale.",
    benefits: [
      "Mascarilla de ácido hialurónico para ambos",
      "Exfoliación de espalda e hidratación de manos",
      "Masaje de cuerpo completo con piedras calientes",
      "Dos bebidas por persona",
    ],
    session:
      "Cuerpo completo, exfoliación, facial con reposo de mascarilla, reflexología e hidratación de manos al final.",
    faqs: [
      {
        q: "¿En qué se diferencia de Royale?",
        a: "Royale dura 120 minutos en vez de 90. El protocolo es muy parecido; la diferencia principal es el tiempo dedicado al masaje corporal.",
      },
      {
        q: "¿La mascarilla de ácido hialurónico irrita?",
        a: "No suele hacerlo, es una mascarilla hidratante. Avisa igual si tu piel es reactiva.",
      },
      {
        q: "¿Podemos elegir masajes distintos?",
        a: "Sí, cada persona indica su preferencia al empezar.",
      },
    ],
  },

  "coco-premium-2p": {
    tagline: "La exfoliación de coco de Coco Premium, ahora para dos.",
    intro: [
      "Coco Premium en Pareja lleva a la sala de dos camillas la sesión individual más aromática del catálogo: masaje relajante o descontracturante, piedras calientes, exfoliación de coco, reflexología podal, aromaterapia y dos copas de vino o infusión.",
      "El aroma a coco llena la sala durante toda la sesión y la piel queda notoriamente más suave al terminar.",
    ],
    forWhom:
      "Para dos personas que quieren una experiencia sensorial marcada, más que un masaje terapéutico.",
    benefits: [
      "Exfoliación de coco para ambos",
      "Piedras calientes y aromaterapia",
      "Reflexología podal incluida",
      "Dos bebidas por persona",
    ],
    session:
      "Masaje, piedras, exfoliación de coco, reflexología, y unos minutos finales con la bebida en la misma sala.",
    faqs: [
      {
        q: "¿El aroma se queda en la piel?",
        a: "Sí, varias horas. A la mayoría le gusta; si prefieres algo neutro, Relax es la alternativa equivalente.",
      },
      {
        q: "¿La exfoliación es de cuerpo completo?",
        a: "Se trabaja la zona posterior y extremidades.",
      },
      {
        q: "¿Es apta para piel sensible?",
        a: "Avísanos antes: se puede usar menos producto o saltarse la exfoliación en zonas específicas.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // A DOMICILIO
  // ─────────────────────────────────────────────────────────────────────
  "masaje-domicilio-1-hora": {
    tagline: "Una hora de masaje en tu casa, hotel u oficina, con camilla incluida.",
    intro: [
      "La terapeuta llega con camilla profesional, toallas y aceites, arma el espacio en el ambiente que tengas disponible y trabaja una hora completa. Al terminar recoge todo y no queda rastro más que el aroma.",
      "Puedes elegir masaje relajante, descontracturante, deportivo, terapéutico, holístico o reflexología podal. El traslado a Miraflores está incluido; para San Borja, Surco, San Isidro y Barranco hay un recargo de S/ 30.",
    ],
    forWhom:
      "Para quien no puede o no quiere salir: post-viaje, con niños en casa, hospedado en un hotel, o simplemente sin ganas de manejar después del masaje.",
    benefits: [
      "Camilla profesional, toallas y aceites incluidos",
      "Seis técnicas a elegir, incluida reflexología",
      "Traslado incluido a Miraflores",
      "Sirve para casa, hotel u oficina",
    ],
    session:
      "La terapeuta llega unos minutos antes, arma la camilla donde le indiques y la sesión transcurre igual que en el spa.",
    faqs: [
      {
        q: "¿Qué necesito tener en casa?",
        a: "Un espacio de unos dos por dos metros y un enchufe cerca si quieres música. Nada más: la camilla y todo el material van incluidos.",
      },
      {
        q: "¿A qué distritos llegan?",
        a: "El traslado está incluido para Miraflores. San Borja, Surco, San Isidro y Barranco tienen un recargo de S/ 30. Para otros distritos, escríbenos por WhatsApp y lo evaluamos.",
      },
      {
        q: "¿Con cuánta anticipación debo reservar?",
        a: "Mínimo 24 horas, para poder coordinar el traslado y el material.",
      },
    ],
  },

  "masaje-domicilio-2-horas": {
    tagline: "Dos horas de masaje a domicilio, con camilla y material incluidos.",
    intro: [
      "La versión larga del servicio a domicilio. Dos horas permiten trabajar el cuerpo completo sin apurar ninguna zona, o repartir el tiempo entre dos personas de la misma casa si lo prefieres.",
      "Igual que la sesión de una hora: camilla profesional, toallas y aceites incluidos, seis técnicas a elegir, traslado incluido a Miraflores y recargo de S/ 30 para San Borja, Surco, San Isidro y Barranco.",
    ],
    forWhom:
      "Para una sesión realmente completa en casa, o para dividir el tiempo entre dos personas sin que la terapeuta tenga que volver otro día.",
    benefits: [
      "Dos horas de trabajo, sin apurar zonas",
      "Se puede repartir entre dos personas del mismo domicilio",
      "Camilla y material profesional incluidos",
      "Seis técnicas a elegir",
    ],
    session:
      "Instalación de la camilla, sesión larga y continua, y recojo de todo el material al terminar.",
    faqs: [
      {
        q: "¿Puedo dividir las dos horas entre dos personas?",
        a: "Sí, es una opción frecuente: una hora cada uno, con la misma terapeuta y sin costo adicional de traslado.",
      },
      {
        q: "¿Y si somos dos y queremos el masaje al mismo tiempo?",
        a: "Eso requiere dos terapeutas y dos camillas. Escríbenos por WhatsApp y lo cotizamos.",
      },
      {
        q: "¿El recargo de S/ 30 es por sesión o por persona?",
        a: "Es un recargo único de movilidad por visita, no por persona.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // PROGRAMAS
  // ─────────────────────────────────────────────────────────────────────
  "programa-relajante-5-sesiones": {
    tagline: "Cinco masajes relajantes de una hora, a menos de S/ 50 cada uno.",
    intro: [
      "El programa relajante existe porque un masaje suelto se disfruta, pero cinco seguidos se notan. Son cinco sesiones de masaje relajante de 60 minutos, que puedes usar al ritmo que quieras.",
      "El precio por sesión baja bastante respecto a comprarlas por separado, y no vencen de un mes para otro: coordinas cada cita por WhatsApp cuando la necesites.",
    ],
    forWhom:
      "Para quien ya sabe que el masaje le hace bien y quiere convertirlo en costumbre sin pagar precio de sesión suelta.",
    benefits: [
      "Cinco sesiones de 60 minutos",
      "Precio por sesión bastante menor que el individual",
      "Se usan al ritmo que necesites",
      "Válido en San Borja y Miraflores",
    ],
    session:
      "Cada sesión es un masaje relajante de cuerpo completo de una hora, igual que el individual.",
    faqs: [
      {
        q: "¿Tienen fecha de vencimiento?",
        a: "Escríbenos por WhatsApp para confirmar las condiciones vigentes del programa antes de comprarlo.",
      },
      {
        q: "¿Puedo regalar alguna de las sesiones?",
        a: "Consúltanoslo: en general el programa es personal, pero podemos ver el caso.",
      },
      {
        q: "¿Puedo cambiar el tipo de masaje en alguna sesión?",
        a: "El programa relajante cubre masaje relajante. Si quieres descontracturante o terapéutico, el Programa Terapia Muscular es el que corresponde.",
      },
    ],
  },

  "programa-relajante-10-sesiones": {
    tagline: "Diez masajes relajantes de una hora, a poco más de S/ 40 cada uno.",
    intro: [
      "La versión larga del programa relajante: diez sesiones de 60 minutos, con el precio por sesión más bajo de todo el catálogo.",
      "Es la opción de quienes vienen cada dos semanas de manera estable y prefieren resolver el año de una vez.",
    ],
    forWhom:
      "Para clientes habituales, y para quien quiere sostener una rutina de bienestar durante varios meses.",
    benefits: [
      "Diez sesiones de 60 minutos",
      "El precio por sesión más bajo del catálogo",
      "Se usan al ritmo que necesites",
      "Válido en ambas sedes",
    ],
    session:
      "Cada sesión es un masaje relajante de cuerpo completo de una hora.",
    faqs: [
      {
        q: "¿Conviene frente al de 5 sesiones?",
        a: "Por sesión, sí: es la tarifa más baja. La pregunta real es si vas a usar las diez.",
      },
      {
        q: "¿Puedo pagarlo en partes?",
        a: "Escríbenos por WhatsApp y vemos las formas de pago disponibles.",
      },
      {
        q: "¿Sirve para toda la familia?",
        a: "Consúltanoslo antes de comprar: las condiciones de uso compartido dependen del programa vigente.",
      },
    ],
  },

  "programa-terapia-muscular-5-sesiones": {
    tagline: "Cinco sesiones a elegir entre descontracturante, terapéutico, piedras o bambú.",
    intro: [
      "Este programa está pensado para tensión muscular real, no para relajación ocasional. Cada una de las cinco sesiones puede ser descontracturante, terapéutica, con piedras calientes o bambuterapia: eliges en el momento según cómo llegues ese día.",
      "Es la forma más razonable de trabajar una zona cargada, porque el efecto de un descontracturante se sostiene mucho mejor con continuidad que con sesiones sueltas cada varios meses.",
    ],
    forWhom:
      "Para quien tiene una zona que se vuelve a cargar siempre: cuello de oficina, lumbares de manejar, hombros de entrenar.",
    benefits: [
      "Cuatro técnicas a elegir en cada sesión",
      "Continuidad, que es lo que hace la diferencia en tensión crónica",
      "Precio por sesión menor que el individual",
      "Válido en San Borja y Miraflores",
    ],
    session:
      "Cada visita es una sesión completa de 60 minutos con la técnica que elijas ese día.",
    faqs: [
      {
        q: "¿Cada cuánto conviene usarlas?",
        a: "Para tensión persistente, cada una o dos semanas al inicio y luego espaciando.",
      },
      {
        q: "¿Puedo alternar técnicas?",
        a: "Sí, esa es justamente la idea: una semana descontracturante, otra con piedras, según cómo estés.",
      },
      {
        q: "¿Reemplaza a la fisioterapia?",
        a: "No. Es un servicio de bienestar. Si tienes una lesión o dolor persistente, consulta con un profesional de la salud.",
      },
    ],
  },

  "programa-terapia-muscular-10-sesiones": {
    tagline: "Diez sesiones de terapia muscular, con técnica a elegir en cada visita.",
    intro: [
      "La versión larga del programa de terapia muscular: diez sesiones de 60 minutos, cada una con la técnica que necesites ese día —descontracturante, terapéutico, piedras calientes o bambuterapia.",
      "Es el programa que eligen quienes tienen una carga muscular constante por trabajo o deporte y quieren mantenerla controlada durante varios meses.",
    ],
    forWhom:
      "Para carga muscular sostenida en el tiempo: trabajo físico, entrenamiento regular o muchas horas de escritorio.",
    benefits: [
      "Diez sesiones con técnica a elegir",
      "Pensado para mantenimiento a mediano plazo",
      "Precio por sesión menor que el individual",
      "Válido en ambas sedes",
    ],
    session:
      "Cada visita es una sesión completa de 60 minutos, con la técnica que elijas.",
    faqs: [
      {
        q: "¿Conviene frente al de 5 sesiones?",
        a: "Si tu carga es constante, sí: baja el precio por sesión y cubre varios meses.",
      },
      {
        q: "¿Puedo usarlo en ambas sedes?",
        a: "Sí, es válido tanto en San Borja como en Miraflores.",
      },
      {
        q: "¿Hay condiciones de vigencia?",
        a: "Escríbenos por WhatsApp para confirmar las condiciones vigentes antes de comprarlo.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // MIRADA Y BELLEZA
  // ─────────────────────────────────────────────────────────────────────
  "lifting-de-pestanas": {
    tagline: "Eleva las pestañas naturales desde la raíz, con tinturado de henna incluido.",
    intro: [
      "El lifting de pestañas curva y eleva la pestaña natural desde la base, sin extensiones ni pegamento. El resultado es una mirada más abierta con tus propias pestañas, y el tinturado con henna las oscurece para que se vean más pobladas.",
      "La sesión dura una hora y no requiere mantenimiento diario: no hay que retocar nada, la pestaña vuelve sola a su forma a medida que se renueva.",
    ],
    forWhom:
      "Para quien quiere dejar de usar cortador de pestañas o máscara todos los días, y para quien prefiere un resultado natural antes que extensiones.",
    benefits: [
      "Sin extensiones ni pegamento",
      "Tinturado con henna incluido",
      "Cero mantenimiento diario",
      "Resultado que dura semanas",
    ],
    session:
      "Recostada con los ojos cerrados durante toda la sesión: se protege el párpado inferior, se moldea la pestaña sobre un soporte de silicona y se aplica el tinturado al final.",
    faqs: [
      {
        q: "¿Cuánto dura el efecto?",
        a: "Normalmente entre cuatro y seis semanas, según el ciclo natural de tus pestañas.",
      },
      {
        q: "¿Puedo mojarme la cara después?",
        a: "Conviene evitar agua, vapor y maquillaje en los ojos durante las primeras 24 horas.",
      },
      {
        q: "¿Se puede hacer si uso lentes de contacto?",
        a: "Sí, pero es mejor venir sin ellos o retirarlos antes de empezar.",
      },
    ],
  },

  "planchado-de-cejas": {
    tagline: "Alinea y define la ceja, controlando el vello rebelde.",
    intro: [
      "El planchado de cejas —también llamado laminado— alinea el vello en una misma dirección y lo fija, lo que hace que la ceja se vea más poblada, ordenada y con una forma definida sin necesidad de maquillarla.",
      "Es una sesión corta, de veinticinco minutos, y el resultado se nota desde el primer día.",
    ],
    forWhom:
      "Para cejas con vello rebelde o que crece en varias direcciones, y para quien quiere dejar de peinárselas cada mañana.",
    benefits: [
      "Sesión de solo 25 minutos",
      "Ceja más poblada y ordenada sin maquillaje",
      "Resultado visible desde el primer día",
      "Se puede combinar con lifting de pestañas",
    ],
    session:
      "Se limpia la zona, se aplica el producto de alisado, se peina la ceja en la dirección deseada y se fija.",
    faqs: [
      {
        q: "¿Cuánto dura?",
        a: "Alrededor de cuatro a seis semanas, según el crecimiento de tu vello.",
      },
      {
        q: "¿Incluye depilación o diseño?",
        a: "El planchado alinea y fija. Si quieres además perfilado, coméntalo al reservar para coordinar el tiempo.",
      },
      {
        q: "¿Puedo hacerlo junto con el lifting de pestañas?",
        a: "Sí, y sale mejor de precio: el paquete Lifting + Tinturado + Planchado combina ambos en 90 minutos.",
      },
    ],
  },

  "lifting-tinturado-planchado-cejas": {
    tagline: "Pestañas y cejas resueltas en una sola sesión de 90 minutos.",
    intro: [
      "El paquete completo de mirada: lifting de pestañas, tinturado y planchado de cejas en una sola cita de noventa minutos.",
      "Comprarlo junto sale bastante menos que las dos sesiones por separado, y el resultado se ve más armónico porque la esteticista trabaja pestañas y cejas pensando en el conjunto, no cada cosa por su lado.",
    ],
    forWhom:
      "Para quien quiere resolver la mirada completa antes de un evento, un viaje o simplemente para los próximos dos meses.",
    benefits: [
      "Lifting, tinturado y planchado en una sola cita",
      "Más económico que las sesiones por separado",
      "Resultado pensado como conjunto",
      "Efecto de varias semanas sin mantenimiento diario",
    ],
    session:
      "Primero el trabajo de pestañas con los ojos cerrados, y después el planchado y fijado de cejas.",
    faqs: [
      {
        q: "¿Cuánto dura el resultado?",
        a: "Entre cuatro y seis semanas, según tu ciclo de crecimiento.",
      },
      {
        q: "¿Puedo maquillarme el mismo día?",
        a: "Es mejor esperar 24 horas antes de aplicar maquillaje en ojos y cejas.",
      },
      {
        q: "¿Es incómodo estar 90 minutos con los ojos cerrados?",
        a: "La mayoría termina dormida. Puedes pedir pausas cuando quieras.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // FACIALES
  // ─────────────────────────────────────────────────────────────────────
  "limpieza-facial-express": {
    tagline: "30 minutos de limpieza facial para sacar impurezas sin ocupar la tarde.",
    intro: [
      "Una limpieza facial corta y efectiva: desmaquillado, limpieza profunda, exfoliación suave y extracción cuando hace falta. Media hora que entra en cualquier agenda.",
      "No es un tratamiento intensivo ni pretende serlo: es el mantenimiento que la piel agradece cada tanto, sobre todo con el polvo y la humedad de Lima.",
    ],
    forWhom:
      "Para mantenimiento regular, para piel con puntos negros o congestionada, y para quien nunca se hizo una limpieza y quiere empezar por algo corto.",
    benefits: [
      "Solo 30 minutos",
      "Limpieza profunda con extracción cuando corresponde",
      "El facial más accesible del catálogo",
      "Buena base antes de un evento",
    ],
    session:
      "Desmaquillado, limpieza, exfoliación suave, extracción si hace falta y tónico final.",
    faqs: [
      {
        q: "¿Queda la cara roja?",
        a: "Puede quedar algo enrojecida un rato si hubo extracción, sobre todo en piel sensible. Suele bajar en un par de horas.",
      },
      {
        q: "¿Cada cuánto conviene?",
        a: "Una vez al mes es el ritmo habitual para piel mixta o grasa.",
      },
      {
        q: "¿Incluye mascarilla?",
        a: "La versión express no la incluye. Si la quieres, revisa Facial con Mascarilla Lifting, Limpieza con Mascarilla de Barro o Facial Glow Premium.",
      },
    ],
  },

  "facial-glow-premium-solo": {
    tagline: "Limpieza, exfoliación, mascarilla de colágeno y luz LED en 50 minutos.",
    intro: [
      "El facial más completo de la línea: limpieza profunda, exfoliación, mascarilla de colágeno y sesión de luz LED para cerrar.",
      "La luz LED es lo que lo distingue del resto de faciales del catálogo, y también lo que hace que el efecto de piel luminosa se note más al terminar.",
    ],
    forWhom:
      "Para piel apagada o cansada, y para quien quiere un resultado visible el mismo día sin recurrir a procedimientos invasivos.",
    benefits: [
      "Incluye sesión de luz LED",
      "Mascarilla de colágeno",
      "Limpieza y exfoliación completas",
      "50 minutos, el facial más completo sin masaje",
    ],
    session:
      "Limpieza, exfoliación, extracción si corresponde, mascarilla con reposo y cierre con luz LED.",
    faqs: [
      {
        q: "¿Qué hace la luz LED?",
        a: "Es una fototerapia de baja intensidad que se usa en cosmética para mejorar el aspecto de la piel. Es indolora y no requiere recuperación.",
      },
      {
        q: "¿Puedo salir directo a la calle después?",
        a: "Sí. Conviene usar protector solar, que te aplicamos al terminar si lo pides.",
      },
      {
        q: "¿Se puede combinar con masaje?",
        a: "Sí: Glow Facial, Glow Facial Plus y Glow Facial Premium ya combinan masaje corporal y trabajo facial.",
      },
    ],
  },

  "facial-mascarilla-lifting": {
    tagline: "Mascarilla reafirmante para piel apagada o con pérdida de firmeza.",
    intro: [
      "Un facial corto centrado en la mascarilla: limpieza previa y luego una mascarilla reafirmante que actúa unos minutos sobre el rostro.",
      "Está pensado para piel que se ve cansada o que ha perdido tersura, y funciona bien como preparación antes de un evento cuando no hay tiempo para un protocolo largo.",
    ],
    forWhom:
      "Para piel apagada o con pérdida de firmeza, y para quien quiere un efecto rápido antes de una ocasión.",
    benefits: [
      "Mascarilla reafirmante como centro de la sesión",
      "Solo 30 minutos",
      "Efecto visible al terminar",
      "Buena preparación antes de un evento",
    ],
    session:
      "Limpieza, aplicación de la mascarilla, reposo con el rostro cubierto y retiro con hidratación final.",
    faqs: [
      {
        q: "¿Cuánto dura el efecto?",
        a: "El aspecto de piel más tersa suele durar algunos días. Es un tratamiento cosmético, no permanente.",
      },
      {
        q: "¿Incluye extracción?",
        a: "No. Si necesitas extracción, la Limpieza Facial Express o la de Mascarilla de Barro son las indicadas.",
      },
      {
        q: "¿Sirve para piel grasa?",
        a: "Sirve, pero para piel grasa o congestionada la mascarilla de barro suele dar mejor resultado.",
      },
    ],
  },

  "facial-mascarilla-barro": {
    tagline: "Limpieza facial con mascarilla de barro, para piel grasa o congestionada.",
    intro: [
      "Limpieza facial completa que termina con mascarilla de barro. El barro absorbe grasa y ayuda a descongestionar el poro, así que es la opción natural para piel mixta o grasa.",
      "Media hora, con limpieza, extracción si hace falta y la mascarilla actuando al final.",
    ],
    forWhom:
      "Para piel grasa, mixta o con poros congestionados y puntos negros.",
    benefits: [
      "Mascarilla de barro con efecto purificante",
      "Incluye limpieza y extracción cuando corresponde",
      "30 minutos",
      "Buena rutina mensual para piel grasa",
    ],
    session:
      "Desmaquillado, limpieza, exfoliación, extracción si hace falta, y mascarilla de barro con reposo antes del retiro.",
    faqs: [
      {
        q: "¿Reseca la piel?",
        a: "El barro absorbe grasa, así que en piel seca puede sentirse tirante. En ese caso conviene la mascarilla lifting o el Facial Glow Premium.",
      },
      {
        q: "¿Cada cuánto se puede hacer?",
        a: "Una vez al mes es lo habitual para piel grasa.",
      },
      {
        q: "¿Puedo maquillarme después?",
        a: "Mejor esperar unas horas, sobre todo si hubo extracción.",
      },
    ],
  },
};

/**
 * Fotos por servicio. Los servicios que tienen sesión de fotos propia usan
 * sus imágenes reales; el resto toma un set según su categoría, igual que
 * hace el catálogo en `components/ServicesCatalog.tsx`.
 */
const explicitServiceImages: Record<string, string[]> = {
  "relax-vital": [
    "/images/relax-vital/relax-01-shoulders.webp",
    "/images/relax-vital/relax-02-pressure.webp",
    "/images/relax-vital/relax-03-palms.webp",
    "/images/relax-vital/relax-04-reflexology.webp",
  ],
  "alivio-integral": [
    "/images/alivio-integral/alivio-01-hombros.webp",
    "/images/alivio-integral/alivio-02-cuello.webp",
    "/images/alivio-integral/alivio-03-reflexologia.webp",
    "/images/alivio-integral/alivio-04-lumbar.webp",
  ],
  "balance-plus": [
    "/images/balance-plus/balance-01-piedras-calientes.webp",
    "/images/balance-plus/balance-02-reflexologia.webp",
    "/images/balance-plus/balance-03-exfoliacion-espalda.webp",
    "/images/balance-plus/balance-04-masaje.webp",
  ],
  relax: [
    "/images/relax/relax-01-piedras-aromaterapia.webp",
    "/images/relax/relax-02-reflexologia-podal.webp",
    "/images/relax/relax-03-vino-o-infusion.webp",
    "/images/relax/relax-04-masaje.webp",
  ],
  deluxe: [
    "/images/deluxe/deluxe-01-piedras-aromaterapia.webp",
    "/images/deluxe/deluxe-02-facial-colageno.webp",
    "/images/deluxe/deluxe-03-reflexologia-podal.webp",
    "/images/deluxe/deluxe-04-vino-o-infusion.webp",
  ],
  supreme: [
    "/images/supreme/supreme-01-piedras-aromaterapia.webp",
    "/images/supreme/supreme-02-exfoliacion-hidratacion.webp",
    "/images/supreme/supreme-03-facial-hialuronico.webp",
    "/images/supreme/supreme-04-reflexologia-podal.webp",
    "/images/supreme/supreme-05-descanso-pareja.webp",
  ],
  "lifting-tinturado-planchado-cejas": [
    "/images/lifting-pestanas-cejas/lifting-01-pestanas.webp",
    "/images/lifting-pestanas-cejas/lifting-02-planchado-cejas.webp",
    "/images/lifting-pestanas-cejas/lifting-03-tinturado.webp",
    "/images/lifting-pestanas-cejas/lifting-04-resultado.webp",
  ],
  "lifting-de-pestanas": [
    "/images/lifting-pestanas-cejas/lifting-01-pestanas.webp",
    "/images/lifting-pestanas-cejas/lifting-03-tinturado.webp",
    "/images/lifting-pestanas-cejas/lifting-04-resultado.webp",
  ],
  "planchado-de-cejas": [
    "/images/lifting-pestanas-cejas/lifting-02-planchado-cejas.webp",
    "/images/lifting-pestanas-cejas/lifting-04-resultado.webp",
    "/images/lifting-pestanas-cejas/lifting-01-pestanas.webp",
  ],
  "piedras-calientes": [
    "/images/balance-plus/balance-01-piedras-calientes.webp",
    "/images/signature/room-stone.webp",
    "/images/generated/hot_stones.webp",
  ],
  reflexologia: [
    "/images/main-hero/hero-03-reflexologia-podal.webp",
    "/images/alivio-integral/alivio-03-reflexologia.webp",
    "/images/generated/foot.webp",
  ],
  "reflexologia-plus": [
    "/images/alivio-integral/alivio-03-reflexologia.webp",
    "/images/main-hero/hero-03-reflexologia-podal.webp",
    "/images/generated/foot.webp",
  ],
  ventosas: ["/images/signature/cupping.webp", "/images/v4/cupping-wide.webp", "/images/v4/cupping.webp"],
  renace: ["/images/signature/electro.webp", "/images/v4/electro.webp", "/images/signature/couple-room.webp"],
  "espalda-libre": [
    "/images/main-hero/hero-04-cuello-hombros.webp",
    "/images/alivio-integral/alivio-01-hombros.webp",
    "/images/alivio-integral/alivio-02-cuello.webp",
  ],
};

const categoryImagePools: Record<ServiceCategory, string[]> = {
  individual: [
    "/images/servicios/servicio-01.webp",
    "/images/servicios/servicio-02.webp",
    "/images/servicios/servicio-03.webp",
    "/images/servicios/servicio-04.webp",
    "/images/servicios/servicio-05.webp",
    "/images/servicios/servicio-06.webp",
  ],
  couples: [
    "/images/signature/couple-room.webp",
    "/images/real/room_pair.webp",
    "/images/v4/room-pair.webp",
    "/images/signature/ambience.webp",
  ],
  home: [
    "/images/servicios/servicio-07.webp",
    "/images/servicios/servicio-08.webp",
    "/images/signature/room-wide.webp",
  ],
  program: [
    "/images/signature/room-stone.webp",
    "/images/signature/ambience.webp",
    "/images/signature/room-wide.webp",
  ],
  beauty: ["/images/v4/facial.webp", "/images/real/facial_real.webp", "/images/v4/facial-room.webp"],
  facial: [
    "/images/signature/facial.webp",
    "/images/signature/facial-room.webp",
    "/images/real/facial_real.webp",
  ],
};

/** Devuelve 3-5 fotos para la galería de la página de un servicio. */
export function getServiceImages(service: Service): string[] {
  const explicit = explicitServiceImages[service.slug];
  if (explicit) return explicit;

  const pool = categoryImagePools[service.category];
  // Rotación determinista según el código del servicio, para que dos
  // servicios seguidos de la misma categoría no muestren la misma foto.
  const offset = service.code.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) % pool.length;
  return [pool[offset], pool[(offset + 1) % pool.length], pool[(offset + 2) % pool.length]];
}

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails[slug];
}
