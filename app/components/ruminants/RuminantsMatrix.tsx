import React from "react";

export default function RuminantsMatrix() {
  const STAGES = [
    {
      name: "PRE-WEANING",
      period: "0–8 WKS",
      color: "#0284c7",
      bgColor: "#E0F2FE",
      objective: "Papillae development & immune priming",
      emissions: "Baseline establishment",
      mechanism: "Direct-fed microbials",
    },
    {
      name: "WEANED HEIFER",
      period: "2–12 MOS",
      color: "#059669",
      bgColor: "#D1FAE5",
      objective: "Structural growth & fiber digestion",
      emissions: "10–15% lower intensity",
      mechanism: "Fibrolytic enzyme blend",
    },
    {
      name: "DRY & TRANSITION",
      period: "-3 TO +3 WKS",
      color: "#d97706",
      bgColor: "#FEF3C7",
      objective: "Rumen adaptation & metabolic support",
      emissions: "12–18% lower intensity",
      mechanism: "Lactate-utilising bacteria",
    },
    {
      name: "PEAK LACTATION",
      period: "WKS 4–20",
      color: "#167A4A",
      bgColor: "#DCFCE7",
      objective: "Maximum VFA yield & energy capture",
      emissions: "18–26% lower intensity",
      mechanism: "Precision bio-actives & CH₄ pathway modulators",
    },
    {
      name: "LATE LACTATION",
      period: "WKS 20+",
      color: "#475569",
      bgColor: "#F1F5F9",
      objective: "Persistent yield & body condition recovery",
      emissions: "15–22% lower intensity",
      mechanism: "Persist-modulating microbial fermentate",
    },
  ];

  return (
    <section className="w-full bg-[#EEF4EC] text-[#173522] border-t border-[#167A4A]/15 py-16 md:py-24">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-[clamp(48px,5vw,72px)]">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-6 h-[1.5px] bg-[#167A4A]" />
          <span className="font-mono text-xs font-semibold tracking-wider text-[#167A4A] uppercase">
            04 / SYSTEMATIC APPLICATION
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#173522] tracking-tight leading-[1.05] uppercase mb-12 md:mb-16">
          The right biology at every stage.
        </h2>

        {/* Matrix Container (Controlled Horizontal Scroll on Mobile) */}
        <div className="w-full bg-[#F7FAF6] border border-[#167A4A]/20 rounded-2xl p-6 sm:p-8 overflow-x-auto shadow-xs">
          <div className="min-w-[900px]">
            {/* Stage Columns Header */}
            <div className="grid grid-cols-6 gap-4 pb-6 border-b border-[#167A4A]/20">
              <div className="font-mono text-xs font-bold text-[#167A4A] uppercase tracking-wider self-end">
                LIFE CYCLE MATRIX
              </div>
              {STAGES.map((stg, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: stg.color }} />
                  <span className="font-display font-extrabold text-xs text-[#173522] uppercase tracking-tight mt-2">
                    {stg.name}
                  </span>
                  <span className="font-mono text-[11px] text-[#26382D]/60 font-semibold">
                    {stg.period}
                  </span>
                </div>
              ))}
            </div>

            {/* Row 1: Primary Biological Objective */}
            <div className="grid grid-cols-6 gap-4 py-6 border-b border-[#167A4A]/15 items-center">
              <div className="font-mono text-xs font-semibold text-[#173522]/80 uppercase">
                Primary Biological Objective
              </div>
              {STAGES.map((stg, i) => (
                <div key={i} className="text-xs text-[#26382D] leading-snug font-medium p-2.5 rounded-lg bg-[#FFFFFF] border border-[#167A4A]/10 min-h-[56px] flex items-center">
                  {stg.objective}
                </div>
              ))}
            </div>

            {/* Row 2: Emissions Impact Profile */}
            <div className="grid grid-cols-6 gap-4 py-6 border-b border-[#167A4A]/15 items-center">
              <div className="font-mono text-xs font-semibold text-[#173522]/80 uppercase">
                Emissions Impact Profile
              </div>
              {STAGES.map((stg, i) => (
                <div key={i} className="text-xs font-bold p-2.5 rounded-lg border min-h-[56px] flex items-center" style={{ backgroundColor: stg.bgColor, borderColor: `${stg.color}30`, color: stg.color }}>
                  {stg.emissions}
                </div>
              ))}
            </div>

            {/* Row 3: Biofactor Target Mechanism */}
            <div className="grid grid-cols-6 gap-4 pt-6 items-center">
              <div className="font-mono text-xs font-semibold text-[#173522]/80 uppercase">
                Biofactor Target Mechanism
              </div>
              {STAGES.map((stg, i) => (
                <div key={i} className="text-xs text-[#173522] leading-snug font-mono p-2.5 rounded-lg bg-[#FFFFFF] border border-[#167A4A]/10 min-h-[56px] flex items-center">
                  {stg.mechanism}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
