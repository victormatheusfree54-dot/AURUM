"use client";

import { MoveHorizontal } from "lucide-react";
import { useState } from "react";

type BeforeAfterProps = {
  beforeSrc: string;
  afterSrc: string;
  title: string;
  description: string;
};

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  title,
  description,
}: BeforeAfterProps) {
  const [position, setPosition] = useState(52);

  return (
    <article className="resultCard">
      <div className="comparison" style={{ "--position": `${position}%` } as React.CSSProperties}>
        <img
          className="comparisonImage comparisonBefore"
          src={beforeSrc}
          alt={`Antes — ${title}`}
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />
        <img
          className="comparisonImage comparisonAfter"
          src={afterSrc}
          alt={`Depois — ${title}`}
        />

        <span className="comparisonLabel comparisonLabelBefore">Antes</span>
        <span className="comparisonLabel comparisonLabelAfter">Depois</span>

        <div className="comparisonLine" style={{ left: `${position}%` }} aria-hidden="true">
          <span>
            <MoveHorizontal size={18} />
          </span>
        </div>

        <input
          className="comparisonRange"
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`Comparar antes e depois de ${title}`}
        />
      </div>
      <div className="resultCaption">
        <div>
          <span>Transformação</span>
          <h3>{title}</h3>
        </div>
        <p>{description}</p>
      </div>
    </article>
  );
}
