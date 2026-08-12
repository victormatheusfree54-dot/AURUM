import { MapPin, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { InstagramIcon } from "@/components/InstagramIcon";
import { ResultsShowcase } from "@/components/ResultsShowcase";
import { SalonDeck } from "@/components/SalonDeck";
import { ScrollRevealController } from "@/components/ScrollRevealController";
import { StarButton } from "@/components/StarButton";
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

const faqs = [
  {
    question: "A Aurum Beauty Concept é especializada em mega hair?",
    answer:
      "Sim. O salão apresenta trabalhos de mega hair, alongamentos, coloração, tratamentos capilares, unhas e estética no Recreio dos Bandeirantes.",
  },
  {
    question: "Onde fica o salão Aurum Beauty Concept?",
    answer:
      "A Aurum Beauty Concept fica na Av. das Américas, 19020, Recreio dos Bandeirantes, Rio de Janeiro - RJ, 22790-704.",
  },
  {
    question: "Como posso agendar um horário?",
    answer:
      "O agendamento pode ser iniciado pelo Instagram oficial da Aurum Beauty Concept ou pelo botão de contato do site.",
  },
  {
    question: "O site mostra resultados reais de antes e depois?",
    answer:
      "Sim. A seção de transformações reúne comparações de antes e depois com trabalhos realizados no salão.",
  },
  {
    question: "Quais serviços aparecem no site?",
    answer:
      "O site apresenta mega hair e alongamentos, cabelos, unhas, nail design, estética e experiências de beleza.",
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
      "@type": "WebPage",
      "@id": absoluteUrl("/#webpage"),
      url: absoluteUrl("/"),
      name: siteConfig.title,
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      isPartOf: { "@id": absoluteUrl("/#website") },
      about: { "@id": absoluteUrl("/#beauty-salon") },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl("/og-image.webp"),
        width: 1200,
        height: 630,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": absoluteUrl("/#breadcrumbs"),
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Transformações",
          item: absoluteUrl("/#resultados"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Contato",
          item: absoluteUrl("/#contato"),
        },
      ],
    },
    {
      "@type": "BeautySalon",
      "@id": absoluteUrl("/#beauty-salon"),
      name: siteConfig.legalName,
      alternateName: siteConfig.name,
      url: absoluteUrl("/"),
      description: siteConfig.description,
      image: [
        absoluteUrl("/images/salao-aurum-recreio.webp"),
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
        author: { "@type": "Person", name: review.name },
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
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": absoluteUrl("/#faq"),
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

const safeStructuredData = JSON.stringify(structuredData).replace(/</g, "\\u003c");

function Stars({ labelled = false }: { labelled?: boolean }) {
  return (
    <span
      className="ratingStars"
      role={labelled ? "img" : undefined}
      aria-label={labelled ? "5 de 5 estrelas" : undefined}
      aria-hidden={labelled ? undefined : true}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={14} fill="currentColor" aria-hidden="true" />
      ))}
    </span>
  );
}

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
      <a className="stickyMobileCta" href="#contato" aria-label="Agendar horário na Aurum Beauty Concept">
        Agendar horário
      </a>

      <section className="hero" id="inicio">
        <div className="heroCopy">
          <h1>
            Sua beleza,
            <em> do seu jeito.</em>
          </h1>
          <p className="heroText">
            Mega hair, cabelos, unhas e estética em uma experiência pensada para
            você se reconhecer ainda mais bonita.
          </p>
          <div className="heroActions">
            <StarButton href="#resultados">Ver transformações</StarButton>
            <a
              className="textLink"
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon size={17} aria-hidden="true" /> @aurumbeautyconcept
            </a>
          </div>
          <div className="heroProof">
            <Stars labelled />
            <strong>5,0</strong>
            <span>avaliado por mulheres no Google</span>
          </div>
        </div>

        <div className="heroMedia ownerHeroMedia">
          <div className="ownerPortraitFrame">
          <picture>
            <source
              srcSet="/images/dona-aurum-480.webp 480w, /images/dona-aurum-720.webp 720w, /images/dona-aurum-960.webp 960w, /images/dona-aurum.webp 1200w"
              sizes="(max-width: 820px) 78vw, 430px"
              type="image/webp"
            />
            <img
              src="/images/dona-aurum.webp"
              alt="Fundadora da Aurum Beauty Concept em frente ao salão no Recreio dos Bandeirantes"
              width={1200}
              height={1607}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          </div>
        </div>
      </section>

      <section className="resultsSection" id="resultados">
        <ResultsShowcase />
      </section>

      <SalonDeck />

      <div className="closingShell">
      <section className="reviewsSection" id="avaliacoes">
        <div className="section reviewsEditorial">
          <header className="reviewsEditorialHeader">
            <h2>Experiências <em>que ficam.</em></h2>
            <div className="reviewScore">
              <strong>5,0</strong>
              <Stars labelled />
              <small>no Google · 3 avaliações</small>
            </div>
          </header>

          <div className="reviewsEditorialBody">
            <blockquote className="reviewLead">
              <p>“{reviews[0].text}”</p>
              <cite>
                <strong>— {reviews[0].name}</strong>
              </cite>
            </blockquote>

            <div className="reviewSecondary">
              {[reviews[1], reviews[2]].map((review) => (
                <blockquote key={review.name}>
                  <p>“{review.text}”</p>
                  <cite>
                    <strong>— {review.name}</strong>
                  </cite>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="contactSection" id="contato" aria-label="Seu próximo momento começa aqui">
        <div className="contactContainer">
          <div className="contactCard">
            <h2>Seu próximo momento <em>começa aqui.</em></h2>
            <address className="addressBlock">
              <MapPin size={22} aria-hidden="true" />
              <p>
                <strong>Av. das Américas, 19020</strong>
                Recreio dos Bandeirantes<br />
                Rio de Janeiro — RJ, 22790-704
              </p>
            </address>

            <div className="contactActions">
              <StarButton href={mapsUrl} target="_blank" rel="noopener noreferrer">
                Como chegar
              </StarButton>
              <a className="button buttonOutlineLight" href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">
                Agendar pelo Instagram
              </a>
            </div>
          </div>

          <div className="contactMediaFrame">
            <img
              src="/images/salao-aurum-recreio.webp"
              alt="Fachada e recepção da Aurum Beauty Concept no Recreio dos Bandeirantes"
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
            />
            <div className="contactMediaCaption">
              <span>Aurum Beauty Concept · Recreio dos Bandeirantes</span>
            </div>
          </div>
        </div>
      </section>

      <section className="faqSection" id="faq" aria-labelledby="faq-title">
        <div className="faqInner">
          <div className="faqIntro">
            <h2 id="faq-title">Dúvidas rápidas antes de vir.</h2>
            <p>
              Um resumo simples para quem está conhecendo a Aurum Beauty Concept e quer entender o próximo passo.
            </p>
          </div>
          <div className="faqList">
            {faqs.map((faq) => (
              <details key={faq.question} className="faqItem">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footerTop">
          <a className="footerBrand" href="#inicio" aria-label="Voltar ao início">
            <picture>
              <source srcSet="/images/aurum-logo.avif" type="image/avif" />
              <img
                src="/images/aurum-logo.webp"
                alt="Aurum Beauty Concept"
                width={900}
                height={502}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </a>
          <nav aria-label="Links do rodapé">
            <a href="#inicio">Início</a>
            <a href="#resultados">Transformações</a>
            <a href="#espaco">O espaço</a>
            <a href="#avaliacoes">Avaliações</a>
            <a href="#faq">FAQ</a>
            <a href="#contato">Contato</a>
            <a href="/privacidade">Privacidade</a>
          </nav>
          <div className="footerSocials">
            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Aurum Beauty Concept">
              <InstagramIcon size={24} aria-hidden="true" />
            </a>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Localização da Aurum Beauty Concept">
              <MapPin size={24} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="footerBottom">
          <span>© {new Date().getFullYear()} Aurum Beauty Concept. Todos os direitos reservados.</span>
        </div>
      </footer>
      </div>
    </main>
  );
}
