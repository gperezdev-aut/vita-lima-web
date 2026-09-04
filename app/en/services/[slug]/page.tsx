import type { Metadata } from "next";
import ServiceRoute, { buildServiceMetadata } from "@/components/ServiceRoute";
import { services } from "@/content/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildServiceMetadata(slug, "en");
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <ServiceRoute slug={slug} language="en" />;
}
