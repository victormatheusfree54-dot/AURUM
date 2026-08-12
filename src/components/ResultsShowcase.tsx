"use client";

import { ArrowLeftRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from "react";
import DepthCarousel, { type DepthCarouselItem } from "./DepthCarousel";
import { StarButton } from "./StarButton";

const photoPlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='1607' viewBox='0 0 1200 1607'%3E%3Crect width='1200' height='1607' fill='%23554b44'/%3E%3C/svg%3E";

type SalonPhotoProps = {
  name: string;
  alt: string;
  sizes?: string;
  shouldLoad: boolean;
};

function SalonPhoto({ name, alt, sizes = "(max-width: 820px) 90vw, 50vw", shouldLoad }: SalonPhotoProps) {
  return (
    <>
      <picture>
        {shouldLoad ? (
          <>
            <source
              srcSet={`/images/${name}-480.avif 480w, /images/${name}-720.avif 720w, /images/${name}-800.avif 800w, /images/${name}.avif 1200w`}
              sizes={sizes}
              type="image/avif"
            />
            <source
              srcSet={`/images/${name}-480.webp 480w, /images/${name}-720.webp 720w, /images/${name}-800.webp 800w, /images/${name}.webp 1200w`}
              sizes={sizes}
              type="image/webp"
            />
          </>
        ) : null}
        <img
          src={shouldLoad ? `/images/${name}.webp` : photoPlaceholder}
          alt={alt}
          width={1200}
          height={1607}
          loading="lazy"
          fetchPriority="low"
          decoding="async"
        />
      </picture>
      <noscript>
        <img src={`/images/${name}.webp`} alt={alt} width={1200} height={1607} loading="lazy" />
      </noscript>
    </>
  );
}

type BeforeAfterSliderProps = {
  before: string;
  after: string;
  title: string;
  className?: string;
  sizes?: string;
};

function BeforeAfterSlider({ before, after, title, className = "", sizes }: BeforeAfterSliderProps) {
  const [reveal, setReveal] = useState(50);
  const [shouldLoad, setShouldLoad] = useState(false);
  const isDraggingRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "350px 0px" }
    );

    observer.observe(slider);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stopDraggingOnWindow = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener("mouseup", stopDraggingOnWindow);

    return () => {
      window.removeEventListener("mouseup", stopDraggingOnWindow);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const updateRevealFromClientX = useCallback((clientX: number) => {
    const bounds = sliderRef.current?.getBoundingClientRect();
    if (!bounds || bounds.width <= 0) return;

    const rawPercent = ((clientX - bounds.left) / bounds.width) * 100;
    const nextReveal = Math.min(96, Math.max(4, rawPercent));

    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => {
      setReveal(nextReveal);
      frameRef.current = null;
    });
  }, []);

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    isDraggingRef.current = true;
    updateRevealFromClientX(event.clientX);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updateRevealFromClientX(event.clientX);
  };

  const stopDragging = () => {
    isDraggingRef.current = false;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keyActions: Record<string, () => void> = {
      ArrowLeft: () => setReveal((value) => Math.max(4, value - 2)),
      ArrowRight: () => setReveal((value) => Math.min(96, value + 2)),
      PageDown: () => setReveal((value) => Math.max(4, value - 10)),
      PageUp: () => setReveal((value) => Math.min(96, value + 10)),
      Home: () => setReveal(4),
      End: () => setReveal(96),
    };

    const action = keyActions[event.key];
    if (!action) return;
    event.preventDefault();
    event.stopPropagation();
    action();
  };

  return (
    <div
      ref={sliderRef}
      className={`beforeAfterSlider ${className}`}
      style={{ "--reveal": `${reveal}%` } as CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      <figure className="beforeAfterLayer beforeAfterBefore">
        <SalonPhoto name={before} alt={`Antes — ${title}`} sizes={sizes} shouldLoad={shouldLoad} />
        <figcaption>Antes</figcaption>
      </figure>
      <figure className="beforeAfterLayer beforeAfterAfter">
        <SalonPhoto name={after} alt={`Depois — ${title}`} sizes={sizes} shouldLoad={shouldLoad} />
        <figcaption>Depois</figcaption>
      </figure>
      <span className="beforeAfterDivider" aria-hidden="true" />
      <button
        type="button"
        className="beforeAfterHandle"
        aria-label={`Mover comparação de antes e depois: ${title}`}
        aria-orientation="horizontal"
        aria-valuemin={4}
        aria-valuemax={96}
        aria-valuenow={Math.round(reveal)}
        aria-valuetext={`${Math.round(reveal)}% da imagem Antes visível`}
        role="slider"
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
      >
        <ArrowLeftRight size={18} strokeWidth={1.4} aria-hidden="true" />
      </button>
    </div>
  );
}

