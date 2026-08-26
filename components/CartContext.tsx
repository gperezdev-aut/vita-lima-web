"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  meta?: string;
};

export type CartLine = CartItem & { cartId: string };

type CartContextValue = {
  items: CartLine[];
  addItem: (item: CartItem) => void;
  removeItem: (cartId: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "vita-lima-cart";

function makeCartId(id: string) {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  return `${id}__${random}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Lectura única de localStorage tras el montaje: necesaria para no romper
    // el hidratado SSR (el servidor siempre renderiza el carrito vacío).
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // localStorage no disponible o corrupto: seguimos con carrito vacío.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Sin acceso a almacenamiento local: no persistimos, pero no rompemos la UI.
    }
  }, [items, hydrated]);

  function addItem(item: CartItem) {
    setItems((prev) => [...prev, { ...item, cartId: makeCartId(item.id) }]);
  }

  function removeItem(cartId: string) {
    setItems((prev) => prev.filter((line) => line.cartId !== cartId));
  }

  function clear() {
    setItems([]);
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
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
