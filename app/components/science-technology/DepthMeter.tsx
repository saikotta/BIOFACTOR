"use client";

import React, { useEffect, useRef, useState } from "react";
import { subscribeSharedScroll } from "./TechSection";

const ITEMS = [
  { id: "biotech", num: "01", ariaLabel: "Microbial Biotechnology" },
  { id: "metabolite", num: "02", ariaLabel: "Metabolite Science" },
  { id: "metabiome", num: "03", ariaLabel: "Metabiome" },
  { id: "mnm", num: "04", ariaLabel: "Microbe & Mineral™" },
  { id: "mineral", num: "05", ariaLabel: "Mineral Technology" },
  { id: "delivery", num: "06", ariaLabel: "Delivery Technologies" },
];

export default function DepthMeter() {
  const railRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isOn, setIsOn] = useState(false);

  // 1. Subscribe to shared rAF scroll listener for gauge progress (--p)
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const unsubscribe = subscribeSharedScroll(() => {
      const rail = railRef.current;
      const main = document.getElementById("tech-sections");
      if (!rail || !main) return;

      const mm = main.getBoundingClientRect();
      const ih = window.innerHeight;
      const pct = Math.max(
        0,
        Math.min(100, ((-mm.top + ih * 0.5) / mm.height) * 100)
      );
      rail.style.setProperty("--p", `${pct}%`);
    });

    return unsubscribe;
  }, []);

  // 2. Observer for active section tracking and visibility band
  useEffect(() => {
    const ids = ITEMS.map((item) => item.id);
    const hero = document.getElementById("top");
    const evidence = document.getElementById("evidence");
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetId = entry.target.id;
            if (targetId === "top" || targetId === "evidence") {
              setIsOn(false);
            } else {
              const idx = ids.indexOf(targetId);
              if (idx !== -1) {
                setIsOn(true);
                setActiveIndex(idx);
              }
            }
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    if (hero) observer.observe(hero);
    if (evidence) observer.observe(evidence);
    sections.forEach((s) => s && observer.observe(s));

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: isReduced ? "auto" : "smooth" });
    }
  };

  return (
    <nav
      ref={railRef}
      className={`rail ${isOn ? "on" : ""}`}
      aria-label="Technologies"
    >
      {ITEMS.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-label={item.ariaLabel}
            onClick={(e) => handleLinkClick(e, item.id)}
            className={isActive ? "on" : ""}
          >
            {item.num}
          </a>
        );
      })}

      <style jsx>{`
        .rail {
          position: fixed;
          right: 22px;
          top: 50%;
          transform: translateY(-50%);
          display: none;
          flex-direction: column;
          align-items: flex-end;
          gap: 20px;
          z-index: 20;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s;
        }

        .rail.on {
          opacity: 1;
          pointer-events: auto;
        }

        .rail::before {
          content: "";
          display: block;
          position: absolute;
          right: -12px;
          top: -8px;
          bottom: -8px;
          width: 2px;
          background: linear-gradient(
            #1f7a4d var(--p, 0%),
            rgba(31, 122, 77, 0.25) 0
          );
        }

        .rail :global(a) {
          position: relative;
          width: auto;
          height: auto;
          border: 0;
          background: none;
          border-radius: 0;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #143324;
          opacity: 0.4;
          text-decoration: none;
          display: flex;
          gap: 8px;
          align-items: center;
          transform: none;
        }

        .rail :global(a::after) {
          content: "";
          width: 12px;
          height: 1px;
          background: currentColor;
          transition: width 0.3s;
        }

        @media (hover: hover) {
          .rail :global(a:hover) {
            opacity: 1;
          }
        }

        .rail :global(a:focus-visible) {
          outline: 2px solid #1f7a4d !important;
          outline-offset: 3px !important;
        }

        .rail :global(a.on) {
          opacity: 1;
          color: #1f7a4d;
          background: none;
          transform: none;
        }

        .rail :global(a.on::after) {
          width: 30px;
        }

        @media (min-width: 1360px) {
          .rail {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
}
