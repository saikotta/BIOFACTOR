"use client";

import React, { useEffect, useState } from "react";
import OneHealthOrbit3D from "./OneHealthOrbit3D";

export interface DomainSlotConfig {
  id: "soil" | "plant" | "animal" | "food" | "people";
  name: string;
  baseAngleDeg: number;
  imgSrc: string;
}

export interface CoreSlotConfig {
  name: string;
  tagline: string;
  imgSrc: string;
}

const DEFAULT_DOMAINS: DomainSlotConfig[] = [
  {
    id: "soil",
    name: "SOIL",
    baseAngleDeg: 270, // Top / Back
    imgSrc: "/images/one-health/soil.png",
  },
  {
    id: "plant",
    name: "PLANT",
    baseAngleDeg: 342, // Top-Right
    imgSrc: "/images/one-health/plant.png",
  },
  {
    id: "animal",
    name: "ANIMAL",
    baseAngleDeg: 54, // Bottom-Right
    imgSrc: "/images/one-health/animal.png",
  },
  {
    id: "food",
    name: "FOOD",
    baseAngleDeg: 126, // Bottom-Left
    imgSrc: "/images/one-health/food.png",
  },
  {
    id: "people",
    name: "PEOPLE",
    baseAngleDeg: 198, // Top-Left
    imgSrc: "/images/one-health/people.png",
  },
];

const DEFAULT_CORE: CoreSlotConfig = {
  name: "PLANET",
  tagline: "ONE HEALTH CORE",
  imgSrc: "/images/one-health/planet.png",
};

interface OneHealthHeroProps {
  domains?: DomainSlotConfig[];
  core?: CoreSlotConfig;
}

export default function OneHealthHero({
  domains = DEFAULT_DOMAINS,
  core = DEFAULT_CORE,
}: OneHealthHeroProps) {
  const [hasEntered, setHasEntered] = useState(false);
  const [entranceProgress, setEntranceProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHasEntered(true);
      setEntranceProgress(1);
      return;
    }

    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 100);

    // Entrance animation progress over ~2.2 seconds
    const startTime = Date.now();
    const duration = 2200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      setEntranceProgress(progress);
      if (progress >= 1) {
        clearInterval(interval);
      }
    }, 16);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [prefersReducedMotion]);

  const headlineText = "Everything Is Connected";
  const headlineWords = headlineText.split(" ");

  return (
    <section className="relative w-full min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-72px)] bg-[#EDF4ED] text-[#173522] font-sans overflow-visible flex flex-col justify-start select-none">
      {/* 1. Biological Atmosphere & Hero Radial Background Glow Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, #F5FAF5 0%, #E8F2E8 55%, #DCECDC 100%)",
          }}
        />
        {/* Soft Radial Glow of pale green (#CFE8CF at 55%) & warm cream behind planet */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(207, 232, 207, 0.55) 0%, rgba(237, 233, 218, 0.35) 45%, transparent 75%)",
          }}
        />
        {/* 3 Concentric Ripple Rings (1px, opacity 0.08) centered on planet */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-[#147A46] opacity-[0.08]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full border border-[#147A46] opacity-[0.08]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[860px] h-[860px] rounded-full border border-[#147A46] opacity-[0.08]" />
      </div>

      {/* Main Content Layout Wrapper */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-4 sm:pt-6 pb-20 flex-1 flex flex-col items-center justify-start text-center overflow-visible">

        {/* TOP TEXT BLOCK: Centered Hierarchy */}
        <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center">

          {/* Eyebrow: ONE HEALTH */}
          <div
            className={`transition-all duration-700 ease-out transform ${
              hasEntered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }`}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#147A46]/25 bg-[#147A46]/10 text-[11px] font-mono font-semibold tracking-[0.25em] text-[#147A46] uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#147A46] animate-pulse" />
              ONE HEALTH
            </span>
          </div>

          {/* Primary Headline: Everything Is Connected with Mask & 70ms Word Stagger */}
          <h1 className="mt-2 sm:mt-3 text-3xl sm:text-4xl lg:text-[clamp(2.4rem,3.8vw,4.2rem)] font-bold tracking-tight text-[#173522] leading-[1.05] flex flex-wrap justify-center gap-x-3">
            {headlineWords.map((word, idx) => (
              <span key={idx} className="overflow-hidden inline-block py-1">
                <span
                  className="inline-block transition-transform duration-700 ease-out"
                  style={{
                    transform:
                      hasEntered || prefersReducedMotion
                        ? "translateY(0)"
                        : "translateY(110%)",
                    transitionDelay: prefersReducedMotion ? "0ms" : `${idx * 70}ms`,
                    color: word === "Connected" ? "#147A46" : undefined,
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* Supporting Copy */}
          <p
            className={`mt-3 sm:mt-4 text-sm sm:text-base text-[#425A49] font-light italic leading-relaxed max-w-[720px] mx-auto transition-all duration-800 delay-300 ease-out transform ${
              hasEntered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            “Soil, plant, animal, food, and people don&apos;t just feed into each other — they all draw on the same planet. That&apos;s not a supply chain. It&apos;s a cycle.”
          </p>
        </div>

        {/* CENTERED THREE.JS ORBIT ANIMATION (Tight gap ~24px, clamp height 640px to 860px) */}
        <div className="w-full mx-auto flex items-center justify-center mt-6 h-[clamp(640px,82vh,860px)] relative overflow-visible">
          <div
            className={`relative w-full h-full flex items-center justify-center overflow-visible transition-all duration-1000 delay-300 ease-out transform ${
              hasEntered
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            {/* Real Three.js 3D Orbital Carousel with Orchestrated Entrance */}
            <OneHealthOrbit3D
              domains={domains}
              core={core}
              entranceProgress={entranceProgress}
            />
          </div>
        </div>

        {/* HINT LINE AT HERO BOTTOM: Scroll to follow the chain with bobbing arrow */}
        <div className="mt-4 flex flex-col items-center gap-1.5 opacity-60">
          <span className="text-xs font-mono tracking-widest uppercase text-[#173522]">
            Scroll to follow the chain
          </span>
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-none stroke-[#173522] animate-bounce"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              animationDuration: "2.4s",
            }}
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>

      </div>

      {/* Soft 120px Bottom Gradient Overlay fading into the first chapter's background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #EDF4ED 100%)",
        }}
      />
    </section>
  );
}
