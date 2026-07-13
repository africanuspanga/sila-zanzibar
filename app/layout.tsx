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

export const metadata: Metadata = {
  metadataBase: new URL("https://sila.co.tz"),
  title: {
    default: "SILA Real Estate — Own Your Place in Zanzibar",
    template: "%s · SILA Real Estate",
  },
  description: site.description,
  keywords: [
    "Zanzibar real estate",
    "property for sale Zanzibar",
    "Zanzibar villas",
    "build-to-own Zanzibar",
    "land for sale Zanzibar",
    "Zanzibar investment property",
  ],
  icons: {
    icon: "/sila-favicon.png",
    apple: "/sila-favicon.png",
  },
  openGraph: {
    title: "SILA Real Estate — Own Your Place in Zanzibar",
    description: site.description,
    type: "website",
    locale: "en_US",
    siteName: "SILA Real Estate",
  },
};

export const viewport: Viewport = {
  themeColor: "#082B5C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