const transformations: DepthCarouselItem[] = [
  {
    id: "morena-iluminada",
    before: "transformacao-4-antes",
    after: "transformacao-4-depois",
    title: "Morena iluminada",
    detail: "Luz, contraste e ondas marcantes com brilho tridimensional.",
    tags: ["Coloração", "Iluminação", "Tonalização"],
  },
  {
    id: "mega-hair",
    before: "transformacao-2-antes",
    after: "transformacao-2-depois",
    title: "Mega Hair",
    detail: "Mais comprimento, volume e movimento natural para os fios.",
    tags: ["Mega Hair", "Volume"],
  },
  {
    id: "recuperacao-fios",
    before: "transformacao-1-antes",
    after: "transformacao-1-depois",
    title: "Recuperação dos fios",
    detail: "Textura alinhada, nutrição profunda e restauração da fibra.",
    tags: ["Tratamento", "Restauração"],
  },
  {
    id: "loiro-luminoso",
    before: "transformacao-3-antes",
    after: "transformacao-3-depois",
    title: "Loiro luminoso",
    detail: "Tonalidade elegante com acabamento suave e proteção completa.",
    tags: ["Loiro Luxo", "Finalização"],
  },
  {
    id: "aurum-woman",
    before: "modelo-frente-antes",
    after: "modelo-frente-depois",
    title: "Transformação Aurum Woman",
    detail: "Acolhimento e atendimento exclusivo para valorizar sua essência.",
    tags: ["Mega Hair", "Experiência"],
  },
];

export function ResultsShowcase() {
  const [activeItem, setActiveItem] = useState<DepthCarouselItem>(transformations[0]);

  return (
    <section className="resultsSection" id="resultados" aria-labelledby="transformations-title">
      <div className="resultsContainer">
        <header className="resultsEditorialHeader">
          <span className="resultsTagline">TRANSFORMAÇÕES REAIS</span>
          <h2 id="transformations-title">
            Resultados reais, <em>beleza do seu jeito.</em>
          </h2>
          <p>
            Deslize a divisória no centro para comparar o antes e depois de cada trabalho realizado pelo time do Aurum Beauty Concept.
          </p>
        </header>

        <div className="resultsDepthWrapper">
          <DepthCarousel
            items={transformations}
            cardWidth={700}
            cardHeight={900}
            depth={260}
            spread={180}
            tilt={16}
            tiltDirection="right"
            perspective={1800}
            visibleCards={3}
            blur={5}
            autoplay={false}
            onChange={(_, item) => setActiveItem(item)}
            renderCardContent={(item, isActive) => {
              if (isActive && item.before && item.after) {
                return (
                  <BeforeAfterSlider
                    before={item.before}
                    after={item.after}
                    title={item.title}
                    className="depthCardSlider"
                    sizes="(max-width: 768px) 95vw, 700px"
                  />
                );
              }
              return (
                <SalonPhoto
                  name={item.after || "transformacao-4-depois"}
                  alt={item.title}
                  sizes="(max-width: 768px) 95vw, 700px"
                  shouldLoad={true}
                />
              );
            }}
          />

          <div className="resultsActiveDetail">
            <h3>{activeItem.title}</h3>
            <p>{activeItem.detail}</p>
            {activeItem.tags && (
              <div className="resultsTags">
                {activeItem.tags.map((tag) => (
                  <span key={tag} className="resultsTag">
                    [ {tag} ]
                  </span>
                ))}
              </div>
            )}

            <div className="resultsCtaWrap">
              <StarButton href="#contato">
                Quero viver minha transformação
              </StarButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
