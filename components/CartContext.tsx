"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  meta?: string;
};

export type CartLine = CartItem & { cartId: string };

type StoredCart = {
  items: CartLine[];
  preferredDate: string;
  preferredTime: string;
};

type CartContextValue = {
  items: CartLine[];
  addItem: (item: CartItem) => void;
  removeItem: (cartId: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  total: number;
  preferredDate: string;
  preferredTime: string;
  setPreferredDate: (value: string) => void;
  setPreferredTime: (value: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "vita-lima-cart";

function makeCartId(id: string) {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  return `${id}__${random}`;
}

function parseStoredCart(raw: string): StoredCart {
  const parsed = JSON.parse(raw);
  // Compatibilidad con el formato anterior, donde solo se guardaba el array de items.
  if (Array.isArray(parsed)) {
    return { items: parsed, preferredDate: "", preferredTime: "" };
  }
  return {
    items: Array.isArray(parsed.items) ? parsed.items : [],
    preferredDate: typeof parsed.preferredDate === "string" ? parsed.preferredDate : "",
    preferredTime: typeof parsed.preferredTime === "string" ? parsed.preferredTime : "",
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Lectura única de localStorage tras el montaje: necesaria para no romper
    // el hidratado SSR (el servidor siempre renderiza el carrito vacío).
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = parseStoredCart(raw);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(stored.items);
        setPreferredDate(stored.preferredDate);
        setPreferredTime(stored.preferredTime);
      }
    } catch {
      // localStorage no disponible o corrupto: seguimos con carrito vacío.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const stored: StoredCart = { items, preferredDate, preferredTime };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // Sin acceso a almacenamiento local: no persistimos, pero no rompemos la UI.
    }
  }, [items, preferredDate, preferredTime, hydrated]);

  function addItem(item: CartItem) {
    setItems((prev) => [...prev, { ...item, cartId: makeCartId(item.id) }]);
  }

  function removeItem(cartId: string) {
    setItems((prev) => prev.filter((line) => line.cartId !== cartId));
  }

  function clear() {
    setItems([]);
    setPreferredDate("");
    setPreferredTime("");
  }

  const total = useMemo(() => items.reduce((sum, line) => sum + line.price, 0), [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    clear,
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    total,
    preferredDate,
    preferredTime,
    setPreferredDate,
    setPreferredTime,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
