"use client";

import React, { useEffect, useRef, useState } from "react";

interface ServiceItem {
  num: string;
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    num: "01",
    title: "Soil & Water Testing",
    description: "Lab-backed nutrient and microbial health reports for every field.",
  },
  {
    num: "02",
    title: "Crop Advisory",
    description: "Agronomists guide you from sowing to harvest, season after season.",
  },
  {
    num: "03",
    title: "Biological Inputs",
    description: "Genuine Biofactor bio-fertilisers and bio-stimulants, at the right dose.",
  },
  {
    num: "04",
    title: "Pest & Disease Diagnosis",
    description: "Quick field diagnosis with safe, residue-free solutions.",
  },
  {
    num: "05",
    title: "Training & Field Days",
    description: "Hands-on demos on regenerative and sustainable practices.",
  },
  {
    num: "06",
    title: "Market Linkages",
    description: "Connect healthy produce to buyers who value quality.",
  },
  {
    num: "07",
    title: "Pre & Post-Harvest Machinery",
    description: "Access harvesters, threshers and other farm machinery on hire, before and after harvest.",
  },
  {
    num: "08",
    title: "IoT & Smart Farming",
    description: "Get connected to trusted IoT vendors for sensors, weather stations and farm monitoring.",
  },
  {
    num: "09",
    title: "Crop Insurance",
    description: "Guidance and enrolment support for crop and farm insurance schemes.",
  },
];

export default function OneHealthServices() {
  const [revealedCards, setRevealedCards] = useState<boolean[]>(
    new Array(SERVICES.length).fill(false)
  );
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((el, idx) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealedCards((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section className="relative w-full bg-[#EDF4ED] text-[#173522] py-16 lg:py-24 overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-30 blur-3xl -z-0"
        style={{
          background: "radial-gradient(circle, rgba(203,234,123,0.2) 0%, rgba(237,244,237,0) 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#173522]/10 text-[#173522] text-xs font-mono font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#3F7D4B] animate-pulse" />
            SERVICES
          </div>
          <h2 className="text-[clamp(30px,4vw,50px)] font-serif font-bold text-[#173522] leading-[1.1] tracking-tight max-w-[800px]">
            What every centre offers
          </h2>
        </div>

        {/* 3x3 Grid of 9 Rectangular Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SERVICES.map((srv, idx) => {
            const isRevealed = revealedCards[idx];
            // Stagger animation: left-to-right cascading within rows
            const colIndex = idx % 3;
            const rowIndex = Math.floor(idx / 3);
            const delayMs = colIndex * 90 + rowIndex * 60;

            return (
              <div
                key={srv.num}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="group relative rounded-2xl bg-white p-5 sm:p-6 border border-[#173522]/8 shadow-[0_3px_16px_rgba(23,53,34,0.03)] hover:shadow-[0_16px_36px_rgba(23,53,34,0.12)] hover:-translate-y-2 hover:scale-[1.035] transition-all duration-350 ease-out cursor-pointer flex flex-col justify-start h-[175px] sm:h-[182px]"
                style={{
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed
                    ? "scale(1) translateY(0)"
                    : "scale(0.85) translateY(24px)",
                  transitionProperty: "opacity, transform, box-shadow",
                  transitionDuration: "700ms, 700ms, 350ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: isRevealed ? `${delayMs}ms` : "0ms",
                }}
              >
                {/* Number Badge */}
                <div className="font-mono text-sm font-bold text-[#9A6B2E] mb-2 tracking-wider">
                  {srv.num}
                </div>

                {/* Service Title */}
                <h3 className="font-serif font-bold text-[17px] sm:text-[19px] text-[#173522] leading-snug mb-2 group-hover:text-[#255236] transition-colors duration-300">
                  {srv.title}
                </h3>

                {/* Service Description */}
                <p className="font-sans text-[13px] sm:text-[14px] text-[#173522]/75 leading-relaxed">
                  {srv.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
