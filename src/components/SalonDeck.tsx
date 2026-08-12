"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

const salonPhotos = [
  {
    src: "/images/salao-hall-principal.webp",
    alt: "Hall principal da Aurum Beauty Concept com logo iluminada e poltronas",
    title: "Hall principal",
  },
  {
    src: "/images/salao-aurum-recreio.webp",
    alt: "Recepção da Aurum Beauty Concept no Recreio dos Bandeirantes",
    title: "Recepção Aurum",
  },
  {
    src: "/images/salao-nail-design.webp",
    alt: "Espaço de manicure e nail design da Aurum Beauty Concept",
    title: "Nail experience",
  },
  {
    src: "/images/salao-estacoes-beleza.webp",
    alt: "Estações de cabelo da Aurum Beauty Concept com espelhos iluminados",
    title: "Estações de beleza",
  },
];

export function SalonDeck() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="salonDeckSection" id="espaco">
      <div className="salonDeckSticky">
        <header className="salonDeckIntro">
          <h2>Um espaço pensado para você se sentir <em>cuidada.</em></h2>
          <span className="salonDeckRule" aria-hidden="true" />
          <p>
            Do primeiro acolhimento ao último detalhe, cada ambiente foi criado para transformar o seu momento de beleza.
          </p>
          <a className="salonDeckLink" href="#contato">
            Conheça nosso endereço <ArrowRight size={16} aria-hidden="true" />
          </a>
        </header>

        <div className="salonDeckCards">
          {salonPhotos.map((photo, index) => (
            <figure
              className={`salonDeckCard${activeIndex === index ? " salonDeckCardActive" : ""}`}
              key={photo.src}
            >
              <button
                className="salonDeckPhoto"
                type="button"
                aria-label={`${activeIndex === index ? "Reduzir" : "Ampliar"} foto: ${photo.title}`}
                aria-pressed={activeIndex === index}
                onClick={() => setActiveIndex((current) => current === index ? null : index)}
              >
                <img
                  src={photo.src}
                  srcSet={`${photo.src.replace(".webp", "-480.webp")} 480w, ${photo.src.replace(".webp", "-720.webp")} 720w, ${photo.src} 1200w`}
                  sizes="(max-width: 820px) 76vw, 28vw"
                  alt={photo.alt}
                  width={1200}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <figcaption>
                <strong>{photo.title}</strong>
                <span aria-hidden="true" />
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="salonDeckProgress" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
