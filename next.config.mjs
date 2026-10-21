const LEGACY_REDIRECTS = [
  { source: "/index.php", destination: "/" },
  { source: "/index.php/our-services/offset", destination: "/uslugi/ofsetnaya-pechat" },
  { source: "/index.php/our-services/digital", destination: "/uslugi/cifrovaya-pechat" },
  { source: "/index.php/our-services/silkscreen", destination: "/uslugi/shelkografiya" },
  { source: "/index.php/our-services/2019-06-26-08-48-18", destination: "/uslugi/shirokoformatnaya-pechat" },
  { source: "/index.php/our-services/plotter", destination: "/uslugi/plotternaya-rezka" },
  { source: "/index.php/our-services/lamination", destination: "/uslugi/laminaciya" },
  { source: "/index.php/our-services/post-print", destination: "/uslugi/poslepechatnye-raboty" },
  { source: "/index.php/samples", destination: "/produkciya" },
  { source: "/index.php/middlemen", destination: "/podgotovka-maketov" },
  { source: "/index.php/vacancies", destination: "/vakansii" },
  { source: "/index.php/our-clients", destination: "/klienty" },
  { source: "/index.php/contacts", destination: "/kontakty" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── 301 Редиректы со старого сайта ──────────────────────
  async redirects() {
    return LEGACY_REDIRECTS.map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: true,
    }));
  },

  // ─── Изображения ─────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },

  // ─── TypeScript и ESLint ──────────────────────────────────
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
