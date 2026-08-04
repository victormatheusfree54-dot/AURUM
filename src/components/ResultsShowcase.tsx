"use client";

import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useState } from "react";

const transformations = [
  {
    image: "/images/transformacao-1.png",
    category: "Tratamento & finalização",
    title: "Alinhamento com movimento",
    without: ["Fios sem definição", "Volume irregular", "Pontas desalinhadas"],
    with: ["Textura alinhada", "Brilho uniforme", "Movimento natural"],
  },
  {
    image: "/images/transformacao-2.png",
    category: "Cor & styling",
    title: "Cor iluminada e ondas",
    without: ["Tom pouco valorizado", "Comprimento sem forma", "Baixa luminosidade"],
    with: ["Mechas personalizadas", "Ondas bem definidas", "Cor com profundidade"],
  },
  {
    image: "/images/transformacao-3.png",
    category: "Mega hair",
    title: "Comprimento integrado",
    without: ["Comprimento limitado", "Base com pouco volume", "Corte sem continuidade"],
    with: ["Alongamento natural", "Volume equilibrado", "Integração imperceptível"],
  },
  {
    image: "/images/transformacao-4.png",
    category: "Cor & transformação",
    title: "Contorno iluminado",
    without: ["Cor sem contraste", "Fios com pouca dimensão", "Acabamento natural básico"],
    with: ["Luzes estratégicas", "Contorno valorizado", "Finalização sofisticada"],
  },
  {
    image: "/images/transformacao-5.png",
    category: "Loiro personalizado",
    title: "Luminosidade sob medida",
    without: ["Tom amarelado", "Cor sem uniformidade", "Pontas com pouca forma"],
    with: ["Loiro perolado", "Transição suave de tons", "Ondas leves e polidas"],
  },
];

export function ResultsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = transformations[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) => (current === 0 ? transformations.length - 1 : current - 1));
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % transformations.length);
  };

  return (
    <div className="resultsShowcase">
      <div className="resultViewer">
        <img src={active.image} alt={`Antes e depois — ${active.title}`} />
        <div className="resultImageLabels" aria-hidden="true">
          <span>Sem Aurum</span>
          <span>Com Aurum</span>
        </div>
        <span className="resultCounter">0{activeIndex + 1} / 0{transformations.length}</span>
      </div>

      <div className="resultDetails" aria-live="polite">
        <div className="resultDetailsTop">
          <span>{active.category}</span>
          <h3>{active.title}</h3>
          <p>Uma comparação real do cuidado antes e da transformação entregue pela nossa equipe.</p>
        </div>

        <div className="featureComparison">
          <div className="featureColumn featureColumnWithout">
            <strong>Sem o cuidado</strong>
            <ul>
              {active.without.map((feature) => (
                <li key={feature}><X size={14} /> {feature}</li>
              ))}
            </ul>
          </div>
          <div className="featureColumn featureColumnWith">
            <strong>Com a Aurum</strong>
            <ul>
              {active.with.map((feature) => (
                <li key={feature}><Check size={14} /> {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="resultControls">
          <button type="button" onClick={showPrevious} aria-label="Ver transformação anterior">
            <ArrowLeft size={18} />
          </button>
          <div className="resultDots" aria-label="Escolher transformação">
            {transformations.map((transformation, index) => (
              <button
                type="button"
                key={transformation.image}
                className={index === activeIndex ? "resultDotActive" : ""}
                onClick={() => setActiveIndex(index)}
                aria-label={`Ver transformação ${index + 1}: ${transformation.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
              >
                0{index + 1}
              </button>
            ))}
          </div>
          <button type="button" onClick={showNext} aria-label="Ver próxima transformação">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
