"use client";

import React from "react";

export default function BottomBlock() {
  return (
    <>
      <section
        className="relative w-full overflow-hidden px-6 py-20 md:px-12 lg:px-20 xl:px-32"
        style={{ background: "linear-gradient(180deg, #E5F0D4 0%, #DDE9C8 50%, #D1E4B9 100%)" }}
      >
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8">
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="h-[1.5px] w-7 bg-[#4b6b57]" />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 400,
                  fontSize: "12px",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "#4b6b57",
                }}
              >
                THE POND BOTTOM
              </span>
            </div>

            <h1
              className="w-full text-left"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(36px,5.2vw,68px)",
                lineHeight: 0.96,
                letterSpacing: "-0.035em",
                color: "#10301f",
                margin: 0,
              }}
            >
              Where organic load turns into toxic gas.
            </h1>

            <p
              style={{
                fontFamily: "'Newsreader', serif",
                fontWeight: 400,
                fontSize: "17px",
                lineHeight: 1.7,
                color: "#4b6b57",
                maxWidth: "41em",
                margin: 0,
                textAlign: "left",
              }}
            >
              Uneaten feed, faeces and dead plankton settle on the bottom every day. Just below the surface of that sludge there is no oxygen, and microbes break it down anaerobically. The by-products seep up into the water where the shrimp live.
            </p>
          </div>

          <div
            style={{
              border: "1px solid #CFE3BB",
              borderTop: "3px solid #4CAF3F",
              borderRadius: "12px",
              padding: "28px",
              background: "#FFFFFF",
              width: "100%",
              overflowX: "auto",
            }}
          >
            <svg
              viewBox="0 0 1092 465"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", minWidth: "520px", display: "block" }}
              aria-label="Cross-section showing pond-bottom organic matter settling into toxic gases"
              role="img"
            >
              <defs>
                <linearGradient id="pbWater" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EAF7F2" />
                  <stop offset="100%" stopColor="#C2E6E0" />
                </linearGradient>
                <linearGradient id="pbSed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#342318" />
                  <stop offset="100%" stopColor="#1F140D" />
                </linearGradient>
              </defs>

              <rect x="0" y="0" width="1092" height="230" fill="url(#pbWater)" rx="6" />
              <rect x="0" y="230" width="1092" height="235" fill="url(#pbSed)" rx="6" />
              <rect x="0" y="224" width="1092" height="12" fill="#4A3520" opacity="0.75" />
              <line x1="0" y1="230" x2="1092" y2="230" stroke="#C58F4A" strokeWidth="2.5" />
              <line x1="0" y1="242" x2="1092" y2="242" stroke="#C58F4A" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />

              <text x="546" y="38" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="12" fontWeight="600" fill="#10301f" letterSpacing="2.2">WATER COLUMN · SHRIMP</text>
              <text x="546" y="220" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="500" fill="#7A5A2F" letterSpacing="1.8">SOIL-WATER INTERFACE · THIN OXIDISED LAYER</text>
              <text x="546" y="448" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11.5" fontWeight="500" fill="#D9A566" letterSpacing="2.2">ANAEROBIC SEDIMENT · NO OXYGEN</text>

              <text x="42" y="52" fontFamily="'Newsreader', serif" fontSize="14" fill="#3C5C48" fontWeight="500">Feed, faeces, dead plankton</text>
              <text x="42" y="70" fontFamily="'Newsreader', serif" fontSize="14" fill="#3C5C48" fontWeight="500">settle daily</text>

              <line x1="440" y1="90" x2="440" y2="270" stroke="#D6456A" strokeWidth="2.2" strokeDasharray="6 5" />
              <line x1="620" y1="120" x2="620" y2="270" stroke="#D6456A" strokeWidth="2.2" strokeDasharray="6 5" />
              <line x1="800" y1="60" x2="800" y2="270" stroke="#D6456A" strokeWidth="2.2" strokeDasharray="6 5" />

              <polygon points="433,90 447,90 440,82" fill="#D6456A" />
              <polygon points="613,120 627,120 620,112" fill="#D6456A" />
              <polygon points="793,60 807,60 800,52" fill="#D6456A" />

              <text x="440" y="74" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11.5" fontWeight="600" fill="#D6456A" letterSpacing="1.2">NH₃ · ammonia</text>
              <text x="620" y="102" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11.5" fontWeight="600" fill="#D6456A" letterSpacing="1.2">NO₂⁻ · nitrite</text>
              <text x="800" y="42" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11.5" fontWeight="600" fill="#D6456A" letterSpacing="1.2">H₂S · hydrogen sulphide</text>

              <text x="330" y="315" textAnchor="middle" fontFamily="'Newsreader', serif" fontSize="14.5" fill="rgba(255,255,255,0.88)">Organic N → ammonia</text>
              <text x="530" y="360" textAnchor="middle" fontFamily="'Newsreader', serif" fontSize="14.5" fill="rgba(255,255,255,0.88)">Incomplete nitrification</text>
              <text x="750" y="315" textAnchor="middle" fontFamily="'Newsreader', serif" fontSize="14.5" fill="rgba(255,255,255,0.88)">Sulphate-reducing bacteria</text>

              <g>
                <rect x="30" y="338" width="28" height="14" rx="7" fill="none" stroke="#7EE0A8" strokeWidth="1.5" />
                <rect x="66" y="344" width="22" height="12" rx="6" fill="none" stroke="#7EE0A8" strokeWidth="1.5" />
                <circle cx="104" cy="350" r="7" fill="none" stroke="#7EE0A8" strokeWidth="1.5" />
                <circle cx="46" cy="362" r="5" fill="none" stroke="#7EE0A8" strokeWidth="1.5" />
                <rect x="55" y="368" width="26" height="11" rx="5.5" fill="none" stroke="#7EE0A8" strokeWidth="1.5" />
                <text x="30" y="396" fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="600" fill="#7EE0A8" letterSpacing="1.2">ANAEROBIC CONSORTIA</text>
                <text x="30" y="412" fontFamily="'Newsreader', serif" fontSize="12" fill="#A8ECC7" opacity="0.85">digest the organic load</text>
              </g>

              <g>
                <rect x="860" y="338" width="28" height="14" rx="7" fill="none" stroke="#7EE0A8" strokeWidth="1.5" />
                <circle cx="898" cy="345" r="7" fill="none" stroke="#7EE0A8" strokeWidth="1.5" />
                <rect x="910" y="342" width="22" height="12" rx="6" fill="none" stroke="#7EE0A8" strokeWidth="1.5" />
                <circle cx="946" cy="350" r="5" fill="none" stroke="#7EE0A8" strokeWidth="1.5" />
                <rect x="878" y="358" width="26" height="11" rx="5.5" fill="none" stroke="#7EE0A8" strokeWidth="1.5" />
                <text x="850" y="396" fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="600" fill="#7EE0A8" letterSpacing="1.2">DENITRIFIERS · SULPHIDE OXIDISERS</text>
                <text x="860" y="412" fontFamily="'Newsreader', serif" fontSize="12" fill="#A8ECC7" opacity="0.85">N → N₂ gas · H₂S → sulphur</text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      <section
        className="w-full px-6 pb-10 pt-24 text-[#10301f] md:px-12 md:pb-14 md:pt-28 lg:px-20 lg:pb-16 lg:pt-28 xl:px-32"
        style={{ background: "linear-gradient(180deg, #D1E4B9 0%, #C4DEA9 50%, #D9EBC4 100%)" }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 md:grid-cols-12 lg:gap-12">
          <div className="order-2 mx-auto w-[88%] md:order-1 md:col-span-4 md:col-start-1 md:row-start-1 md:w-full md:self-center">
            <div
              role="img"
              aria-label="Pond bottom image"
              className="mx-auto aspect-[3/4] w-full max-w-[320px] rounded-sm bg-[#dcecdf] bg-cover bg-center"
              style={{ backgroundImage: "url('/images/aquaculture-pond-bottom.jpg')" }}
            />
          </div>

          <div className="order-1 md:order-2 md:col-span-8 md:col-start-5 md:row-start-1">
            <p
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              className="text-[10px] font-medium uppercase leading-none tracking-[0.24em] text-[#5A7A5E]"
            >
              HOW TOXINS FORM
            </p>
            <h2
              style={{
                fontFamily: "var(--font-inter-tight), sans-serif",
                fontSize: "clamp(48px, 8vw, 88px)",
                lineHeight: 0.82,
              }}
              className="mt-3 font-extrabold tracking-normal text-[#1F8A57]"
            >
              BOTTOM
            </h2>
            <div className="mt-3 flex flex-col gap-[6px]">
              <div className="flex items-center gap-2" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.04em", color: "#4b6b57", whiteSpace: "nowrap" }}>
                <span style={{ display: "inline-block", width: "16px", height: "2px", background: "#B8893A", flexShrink: 0 }} />
                No oxygen below a few mm
              </div>
              <div className="flex items-center gap-2" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.04em", color: "#4b6b57", whiteSpace: "nowrap" }}>
                <span style={{ display: "inline-block", width: "16px", height: "2px", background: "#B8893A", flexShrink: 0 }} />
                Organic load builds up every day
              </div>
            </div>
            <h2 className="mb-5 mt-4 font-inter-tight text-[clamp(24px,2.5vw,34px)] font-bold leading-tight text-[#10301f]">
              Three toxic metabolites, one source.
            </h2>
            <div className="grid grid-cols-1 gap-px border border-[#CFE3BB] bg-[#CFE3BB] sm:grid-cols-2">
              <article className="bg-[#FFFFFF] p-4 md:p-5" style={{ borderTop: "3px solid #4CAF3F" }}>
                <h3 className="font-inter-tight text-[16px] font-bold text-[#10301f]">Ammonia (NH₃)</h3>
                <p className="mt-1 font-newsreader text-[15px] leading-[1.5] text-[#4b6b57]">Released as proteins in feed and faeces break down in the sediment.</p>
              </article>
              <article className="bg-[#FFFFFF] p-4 md:p-5" style={{ borderTop: "3px solid #4CAF3F" }}>
                <h3 className="font-inter-tight text-[16px] font-bold text-[#10301f]">Nitrite (NO₂⁻)</h3>
                <p className="mt-1 font-newsreader text-[15px] leading-[1.5] text-[#4b6b57]">Accumulates when low oxygen at the bottom stops nitrification halfway.</p>
              </article>
              <article className="bg-[#FFFFFF] p-4 md:p-5" style={{ borderTop: "3px solid #4CAF3F" }}>
                <h3 className="font-inter-tight text-[16px] font-bold text-[#10301f]">Hydrogen sulphide (H₂S)</h3>
                <p className="mt-1 font-newsreader text-[15px] leading-[1.5] text-[#4b6b57]">Produced by sulphate-reducing bacteria such as <em>Desulfovibrio</em> in oxygen-free sediment.</p>
              </article>
              <article className="bg-[#FFFFFF] p-4 md:p-5" style={{ borderTop: "3px solid #4CAF3F" }}>
                <h3 className="font-inter-tight text-[16px] font-bold text-[#10301f]">Released upward</h3>
                <p className="mt-1 font-newsreader text-[15px] leading-[1.5] text-[#4b6b57]">All three diffuse into the water column, where they stress shrimp, suppress feeding and weaken immunity.</p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
