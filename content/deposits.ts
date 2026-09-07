import type { Service } from "@/content/services";

/**
 * La regla de adelantos, en un solo lugar.
 *
 * Decidida por el dueño el 7 de setiembre de 2026. Cambiar un monto o un
 * tramo es cambiar una línea aquí: nada más en el sitio decide cuánto se pide.
 *
 * El tramo sale del `group` del servicio y no de la categoría: `group` es lo
 * que ya distingue un paquete para dos (PACK_2P) de un programa de varias
 * sesiones (SESSIONS), que es justo la división que importa.
 *
 * El adelanto se calcula **por ítem y se suma**, no como porcentaje del
 * carrito entero. Un porcentaje sobre el total castigaría a quien agrega un
 * segundo servicio —el mejor cliente— y además rompería la regla de las cajas
 * de regalo, que ya se publican como "se abonan al 100 %".
 */

/** Los grupos del catálogo, más el de las cajas de regalo. */
export type DepositGroup = Service["group"] | "GIFT";

/** Adelanto de una sesión individual cuando va una sola persona. */
export const ADELANTO_INDIVIDUAL = 10;

export type Deposit = {
  /** "fijo" = monto plano · "mitad" = 50 % · "total" = se paga completo. */
  kind: "fijo" | "mitad" | "total";
  /** Lo que se pide para confirmar. */
  amount: number;
  /** Lo que queda por pagar al llegar al local. */
  balance: number;
};

/** Mitad del precio, redondeada hacia arriba al sol.
 *
 * Los precios impares dan medios soles y un monto entero es más fácil de
 * cobrar por Yape y de cuadrar en caja. La diferencia la absorbe el saldo. */
function half(price: number) {
  return Math.ceil(price / 2);
}

/**
 * Adelanto de un ítem del carrito.
 *
 * `people` es cuántas personas van a esa reserva, no cuántos servicios hay:
 * dos personas bloquean dos terapeutas a la vez, y un plantón cuesta el doble
 * sin poder rellenarse con otra cita. Por eso una sesión individual sube al
 * 50 % cuando la reserva es para dos.
 */
export function depositFor(group: DepositGroup, price: number, people = 1): Deposit {
  switch (group) {
    // Programas de varias sesiones, masajes a domicilio y cajas de regalo se
    // pagan completos. Los programas y las cajas porque son paquetes cerrados
    // —y las cajas ya se publicaban así—; el domicilio porque la terapeuta
    // viaja: un plantón cuesta el traslado y el bloque entero, y no se puede
    // rellenar con nadie más porque ya no está en el local.
    case "SESSIONS":
    case "HOME":
    case "GIFT":
      return { kind: "total", amount: price, balance: 0 };

    // Los paquetes para dos ya son para dos por definición.
    case "PACK_2P": {
      const amount = half(price);
      return { kind: "mitad", amount, balance: price - amount };
    }

    // Individuales, faciales y mirada y belleza.
    default: {
      if (people >= 2) {
        const amount = half(price);
        return { kind: "mitad", amount, balance: price - amount };
      }
      // Nunca pedir más de lo que cuesta el servicio.
      const amount = Math.min(ADELANTO_INDIVIDUAL, price);
      return { kind: "fijo", amount, balance: price - amount };
    }
  }
}

/** Atajo para una ficha de servicio, que siempre se muestra para una persona. */
export function depositForService(service: Service, people = 1): Deposit {
  return depositFor(service.group, service.price, people);
}

export type DepositLine = { group?: DepositGroup; price: number };

/** Suma de los adelantos de una selección completa. */
export function depositTotal(lines: DepositLine[], people = 1) {
  return lines.reduce((sum, line) => {
    // Un carrito guardado antes de este cambio no tiene `group`. Se trata como
    // sesión individual, que es el tramo más conservador para el visitante.
    const group = line.group ?? "PROMOS_1P";
    return sum + depositFor(group, line.price, people).amount;
  }, 0);
}
