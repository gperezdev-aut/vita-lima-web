import type { Metadata } from "next";
import LocationRoute, { buildLocationMetadata } from "@/components/LocationRoute";

export const metadata: Metadata = buildLocationMetadata("miraflores", "en");

export default function Page() {
  return <LocationRoute slug="miraflores" language="en" />;
}
