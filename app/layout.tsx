import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const ogTitle = "SILA — Real Estate Developer & Investor in Zanzibar";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SILA — Real Estate Developer & Investor in Zanzibar",
    template: "%s · SILA",
  },
  description: site.description,
  applicationName: "SILA",
  keywords: [
    "Zanzibar real estate",
    "Zanzibar property developer",
    "real estate investor Zanzibar",
    "property for sale Zanzibar",
    "Zanzibar villas",
    "build-to-own Zanzibar",
    "land for sale Zanzibar",
    "Zanzibar investment property",
    "SILA Zanzibar",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/sila-favicon.png",
    apple: "/sila-favicon.png",
  },
  openGraph: {
    title: ogTitle,
    description: site.description,
    url: site.url,
    type: "website",
    locale: "en_US",
    siteName: "SILA",
    images: [
      {
        url: "/who-we-are.jpg",
        width: 1200,
        height: 630,
        alt: "SILA — Zanzibar real estate developer and investor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: site.description,
    images: ["/who-we-are.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#082B5C",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/sila-logo.png`,
  image: `${site.url}/who-we-are.jpg`,
  description: site.description,
  telephone: site.phone.replace(/\s/g, ""),
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mpendae",
    addressLocality: "Zanzibar",
    addressRegion: "Zanzibar",
    addressCountry: "TZ",
  },
  areaServed: ["Zanzibar", "Tanzania"],
  sameAs: Object.values(site.social).filter((url) => url && url !== "#"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
