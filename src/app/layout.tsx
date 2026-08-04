import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aurum Beauty Concept | Beleza completa no Recreio",
  description:
    "Mega hair, cabelos, unhas e estética em um só lugar no Recreio dos Bandeirantes, Rio de Janeiro.",
  keywords: [
    "Aurum Beauty Concept",
    "salão de beleza",
    "mega hair",
    "Recreio dos Bandeirantes",
    "Rio de Janeiro",
  ],
  openGraph: {
    title: "Aurum Beauty Concept",
    description: "Beleza completa, cuidado e uma experiência feita para você.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
