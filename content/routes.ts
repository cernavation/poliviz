// ============================================================
// routes.ts — централизованный реестр маршрутов
// Slug-и локализуются через next-intl; пока только ru.
// ============================================================

export const ROUTES = {
  home: "/",
  services: "/uslugi",
  serviceOffset: "/uslugi/ofsetnaya-pechat",
  serviceDigital: "/uslugi/cifrovaya-pechat",
  serviceSilkscreen: "/uslugi/shelkografiya",
  serviceWide: "/uslugi/shirokoformatnaya-pechat",
  servicePlotter: "/uslugi/plotternaya-rezka",
  serviceLamination: "/uslugi/laminaciya",
  servicePostpress: "/uslugi/poslepechatnye-raboty",
  catalog: "/produkciya",
  prepress: "/podgotovka-maketov",
  clients: "/klienty",
  vacancies: "/vakansii",
  contacts: "/kontakty",
  order: "/raschet",
  orderThanks: "/raschet/spasibo",
  privacy: "/konfidencialnost",
} as const;

export type RouteKey = keyof typeof ROUTES;

// ─── 301 Редиректы со старого сайта ─────────────────────────
// Используется в next.config.mjs
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
