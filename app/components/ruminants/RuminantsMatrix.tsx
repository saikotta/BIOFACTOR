import React from "react";
import MicrobeField from "../MicrobeField";

export default function RuminantsMatrix() {
  const STAGES = [
    {
      name: "PRE-WEANING",
      period: "0–8 WKS",
      color: "#0284c7",
      objective: "Papillae development & immune priming",
      emissions: "Baseline establishment",
      mechanism: "Direct-fed microbials",
    },
    {
      name: "WEANED HEIFER",
      period: "2–12 MOS",
      color: "#059669",
      objective: "Structural growth & fiber digestion",
      emissions: "10–15% lower intensity",
      mechanism: "Fibrolytic enzyme blend",
    },
    {
      name: "DRY & TRANSITION",
      period: "-3 TO +3 WKS",
      color: "#D97706",
      objective: "Rumen adaptation & metabolic support",
      emissions: "12–18% lower intensity",
      mechanism: "Lactate-utilising bacteria",
    },
    {
      name: "PEAK LACTATION",
      period: "WKS 4–20",
      color: "#2D6A4F",
      objective: "Maximum VFA yield & energy capture",
      emissions: "18–26% lower intensity",
      mechanism: "Precision bio-actives & CH₄ pathway modulators",
    },
    {
      name: "LATE LACTATION",
      period: "WKS 20+",
      color: "#475569",
      objective: "Persistent yield & body condition recovery",
      emissions: "15–22% lower intensity",
      mechanism: "Persist-modulating microbial fermentate",
    },
  ];

  return (
    <section className="relative w-full bg-[#EAF3EA] text-[#173522] pt-16 pb-0 md:pt-24 md:pb-0 lg:pt-28 lg:pb-0 overflow-hidden" data-motion>
      {/* Floating Microorganism Graphics Layer over #EAF3EA canvas inside Matrix */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.78] overflow-hidden">
        <MicrobeField
          position="absolute"
          densityMultiplier={2.8}
          motionMultiplier={0.8}
          opacityMultiplier={0.82}
          rotationMultiplier={0.6}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
        {/* Subtle Restrained Section Boundary Divider */}
        <div className="w-full border-t border-[#167A4A]/14 mb-10 md:mb-14" aria-hidden="true" />

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[1.5px] bg-[#2D6A4F]" />
          <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">
            04 / SYSTEMATIC APPLICATION
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-display font-extrabold text-[clamp(2.25rem,3.8vw,4rem)] text-[#173522] tracking-tight leading-[1.02] uppercase mb-8 md:mb-12" data-ruminants-headline>
          The right biology at every stage.
        </h2>

        {/* SCIENTIFIC BIOLOGICAL SYSTEMS MATRIX */}
        <div className="w-full overflow-x-auto pb-0 pt-2">
          <div className="min-w-[1000px] xl:min-w-full">
            {/* Header Row: Stage Columns Header */}
            <div className="grid grid-cols-12 border-b border-[#173522]/15 pb-6">
              {/* Sticky Left Label Column Header */}
              <div className="col-span-2 sticky left-0 bg-[#EAF3EA]/95 z-10 pr-4 self-end">
                <span className="font-mono text-[11px] font-bold text-[#6DBE45] uppercase tracking-widest block">
                  SYSTEMIC MATRIX
                </span>
              </div>

              {/* 5 Stage Column Headers */}
              {STAGES.map((stg, i) => (
                <div key={i} className="col-span-2 px-4 sm:px-5 lg:px-6 flex flex-col justify-end">
                  {/* Stage Color Accent Bar */}
                  <div
                    className="h-[3.5px] w-full rounded-full mb-3"
                    style={{ backgroundColor: stg.color }}
                  />
                  <span className="font-display font-extrabold text-sm sm:text-base text-[#173522] uppercase tracking-tight block">
                    {stg.name}
                  </span>
                  <span className="font-mono text-xs text-[#26382D]/60 font-medium tracking-wide block mt-0.5">
                    {stg.period}
                  </span>
                </div>
              ))}
            </div>

            {/* Row 1: Primary Biological Objective */}
            <div className="grid grid-cols-12 border-b border-[#173522]/10 py-7 md:py-9 items-start">
              <div className="col-span-2 sticky left-0 bg-[#EAF3EA]/95 z-10 pr-4 pt-1.5">
                <span className="font-mono text-[11px] font-bold text-[#173522]/70 uppercase tracking-wider leading-snug block">
                  PRIMARY BIOLOGICAL
                  <br />
                  OBJECTIVE
                </span>
              </div>
              {STAGES.map((stg, i) => (
                <div key={i} className="col-span-2 px-4 sm:px-5 lg:px-6 space-y-3" data-matrix-column style={{ "--column-index": i } as React.CSSProperties}>
                  <div
                    className="w-[78%] h-[3px] rounded-full opacity-60"
                    style={{ backgroundColor: stg.color }}
                  />
                  <p className="text-sm sm:text-base text-[#173522]/90 leading-relaxed font-sans">
                    {stg.objective}
                  </p>
                </div>
              ))}
            </div>

            {/* Row 2: Emissions Impact Profile */}
            <div className="grid grid-cols-12 border-b border-[#173522]/10 py-7 md:py-9 items-start">
              <div className="col-span-2 sticky left-0 bg-[#EAF3EA]/95 z-10 pr-4 pt-1.5">
                <span className="font-mono text-[11px] font-bold text-[#173522]/70 uppercase tracking-wider leading-snug block">
                  EMISSIONS IMPACT
                  <br />
                  PROFILE
                </span>
              </div>
              {STAGES.map((stg, i) => (
                <div key={i} className="col-span-2 px-4 sm:px-5 lg:px-6 space-y-3" data-matrix-column style={{ "--column-index": i } as React.CSSProperties}>
                  <div
                    className="w-[78%] h-[3px] rounded-full"
                    style={{ backgroundColor: stg.color }}
                  />
                  <p
                    className="font-display font-extrabold text-base sm:text-[17px] tracking-tight leading-relaxed"
                    style={{ color: stg.color }}
                  >
                    {stg.emissions}
                  </p>
                </div>
              ))}
            </div>

            {/* Row 3: Biofactor Target Mechanism */}
            <div className="grid grid-cols-12 pt-7 pb-0 md:pt-9 items-start">
              <div className="col-span-2 sticky left-0 bg-[#EAF3EA]/95 z-10 pr-4 pt-1.5">
                <span className="font-mono text-[11px] font-bold text-[#173522]/70 uppercase tracking-wider leading-snug block">
                  BIOFACTOR TARGET
                  <br />
                  MECHANISM
                </span>
              </div>
              {STAGES.map((stg, i) => (
                <div key={i} className="col-span-2 px-4 sm:px-5 lg:px-6 space-y-3" data-matrix-column style={{ "--column-index": i } as React.CSSProperties}>
                  <div
                    className="w-[78%] h-[3px] rounded-full opacity-60"
                    style={{ backgroundColor: stg.color }}
                  />
                  <p className="text-xs sm:text-sm text-[#173522]/85 leading-relaxed font-mono">
                    {stg.mechanism}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




