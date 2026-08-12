import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de privacidade do site da Aurum Beauty Concept, salão de beleza no Recreio dos Bandeirantes.",
  alternates: {
    canonical: "/privacidade",
  },
  openGraph: {
    title: "Política de Privacidade | Aurum Beauty Concept",
    description:
      "Como o site da Aurum Beauty Concept trata informações, links externos e contato com visitantes.",
    url: "/privacidade",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <main>
      <Header />
      <section className="legalPage">
        <div className="legalInner">
          <a className="legalBackLink" href="/">
            Voltar ao site
          </a>
          <h1>Política de Privacidade</h1>
          <p>
            Esta página explica, de forma simples, como o site da {siteConfig.name} lida com informações de visitantes.
          </p>

          <h2>Coleta de informações</h2>
          <p>
            Este site não possui cadastro, login ou formulário próprio nesta versão. Ao clicar em links para Instagram ou Google Maps,
            você será direcionada para plataformas externas, que possuem suas próprias políticas de privacidade.
          </p>

          <h2>Links externos</h2>
          <p>
            O site pode direcionar para o Instagram oficial da Aurum Beauty Concept e para rotas no Google Maps. Não controlamos os
            dados coletados por esses serviços externos.
          </p>

          <h2>Imagens e conteúdo</h2>
          <p>
            As imagens exibidas no site são usadas para apresentar o espaço, os resultados e a experiência da Aurum Beauty Concept.
          </p>

          <h2>Contato</h2>
          <p>
            Para dúvidas sobre atendimento, agendamento ou informações do salão, use os canais oficiais indicados no site.
          </p>

          <p className="legalUpdated">Última atualização: agosto de 2026.</p>
        </div>
      </section>
    </main>
  );
}
