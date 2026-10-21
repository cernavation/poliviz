import type { Metadata } from "next";
import { CATALOG } from "../../../content/catalog.config";
import { resolveMediaMap } from "@/lib/resolve-media";
import { CatalogClient } from "./CatalogClient";

export const metadata: Metadata = {
  title: "Продукция — Poliviz-Design SRL",
  description: "Каталог полиграфической продукции: визитки, буклеты, упаковка, мерч, наружная реклама и многое другое.",
};

export default function CatalogPage() {
  // Resolve all catalog photos server-side — client gets only existing paths
  const resolvedMedia = resolveMediaMap(
    CATALOG.map((item) => ({
      finalPath: `/media/photo/catalog/${item.slug}.jpg`,
      slotId: `catalog-${item.slug}`,
    }))
  );

  return <CatalogClient resolvedMedia={resolvedMedia} />;
}
