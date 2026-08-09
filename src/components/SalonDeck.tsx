"use client";

import { ArrowDown, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

const salonPhotos = [
  {
    src: "/images/salao-hall-principal.jpeg",
    alt: "Hall principal da Aurum Beauty Concept com logo iluminada e poltronas",
    title: "Hall principal",
    detail: "Elegância desde a chegada",
  },
  {
    src: "/images/salao-aurum-recreio.jpeg",
    alt: "Recepção da Aurum Beauty Concept no Recreio dos Bandeirantes",
    title: "Recepção Aurum",
    detail: "Acolhimento em cada detalhe",
  },
  {
    src: "/images/salao-nail-design.jpeg",
    alt: "Espaço de manicure e nail design da Aurum Beauty Concept",
    title: "Nail experience",
    detail: "Seu momento de cuidado",
  },
  {
    src: "/images/salao-hall-lateral.jpeg",
    alt: "Ambiente interno da Aurum Beauty Concept com logo dourada",
    title: "Arquitetura & beleza",
    detail: "Um espaço feito para você",
  },
  {
    src: "/images/salao-estacoes-beleza.jpeg",
    alt: "Estações de cabelo da Aurum Beauty Concept com espelhos iluminados",
    title: "Estações de beleza",
    detail: "Conforto para se transformar",
  },
];

const cardRotations = [-4.5, 3.4, -2.8, 4.2, -1.8];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

export function SalonDeck() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter((card): card is HTMLElement => card !== null);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!section || cards.length === 0 || reducedMotion.matches) return;

    let animationFrame = 0;

    const updateDeck = () => {
      animationFrame = 0;

      const rect = section.getBoundingClientRect();
      const scrollDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-rect.top / scrollDistance);
      const easedProgress = easeInOutCubic(progress);
      const viewportWidth = window.innerWidth;
      const cardWidth = cards[0].offsetWidth;
      const cardStep = cardWidth * (viewportWidth <= 560 ? 0.76 : 0.7);
      const startX = viewportWidth * 0.5 - cardWidth * 0.5;
      const endX = startX - cardStep * (cards.length - 1);
      const deckX = startX + (endX - startX) * easedProgress;

      let activeIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = deckX + cardStep * index + cardWidth * 0.5;
        const distanceFromCenter = Math.abs(cardCenter - viewportWidth * 0.5);
        const focus = clamp(1 - distanceFromCenter / Math.max(viewportWidth * 0.62, cardWidth));
        const rotation = cardRotations[index] * (1 - focus * 0.82);
        const scale = 0.9 + focus * 0.1;
        const lift = 22 - focus * 38;

        if (distanceFromCenter < closestDistance) {
          closestDistance = distanceFromCenter;
          activeIndex = index;
        }

        card.style.opacity = `${0.5 + focus * 0.5}`;
        card.style.zIndex = `${20 + Math.round(focus * 80)}`;
        card.style.transform = `translate3d(${deckX + cardStep * index}px, calc(-50% + ${lift}px), 0) rotate(${rotation}deg) scale(${scale})`;
        card.dataset.active = focus > 0.78 ? "true" : "false";
      });

      if (counterRef.current) {
        counterRef.current.textContent = String(activeIndex + 1).padStart(2, "0");
      }

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateDeck);
    };

    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(section);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    updateDeck();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="salonDeckSection" id="espaco" ref={sectionRef}>
      <div className="salonDeckSticky">
        <div className="salonDeckGlow" aria-hidden="true" />
        <span className="salonDeckWatermark" aria-hidden="true">AURUM</span>

        <header className="salonDeckIntro">
          <p className="eyebrow"><span /> Por dentro da Aurum</p>
          <h2>
            Um espaço para viver
            <em> a sua melhor versão.</em>
          </h2>
          <p>
            Desça para percorrer cada ambiente — do primeiro acolhimento ao seu momento de transformação.
          </p>
        </header>

        <div className="salonDeckCards" role="list" aria-label="Ambientes da Aurum Beauty Concept">
          {salonPhotos.map((photo, index) => (
            <figure
              className="salonDeckCard"
              key={photo.src}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              role="listitem"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{photo.title}</strong>
                  <small>{photo.detail}</small>
                </div>
                <Sparkles size={16} aria-hidden="true" />
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="salonDeckStatus" aria-hidden="true">
          <div className="salonDeckCounter">
            <span ref={counterRef}>01</span>
            <i />
            <small>{String(salonPhotos.length).padStart(2, "0")}</small>
          </div>
          <div className="salonDeckProgress"><span ref={progressRef} /></div>
          <p>Continue descendo <ArrowDown size={14} /></p>
        </div>
      </div>
    </section>
  );
}
