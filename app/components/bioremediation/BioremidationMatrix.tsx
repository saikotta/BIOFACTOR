import React from "react";

interface MatrixCell {
  text: string;
  fill: string;
  barColor: string;
  empty?: boolean;
  sup?: string;
}

interface StageColumn {
  number: string;
  name: string;
  subtitle: string;
  bg: string;
  darkText: boolean;
  cells: MatrixCell[];
}

const STAGES: StageColumn[] = [
  {
    number: "01",
    name: "SOURCE",
    subtitle: "GENERATION",
    bg: "#C8E6C9",
    darkText: false,
    cells: [
      { text: "Segregate difficult streams", fill: "70%", barColor: "#D69E2E" },
      { text: "Correct tank design and use", fill: "65%", barColor: "#805AD5" },
    ],
  },
  {
    number: "02",
    name: "COLLECTION",
    subtitle: "TANK · DRAIN · SUMP",
    bg: "#A5D6A7",
    darkText: false,
    cells: [
      { text: "—", fill: "0%", barColor: "#D69E2E", empty: true },
      { text: "Regular emptying", fill: "50%", barColor: "#805AD5" },
    ],
  },
  {
    number: "03",
    name: "BIOLOGICAL TREATMENT",
    subtitle: "CORE PROCESS",
    bg: "#81C784",
    darkText: false,
    cells: [
      { text: "Dye cleavage, Cr(VI) reduction", fill: "90%", barColor: "#D69E2E", sup: "4 5" },
      { text: "Septage treatment at FSTP", fill: "80%", barColor: "#805AD5" },
    ],
  },
  {
    number: "04",
    name: "POLISHING",
    subtitle: "FINAL QUALITY",
    bg: "#66BB6A",
    darkText: false,
    cells: [
      { text: "Aerobic clean-up of by-products", fill: "85%", barColor: "#D69E2E" },
      { text: "Stabilised, safer sludge", fill: "75%", barColor: "#805AD5" },
    ],
  },
  {
    number: "05",
    name: "RECEIVING WATER",
    subtitle: "LAKE · RIVER · REUSE",
    bg: "#4CAF50",
    darkText: true,
    cells: [
      { text: "Lower toxic load discharged", fill: "95%", barColor: "#B8E986" },
      { text: "Less dumping into water bodies", fill: "85%", barColor: "#E9D8FD" },
    ],
  },
];

export default function BioremidationMatrix() {
  return (
    <section className="relative w-full bg-[#EAF3EA] text-[#173522] pt-4 md:pt-6 lg:pt-8 pb-16 md:pb-24 lg:pb-32 overflow-hidden">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
        {/* Subtle Boundary Divider */}
        <div className="w-full border-t border-[#167A4A]/14 mb-8 md:mb-10" aria-hidden="true" />

        {/* Eyebrow & Main Title */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[1.5px] bg-[#2D6A4F]" />
          <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">
            ALONG THE TREATMENT CHAIN
          </span>
        </div>

        <h2 className="font-display font-extrabold text-[clamp(2.25rem,4vw,4.25rem)] text-[#173522] tracking-tight leading-[1.02] uppercase mb-10 md:mb-14 max-w-[1100px]">
          Where biology does the work.
        </h2>

        {/* Matrix Scroll Container (Scrollbar hidden) */}
        <div className="w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-8 pt-4">
          <div className="min-w-[960px] lg:min-w-0 w-full group/matrix">
            <div className="grid grid-cols-[130px_repeat(5,minmax(0,1fr))] lg:grid-cols-[140px_repeat(5,minmax(0,1fr))] gap-3 sm:gap-4.5 items-stretch">
              
              {/* Left Column: Row Labels */}
              <div className="flex flex-col justify-between pt-36 pb-16 space-y-16">
                {/* Row 1 Label: Industrial */}
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#D69E2E] flex-shrink-0" />
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-[#173522] leading-tight">
                      Industrial
                    </h3>
                    <span className="font-mono text-[11px] text-[#26382D]/60 uppercase tracking-wider block">
                      EFFLUENT
                    </span>
                  </div>
                </div>

                {/* Row 2 Label: Septic */}
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#805AD5] flex-shrink-0" />
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-[#173522] leading-tight">
                      Septic
                    </h3>
                    <span className="font-mono text-[11px] text-[#26382D]/60 uppercase tracking-wider block">
                      ON-SITE
                    </span>
                  </div>
                </div>
              </div>

              {/* 5 Stage Capsule Columns (Slender Ruminants Parity) */}
              {STAGES.map((stage, colIdx) => (
                <div
                  key={colIdx}
                  className={`relative flex flex-col justify-between rounded-[90px] px-3.5 sm:px-4 lg:px-5 py-8 sm:py-10 border shadow-[0_12px_28px_rgba(23,53,34,0.18)] transition-all duration-300 ease-out hover:scale-[1.035] hover:-translate-y-2 hover:shadow-[0_22px_44px_rgba(23,53,34,0.22)] hover:z-20 cursor-pointer group/capsule group-hover/matrix:opacity-70 group-hover/matrix:hover:opacity-100 min-h-[460px] sm:min-h-[500px] ${
                    stage.darkText 
                      ? "text-[#F4FAEC] border-[#F4FAEC]/40" 
                      : "text-[#173522] border-[#173522]/30"
                  }`}
                  style={{ backgroundColor: stage.bg }}
                >
                  {/* Capsule Header */}
                  <div className="text-center pt-2 pb-6 border-b border-current/25">
                    <span className="font-display font-bold text-xs tracking-wider block mb-1 opacity-90">
                      {stage.number}
                    </span>
                    <strong className="font-display font-extrabold text-sm sm:text-base lg:text-[17px] uppercase leading-tight block relative">
                      {stage.name}
                      <span className="block w-8 h-[1px] bg-current mx-auto mt-2 opacity-55 scale-x-0 group-hover/capsule:scale-x-100 transition-transform duration-300" />
                    </strong>
                    <span className="font-serif italic text-xs block mt-1.5 opacity-80">
                      {stage.subtitle}
                    </span>
                  </div>

                  {/* Cell 1: Industrial */}
                  <div className="py-6 flex flex-col justify-center text-center border-b border-current/20 flex-1">
                    {!stage.cells[0].empty ? (
                      <>
                        <div className="relative w-full h-1.5 bg-current/20 rounded-full mb-3 overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                            style={{ width: stage.cells[0].fill, backgroundColor: stage.cells[0].barColor }}
                          />
                        </div>
                        <p className="font-serif text-xs sm:text-sm lg:text-[15px] leading-snug">
                          {stage.cells[0].text}
                          {stage.cells[0].sup && (
                            <sup className="text-[9px] font-mono ml-0.5">{stage.cells[0].sup}</sup>
                          )}
                        </p>
                      </>
                    ) : (
                      <p className="font-mono text-sm opacity-40">—</p>
                    )}
                  </div>

                  {/* Cell 2: Septic */}
                  <div className="py-6 flex flex-col justify-center text-center pb-4 flex-1">
                    {!stage.cells[1].empty ? (
                      <>
                        <div className="relative w-full h-1.5 bg-current/20 rounded-full mb-3 overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                            style={{ width: stage.cells[1].fill, backgroundColor: stage.cells[1].barColor }}
                          />
                        </div>
                        <p className="font-serif text-xs sm:text-sm lg:text-[15px] leading-snug">
                          {stage.cells[1].text}
                        </p>
                      </>
                    ) : (
                      <p className="font-mono text-sm opacity-40">—</p>
                    )}
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
