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

function getToneColor(rowIndex: number, isDark: boolean) {
  if (isDark) {
    return rowIndex === 0 ? "#A8E6BF" : rowIndex === 1 ? "#F0F7E6" : "#6ED4A0";
  }
  return rowIndex === 0 ? "#1A6640" : rowIndex === 1 ? "#0D3D22" : "#2A5C3A";
}

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
              <div className="grid grid-rows-[150px_repeat(2,135px)]">
                {/* Row 1 Label: Industrial */}
                <div className="row-start-2 flex items-center gap-2.5 pr-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#173522] flex-shrink-0" />
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-[#173522] leading-tight">
                      Industrial
                    </h3>
                    <span className="font-mono text-[11px] text-[#173522]/60 uppercase tracking-wider block mt-1">
                      EFFLUENT
                    </span>
                  </div>
                </div>

                {/* Row 2 Label: Septic */}
                <div className="row-start-3 flex items-center gap-2.5 pr-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#173522] flex-shrink-0" />
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-[#173522] leading-tight">
                      Septic
                    </h3>
                    <span className="font-mono text-[11px] text-[#173522]/60 uppercase tracking-wider block mt-1">
                      ON-SITE
                    </span>
                  </div>
                </div>
              </div>

              {/* 5 Stage Capsule Columns */}
              {STAGES.map((stage, colIdx) => (
                <div
                  key={colIdx}
                  className={`relative grid grid-rows-[150px_repeat(2,135px)] rounded-[90px] border shadow-[0_12px_28px_rgba(23,53,34,0.18)] transition-all duration-300 ease-out hover:scale-[1.035] hover:-translate-y-2 hover:shadow-[0_22px_44px_rgba(23,53,34,0.22)] hover:z-20 cursor-pointer group/capsule group-hover/matrix:opacity-70 group-hover/matrix:hover:opacity-100 ${
                    stage.darkText
                      ? "text-[#F4FAEC] border-[#F4FAEC]/40"
                      : "text-[#173522] border-[#173522]/30"
                  }`}
                  style={{ backgroundColor: stage.bg }}
                >
                  {/* Capsule Header */}
                  <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4">
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

                  {/* Cells */}
                  {stage.cells.map((cell, cellIdx) => (
                    <div
                      key={cellIdx}
                      className="flex flex-col justify-center text-center px-3 sm:px-4 border-t border-current/20"
                    >
                      {!cell.empty ? (
                        <>
                          <div className="relative block w-full h-[7px] mb-2.5 flex-shrink-0">
                            <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 rounded-full bg-current/20" />
                            <div
                              className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                              style={{ width: cell.fill, backgroundColor: getToneColor(cellIdx, stage.darkText) }}
                            />
                            <div
                              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500 box-content"
                              style={{
                                left: cell.fill,
                                backgroundColor: getToneColor(cellIdx, stage.darkText),
                                boxShadow: `0 0 0 1px ${stage.bg}, 0 0 0 2px ${getToneColor(cellIdx, stage.darkText)}`
                              }}
                            />
                          </div>
                          <p className="font-serif text-xs sm:text-sm lg:text-[15px] leading-snug pt-1">
                            {cell.text}
                            {cell.sup && (
                              <sup className="text-[9px] font-mono ml-0.5">{cell.sup}</sup>
                            )}
                          </p>
                        </>
                      ) : (
                        <p className="font-mono text-sm opacity-40">—</p>
                      )}
                    </div>
                  ))}
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
