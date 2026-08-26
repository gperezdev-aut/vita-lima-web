"use client";

import { useCart } from "./CartContext";
import { trackWhatsappClick } from "./WhatsAppTracking";

const WHATSAPP_NUMBER = "51907308415";

export default function CartWidget() {
  const { items, removeItem, clear, isOpen, open, close, total } = useCart();

  function sendToWhatsapp() {
    const lines = items.map((item) => `- ${item.name}${item.meta ? ` (${item.meta})` : ""}: S/${item.price}`);
    const message = [
      "Hola Vita Lima, quisiera reservar/consultar lo siguiente:",
      ...lines,
      "",
      `Total estimado: S/${total}`,
      "",
      "¿Me ayudan a coordinar disponibilidad?",
    ].join("\n");
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    trackWhatsappClick(href);
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <button type="button" className="cartTrigger" onClick={open} aria-label="Ver mi selección">
        <span aria-hidden="true">🛍️</span>
        <span className="cartLabel">Mi selección</span>
        {items.length > 0 && <span className="cartBadge">{items.length}</span>}
      </button>

      <div className={`cartOverlay${isOpen ? " cartOverlayOpen" : ""}`} onClick={close} aria-hidden="true" />

      <aside className={`cartPanel${isOpen ? " cartPanelOpen" : ""}`} aria-hidden={!isOpen}>
        <div className="cartPanelHeader">
          <h3>Tu selección</h3>
          <button type="button" className="cartCloseButton" onClick={close} aria-label="Cerrar">×</button>
        </div>

        <div className="cartPanelBody">
          {items.length === 0 ? (
            <p className="cartEmpty">Todavía no agregaste nada. Explora el catálogo de servicios o las cajas de regalo y agrega lo que te interese.</p>
          ) : (
            items.map((item) => (
              <div className="cartLine" key={item.cartId}>
                <div className="cartLineInfo">
                  <strong>{item.name}</strong>
                  {item.meta && <span>{item.meta}</span>}
                </div>
                <div className="cartLineActions">
                  <span className="cartLinePrice">S/{item.price}</span>
                  <button type="button" className="cartLineRemove" onClick={() => removeItem(item.cartId)} aria-label={`Quitar ${item.name}`}>×</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cartPanelFooter">
            <div className="cartTotalRow"><span>Total estimado</span><strong>S/{total}</strong></div>
            <button type="button" className="button orangeButton cartCheckoutButton" onClick={sendToWhatsapp}>
              Reservar por WhatsApp <span>→</span>
            </button>
            <button type="button" className="cartClearLink" onClick={clear}>Vaciar selección</button>
          </div>
        )}
      </aside>
    </>
  );
}
