import type { Metadata } from "next";
import LocationRoute, { buildLocationMetadata } from "@/components/LocationRoute";

export const metadata: Metadata = buildLocationMetadata("san-borja");

export default function Page() {
  return <LocationRoute slug="san-borja" />;
}
