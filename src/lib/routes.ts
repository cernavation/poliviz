// ============================================================
// routes.ts — централизованный реестр маршрутов Poliviz
// Профессиональные английские URL с поддержкой /ro и /en
// ============================================================

export type Locale = "ru" | "ro" | "en";

export const ROUTES = {
  home: "/",
  services: "/services",
  serviceOffset: "/services/ofsetnaya-pechat",
  serviceDigital: "/services/cifrovaya-pechat",
  serviceSilkscreen: "/services/shelkografiya",
  serviceWide: "/services/shirokoformatnaya-pechat",
  servicePlotter: "/services/plotternaya-rezka",
  serviceLamination: "/services/laminaciya",
  servicePostpress: "/services/poslepechatnye-raboty",
  catalog: "/products",
  prepress: "/guidelines",
  clients: "/clients",
  vacancies: "/vacancies",
  contacts: "/contacts",
  order: "/order",
  orderThanks: "/order/thanks",
  privacy: "/privacy",
} as const;

export type RouteKey = keyof typeof ROUTES;

/**
 * Локализует путь для заданной локали:
 * - 'ru' (по умолчанию): возвращает чистый путь (например, '/services' или '/')
 * - 'ro' или 'en': добавляет суффикс '/ro' или '/en' (например, '/services/ro', '/products/en', '/' -> '/ro')
 */
export function localizeHref(href: string, locale: Locale = "ru"): string {
  if (!href) return href;
  if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
    return href;
  }

  // Разделяем pathname и query/hash
  const [pathAndQuery, hash] = href.split("#");
  const [pathname, query] = pathAndQuery.split("?");

  // Очищаем от существующих суффиксов локали в конце пути
  let cleanPath = pathname.replace(/\/(ro|en)$/, "") || "/";
  if (cleanPath === "/ru") cleanPath = "/";

  let localizedPath = cleanPath;
  if (locale === "ro" || locale === "en") {
    if (cleanPath === "/") {
      localizedPath = `/${locale}`;
    } else {
      localizedPath = `${cleanPath}/${locale}`;
    }
  }

  let finalUrl = localizedPath;
  if (query) finalUrl += `?${query}`;
  if (hash) finalUrl += `#${hash}`;
  return finalUrl;
}

// ─── 301 Редиректы со старого сайта ─────────────────────────
export const LEGACY_REDIRECTS = [
  { source: "/index.php", destination: "/" },
  { source: "/index.php/our-services/offset", destination: ROUTES.serviceOffset },
  { source: "/index.php/our-services/digital", destination: ROUTES.serviceDigital },
  { source: "/index.php/our-services/silkscreen", destination: ROUTES.serviceSilkscreen },
  { source: "/index.php/our-services/2019-06-26-08-48-18", destination: ROUTES.serviceWide },
  { source: "/index.php/our-services/plotter", destination: ROUTES.servicePlotter },
  { source: "/index.php/our-services/lamination", destination: ROUTES.serviceLamination },
  { source: "/index.php/our-services/post-print", destination: ROUTES.servicePostpress },
  { source: "/index.php/samples", destination: ROUTES.catalog },
  { source: "/index.php/middlemen", destination: ROUTES.prepress },
  { source: "/index.php/vacancies", destination: ROUTES.vacancies },
  { source: "/index.php/our-clients", destination: ROUTES.clients },
  { source: "/index.php/contacts", destination: ROUTES.contacts },
] as const;
