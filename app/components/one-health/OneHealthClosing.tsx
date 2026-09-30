"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface CycleNode {
  id: string;
  name: string;
  imgSrc: string;
}

const CYCLE_NODES: CycleNode[] = [
  { id: "soil", name: "SOIL", imgSrc: "/images/one-health/soil.png" },
  { id: "plant", name: "PLANT", imgSrc: "/images/one-health/plant.png" },
  { id: "animal", name: "ANIMAL", imgSrc: "/images/one-health/animal.png" },
  { id: "food", name: "FOOD", imgSrc: "/images/one-health/food.png" },
  { id: "people", name: "PEOPLE", imgSrc: "/images/one-health/people.png" },
  { id: "planet", name: "PLANET", imgSrc: "/images/one-health/planet.png" },
];

export default function OneHealthClosing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const marqueeText = "SOIL · PLANT · ANIMAL · FOOD · PEOPLE · PLANET · ";

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#EDE9DA] text-[#173522] py-20 md:py-28 px-6 relative z-20 font-sans overflow-hidden"
    >
      {/* 1. Large Faint Outlined Ghost Text Behind Content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden">
        <span
          className="font-serif font-bold text-[clamp(100px,18vw,260px)] tracking-tighter text-transparent opacity-[0.07] whitespace-nowrap"
          style={{
            WebkitTextStroke: "1px #173522",
          }}
        >
          ONE HEALTH
        </span>
      </div>

      {/* 2. Soft Radial Green Atmosphere Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none z-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(20, 122, 70, 0.12) 0%, rgba(237, 233, 218, 0) 70%)",
        }}
      />

      {/* 3. Slow Looping Marquee Above Content (~40s per loop) */}
      <div className="w-full overflow-hidden mb-12 relative z-10 pointer-events-none select-none">
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: prefersReducedMotion ? "none" : "marqueeLoop 40s linear infinite",
          }}
        >
          {[0, 1, 2].map((groupIdx) => (
            <span
              key={groupIdx}
              className="font-serif font-bold text-[clamp(48px,8vw,110px)] tracking-tight text-transparent opacity-25 px-4"
              style={{
                WebkitTextStroke: "1px #147A46",
              }}
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marqueeLoop {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }
      `}</style>

      {/* Main Content Layout Container */}
      <div className="max-w-[840px] mx-auto text-center flex flex-col items-center relative z-10">

        {/* 4. Chain of 6 Round Photo Nodes (72px) joined by Curved Cycle Path */}
        <div className="w-full max-w-[760px] mb-14 relative flex items-center justify-between px-2 sm:px-6">
          {/* SVG Connecting Loop Path */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
            viewBox="0 0 760 120"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Base Pale Line */}
            <path
              d="M 40 45 C 160 15, 600 15, 720 45 C 600 105, 160 105, 40 45"
              stroke="rgba(20, 122, 70, 0.2)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Animated Draw Line */}
            <path
              d="M 40 45 C 160 15, 600 15, 720 45 C 600 105, 160 105, 40 45"
              stroke="#147A46"
              strokeWidth="2"
              strokeDasharray="1600"
              strokeDashoffset={isRevealed || prefersReducedMotion ? "0" : "1600"}
              style={{
                transition: prefersReducedMotion ? "none" : "stroke-dashoffset 1.2s ease-out",
              }}
            />
          </svg>

          {/* 6 Round Spherical Nodes */}
          {CYCLE_NODES.map((node, idx) => (
            <div
              key={node.id}
              className={`relative z-10 flex flex-col items-center gap-2 transition-all duration-700 ease-out ${
                isRevealed || prefersReducedMotion
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-75 translate-y-4"
              }`}
              style={{
                transitionDelay: prefersReducedMotion ? "0ms" : `${300 + idx * 100}ms`,
              }}
            >
              {/* 72px Spherical Node Container */}
              <div className="relative w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-full overflow-hidden border border-[#147A46]/30 shadow-md group cursor-pointer transform transition-transform duration-300 hover:scale-110">
                {/* Photo Image */}
                <img
                  src={node.imgSrc}
                  alt={node.name}
                  className="w-full h-full object-cover"
                />
                {/* Spherical Overlay Highlight */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.45) 0%, transparent 60%), inset 0 0 12px rgba(0,0,0,0.35)",
                  }}
                />
              </div>

              {/* Node Mono Label */}
              <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-[#173522]/80 uppercase">
                {node.name}
              </span>
            </div>
          ))}
        </div>

        {/* 5. Main Closing Statement Paragraph with Masked Line Reveal */}
        <div className="max-w-[560px] mx-auto overflow-hidden py-1 mb-[30px]">
          <p
            className={`font-serif font-bold text-[clamp(20px,4.6vw,27px)] leading-[1.4] text-[#173522] transition-all duration-800 ease-out transform ${
              isRevealed || prefersReducedMotion
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{
              transitionDelay: prefersReducedMotion ? "0ms" : "750ms",
            }}
          >
            This is why we build agriculture, aquaculture, poultry, and animal health as one connected platform — not six separate businesses.
          </p>
        </div>

        {/* 6. Action Link Button with Hover Sweep & Lift */}
        <Link
          href="/"
          className="group relative font-mono text-[11.5px] px-[22px] py-[14px] rounded-[3px] bg-[#173522] text-[#EDE9DA] inline-flex items-center gap-2 overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-[3px] uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#147A46] focus:ring-offset-2"
        >
          {/* Hover Sweep Green Fill Slide */}
          <span className="absolute inset-0 bg-[#147A46] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out pointer-events-none" />

          {/* Button Text & Arrow */}
          <span className="relative z-10 flex items-center gap-2">
            See where this shows up across our verticals
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>

        {/* 7. Footer Brand Strip with Thin Gradient Hairline Above It */}
        <div className="w-full mt-16 text-center relative pt-6">
          {/* Gradient Hairline */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-[1px] bg-gradient-to-r from-transparent via-[#100E0B]/20 to-transparent" />

          <p className="font-mono text-[10px] tracking-[0.06em] uppercase text-[#6B4226]">
            BIOFACTOR BIOLOGICALS® — MICROBE · MINERAL · METABIOME · ONE HEALTH
          </p>
        </div>

      </div>
    </section>
  );
}
