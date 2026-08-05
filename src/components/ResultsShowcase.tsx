import { ArrowRight, Sparkles } from "lucide-react";

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

const transformations = [
  { id: "01", name: "transformacao-4", title: "Morena iluminada", detail: "Luz, contraste e ondas marcantes" },
  { id: "02", name: "transformacao-2", title: "Corte em camadas", detail: "Mais comprimento, balanço e presença" },
  { id: "03", name: "transformacao-1", title: "Recuperação dos fios", detail: "Textura alinhada, brilho e movimento natural" },
  { id: "04", name: "transformacao-3", title: "Loiro luminoso", detail: "Tonalidade elegante e acabamento suave" },
];

export function ResultsShowcase() {
  return (
    <div className="newResultsExperience">
      <section className="frontModelFeature" aria-labelledby="front-model-title">
        <div className="frontModelFrame">
          <div className="frontModelPhotos">
            <figure className="frontModelPhoto frontModelPhotoBefore">
              <SalonPhoto name="modelo-frente-antes" alt="Modelo antes da transformação Aurum" eager />
              <figcaption>Antes</figcaption>
            </figure>
            <figure className="frontModelPhoto frontModelPhotoAfter">
              <SalonPhoto name="modelo-frente-depois" alt="Modelo depois da transformação Aurum" eager />
              <figcaption>Depois</figcaption>
            </figure>
          </div>
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
        <div className="backTransformationsHeader">
          <div>
            <span>Antes & depois</span>
            <h2 id="back-transformations-title">Transformações que<br /><em>fazem você se reconhecer.</em></h2>
          </div>
          <p>
            Cada resultado conta uma história de cuidado, confiança e beleza feita para você.
          </p>
        </div>

        <div className="backComparisonGrid">
          {transformations.map((item) => (
            <article className="backComparisonCard" key={item.id}>
              <div className="backComparisonMedia">
                <figure className="backPhotoSlot">
                  <SalonPhoto name={`${item.name}-antes`} alt={`Antes — ${item.title}`} />
                  <figcaption>Antes</figcaption>
                </figure>
                <figure className="backPhotoSlot backPhotoSlotAfter">
                  <SalonPhoto name={`${item.name}-depois`} alt={`Depois — ${item.title}`} />
                  <figcaption>Depois</figcaption>
                </figure>
                <span className="backComparisonDivider" aria-hidden="true" />
              </div>
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
