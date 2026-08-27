"use client";

import { useState } from "react";
import { useCart, type CartItem } from "./CartContext";

type AddToCartButtonProps = {
  item: CartItem;
  className?: string;
  label?: string;
  addedLabel?: string;
  ariaLabel?: string;
};

export default function AddToCartButton({ item, className, label = "Agregar", addedLabel = "Agregado ✓", ariaLabel }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(item);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button type="button" className={className} onClick={handleClick} aria-label={ariaLabel || `Agregar ${item.name} a mi selección`}>
      {added ? addedLabel : label}
      {!added && <span>→</span>}
    </button>
  );
}
