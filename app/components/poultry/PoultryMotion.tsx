"use client";

import { useEffect } from "react";

export default function PoultryMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-poultry-page]");
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.querySelectorAll<HTMLElement>(":scope > section:not([data-poultry-static])").forEach((section) => {
      section.setAttribute("data-poultry-reveal", "");
    });
    const targets = root.querySelectorAll<HTMLElement>("[data-poultry-reveal]");
    const images = root.querySelectorAll<HTMLImageElement>("img");
    targets.forEach((target, index) => {
      target.style.setProperty("--poultry-index", String(index % 6));
      target.style.willChange = "transform, opacity";
    });

    if (reduced) {
      targets.forEach((target) => target.classList.add("poultry-motion-in"));
      return () => {};
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        target.classList.add("poultry-motion-in");
        target.style.willChange = "auto";
        observer.unobserve(target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    targets.forEach((target) => observer.observe(target));
    images.forEach((image) => image.loading = image.closest("[data-layer-image]") ? "eager" : "lazy");

    return () => observer.disconnect();
  }, []);

  return null;
}
