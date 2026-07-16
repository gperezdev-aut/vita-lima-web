import { site } from "@/content/site";

export function WhatsAppButton() {
  return (
    <a className="whatsapp" href={`https://wa.me/${site.whatsapp}?text=Hola%20Vita%20Lima,%20quisiera%20información`} target="_blank" aria-label="Escribir por WhatsApp">
      WhatsApp
    </a>
  );
}
