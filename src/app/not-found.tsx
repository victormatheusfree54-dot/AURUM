import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <main>
      <Header />
      <section className="notFoundPage">
        <div className="notFoundInner">
          <span>404</span>
          <h1>Página não encontrada.</h1>
          <p>
            Esse endereço não existe mais ou foi digitado com algum detalhe diferente. Volte para o site da Aurum e continue por lá.
          </p>
          <div className="notFoundActions">
            <a className="button buttonGold" href="/">
              Voltar ao início <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a className="button buttonOutline" href="/#contato">
              Ir para contato
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
