import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const corporateFormUrl = new URL(
  "../components/CorporateLeadForm.tsx",
  import.meta.url,
);
const whatsappTrackingUrl = new URL(
  "../components/WhatsAppTracking.tsx",
  import.meta.url,
);

test("el lead corporativo se registra solo después de una respuesta exitosa y sin PII", async () => {
  const source = await readFile(corporateFormUrl, "utf8");
  const successCheck = source.indexOf("if (!response.ok)");
  const tracking = source.indexOf('trackEvent("generate_lead"');
  const successState = source.indexOf('setStatus("success")');
  const trackingBlock = source.slice(tracking, successState);

  assert.ok(successCheck >= 0 && successCheck < tracking);
  assert.ok(tracking < successState);
  assert.match(trackingBlock, /event_category: "conversion"/);
  assert.match(trackingBlock, /lead_type: "corporativo"/);
  assert.match(trackingBlock, /modalidad,/);
  assert.doesNotMatch(
    trackingBlock,
    /nombre|apellidos|empresa|ruc|correo|email|tel[eé]fono|whatsapp|ubicacion|direcci[oó]n|comentarios|fecha|horario|token|wa\.me/i,
  );
  assert.equal(source.match(/trackEvent\("generate_lead"/g)?.length, 1);
});

test("whatsapp_click conserva el histórico y añade la dimensión de origen", async () => {
  const source = await readFile(whatsappTrackingUrl, "utf8");
  const trackingStart = source.indexOf('trackEvent("whatsapp_click"');
  const trackingEnd = source.indexOf("});", trackingStart);
  const trackingBlock = source.slice(trackingStart, trackingEnd);

  assert.match(trackingBlock, /event_category: "engagement"/);
  assert.match(trackingBlock, /event_label: source/);
  assert.match(trackingBlock, /wa_source: source/);
  assert.match(
    source,
    /"carrito" \| "formulario" \| "boton_flotante" \| "enlace_directo"/,
  );
  assert.doesNotMatch(trackingBlock, /href|wa\.me|url/i);
});
