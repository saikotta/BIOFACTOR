"use client";

import React, { useEffect, useRef, useState } from "react";

const STAGES = [
  {
    step: "01 / PRIMARY",
    name: "SCREENING & GRIT",
    function: "PHYSICAL SEPARATION",
    isCore: false,
  },
  {
    step: "02 / BUFFER",
    name: "EQUALIZATION",
    function: "FLOW & LOAD BALANCING",
    isCore: false,
  },
  {
    step: "03 / CORE BIOLOGY",
    name: "BIO-REACTOR",
    function: "MAIN MICROBIAL DIGESTION",
    isCore: true,
  },
  {
    step: "04 / SEPARATION",
    name: "CLARIFIER",
    function: "SLUDGE SETTLING",
    isCore: false,
  },
  {
    step: "05 / FINAL",
    name: "POLISHING & DISCHARGE",
    function: "TERTIARY FILTRATION",
    isCore: false,
  },
];

const MATRIX_DATA = [
  {
    stream: "Industrial (ETP)",
    tag: "STREAM 01",
    stages: [
      "Segregates coarse solids & chemical debris",
      "Neutralizes pH swings & equalizes shock spikes",
      "High-rate biological digestion of dyes, phenolics & toxics [4]",
      "Bio-floc settling & sludge recycling",
      "Trace COD polish & compliant discharge",
    ],
  },
  {
    stream: "Sewage (STP)",
    tag: "STREAM 02",
    stages: [
      "Bar screening & grit traps",
      "Flow buffer & nutrient equalization",
      "Anaerobic-anoxic-aerobic biological nutrient removal [7]",
      "Secondary clarifying & settling",
      "Disinfection & safe reuse or discharge",
    ],
  },
  {
    stream: "Septic (On-site)",
    tag: "STREAM 03",
    stages: [
      "Gravity settlement of solids in primary chamber",
      "Anaerobic liquefaction of sludge layer",
      "Enzymatic & microbial digestion of organic waste [9]",
      "Baffled clarified liquid retention",
      "Soil bio-filtration & subsurface dispersal",
    ],
  },
];

export default function TreatmentChainTable() {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
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
            THE 5-STAGE TREATMENT CHAIN
          </span>
          <span className="h-px w-12 bg-[#B8893A]/30" />
        </div>

        {/* Headline */}
        <h2 className="font-[family-name:var(--font-bricolage)] text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#111111] leading-[1.05] max-w-3xl mb-10">
          Where biology does the work.
        </h2>

        {/* Table Container with Horizontal Scroll Support on Mobile */}
        <div className="w-full overflow-x-auto pb-4">
          <div className="min-w-[880px] bg-white rounded-2xl border border-black/8 shadow-sm overflow-hidden">
            {/* Table Header: Stages */}
            <div className="grid grid-cols-12 bg-black/3 border-b border-black/8 py-4 px-6 items-end">
              <div className="col-span-2 font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-wider text-[#111111] font-bold">
                STREAM
              </div>
              <div className="col-span-10 grid grid-cols-5 gap-3">
                {STAGES.map((s, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg transition-colors ${
                      s.isCore
                        ? "bg-[#6BBF3A]/15 border border-[#6BBF3A]"
                        : "bg-white/60 border border-black/5"
                    }`}
                  >
                    <span
                      className={`font-[family-name:var(--font-jetbrains)] text-[10px] tracking-wider uppercase font-semibold block ${
                        s.isCore ? "text-[#6BBF3A] font-bold" : "text-[#B8893A]"
                      }`}
                    >
                      {s.step}
                    </span>
                    <span className="font-[family-name:var(--font-bricolage)] text-xs sm:text-sm font-bold text-[#111111] block mt-0.5">
                      {s.name}
                    </span>
                    <span className="text-[10px] text-[#223328]/70 block mt-0.5 font-normal">
                      {s.function}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-black/6">
              {MATRIX_DATA.map((row, rIdx) => (
                <div
                  key={rIdx}
                  className="grid grid-cols-12 py-5 px-6 items-center hover:bg-black/[0.015] transition-colors"
                >
                  {/* Stream Label */}
                  <div className="col-span-2 pr-4">
                    <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider text-[#B8893A] font-semibold block mb-1">
                      {row.tag}
                    </span>
                    <span className="font-[family-name:var(--font-bricolage)] text-base sm:text-lg font-bold text-[#111111] leading-tight block">
                      {row.stream}
                    </span>
                  </div>

                  {/* 5 Stages Content */}
                  <div className="col-span-10 grid grid-cols-5 gap-3">
                    {row.stages.map((cellText, cIdx) => {
                      const isBioReactor = cIdx === 2;
                      return (
                        <div
                          key={cIdx}
                          className={`p-3 rounded-lg text-xs leading-relaxed transition-all ${
                            isBioReactor
                              ? "bg-[#6BBF3A]/10 text-[#111111] font-medium border-l-2 border-l-[#6BBF3A]"
                              : "text-[#223328]/85 bg-white"
                          }`}
                        >
                          {cellText}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
