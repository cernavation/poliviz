import { SERVICES } from "../../../../content/services.config";
import { resolveMedia } from "@/lib/resolve-media";
import ServicePageClient from "./ServicePageClient";

interface Props { params: { slug: string } }

const PHOTO_KEY: Record<string, string> = {
  "ofsetnaya-pechat":         "offset",
  "cifrovaya-pechat":         "digital",
  "shelkografiya":            "silkscreen",
  "shirokoformatnaya-pechat": "wide-format",
  "plotternaya-rezka":        "plotter",
  "laminaciya":               "lamination",
  "poslepechatnye-raboty":    "postpress",
};

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default function ServicePage({ params }: Props) {
  const photoKey = PHOTO_KEY[params.slug] ?? params.slug;
  const heroMedia = resolveMedia(
    `/media/photo/services/${photoKey}.jpg`,
    `photo-service-${photoKey}`
  );

  return <ServicePageClient slug={params.slug} heroMedia={heroMedia} />;
}
