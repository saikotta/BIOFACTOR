import React from "react";

interface MatrixCell {
  text: string;
  fill: string;
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
      { text: "Segregate difficult streams", fill: "70%" },
      { text: "Correct tank design and use", fill: "65%" },
    ],
  },
  {
    number: "02",
    name: "COLLECTION",
    subtitle: "TANK · DRAIN · SUMP",
    bg: "#A5D6A7",
    darkText: false,
    cells: [
      { text: "—", fill: "0%", empty: true },
      { text: "Regular emptying", fill: "50%" },
    ],
  },
  {
    number: "03",
    name: "BIOLOGICAL TREATMENT",
    subtitle: "CORE PROCESS",
    bg: "#81C784",
    darkText: false,
    cells: [
      { text: "Dye cleavage, Cr(VI) reduction", fill: "90%", sup: "4 5" },
      { text: "Septage treatment at FSTP", fill: "80%" },
    ],
  },
  {
    number: "04",
    name: "POLISHING",
    subtitle: "FINAL QUALITY",
    bg: "#66BB6A",
    darkText: false,
    cells: [
      { text: "Aerobic clean-up of by-products", fill: "85%" },
      { text: "Stabilised, safer sludge", fill: "75%" },
    ],
  },
  {
    number: "05",
    name: "RECEIVING WATER",
    subtitle: "LAKE · RIVER · REUSE",
    bg: "#4CAF50",
    darkText: true,
    cells: [
      { text: "Lower toxic load discharged", fill: "95%" },
      { text: "Less dumping into water bodies", fill: "85%" },
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
            <div className="grid grid-cols-[130px_repeat(5,minmax(0,1fr))] lg:grid-cols-[150px_repeat(5,minmax(0,1fr))] grid-rows-[150px_repeat(2,135px)] gap-3 sm:gap-4.5 items-stretch">

              {/* Row 0 Label: Industrial */}
              <div className="col-start-1 row-start-2 flex items-center gap-2.5 py-4">
                <span className="w-2 h-2 rounded-full bg-[#173522] flex-shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-[#173522] leading-tight">
                    Industrial
                  </h3>
                  <span className="font-mono text-[11px] text-[#26382D]/60 uppercase tracking-wider block">
                    EFFLUENT
                  </span>
                </div>
              </div>

              {/* Row 1 Label: Septic */}
              <div className="col-start-1 row-start-3 flex items-center gap-2.5 py-4">
                <span className="w-2 h-2 rounded-full bg-[#173522] flex-shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-[#173522] leading-tight">
                    Septic
                  </h3>
                  <span className="font-mono text-[11px] text-[#26382D]/60 uppercase tracking-wider block">
                    ON-SITE
                  </span>
                </div>
              </div>

              {/* 5 Stage Capsule Columns */}
              {STAGES.map((stage, colIdx) => {
                const colClass = `col-start-${colIdx + 2}`;
                const barStyles = stage.darkText
                  ? [
                      { fillBg: "#A8E6BF", trackBg: "rgba(168,230,191,0.40)" },
                      { fillBg: "#F0F7E6", trackBg: "rgba(240,247,230,0.38)" },
                    ]
                  : [
                      { fillBg: "#1A6640", trackBg: "rgba(26,102,64,0.32)" },
                      { fillBg: "#0D3D22", trackBg: "rgba(13,61,34,0.32)" },
                    ];

                return (
                  <div
                    key={colIdx}
                    className={`row-start-1 row-span-3 grid grid-rows-[150px_repeat(2,135px)] rounded-[90px] px-3.5 sm:px-4 lg:px-5 border shadow-[0_12px_28px_rgba(23,53,34,0.18)] transition-all duration-300 ease-out hover:scale-[1.035] hover:-translate-y-2 hover:shadow-[0_22px_44px_rgba(23,53,34,0.22)] hover:z-20 cursor-pointer group/capsule group-hover/matrix:opacity-70 group-hover/matrix:hover:opacity-100 ${colClass} ${
                      stage.darkText
                        ? "text-[#F4FAEC] border-[#F4FAEC]/40"
                        : "text-[#173522] border-[#173522]/30"
                    }`}
                    style={{ backgroundColor: stage.bg }}
                  >
                    {/* Capsule Header (Row 1 of capsule grid) */}
                    <div className="row-start-1 flex flex-col justify-center text-center py-4 border-b border-current/25">
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

                    {/* Cells (Rows 2 & 3 of capsule grid) */}
                    {stage.cells.map((cell, rowIdx) => {
                      const style = barStyles[rowIdx];
                      const isNotFirst = rowIdx > 0;
                      return (
                        <div
                          key={rowIdx}
                          className={`flex flex-col justify-center text-center px-2 py-3 relative ${
                            isNotFirst ? "border-t border-current/20" : ""
                          }`}
                          style={{ gridRow: rowIdx + 2 }}
                        >
                          {!cell.empty ? (
                            <>
                              {/* Cell Bar Track & Filled Bar with Tip Dot */}
                              <div className="relative w-full h-[7px] mb-2 flex-shrink-0">
                                {/* Track */}
                                <div
                                  className="absolute top-1/2 left-0 -translate-y-1/2 h-[2px] w-full rounded-full"
                                  style={{ backgroundColor: style.trackBg }}
                                />
                                {/* Filled bar */}
                                <div
                                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                                  style={{ width: cell.fill, backgroundColor: style.fillBg }}
                                />
                                {/* Glowing tip dot */}
                                <div
                                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full transition-all duration-500"
                                  style={{
                                    left: cell.fill,
                                    backgroundColor: style.fillBg,
                                    boxShadow: `0 0 0 1px ${stage.bg}, 0 0 0 2px ${style.fillBg}`,
                                  }}
                                />
                              </div>

                              {/* Cell Text */}
                              <p className="font-serif text-xs sm:text-sm lg:text-[15px] leading-snug">
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
                      );
                    })}
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
