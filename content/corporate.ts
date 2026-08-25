export type CorporateAddon = {
  title: string;
  text: string;
};

export const corporate = {
  eyebrow: "Para tu equipo",
  title: "Bienestar corporativo Vita Lima",
  description:
    "Engríe a tus colaboradores con pausas de masajes relajantes y/o descontracturantes dentro de la oficina, pensadas para mejorar el bienestar y la experiencia laboral del equipo.",
  modes: [
    {
      title: "Servicio en silla",
      text: "Sesiones cortas de masaje en silla ergonómica, ideales para pausas activas sin necesidad de cambiarse de ropa.",
    },
    {
      title: "Servicio en camilla",
      text: "Sesiones más completas con camilla portátil, para un momento de relajación más profundo dentro de la oficina.",
    },
  ],
  addons: [
    {
      title: "Coaching empresarial",
      text: "Alineamos a tus colaboradores con la misión, los valores y los objetivos estratégicos de la empresa.",
    },
    {
      title: "Ergonomía laboral",
      text: "Capacitación sobre responsabilidades personales para prevenir lesiones músculo-esqueléticas en el puesto de trabajo.",
    },
    {
      title: "Limpieza facial express",
      text: "Servicio de limpieza, exfoliación e hidratación facial para complementar la experiencia corporativa.",
    },
  ] satisfies CorporateAddon[],
  note: "Los precios varían según número de colaboradores, frecuencia y duración del evento. Escríbenos y armamos una propuesta a medida.",
};
