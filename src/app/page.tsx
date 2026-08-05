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

const services = [
  {
    number: "01",
    title: "Mega Hair",
    subtitle: "European Luxury Hair",
    text: "Alongamentos com acabamento natural, escolha personalizada de cor, volume e comprimento.",
    className: "serviceTall",
  },
  {
    number: "02",
    title: "Cabelos",
    subtitle: "Cor, corte e tratamento",
    text: "Técnicas atuais e um cuidado pensado para valorizar a sua identidade.",
    className: "",
  },
  {
    number: "03",
    title: "Unhas",
    subtitle: "Manicure e nail design",
    text: "Do essencial ao sofisticado, com atenção aos detalhes e ao seu estilo.",
    className: "",
  },
  {
    number: "04",
    title: "Estética",
    subtitle: "Cuidado completo",
    text: "Protocolos de beleza em um ambiente acolhedor para você se cuidar por inteiro.",
    className: "serviceWide",
  },
];

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

export default function Home() {
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Av.%20das%20Am%C3%A9ricas%2C%2019020%20-%20Recreio%20dos%20Bandeirantes%2C%20Rio%20de%20Janeiro";

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Salão Aurum Beauty Concept",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. das Américas, 19020",
      addressLocality: "Rio de Janeiro",
      addressRegion: "RJ",
      postalCode: "22790-704",
      addressCountry: "BR",
    },
    sameAs: ["https://www.instagram.com/aurumbeautyconcept/"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "3",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
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

      <section className="section servicesSection" id="servicos">
        <div className="sectionHeading">
          <div>
            <p className="eyebrow"><span /> Nossos serviços</p>
            <h2>Tudo o que você precisa,<br /><em>em um só lugar.</em></h2>
          </div>
          <p>
            Uma experiência completa de beleza, do mega hair à estética, com atendimento próximo
            e atenção a cada detalhe.
          </p>
        </div>

        <div className="servicesGrid">
          {services.map((service) => (
            <article className={`serviceCard ${service.className}`} key={service.number}>
              <div className="servicePhotoPlaceholder" aria-hidden="true"><span>0{service.number}</span></div>
              <div className="serviceOverlay" />
              <span className="serviceNumber">{service.number}</span>
              <div className="serviceContent">
                <span>{service.subtitle}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
              <span className="serviceArrow"><ArrowRight size={18} /></span>
            </article>
          ))}
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
