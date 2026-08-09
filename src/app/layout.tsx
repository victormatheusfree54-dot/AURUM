import type { Metadata } from "next";
import { siteConfig, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "beauty",
  keywords: [
    "Aurum Beauty Concept",
    "salão de beleza",
    "salão de beleza no Recreio",
    "mega hair",
    "mega hair no Rio de Janeiro",
    "cabeleireiro no Recreio",
    "unhas",
    "estética",
    "Recreio dos Bandeirantes",
    "Rio de Janeiro",
  ],
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/aurum-logo.webp",
        width: 900,
        height: 502,
        alt: "Aurum Beauty Concept — salão de beleza no Recreio dos Bandeirantes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/aurum-logo.webp"],
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
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={siteConfig.language}>
      <body>{children}</body>
    </html>
  );
}
