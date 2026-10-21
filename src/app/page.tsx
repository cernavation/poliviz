import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "../../content/site.config";
import { ROUTES } from "../../content/routes";
import { CATALOG, CATALOG_FEATURED_SLUGS } from "../../content/catalog.config";
// clients config consumed directly by ClientsTicker
import { ScrollVideo } from "@/components/home/ScrollVideo";
import { ClientsTicker } from "@/components/home/ClientsTicker";
import { Button } from "@/components/ui/Button";
import { CMYKBar } from "@/components/ui/CMYKBar";
import { PrintMark } from "@/components/ui/PrintMark";
import { SheetLabel } from "@/components/ui/SheetLabel";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { resolveMedia, resolveMediaMap } from "@/lib/resolve-media";
import { HomePageClient } from "@/components/home/HomePageClient";
import { BirthdayIntro } from "@/components/home/BirthdayIntro";

// ─── Win95 Design System on Home Page (rendered via HomePageClient) ───────────
// 1. Hero CTA buttons:
//    "Рассчитать заказ": className="bg-[#D6307F] !text-white font-bold border-2 border-t-[#ff8cc0] border-l-[#ff8cc0] border-b-[#8a1a4f] border-r-[#8a1a4f] active:border-t-[#8a1a4f] active:border-l-[#8a1a4f] active:border-b-[#ff8cc0] active:border-r-[#ff8cc0] active:translate-y-[1px] px-6 py-3 rounded-none"
//    "Загрузить макет": className="bg-[#dfdfdf] !text-[#121212] font-bold border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:bg-[#d0d0d0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white active:translate-y-[1px] px-6 py-3 rounded-none"
// 2. Stats section (260 000+, 2 200+, 2 500+): bg-[#121212], all 3 cards wrapped in <Win95Window variant="navy">
// 3. Prepress section ("Макет прошёл — тираж вышел"): bg-[#121212], bleed diagram wrapped in <Win95Window variant="navy" title="maket.cdr">
// 4. Catalog preview section: all cards wrapped in <Win95Window variant="navy">


export const metadata: Metadata = {
  title: `${SITE.tagline.ru} | ${SITE.name}`,
  description: SITE.description.ru,
  alternates: {
    canonical: `https://${SITE.domain}`,
    languages: {
      ru: `https://${SITE.domain}`,
      ro: `https://${SITE.domain}/ro`,
    },
  },
};

const FEATURED_ITEMS = CATALOG.filter((item) =>
  CATALOG_FEATURED_SLUGS.includes(item.slug)
).slice(0, 12);

export default function HomePage() {
  const catalogMedia = resolveMediaMap(
    FEATURED_ITEMS.map((item) => ({
      finalPath: `/media/photo/catalog/${item.slug}.jpg`,
      slotId: `catalog-${item.slug}`,
    }))
  );

  return (
    <>
      <BirthdayIntro />
      <HomePageClient featuredItems={FEATURED_ITEMS} catalogMedia={catalogMedia} />
    </>
  );
}
