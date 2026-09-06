"use client";

import { useState } from "react";
import { useCart, type CartItem } from "./CartContext";
import { trackEvent } from "./WhatsAppTracking";

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
    // Primer paso medible del embudo: sin esto solo se ve quién llegó a
    // WhatsApp, no cuánta gente mostró interés y se quedó en el camino.
    trackEvent("add_to_cart", {
      event_category: "engagement",
      currency: "PEN",
      value: item.price,
      items: [{ item_id: item.id, item_name: item.name, price: item.price }],
    });
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
