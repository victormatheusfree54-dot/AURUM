"use client";

import { ArrowRight, Maximize2, X } from "lucide-react";
import { useState } from "react";

const salonPhotos = [
  {
    src: "/images/salao-hall-principal.webp",
    alt: "Hall principal da Aurum Beauty Concept com logo iluminada e poltronas",
    title: "Hall Principal",
    subtitle: "Acolhimento & Elegância",
    description: "Recepção ampla com pé-direito elevado, iluminação cenográfica e lounge aconchegante para receber você com todo o conforto.",
  },
  {
    src: "/images/salao-aurum-recreio.webp",
    alt: "Recepção da Aurum Beauty Concept no Recreio dos Bandeirantes",
    title: "Recepção Aurum",
    subtitle: "Experiência Exclusiva",
    description: "Atendimento personalizado em ambiente climatizado com serviço de bar e recepção dedicada ao seu bem-estar.",
  },
  {
    src: "/images/salao-nail-design.webp",
    alt: "Espaço de manicure e nail design da Aurum Beauty Concept",
    title: "Nail Experience",
    subtitle: "Precisão & Cuidado",
    description: "Bancadas exclusivas para manicure, pedicure e nail art avançada com equipamentos esterilizados e máxima biossegurança.",
  },
  {
    src: "/images/salao-estacoes-beleza.webp",
    alt: "Estações de cabelo da Aurum Beauty Concept com espelhos iluminados",
    title: "Estações de Beleza",
    subtitle: "Alta Performance Capilar",
    description: "Cadeiras ergonômicas e espelhos camarim com temperatura de iluminação ideal para transformações de mega hair e coloração.",
  },
];

export function SalonDeck() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalPhoto, setModalPhoto] = useState<typeof salonPhotos[0] | null>(null);

  const activePhoto = salonPhotos[selectedIndex];

  return (
    <section className="salonSection" id="espaco">
      <div className="salonContainer">
        <header className="salonHeader">
          <span className="salonTagline">O NOSSO ESPAÇO</span>
          <h2>Um espaço pensado para você se sentir <em>cuidada.</em></h2>
          <p>
            Do primeiro acolhimento ao último detalhe, cada ambiente foi planejado para transformar seu momento de beleza em uma experiência memorável.
          </p>
        </header>

        <div className="salonGrid">
          {/* Main Showcase Viewport */}
          <div className="salonMainFeature">
            <div className="salonFeatureMedia">
              <picture key={activePhoto.src}>
                <source
                  srcSet={`${activePhoto.src.replace(".webp", "-480.webp")} 480w, ${activePhoto.src.replace(".webp", "-720.webp")} 720w, ${activePhoto.src} 1200w`}
                  sizes="(max-width: 900px) 100vw, 55vw"
                  type="image/webp"
                />
                <img
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  width={1200}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                />
              </picture>

              <button
                type="button"
                className="salonZoomBtn"
                aria-label={`Ampliar imagem de ${activePhoto.title}`}
                onClick={() => setModalPhoto(activePhoto)}
              >
                <Maximize2 size={18} aria-hidden="true" />
                <span>Ampliar foto</span>
              </button>
            </div>

            <div className="salonFeatureInfo">
              <div>
                <span className="salonFeatureSubtitle">{activePhoto.subtitle}</span>
                <h3 className="salonFeatureTitle">{activePhoto.title}</h3>
                <p className="salonFeatureDesc">{activePhoto.description}</p>
              </div>

              {/* Uiverse Custom Button requested by user */}
              <div className="salonActionWrap">
                <a
                  href="#contato"
                  className="uiverseBtn group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content-[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content-[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
                >
                  Ver mais do espaço
                </a>
              </div>
            </div>
          </div>

          {/* Selector Thumbnails Grid */}
          <div className="salonThumbnails">
            {salonPhotos.map((photo, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={photo.src}
                  type="button"
                  className={`salonThumbCard${isSelected ? " salonThumbSelected" : ""}`}
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Selecionar ambiente ${photo.title}`}
                  aria-pressed={isSelected}
                >
                  <div className="salonThumbMedia">
                    <img
                      src={photo.src.replace(".webp", "-480.webp")}
                      alt={photo.alt}
                      width={480}
                      height={640}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="salonThumbMeta">
                    <strong>{photo.title}</strong>
                    <span>{photo.subtitle}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {modalPhoto && (
        <div
          className="salonModalBackdrop"
          role="dialog"
          aria-modal="true"
          aria-label={modalPhoto.title}
          onClick={() => setModalPhoto(null)}
        >
          <div className="salonModalContent" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="salonModalClose"
              aria-label="Fechar foto ampliada"
              onClick={() => setModalPhoto(null)}
            >
              <X size={24} aria-hidden="true" />
            </button>
            <img
              src={modalPhoto.src}
              alt={modalPhoto.alt}
              width={1200}
              height={1600}
            />
            <div className="salonModalCaption">
              <h4>{modalPhoto.title}</h4>
              <p>{modalPhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
