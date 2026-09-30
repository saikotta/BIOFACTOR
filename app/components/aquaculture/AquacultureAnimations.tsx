"use client";

import { useEffect, useRef, useState } from "react";

export default function AquacultureAnimations() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Load GSAP
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      initAnimations();
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [isClient]);

  const initAnimations = () => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return; // Disable all animations
    }

    // 1. Hero stat cards fade in
    const statCards = document.querySelectorAll(".bg-white.border");
    if (statCards.length > 0) {
      gsap.fromTo(
        statCards,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statCards[0],
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    // 2. Section headings fade in
    const headings = document.querySelectorAll("h2");
    headings.forEach((heading) => {
      gsap.fromTo(
        heading,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    // 3. Cards fade in with stagger
    const allCards = document.querySelectorAll(".bg-white.border.border-\\[\\#D5E9D8\\]");
    allCards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    // 4. Bar chart animations
    const bars = document.querySelectorAll(".bg-\\[\\#6BBF3A\\].rounded-sm");
    bars.forEach((bar) => {
      const width = (bar as HTMLElement).style.width;
      gsap.fromTo(
        bar,
        { width: "0%" },
        {
          width: width,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    // 5. Table rows fade in
    const tableRows = document.querySelectorAll("tbody tr");
    if (tableRows.length > 0) {
      gsap.fromTo(
        tableRows,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tableRows[0],
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    // 6. Quote fade in
    const quote = document.querySelector("blockquote");
    if (quote) {
      gsap.fromTo(
        quote,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quote,
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    // 7. References fade in
    const references = document.querySelectorAll("ol li");
    if (references.length > 0) {
      gsap.fromTo(
        references,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: references[0],
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    // Refresh ScrollTrigger after page load
    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });
  };

  return null;
}
