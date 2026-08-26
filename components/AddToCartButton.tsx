"use client";

import { useState } from "react";
import { useCart, type CartItem } from "./CartContext";

type AddToCartButtonProps = {
  item: CartItem;
  className?: string;
  label?: string;
};

export default function AddToCartButton({ item, className, label = "Agregar" }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(item);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button type="button" className={className} onClick={handleClick} aria-label={`Agregar ${item.name} a mi selección`}>
      {added ? "Agregado ✓" : label}
      {!added && <span>→</span>}
    </button>
  );
}
