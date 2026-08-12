"use client";

import { useEffect } from "react";

const revealSelectors = [
  ".resultsFeatureCopy > *",
  ".resultsFeatureMedia",
  ".resultsRailHeader > *",
  ".resultsRailItem",
  ".salonDeckIntro > *",
  ".reviewsEditorialHeader > *",
  ".reviewLead",
  ".reviewSecondary blockquote",
  ".contactMedia",
  ".contactCopy > *",
  ".footerTop > *",
  ".footerBottom > *",
].join(",");

export function ScrollRevealController() {
  useEffect(() => {
    let disposeReveal: (() => void) | undefined;

    const initializeReveal = () => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelectors));
      let lastScrollY = window.scrollY;
      let scrollDirection: "up" | "down" = "down";
      let frame = 0;

      const updateDirection = () => {
        if (frame) return;
        frame = window.requestAnimationFrame(() => {
          const difference = window.scrollY - lastScrollY;
          if (Math.abs(difference) > 3) scrollDirection = difference > 0 ? "down" : "up";
          lastScrollY = window.scrollY;
          frame = 0;
        });
      };

      elements.forEach((element, index) => {
        element.classList.add("aurumReveal");
        element.style.setProperty("--aurum-reveal-delay", `${(index % 4) * 70}ms`);
        element.dataset.revealDirection = "up";
      });
      document.documentElement.classList.add("aurumRevealReady");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const element = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              element.dataset.revealDirection = scrollDirection === "down" ? "up" : "down";
              window.requestAnimationFrame(() => element.classList.add("isAurumRevealed"));
            } else {
              element.classList.remove("isAurumRevealed");
              element.dataset.revealDirection = entry.boundingClientRect.top < 0 ? "down" : "up";
            }
          });
        },
        { threshold: 0.12, rootMargin: "-4% 0px -10% 0px" },
      );

      elements.forEach((element) => observer.observe(element));
      window.addEventListener("scroll", updateDirection, { passive: true });

      disposeReveal = () => {
        observer.disconnect();
        window.removeEventListener("scroll", updateDirection);
        if (frame) window.cancelAnimationFrame(frame);
        document.documentElement.classList.remove("aurumRevealReady");
        elements.forEach((element) => {
          element.classList.remove("aurumReveal", "isAurumRevealed");
          element.style.removeProperty("--aurum-reveal-delay");
          delete element.dataset.revealDirection;
        });
      };
    };

    let initialized = false;
    const initializeOnce = () => {
      if (initialized) return;
      initialized = true;
      window.clearTimeout(fallbackId);
      window.removeEventListener("scroll", initializeOnce);
      initializeReveal();
    };

    const fallbackId = window.setTimeout(initializeOnce, 4000);
    window.addEventListener("scroll", initializeOnce, { passive: true, once: true });

    return () => {
      window.clearTimeout(fallbackId);
      window.removeEventListener("scroll", initializeOnce);
      disposeReveal?.();
    };
  }, []);

  return null;
}
