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
  maps:
    "https://www.google.com/maps/search/?api=1&query=Av.%20das%20Am%C3%A9ricas%2C%2019020%20-%20Recreio%20dos%20Bandeirantes%2C%20Rio%20de%20Janeiro",
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
