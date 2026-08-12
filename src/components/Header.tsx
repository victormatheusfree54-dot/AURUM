"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Transformações", href: "#resultados" },
  { label: "O espaço", href: "#espaco" },
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
      <header className="header">
        <a className="brand" href="#inicio" aria-label="Aurum Beauty Concept — início">
          <picture className="brandPicture">
            <source srcSet="/images/aurum-logo.avif" type="image/avif" />
            <img
              src="/images/aurum-logo.webp"
              alt="Aurum Beauty Concept"
              width={900}
              height={502}
              loading="eager"
              decoding="async"
            />
          </picture>
        </a>

        <nav className="desktopNav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="headerActions">
          <a className="button buttonDark desktopCta" href="#contato">Agendar horário</a>
          <button
            className="menuButton"
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menu"
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        id="mobile-navigation"
        className={`mobileMenu ${isOpen ? "mobileMenuOpen" : ""}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <button
          className="menuClose"
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Fechar menu"
        >
          <X size={26} aria-hidden="true" />
        </button>
        <picture className="mobileBrand">
          <source srcSet="/images/aurum-logo.avif" type="image/avif" />
          <img src="/images/aurum-logo.webp" alt="Aurum Beauty Concept" width={900} height={502} />
        </picture>
        <nav aria-label="Navegação mobile">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="button buttonLight mobileMenuCta" href="#contato" onClick={() => setIsOpen(false)}>
          Agendar horário
        </a>
      </div>
    </>
  );
}
