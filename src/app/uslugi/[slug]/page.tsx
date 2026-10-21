import { SERVICES } from "../../../../content/services.config";
import ServicePageClient from "./ServicePageClient";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default function ServicePage({ params }: Props) {
  return <ServicePageClient slug={params.slug} />;
}
