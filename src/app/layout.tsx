import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import ScrollToTop from "@/components/ScrollToTop";
import { SITE } from "../../content/site.config";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: `${SITE.name} — ${SITE.tagline.ru}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description.ru,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "ru_MD",
    alternateLocale: ["ro_MD"],
    siteName: SITE.name,
    images: [
      {
        url: "/media/brand/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE.name} — типография в Кишинёве`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        {/* JSON-LD LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: SITE.name,
              url: `https://${SITE.domain}`,
              email: SITE.email,
              telephone: SITE.phone.mainFormatted,
              address: {
                "@type": "PostalAddress",
                streetAddress: `${SITE.address.street}, ${SITE.address.building}`,
                addressLocality: SITE.address.city,
                addressCountry: SITE.address.countryCode,
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: SITE.address.lat,
                longitude: SITE.address.lng,
              },
            }),
          }}
        />
        {/* hreflang — ro будет добавлен после перевода */}
        <link rel="alternate" hrefLang="ru" href={`https://${SITE.domain}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://${SITE.domain}`} />
      </head>
      <body>
        <LanguageProvider>
          <ScrollToTop />
          <LenisProvider />
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
