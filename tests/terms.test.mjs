import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { ADELANTO_INDIVIDUAL } from "../content/deposits.ts";
import { termsText } from "../lib/legal/termsText.ts";
import { toEnglishPath } from "../lib/i18n/routes.ts";

test("los términos cubren las reglas confirmadas de reserva, adelantos y cambios", () => {
  const t = termsText.es;

  assert.equal(ADELANTO_INDIVIDUAL, 10);
  assert.match(t.confirmation.provisional, /30 minutos/);
  assert.match(t.confirmation.confirmed, /únicamente.*valida.*registra el adelanto/i);
  assert.equal(t.deposits.individual(ADELANTO_INDIVIDUAL), "Una persona: S/10.");
  assert.match(t.deposits.group, /50 %/);
  assert.match(t.deposits.home, /50 %.*movilidad/i);
  assert.match(t.deposits.gifts, /100 %/);
  assert.match(t.deposits.programs, /100 %/);
  assert.match(t.rescheduling.timely, /24 horas.*sin penalidad/i);
  assert.match(t.rescheduling.late, /conserva y traslada.*S\/30/i);
  assert.match(t.cancellation.nonRefundable, /no es reembolsable/i);
  assert.match(t.cancellation.distinction, /reprogramación tardía.*S\/30/i);
  assert.doesNotMatch(t.deposits.home, /100 %|por el total/i);
});

test("la traducción inglesa expresa las mismas reglas confirmadas", () => {
  const es = termsText.es;
  const en = termsText.en;

  assert.equal(en.deposits.individual(ADELANTO_INDIVIDUAL), "One person: S/10.");
  assert.match(en.confirmation.provisional, /30 minutes/i);
  assert.match(en.confirmation.confirmed, /only when.*validates availability.*records/i);
  assert.match(en.deposits.group, /50%/);
  assert.match(en.deposits.home, /50%.*travel fee/i);
  assert.match(en.deposits.gifts, /100%/);
  assert.match(en.deposits.programs, /100%/);
  assert.match(en.rescheduling.timely, /24 hours.*no penalty/i);
  assert.match(en.rescheduling.late, /kept and transferred.*S\/30/i);
  assert.match(en.cancellation.nonRefundable, /non-refundable/i);
  assert.match(en.cancellation.distinction, /late rescheduling.*S\/30/i);
  assert.deepEqual(Object.keys(en).sort(), Object.keys(es).sort());
});

test("la ruta única de términos tiene versión inglesa, enlace legal y no expone datos sensibles", async () => {
  const [spanishPage, englishPage, termsPage, footer, sitemap] = await Promise.all([
    readFile(new URL("../app/terminos-y-condiciones/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/en/terms-and-conditions/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/TermsAndConditionsPage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/SiteFooter.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
  ]);

  assert.match(spanishPage, /TermsAndConditionsPage language="es"/);
  assert.match(englishPage, /TermsAndConditionsPage language="en"/);
  assert.equal(toEnglishPath("/terminos-y-condiciones"), "/en/terms-and-conditions");
  assert.match(footer, /href\("\/terminos-y-condiciones"\)/);
  assert.match(sitemap, /bilingual\("\/terminos-y-condiciones", 0\.3\)/);
  assert.match(termsPage, /site\.whatsapp/);
  assert.doesNotMatch(termsPage, /51907308415|CAJA_|SUPABASE_|SECRET|NEXT_PUBLIC_/);
  assert.doesNotMatch([spanishPage, englishPage, termsPage, footer].join("\n"), /politica-de-cancelacion/);
});
