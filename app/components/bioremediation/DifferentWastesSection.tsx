"use client";

import React, { useEffect, useRef, useState } from "react";

interface StreamItemProps {
  streamNumber: string;
  streamTag: string;
  title: string;
  tagline: string;
  subtitle: string;
  description: string;
  keyChallenge: string;
  biologicalSolution: string;
  calloutTitle: string;
  calloutBody: string;
  citationId: number;
}

function StreamBlock({
  streamNumber,
  streamTag,
  title,
  tagline,
  subtitle,
  description,
  keyChallenge,
  biologicalSolution,
  calloutTitle,
  calloutBody,
  citationId,
}: StreamItemProps) {
  const [inView, setInView] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );
    if (blockRef.current) observer.observe(blockRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={blockRef}
      className={`py-12 sm:py-16 border-t border-black/8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Left Column: Big Stream Title & Scope */}
      <div className="lg:col-span-4 flex flex-col justify-start">
        <div className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.2em] text-[#B8893A] font-semibold mb-2">
          {streamNumber} • {streamTag}
        </div>
        <h3 className="font-[family-name:var(--font-bricolage)] text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#111111] leading-none mb-4">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-[#223328]/80 leading-relaxed font-normal max-w-sm">
          {tagline}
        </p>
      </div>

      {/* Right Column: Narrative, 2-Col Info Box, & Highlighted Callout */}
      <div className="lg:col-span-8 flex flex-col justify-between">
        <div>
          {/* Subtitle */}
          <h4 className="font-[family-name:var(--font-bricolage)] text-2xl sm:text-3xl font-bold text-[#111111] leading-snug mb-3">
            {subtitle}
          </h4>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#223328] leading-relaxed mb-6">
            {description}
          </p>

          {/* 2-Column Info Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Key Challenge */}
            <div className="bg-white rounded-xl p-5 border border-black/8 shadow-xs">
              <span className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-wider text-[#B8893A] font-bold block mb-2">
                KEY CHALLENGE
              </span>
              <p className="text-xs sm:text-sm text-[#223328] leading-relaxed">
                {keyChallenge}
              </p>
            </div>

            {/* Biological Solution */}
            <div className="bg-white rounded-xl p-5 border border-black/8 shadow-xs">
              <span className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-wider text-[#6BBF3A] font-bold block mb-2">
                BIOLOGICAL SOLUTION
              </span>
              <p className="text-xs sm:text-sm text-[#223328] leading-relaxed">
                {biologicalSolution}
              </p>
            </div>
          </div>
        </div>

        {/* Highlighted Callout Box */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border-l-4 border-l-[#6BBF3A] border-t border-r border-b border-black/8 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="font-[family-name:var(--font-bricolage)] text-base sm:text-lg font-bold text-[#111111]">
              {calloutTitle}
            </span>
            <a
              href={`#ref-${citationId}`}
              className="font-[family-name:var(--font-jetbrains)] text-xs text-[#6BBF3A] hover:underline font-mono"
              title={`View Reference [${citationId}]`}
            >
              [{citationId}]
            </a>
          </div>
          <p className="text-xs sm:text-sm text-[#223328]/90 leading-relaxed">
            {calloutBody}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DifferentWastesSection() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-6 sm:px-10 md:px-14 lg:px-20 max-w-[1400px] mx-auto">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-[family-name:var(--font-jetbrains)] text-xs sm:text-sm uppercase tracking-[0.25em] text-[#B8893A] font-semibold">
            TARGETED BIO-SOLUTIONS BY STREAM
          </span>
          <span className="h-px w-12 bg-[#B8893A]/30" />
        </div>

        <h2 className="font-[family-name:var(--font-bricolage)] text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#111111] leading-[1.05] max-w-3xl">
          Different wastes need different microbes.
        </h2>
      </div>

      {/* STREAM 01: INDUSTRIAL */}
      <StreamBlock
        streamNumber="STREAM 01"
        streamTag="EFFLUENT TREATMENT"
        title="INDUSTRIAL"
        tagline="Effluent treatment plants (ETP) facing complex chemicals, dyes, and heavy toxins."
        subtitle="Specialist microbes for specialist pollutants."
        description="Industrial effluent rarely responds to what ordinary sewage microbes can process. Textile dyeing, chemical synthesis, paper & pulp, and food processing all run with heavy BOD / COD and specialized pollutants: heavy metals, complex phenolics, and synthetic azo dyes. Ordinary biological systems fail because the microbes are overwhelmed or poisoned."
        keyChallenge="Phenolic compounds, complex azo dyes, and high TDS that trigger shock loads and destroy standard biological activated sludge plants."
        biologicalSolution="Selected specialist bacteria: Pseudomonas, Bacillus and fungal strains adapted to degrade aromatic rings, decolorize azo bonds, and chelate heavy metals."
        calloutTitle="70% of 100 mg/L BOD reduced within 48 hours in real industrial trials."
        calloutBody="In distillery and textile effluent trials, specialist bacterial strains achieved 70–85% COD reduction and up to 88% color removal within 48–72 hours, transforming toxic organic waste streams into compliant discharge."
        citationId={4}
      />

      {/* STREAM 02: SEWAGE */}
      <StreamBlock
        streamNumber="STREAM 02"
        streamTag="MUNICIPAL STP"
        title="SEWAGE"
        tagline="Municipal sewage treatment plants (STP) coping with fluctuating flow and nutrient spikes."
        subtitle="Strengthening the biology plants already run on."
        description="Most municipal plants operate on activated sludge processes, relying on native microbial communities to decompose organic waste. But fluctuating inflows, hydraulic overload, toxic peaks from domestic and commercial cleaners, and low winter temperatures cause frequent process upset, poor settling, and failure to meet discharge norms."
        keyChallenge="Filamentous bulking, high sludge volume index (SVI), foaming, and sluggish nitrification during shock loads."
        biologicalSolution="Consortium bioaugmentation of robust heterotrophic and nitrifying bacteria (Nitrosomonas & Nitrobacter) that outcompete filament formers and stabilize flocs."
        calloutTitle="More biomass, better settling, faster recovery: +30–40% reduction in aeration energy."
        calloutBody="Through rapid settleability and improved oxygen transfer efficiency. Plants recover from hydraulic shock or toxic spills in hours instead of days, preventing compliance breaches and lowering operating costs."
        citationId={7}
      />

      {/* STREAM 03: SEPTIC */}
      <StreamBlock
        streamNumber="STREAM 03"
        streamTag="ON-SITE & SEPTIC"
        title="SEPTIC"
        tagline="Residential and commercial on-site systems, soak pits, and decentralized effluent tanks."
        subtitle="Where biology helps most is downstream of the tank."
        description="A standard septic tank is an anaerobic settling chamber. It liquefies some suspended solids and sludges, but discharges high BOD, dissolved ammonia, and organic-bound phosphorus into drain fields and soak pits. Over time, drainfield bio-mats clog with slimy bacterial polysaccharide matrices, suffocating the soil absorption field and causing surface puddling, backup, and groundwater contamination."
        keyChallenge="Biomat formation in drain fields, sludge accumulation, harsh surfactant and bleach poisoning from household detergents."
        biologicalSolution="High-potency multi-strain spore consortium producing extracellular enzymes (lipases, proteases, cellulases) to digest scum layers and unclog drainfields."
        calloutTitle="Restoring soil infiltration without digging: restores absorption rates in 14–21 days."
        calloutBody="Targeted microbial digestion dissolves the dense slime layer in soil trenches, restoring absorption rates within 14–21 days and extending septic field life indefinitely without chemical trench flushing or physical soil replacement."
        citationId={9}
      />
    </section>
  );
}
