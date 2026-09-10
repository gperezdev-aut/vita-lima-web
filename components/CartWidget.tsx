"use client";

import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import { trackEvent, trackWhatsappClick } from "./WhatsAppTracking";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import { useToday } from "@/lib/useToday";

const WHATSAPP_NUMBER = "51907308415";

function formatDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

export default function CartWidget() {
  const { items, removeItem, clear, isOpen, open, close, total, people, setPeople, deposit, askPeople, preferredDate, preferredTime, setPreferredDate, setPreferredTime } = useCart();
  const { language } = useLanguage();
  const t = translations[language].cart;
  const pathname = usePathname();
  const minDate = useToday();

  function sendToWhatsapp() {
    const lines = items.map((item) => `- ${item.name}${item.meta ? ` (${item.meta})` : ""}: S/${item.price}`);
    // Solo se manda el numero de personas si de verdad se pregunto: decir
    // "Personas: 1" en un paquete para dos confundiria a quien atiende.
    const scheduleLines = askPeople ? [`${t.whatsappPeople}: ${people >= 2 ? "2+" : "1"}`] : [];
    if (preferredDate) scheduleLines.push(`${t.whatsappDate}: ${formatDate(preferredDate)}`);
    if (preferredTime) scheduleLines.push(`${t.whatsappTime}: ${preferredTime}`);

    const message = [
      t.whatsappIntro,
      ...lines,
      "",
      ...(scheduleLines.length > 0 ? [...scheduleLines, ""] : []),
      `${t.whatsappTotal}: S/${total}`,
      `${t.whatsappDeposit}: S/${deposit}`,
      "",
      t.whatsappClosing,
    ].join("\n");
    // Último paso del embudo: cuántas selecciones llegan realmente a WhatsApp
    // y con qué valor. Los nombres de servicio son catálogo público.
    // Se manda también el adelanto: es lo que permite comparar en GA4 lo que
    // la gente se compromete a pagar contra lo que de verdad se cobra.
    trackEvent("begin_checkout", {
      event_category: "conversion",
      currency: "PEN",
      value: total,
      deposit,
      people,
      items: items.map((item) => ({ item_id: item.id, item_name: item.name, price: item.price })),
    });

    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    trackWhatsappClick("carrito");
    window.open(href, "_blank", "noopener,noreferrer");
  }

  function openCart() {
    trackEvent("view_cart", { event_category: "engagement", currency: "PEN", value: total, items_count: items.length });
    open();
  }

  // La ficha de cita (/cita/[token]) no usa el catálogo ni el carrito: mostrar
  // "Mi selección" ahí no tiene sentido y además taparía el botón de enviar,
  // justo el problema que ese flujo tiene que evitar.
  if (pathname?.startsWith("/cita/")) return null;

  return (
    <>
      <button type="button" className="cartTrigger" onClick={openCart} aria-label={t.trigger}>
        <span aria-hidden="true">🛍️</span>
        <span className="cartLabel">{t.triggerLabel}</span>
        {items.length > 0 && <span className="cartBadge">{items.length}</span>}
      </button>

      <div className={`cartOverlay${isOpen ? " cartOverlayOpen" : ""}`} onClick={close} aria-hidden="true" />

      <aside className={`cartPanel${isOpen ? " cartPanelOpen" : ""}`} aria-hidden={!isOpen}>
        <div className="cartPanelHeader">
          <h3>{t.panelTitle}</h3>
          <button type="button" className="cartCloseButton" onClick={close} aria-label={t.close}>×</button>
        </div>

        <div className="cartPanelBody">
          {items.length === 0 ? (
            <p className="cartEmpty">{t.empty}</p>
          ) : (
            items.map((item) => (
              <div className="cartLine" key={item.cartId}>
                <div className="cartLineInfo">
                  <strong>{item.name}</strong>
                  {item.meta && <span>{item.meta}</span>}
                </div>
                <div className="cartLineActions">
                  <span className="cartLinePrice">S/{item.price}</span>
                  <button type="button" className="cartLineRemove" onClick={() => removeItem(item.cartId)} aria-label={t.remove(item.name)}>×</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cartPanelFooter">
            {/* Cuántas personas decide el tramo del adelanto: dos personas
                bloquean dos terapeutas a la vez. Ver content/deposits.ts. */}
            {askPeople && (
            <fieldset className="cartPeopleField">
              <legend>{t.peopleLabel}</legend>
              <div className="cartPeopleOptions">
                <label>
                  <input type="radio" name="cart-people" checked={people === 1} onChange={() => setPeople(1)} />
                  <span>{t.peopleOne}</span>
                </label>
                <label>
                  <input type="radio" name="cart-people" checked={people >= 2} onChange={() => setPeople(2)} />
                  <span>{t.peopleTwo}</span>
                </label>
              </div>
            </fieldset>
            )}
            <div className="cartScheduleFields">
              <label>
                {t.dateLabel}
                <input type="date" min={minDate} value={preferredDate} onChange={(event) => setPreferredDate(event.target.value)} />
              </label>
              <label>
                {t.timeLabel}
                <input type="time" step={900} value={preferredTime} onChange={(event) => setPreferredTime(event.target.value)} />
              </label>
            </div>
            <div className="cartTotals">
              <div className="cartTotalRow"><span>{t.totalLabel}</span><strong>S/{total}</strong></div>
              <div className="cartTotalRow cartDepositRow"><span>{t.depositLabel}</span><strong>S/{deposit}</strong></div>
              {total - deposit > 0 && (
                <div className="cartTotalRow cartBalanceRow"><span>{t.balanceLabel}</span><span>S/{total - deposit}</span></div>
              )}
            </div>
            <p className="cartDepositNote">{t.depositNote}</p>
            <button type="button" className="button orangeButton cartCheckoutButton" onClick={sendToWhatsapp}>
              {t.checkout} <span>→</span>
            </button>
            <button type="button" className="cartClearLink" onClick={clear}>{t.clear}</button>
          </div>
        )}
      </aside>
    </>
  );
}
