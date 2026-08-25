export type GiftBox = {
  slug: string;
  name: string;
  price: number;
  includes: string;
};

export const giftBoxes: GiftBox[] = [
  {
    slug: "box-basic",
    name: "Box Clásico",
    price: 110,
    includes: "Masaje de 1 hora + globo metálico + taza diseñada + cuadro decorativo + chocolate + M&Ms + vela",
  },
  {
    slug: "box-succulent",
    name: "Box Suculentas",
    price: 139,
    includes: "Masaje de 1 hora + set de suculentas + lámpara de cactus + regadera + planta suculenta",
  },
  {
    slug: "box-flowers",
    name: "Box Flores",
    price: 149,
    includes: "Masaje de 1 hora + flores + galletas + café o infusiones + taza personalizada + dedicatoria",
  },
  {
    slug: "box-wine",
    name: "Box Vino",
    price: 120,
    includes: "Masaje de 1 hora + copa personalizada + vino Intipalka + frutos secos + yogurt de vainilla + chocolates + dedicatoria",
  },
  {
    slug: "box-wellness",
    name: "Box Wellness",
    price: 149,
    includes: "Masaje de 1 hora + jugo o chicha morada + agua tónica + cepillo facial + toallitas + esponja de baño + globo + mascarilla facial + chocolate con leche",
  },
];

export const giftBoxesNote =
  "Pedidos de lunes a sábado, con 48 a 72 horas de anticipación. Coordinamos delivery o recojo en tienda.";
