"use client";

import { ArrowLeftRight, ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

type SalonPhotoProps = {
  name: string;
  alt: string;
  eager?: boolean;
};

function SalonPhoto({ name, alt, eager = false }: SalonPhotoProps) {
  return (
    <picture>
      <source srcSet={`/images/${name}.avif`} type="image/avif" />
      <source srcSet={`/images/${name}.webp`} type="image/webp" />
      <img
        src={`/images/${name}.webp`}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </picture>
  );
}

type BeforeAfterSliderProps = {
  before: string;
  after: string;
  title: string;
  className?: string;
  eager?: boolean;
};

function BeforeAfterSlider({ before, after, title, className = "", eager = false }: BeforeAfterSliderProps) {
  const [reveal, setReveal] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  const updateReveal = (clientX: number) => {
    const bounds = sliderRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const nextReveal = ((clientX - bounds.left) / bounds.width) * 100;
    setReveal(Math.min(96, Math.max(4, nextReveal)));
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    updateReveal(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) updateReveal(event.clientX);
  };

  return (
    <div ref={sliderRef} className={`beforeAfterSlider ${className}`} style={{ "--reveal": `${reveal}%` } as CSSProperties}>
      <figure className="beforeAfterLayer beforeAfterBefore">
        <SalonPhoto name={before} alt={`Antes — ${title}`} eager={eager} />
        <figcaption>Antes</figcaption>
      </figure>
      <figure className="beforeAfterLayer beforeAfterAfter">
        <SalonPhoto name={after} alt={`Depois — ${title}`} eager={eager} />
        <figcaption>Depois</figcaption>
      </figure>
      <span className="beforeAfterDivider" aria-hidden="true" />
      <button
        type="button"
        className="beforeAfterHandle"
        aria-label={`Mover comparação de antes e depois: ${title}`}
        aria-valuemin={4}
        aria-valuemax={96}
        aria-valuenow={Math.round(reveal)}
        role="slider"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") setReveal((value) => Math.max(4, value - 2));
          if (event.key === "ArrowRight") setReveal((value) => Math.min(96, value + 2));
        }}
      >
        <ArrowLeftRight size={18} strokeWidth={1.4} aria-hidden="true" />
      </button>
    </div>
  );
}

const transformations = [
  { id: "01", name: "transformacao-4", title: "Morena iluminada", detail: "Luz, contraste e ondas marcantes" },
  { id: "02", name: "transformacao-2", title: "Corte em camadas", detail: "Mais comprimento, balanço e presença" },
  { id: "03", name: "transformacao-1", title: "Recuperação dos fios", detail: "Textura alinhada, brilho e movimento natural" },
  { id: "04", name: "transformacao-3", title: "Loiro luminoso", detail: "Tonalidade elegante e acabamento suave" },
];

export function ResultsShowcase() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".resultsReveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("isRevealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="newResultsExperience">
      <section className="frontModelFeature resultsReveal" aria-labelledby="front-model-title">
        <div className="frontModelFrame">
          <BeforeAfterSlider
            before="modelo-frente-antes"
            after="modelo-frente-depois"
            title="Transformação Aurum Woman"
            className="frontModelPhotos"
            eager
          />
          <span className="frontModelNumber">01</span>
          <span className="frontModelVertical">AURUM WOMAN</span>
        </div>

        <div className="frontModelCopy">
          <Sparkles size={18} strokeWidth={1.3} />
          <h2 id="front-model-title">Ela chega.<br /><em>A presença fica.</em></h2>
          <p>
            Beleza, personalidade e confiança de frente — com a mulher como protagonista da transformação.
          </p>
          <div className="frontModelStatement">
            <span>Beleza que não transforma quem você é.</span>
            <strong>Revela.</strong>
          </div>
          <a href="#contato" className="frontModelLink">Viva sua experiência Aurum <ArrowRight size={16} /></a>
        </div>
      </section>

      <section className="backTransformations" aria-labelledby="back-transformations-title">
        <div className="backTransformationsHeader resultsReveal">
          <div>
            <span>Antes & depois</span>
            <h2 id="back-transformations-title">Transformações que<br /><em>fazem você se reconhecer.</em></h2>
          </div>
          <p>
            Cada resultado conta uma história de cuidado, confiança e beleza feita para você.
          </p>
        </div>

        <div className="backComparisonGrid">
          {transformations.map((item, index) => (
            <article className="backComparisonCard resultsReveal" style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties} key={item.id}>
              <BeforeAfterSlider
                before={`${item.name}-antes`}
                after={`${item.name}-depois`}
                title={item.title}
                className="backComparisonMedia"
              />
              <div className="backComparisonCaption">
                <span>{item.id}</span>
                <div><strong>{item.title}</strong><small>{item.detail}</small></div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
