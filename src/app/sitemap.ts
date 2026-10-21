import { MetadataRoute } from "next";
import { ROUTES } from "../../content/routes";
import { SERVICES } from "../../content/services.config";
import { SITE } from "../../content/site.config";

const BASE = `https://${SITE.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${BASE}${ROUTES.home}`,      priority: 1.0,  changeFrequency: "weekly" as const },
    { url: `${BASE}${ROUTES.services}`,  priority: 0.9,  changeFrequency: "monthly" as const },
    { url: `${BASE}${ROUTES.catalog}`,   priority: 0.9,  changeFrequency: "monthly" as const },
    { url: `${BASE}${ROUTES.prepress}`,  priority: 0.8,  changeFrequency: "monthly" as const },
    { url: `${BASE}${ROUTES.clients}`,   priority: 0.7,  changeFrequency: "monthly" as const },
    { url: `${BASE}${ROUTES.contacts}`,  priority: 0.8,  changeFrequency: "yearly" as const },
    { url: `${BASE}${ROUTES.vacancies}`, priority: 0.5,  changeFrequency: "monthly" as const },
    { url: `${BASE}${ROUTES.order}`,     priority: 0.9,  changeFrequency: "yearly" as const },
  ];

  const servicePages = SERVICES.map((s) => ({
    url: `${BASE}${s.href}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...servicePages].map((page) => ({
    ...page,
    lastModified: new Date(),
  }));
}
