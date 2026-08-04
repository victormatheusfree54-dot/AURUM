import { ArrowRight, ImagePlus, Sparkles } from "lucide-react";

export function ResultsShowcase() {
  return (
    <div className="newResultsExperience">
      <section className="frontModelFeature" aria-labelledby="front-model-title">
        <div className="frontModelFrame">
          <div className="frontModelPlaceholder">
            <ImagePlus size={28} strokeWidth={1.2} />
            <span>Foto principal</span>
            <small>Modelo de frente</small>
          </div>
          <span className="frontModelNumber">01</span>
          <span className="frontModelVertical">AURUM WOMAN</span>
        </div>

        <div className="frontModelCopy">
          <Sparkles size={18} strokeWidth={1.3} />
          <h2 id="front-model-title">Ela chega.<br /><em>A presença fica.</em></h2>
          <p>
            Um espaço de destaque para apresentar beleza, personalidade e confiança de frente —
            com a mulher como protagonista da transformação.
          </p>
          <div className="frontModelStatement">
            <span>Beleza que não transforma quem você é.</span>
            <strong>Revela.</strong>
          </div>
          <a href="#contato" className="frontModelLink">Viva sua experiência Aurum <ArrowRight size={16} /></a>
        </div>
      </section>

      <section className="backTransformations" aria-labelledby="back-transformations-title">
        <div className="backTransformationsHeader">
          <div>
            <span>Antes & depois</span>
            <h2 id="back-transformations-title">Transformações vistas<br /><em>por todos os ângulos.</em></h2>
          </div>
          <p>
            Esta galeria será exclusiva para as fotos de costas, mostrando comprimento, volume,
            cor, textura e acabamento com uma comparação clara.
          </p>
        </div>

        <div className="backComparisonGrid">
          {[1, 2, 3].map((item) => (
            <article className="backComparisonCard" key={item}>
              <div className="backComparisonMedia">
                <div className="backPhotoSlot">
                  <span>Antes</span>
                  <ImagePlus size={22} strokeWidth={1.15} />
                </div>
                <div className="backPhotoSlot backPhotoSlotAfter">
                  <span>Depois</span>
                  <ImagePlus size={22} strokeWidth={1.15} />
                </div>
                <span className="backComparisonDivider" aria-hidden="true" />
              </div>
              <div className="backComparisonCaption">
                <span>0{item}</span>
                <div><strong>Transformação real</strong><small>Fotos atualizadas em breve</small></div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
