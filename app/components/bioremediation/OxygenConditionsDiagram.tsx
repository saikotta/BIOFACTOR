"use client";

import React, { useEffect, useRef, useState } from "react";

export default function OxygenConditionsDiagram() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 sm:py-16 md:py-20 px-6 sm:px-10 md:px-14 lg:px-20 max-w-[1400px] mx-auto"
    >
      <div
        className={`transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-[family-name:var(--font-jetbrains)] text-xs sm:text-sm uppercase tracking-[0.25em] text-[#B8893A] font-semibold">
            THE THREE ZONES / BIOCHEMICAL MECHANISMS
          </span>
          <span className="h-px w-12 bg-[#B8893A]/30" />
        </div>

        {/* Section Headline */}
        <h2 className="font-[family-name:var(--font-bricolage)] text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#111111] leading-[1.05] max-w-3xl mb-5">
          Three oxygen conditions, three kinds of microbial work.
        </h2>

        {/* Subline */}
        <p className="text-[#223328] text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mb-12 sm:mb-14">
          Good wastewater treatment runs through zones with zero oxygen, little oxygen
          and plenty of oxygen. Each zone relies on different microbes, and each removes a
          different part of the pollution.
        </p>

        {/* Diagram Card Container */}
        <div className="bg-white rounded-2xl border border-black/8 shadow-sm p-6 sm:p-8 md:p-10 relative overflow-hidden">
          {/* Header Label inside Diagram */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-black/6">
            <div className="flex items-center gap-3">
              <span className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[#B8893A] font-bold">
                THE PROCESS FLOW
              </span>
              <span className="text-black/30">|</span>
              <span className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-wider text-[#223328] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6BBF3A]" />
                INFLUENT RAW WASTE →
              </span>
            </div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[11px] text-[#223328]/60 uppercase tracking-wider">
              Continuous Biological Sequence
            </div>
          </div>

          {/* Sequential 3 Zones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* ZONE 1: ANAEROBIC (GOLD OUTLINE) */}
            <div className="rounded-xl p-6 sm:p-7 border-2 border-[#B8893A] bg-[#FFFDF7] shadow-xs flex flex-col justify-between relative group hover:-translate-y-1 transition-transform duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-[family-name:var(--font-jetbrains)] text-[11px] tracking-widest uppercase font-bold text-[#B8893A] bg-[#B8893A]/10 px-2.5 py-1 rounded">
                    ZONE 01
                  </span>
                  <span className="font-[family-name:var(--font-jetbrains)] text-[11px] text-[#B8893A] font-semibold">
                    0.0 mg/L DO
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-bricolage)] text-2xl font-bold uppercase text-[#111111] mb-4">
                  ANAEROBIC
                  <span className="block text-xs font-medium tracking-normal text-[#B8893A] mt-0.5">
                    (NO OXYGEN)
                  </span>
                </h3>
                <ul className="space-y-3 text-sm text-[#223328] mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8893A] font-bold leading-tight">•</span>
                    <span>Heavy solids breakdown & hydrolysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8893A] font-bold leading-tight">•</span>
                    <span>Acidogenesis to volatile fatty acids</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8893A] font-bold leading-tight">•</span>
                    <span>
                      BOD reduced by 50–70%{" "}
                      <a href="#ref-4" className="text-[#6BBF3A] hover:underline font-mono text-xs">
                        [4]
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8893A] font-bold leading-tight">•</span>
                    <span>Biogas (methane + CO₂) produced</span>
                  </li>
                </ul>
              </div>
              <div className="pt-3 border-t border-[#B8893A]/20 font-[family-name:var(--font-jetbrains)] text-[10px] text-[#B8893A] tracking-wider uppercase font-semibold">
                Primary Digestion Chamber
              </div>
            </div>

            {/* ZONE 2: ANOXIC (BLACK OUTLINE) */}
            <div className="rounded-xl p-6 sm:p-7 border-2 border-[#111111] bg-white shadow-xs flex flex-col justify-between relative group hover:-translate-y-1 transition-transform duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-[family-name:var(--font-jetbrains)] text-[11px] tracking-widest uppercase font-bold text-[#111111] bg-black/8 px-2.5 py-1 rounded">
                    ZONE 02
                  </span>
                  <span className="font-[family-name:var(--font-jetbrains)] text-[11px] text-[#111111] font-semibold">
                    &lt; 0.5 mg/L DO
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-bricolage)] text-2xl font-bold uppercase text-[#111111] mb-4">
                  ANOXIC
                  <span className="block text-xs font-medium tracking-normal text-[#111111]/70 mt-0.5">
                    (BOUND OXYGEN)
                  </span>
                </h3>
                <ul className="space-y-3 text-sm text-[#223328] mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#111111] font-bold leading-tight">•</span>
                    <span>Nitrate (NO₃⁻) → Nitrogen gas (N₂)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#111111] font-bold leading-tight">•</span>
                    <span>Denitrification via heterotrophic facultatives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#111111] font-bold leading-tight">•</span>
                    <span>
                      Nitrogen gas escapes safely into atmospheric air{" "}
                      <a href="#ref-5" className="text-[#6BBF3A] hover:underline font-mono text-xs">
                        [5]
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-3 border-t border-black/10 font-[family-name:var(--font-jetbrains)] text-[10px] text-[#111111] tracking-wider uppercase font-semibold">
                Nitrogen Stripping Zone
              </div>
            </div>

            {/* ZONE 3: AEROBIC (GREEN OUTLINE) */}
            <div className="rounded-xl p-6 sm:p-7 border-2 border-[#6BBF3A] bg-[#F7FCF5] shadow-xs flex flex-col justify-between relative group hover:-translate-y-1 transition-transform duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-[family-name:var(--font-jetbrains)] text-[11px] tracking-widest uppercase font-bold text-[#6BBF3A] bg-[#6BBF3A]/15 px-2.5 py-1 rounded">
                    ZONE 03
                  </span>
                  <span className="font-[family-name:var(--font-jetbrains)] text-[11px] text-[#6BBF3A] font-semibold">
                    2.0–4.0 mg/L DO
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-bricolage)] text-2xl font-bold uppercase text-[#111111] mb-4">
                  AEROBIC
                  <span className="block text-xs font-medium tracking-normal text-[#6BBF3A] mt-0.5">
                    (PLENTY OF OXYGEN)
                  </span>
                </h3>
                <ul className="space-y-3 text-sm text-[#223328] mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#6BBF3A] font-bold leading-tight">•</span>
                    <span>Organics polished to trace environmental levels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6BBF3A] font-bold leading-tight">•</span>
                    <span>Ammonia (NH₄⁺) → Nitrate (NO₃⁻)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6BBF3A] font-bold leading-tight">•</span>
                    <span>
                      Heavy aerated nitrification{" "}
                      <a href="#ref-6" className="text-[#6BBF3A] hover:underline font-mono text-xs">
                        [6]
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6BBF3A] font-bold leading-tight">•</span>
                    <span>Clear water discharge to clarifier</span>
                  </li>
                </ul>
              </div>
              <div className="pt-3 border-t border-[#6BBF3A]/20 font-[family-name:var(--font-jetbrains)] text-[10px] text-[#6BBF3A] tracking-wider uppercase font-semibold">
                High-Rate Aerobic Oxidation
              </div>
            </div>
          </div>

          {/* Feedback Return Sludge Loop */}
          <div className="mt-8 pt-6 border-t border-black/8 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#EAF6EC]/40 rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6BBF3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 14 4 9 9 4" />
                <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
              </svg>
              <div>
                <span className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-wider font-bold text-[#111111] block">
                  INTERNAL RECYCLE / RETURN ACTIVATED SLUDGE{" "}
                  <a href="#ref-7" className="text-[#6BBF3A] hover:underline font-mono text-xs">
                    [7]
                  </a>
                </span>
                <span className="text-xs text-[#223328]/80">
                  Nitrate-rich mixed liquor recycled continuously from aerobic zone back to anoxic zone for complete nitrogen elimination.
                </span>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#6BBF3A] text-xs font-semibold uppercase tracking-wider text-[#111111]">
              <span className="w-2 h-2 rounded-full bg-[#6BBF3A]" />
              TREATED WATER DISCHARGE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
