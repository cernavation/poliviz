/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      // 1. Root language routes
      { source: "/ro", destination: "/" },
      { source: "/en", destination: "/" },

      // 2. Services (/services, /services/ro, /services/en)
      { source: "/services", destination: "/uslugi" },
      { source: "/services/ro", destination: "/uslugi" },
      { source: "/services/en", destination: "/uslugi" },

      // Services slug (/services/:slug, /services/:slug/ro, /services/:slug/en)
      { source: "/services/:slug", destination: "/uslugi/:slug" },
      { source: "/services/:slug/ro", destination: "/uslugi/:slug" },
      { source: "/services/:slug/en", destination: "/uslugi/:slug" },

      // 3. Products / Catalog (/products, /products/ro, /products/en)
      { source: "/products", destination: "/produkciya" },
      { source: "/products/ro", destination: "/produkciya" },
      { source: "/products/en", destination: "/produkciya" },

      // 4. Guidelines / Prepress (/guidelines, /guidelines/ro, /guidelines/en)
      { source: "/guidelines", destination: "/podgotovka-maketov" },
      { source: "/guidelines/ro", destination: "/podgotovka-maketov" },
      { source: "/guidelines/en", destination: "/podgotovka-maketov" },
      { source: "/trebovaniya-k-maketam", destination: "/podgotovka-maketov" },
      { source: "/trebovaniya-k-maketam/ro", destination: "/podgotovka-maketov" },
      { source: "/trebovaniya-k-maketam/en", destination: "/podgotovka-maketov" },

      // 5. Clients (/clients, /clients/ro, /clients/en)
      { source: "/clients", destination: "/clients" },
      { source: "/clients/ro", destination: "/clients" },
      { source: "/clients/en", destination: "/clients" },
      { source: "/klienty", destination: "/clients" },
      { source: "/klienty/ro", destination: "/clients" },
      { source: "/klienty/en", destination: "/clients" },

      // 6. Contacts (/contacts, /contacts/ro, /contacts/en)
      { source: "/contacts", destination: "/kontakty" },
      { source: "/contacts/ro", destination: "/kontakty" },
      { source: "/contacts/en", destination: "/kontakty" },

      // 7. Order & Quote (/order, /order/ro, /order/en)
      { source: "/order", destination: "/raschet" },
      { source: "/order/ro", destination: "/raschet" },
      { source: "/order/en", destination: "/raschet" },
      { source: "/order/thanks", destination: "/raschet/spasibo" },
      { source: "/order/thanks/ro", destination: "/raschet/spasibo" },
      { source: "/order/thanks/en", destination: "/raschet/spasibo" },

      // 8. Vacancies & Privacy
      { source: "/vacancies", destination: "/vakansii" },
      { source: "/vacancies/ro", destination: "/vakansii" },
      { source: "/vacancies/en", destination: "/vakansii" },
      { source: "/privacy", destination: "/konfidencialnost" },
      { source: "/privacy/ro", destination: "/konfidencialnost" },
      { source: "/privacy/en", destination: "/konfidencialnost" },
    ];
  },
};

export default nextConfig;
