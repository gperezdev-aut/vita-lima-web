import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { ADELANTO_INDIVIDUAL } from "@/content/deposits";
import { site } from "@/content/site";
import { termsText, type TermsLanguage } from "@/lib/legal/termsText";

export default function TermsAndConditionsPage({ language }: { language: TermsLanguage }) {
  const t = termsText[language];
  const homeHref = language === "en" ? "/en" : "/";

  return (
    <>
      <main className="legal">
        <Link className="legalBack" href={homeHref}>{t.back}</Link>
        <h1>{t.title}</h1>
        <p className="legalUpdated">{t.updated}</p>
        <p>{t.intro}</p>

        <h2>{t.confirmation.title}</h2>
        <p>{t.confirmation.provisional}</p>
        <p>{t.confirmation.release}</p>
        <p>{t.confirmation.confirmed}</p>

        <h2>{t.deposits.title}</h2>
        <ul>
          <li>{t.deposits.individual(ADELANTO_INDIVIDUAL)}</li>
          <li>{t.deposits.group}</li>
          <li>{t.deposits.home}</li>
          <li>{t.deposits.gifts}</li>
          <li>{t.deposits.programs}</li>
        </ul>
        <p>{t.deposits.balance}</p>

        <h2>{t.rescheduling.title}</h2>
        <p>{t.rescheduling.timely}</p>
        <p>{t.rescheduling.late}</p>

        <h2>{t.cancellation.title}</h2>
        <p>{t.cancellation.nonRefundable}</p>
        <p>{t.cancellation.distinction}</p>

        <h2>{t.tolerance.title}</h2>
        <p>{t.tolerance.text}</p>

        <h2>{t.spaCancellation.title}</h2>
        <p>{t.spaCancellation.text}</p>

        <h2>{t.conditions.title}</h2>
        <p>{t.conditions.programs}</p>
        <p>{t.conditions.gifts}</p>
        <p>{t.conditions.home}</p>

        <p className="legalFootNote">
          {t.contact} {" "}
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">{t.contactLink}</a>.
        </p>
      </main>
      <SiteFooter context="internal" />
    </>
  );
}
