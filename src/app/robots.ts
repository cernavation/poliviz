import { MetadataRoute } from "next";
import { SITE } from "../../content/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/raschet/api"],
    },
    sitemap: `https://${SITE.domain}/sitemap.xml`,
  };
}
