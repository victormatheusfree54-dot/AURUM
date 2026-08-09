import {
  ArrowDownRight,
  ArrowRight,
  MapPin,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";
import { Header } from "@/components/Header";
import { InstagramIcon } from "@/components/InstagramIcon";
import { ResultsShowcase } from "@/components/ResultsShowcase";
import { ScrollRevealController } from "@/components/ScrollRevealController";
import { absoluteUrl, siteConfig } from "@/lib/site";

const reviews = [
  {
    name: "Michele Baima",
    time: "5 dias atrás",
    text: "Amei o espaço, a recepção das meninas e o meu cabelo ficou simplesmente incrível!",
  },
  {
    name: "Fernanda Chagas",
    time: "3 semanas atrás",
    text: "Nunca tinha ido, foi a melhor experiência que eu tive! Me senti como em um encontro de melhores amigas! Não troco!",
  },
  {
    name: "Roberta Freitas",
    time: "3 semanas atrás",
    text: "Melhor salão especializado em mega hair do Rio de Janeiro! Surreal esse espaço! Tem de tudo: cabelo, unha, mega e estética.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: absoluteUrl("/"),
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      publisher: { "@id": absoluteUrl("/#beauty-salon") },
    },
    {
      "@type": "BeautySalon",
      "@id": absoluteUrl("/#beauty-salon"),
      name: siteConfig.legalName,
      alternateName: siteConfig.name,
      url: absoluteUrl("/"),
      description: siteConfig.description,
      image: [
        absoluteUrl("/images/salao-aurum-recreio.jpeg"),
        absoluteUrl("/images/aurum-logo.webp"),
        absoluteUrl("/images/modelo-frente-depois.webp"),
      ],
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/aurum-logo.webp"),
        width: 900,
        height: 502,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.streetAddress,
        addressLocality: siteConfig.address.addressLocality,
        addressRegion: siteConfig.address.addressRegion,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.addressCountry,
      },
      areaServed: {
        "@type": "Place",
        name: `${siteConfig.address.neighborhood}, Rio de Janeiro`,
      },
      sameAs: [siteConfig.instagram],
      hasMap: siteConfig.maps,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 5,
        reviewCount: 3,
        bestRating: 5,
        worstRating: 1,
      },
      review: reviews.map((review) => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: review.name,
        },
        reviewBody: review.text,
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
      })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços de beleza",
        itemListElement: [
          "Mega hair e alongamentos",
          "Cor, corte e tratamentos capilares",
          "Manicure e nail design",
          "Estética e cuidados de beleza",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
          },
        })),
      },
    },
  ],
};

