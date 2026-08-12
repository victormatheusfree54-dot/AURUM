const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl = new URL(configuredSiteUrl || "https://aurum-beauty-concept.vercel.app");

export const siteConfig = {
  name: "Aurum Beauty Concept",
  legalName: "Salão Aurum Beauty Concept",
  title: "Aurum Beauty Concept | Salão de beleza no Recreio",
  description:
    "Salão de beleza no Recreio dos Bandeirantes especializado em mega hair, cabelos, unhas e estética, com atendimento próximo e experiência completa.",
  locale: "pt_BR",
  language: "pt-BR",
  instagram: "https://www.instagram.com/aurumbeautyconcept/",
  maps: "https://maps.app.goo.gl/2z6yN5c4Kuccksm46",
  address: {
    streetAddress: "Av. das Américas, 19020",
    addressLocality: "Rio de Janeiro",
    addressRegion: "RJ",
    postalCode: "22790-704",
    addressCountry: "BR",
    neighborhood: "Recreio dos Bandeirantes",
  },
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
