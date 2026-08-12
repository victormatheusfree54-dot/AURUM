import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Obrigada pelo contato",
  description:
    "Página de confirmação de contato da Aurum Beauty Concept.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/obrigado",
  },
};

export default function ThanksPage() {
  return (
    <main>
      <Header />
      <section className="notFoundPage">
        <div className="notFoundInner">
          <span>Obrigada</span>
          <h1>Seu próximo momento já começou.</h1>
          <p>
            Quando o site tiver um formulário próprio, essa página fica pronta para receber a confirmação de envio.
          </p>
          <div className="notFoundActions">
            <a className="button buttonGold" href="/#contato">
              Voltar para contato <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a className="button buttonOutline" href="/">
              Início
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
