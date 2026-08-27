"use client";

import { useCart } from "./CartContext";
import { trackWhatsappClick } from "./WhatsAppTracking";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

const WHATSAPP_NUMBER = "51907308415";

function formatDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

export default function CartWidget() {
  const { items, removeItem, clear, isOpen, open, close, total, preferredDate, preferredTime, setPreferredDate, setPreferredTime } = useCart();
  const { language } = useLanguage();
  const t = translations[language].cart;

  function sendToWhatsapp() {
    const lines = items.map((item) => `- ${item.name}${item.meta ? ` (${item.meta})` : ""}: S/${item.price}`);
    const scheduleLines = [];
    if (preferredDate) scheduleLines.push(`${t.whatsappDate}: ${formatDate(preferredDate)}`);
    if (preferredTime) scheduleLines.push(`${t.whatsappTime}: ${preferredTime}`);

    const message = [
      t.whatsappIntro,
      ...lines,
      "",
      ...(scheduleLines.length > 0 ? [...scheduleLines, ""] : []),
      `${t.whatsappTotal}: S/${total}`,
      "",
      t.whatsappClosing,
    ].join("\n");
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    trackWhatsappClick(href);
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <button type="button" className="cartTrigger" onClick={open} aria-label={t.trigger}>
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
            <div className="cartScheduleFields">
              <label>
                {t.dateLabel}
                <input type="date" value={preferredDate} onChange={(event) => setPreferredDate(event.target.value)} />
              </label>
              <label>
                {t.timeLabel}
                <input type="time" step={900} value={preferredTime} onChange={(event) => setPreferredTime(event.target.value)} />
              </label>
            </div>
            <div className="cartTotalRow"><span>{t.totalLabel}</span><strong>S/{total}</strong></div>
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
