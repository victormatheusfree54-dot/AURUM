"use client";

import { ArrowLeftRight, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from "react";

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
      { rootMargin: "350px 0px" },
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

const transformations = [
  { name: "transformacao-4", title: "Morena iluminada", detail: "Luz, contraste e ondas marcantes" },
  { name: "transformacao-2", title: "Corte em camadas", detail: "Mais comprimento, balanço e presença" },
  { name: "transformacao-1", title: "Recuperação dos fios", detail: "Textura alinhada, brilho e movimento natural" },
  { name: "transformacao-3", title: "Loiro luminoso", detail: "Tonalidade elegante e acabamento suave" },
];

export function ResultsShowcase() {
  return (
    <div className="resultsExperience">
      <section className="resultsFeatureBand" aria-labelledby="front-model-title">
        <div className="resultsFeatureInner">
          <div className="resultsFeatureCopy">
            <h2 id="front-model-title">Transformações que <em>fazem você se reconhecer.</em></h2>
            <p>
              Resultados reais, respeitando o seu estilo e a sua história. Aqui, a mulher continua sendo a protagonista.
            </p>
            <a href="#contato" className="resultsFeatureLink">
              Quero viver minha transformação <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="resultsFeatureMedia">
            <BeforeAfterSlider
              before="modelo-frente-antes"
              after="modelo-frente-depois"
              title="Transformação Aurum Woman"
              className="resultsFeatureSlider"
              sizes="(max-width: 820px) 100vw, min(56vw, 720px)"
            />
          </div>
        </div>
      </section>

      <section className="resultsRailSection" aria-labelledby="transformations-title">
        <header className="resultsRailHeader">
          <h2 id="transformations-title">Resultados reais, <em>beleza do seu jeito.</em></h2>
          <p>
            Segure a bolinha e arraste a linha para descobrir cada transformação. As imagens mantêm a proporção original para uma comparação honesta.
          </p>
        </header>

        <div className="resultsRailViewport">
          <div className="resultsRail">
            {transformations.map((item) => (
              <article className="resultsRailItem" key={item.name}>
                <BeforeAfterSlider
                  before={`${item.name}-antes`}
                  after={`${item.name}-depois`}
                  title={item.title}
                  className="resultsRailSlider"
                  sizes="(max-width: 560px) 84vw, (max-width: 1100px) 48vw, min(31vw, 460px)"
                />
                <div className="resultsRailCaption">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
