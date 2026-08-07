"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { InstagramIcon } from "@/components/InstagramIcon";

const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Resultados", href: "#resultados" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div className="announcement">
        <span>European luxury hair</span>
        <span className="announcementDot" aria-hidden="true" />
        <span>Recreio dos Bandeirantes</span>
      </div>

      <header className="header">
        <a className="brand" href="#inicio" aria-label="Aurum Beauty Concept - início">
          <picture className="brandPicture">
            <source srcSet="/images/aurum-logo.avif" type="image/avif" />
            <source srcSet="/images/aurum-logo.webp" type="image/webp" />
            <img src="/images/aurum-logo.webp" alt="Aurum Beauty Concept" />
          </picture>
        </a>

        <nav className="desktopNav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="headerActions">
          <a
            className="instagramButton"
            href="https://www.instagram.com/aurumbeautyconcept/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram da Aurum Beauty Concept"
          >
            <InstagramIcon size={18} />
          </a>
          <a className="button buttonDark desktopCta" href="#contato">
            Agendar visita
          </a>
          <button
            className="menuButton"
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <div className={`mobileMenu ${isOpen ? "mobileMenuOpen" : ""}`} aria-hidden={!isOpen}>
        <button
          className="menuClose"
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Fechar menu"
        >
          <X size={26} />
        </button>
        <div className="mobileBrand">
          <span>AURUM</span>
          <small>Beauty Concept</small>
        </div>
        <nav aria-label="Navegação mobile">
          {navigation.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
