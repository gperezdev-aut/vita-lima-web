import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import CorporateLeadForm from "@/components/CorporateLeadForm";

export const metadata: Metadata = {
  title: "Solicitar propuesta corporativa | Vita Lima Spa",
  robots: { index: false, follow: false },
};
export default function CorporateLeadPage() {
  return (
    <main className="corporateLeadPage">
      <header className="corporateLeadHeader">
        <div className="shell">
          <Link href="/empresas">← Bienestar corporativo</Link>
          <p className="eyebrow">Vita Lima para empresas</p>
          <h1>Solicita una propuesta a medida</h1>
          <p>
            Cuéntanos sobre tu equipo o evento. El envío no confirma una
            reserva.
          </p>
        </div>
      </header>
      <section className="corporateLeadSection">
        <div className="shell">
          <Suspense fallback={null}>
            <CorporateLeadForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