const safeStructuredData = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export default function Home() {
  const mapsUrl = siteConfig.maps;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeStructuredData }}
      />
      <Header />
      <ScrollRevealController />

      <section className="hero" id="inicio">
        <div className="heroCopy">
          <p className="eyebrow">
            <span /> Aurum Beauty Concept
          </p>
          <h1>
            Beleza que revela
            <em> a sua melhor versão.</em>
          </h1>
          <p className="heroText">
            Mega hair, cabelos, unhas e estética em um espaço feito para transformar o seu momento
            de cuidado em uma experiência inesquecível.
          </p>
          <div className="heroActions">
            <a className="button buttonDark" href="#resultados">
              Conheça os resultados <ArrowDownRight size={18} />
            </a>
            <a
              className="textLink"
              href="https://www.instagram.com/aurumbeautyconcept/"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon size={17} /> @aurumbeautyconcept
            </a>
          </div>
        </div>

        <div className="heroVisual">
          <div className="heroFrame">
            <div className="photoPlaceholder heroPhotoPlaceholder" aria-label="Espaço reservado para a nova foto principal">
              <span>Nova imagem principal</span>
              <small>Modelo de frente</small>
            </div>
            <span className="verticalWord">AURUM</span>
          </div>
          <div className="ratingCard">
            <div className="ratingStars" aria-label="5 de 5 estrelas">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={14} fill="currentColor" />
              ))}
            </div>
            <strong>5,0</strong>
            <span>Experiência avaliada no Google</span>
          </div>
          <div className="heroSeal" aria-hidden="true">
            <Sparkles size={18} />
            <span>Beauty<br />Concept</span>
          </div>
        </div>
      </section>

      <section className="trustStrip" aria-label="Destaques">
        <p>Um salão. Todas as suas versões.</p>
        <div>
          <span><strong>5,0</strong> no Google</span>
          <span><strong>4</strong> áreas de cuidado</span>
          <span><strong>1</strong> experiência completa</span>
        </div>
      </section>

      <section className="resultsSection" id="resultados">
        <div className="section resultsInner">
          <ResultsShowcase />
        </div>
      </section>

      <section className="section aboutSection">
        <div className="aboutVisual">
          <div className="photoPlaceholder aboutPhotoPlaceholder" aria-label="Espaço reservado para uma nova foto do salão">
            <span>Nova imagem do espaço</span>
            <small>Aurum Beauty Concept</small>
          </div>
          <div className="aboutBadge">
            <span>01</span>
            <p>Espaço pensado para você</p>
          </div>
        </div>
        <div className="aboutCopy">
          <p className="eyebrow"><span /> Sobre a Aurum</p>
          <h2>Mais que um salão.<br /><em>Um encontro entre amigas.</em></h2>
          <p>
            Na Aurum, cada atendimento é feito para você se sentir acolhida. Um espaço completo,
            com especialistas em beleza e uma atmosfera leve, elegante e próxima.
          </p>
          <blockquote>
            “Eu estou extremamente chocada com a estrutura e o tratamento com as clientes! Já
            conquistaram meu coração!”
          </blockquote>
          <a className="button buttonOutline" href="#contato">
            Conheça nosso espaço <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section className="reviewsSection" id="avaliacoes">
        <div className="section">
          <div className="reviewsHeader">
            <div>
              <p className="eyebrow"><span /> Avaliações</p>
              <h2>Experiências <em>que ficam.</em></h2>
            </div>
            <div className="reviewScore">
              <strong>5,0</strong>
              <div>
                <span>{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={14} fill="currentColor" />)}</span>
                <small>3 avaliações no Google</small>
              </div>
            </div>
          </div>

          <div className="reviewsGrid">
            {reviews.map((review, index) => (
              <article className="reviewCard" key={review.name}>
                <Quote size={34} strokeWidth={1.1} />
                <div className="ratingStars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={13} fill="currentColor" />
                  ))}
                </div>
                <p>“{review.text}”</p>
                <footer>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><strong>{review.name}</strong><small>{review.time}</small></div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section locationSection" id="contato">
        <div className="locationCopy">
          <p className="eyebrow"><span /> Venha nos conhecer</p>
          <h2>Seu próximo momento<br /><em>começa aqui.</em></h2>
          <div className="addressBlock">
            <MapPin size={22} />
            <p>
              <strong>Av. das Américas, 19020</strong>
              Recreio dos Bandeirantes<br />Rio de Janeiro — RJ, 22790-704
            </p>
          </div>
          <div className="locationActions">
            <a className="button buttonDark" href={mapsUrl} target="_blank" rel="noreferrer">
              Como chegar <ArrowRight size={18} />
            </a>
            <a
              className="button buttonOutline"
              href="https://www.instagram.com/aurumbeautyconcept/"
              target="_blank"
              rel="noreferrer"
            >
              Agendar pelo Instagram
            </a>
          </div>
        </div>

        <a className="mapCard" href={mapsUrl} target="_blank" rel="noreferrer" aria-label="Abrir endereço no Google Maps">
          <span className="mapRoad mapRoadOne" />
          <span className="mapRoad mapRoadTwo" />
          <span className="mapRoad mapRoadThree" />
          <div className="mapPin"><MapPin size={27} fill="currentColor" /></div>
          <div className="mapAddress">
            <small>AURUM BEAUTY CONCEPT</small>
            <strong>Av. das Américas, 19020</strong>
            <span>Recreio dos Bandeirantes</span>
          </div>
          <div className="mapDirection">Abrir no Google Maps <ArrowRight size={16} /></div>
        </a>
      </section>

      <footer className="footer">
        <div className="footerTop">
          <div className="footerBrand">
            <span>AURUM</span>
            <small>Beauty Concept</small>
          </div>
          <p>European Luxury Hair<br />Mega Hair & Beleza Completa</p>
          <a
            href="https://www.instagram.com/aurumbeautyconcept/"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon size={18} /> @aurumbeautyconcept
          </a>
        </div>
        <div className="footerBottom">
          <span>© {new Date().getFullYear()} Aurum Beauty Concept</span>
          <span>Recreio dos Bandeirantes · Rio de Janeiro</span>
        </div>
      </footer>
    </main>
  );
}
