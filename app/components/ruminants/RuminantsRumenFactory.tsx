import React from "react";

export default function RuminantsRumenFactory() {
  return (
    <section className="w-full bg-[#EEF4EC] text-[#173522] py-6 lg:py-9 border-t border-[#167A4A]/12">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-[clamp(48px,5vw,72px)]">
        {/* Eyebrow Label */}
        <div className="flex items-center gap-2.5 mb-2">
          <span className="w-6 h-[1.5px] bg-[#167A4A]" aria-hidden="true" />
          <span className="font-mono text-xs font-semibold tracking-wider text-[#167A4A] uppercase">
            A LIVING FERMENTER
          </span>
        </div>

        {/* Headline & Supporting Copy Stack */}
        <div className="max-w-[1000px] mb-4 lg:mb-5">
          <h2 className="font-display font-extrabold text-[clamp(2.25rem,3.5vw,3.75rem)] text-[#173522] tracking-tight leading-[0.98] mb-2">
            The rumen is a microbial
            <br />
            factory with one customer.
          </h2>
          <p className="font-serif text-base sm:text-lg text-[#26382D]/85 leading-[1.48] max-w-[900px]">
            Bacteria, protozoa, fungi and archaea in the rumen break down fibre and starch. What they produce feeds the animal. What they waste leaves as methane.
          </p>
        </div>

        {/* Technical Boundary Outer Container (Compact Vertical Fit) */}
        <div className="w-full border border-[#167A4A]/20 p-3.5 sm:p-5 overflow-x-auto">
          <div className="min-w-[880px]">
            <svg
              viewBox="0 0 960 250"
              fill="none"
              className="w-full h-auto select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* LEFT INPUT WITH SOLID L-SHAPED PATHWAY */}
              <g transform="translate(20, 35)">
                <text x="0" y="0" fill="#167A4A" fontSize="12" fontFamily="monospace" fontWeight="700" letterSpacing="1">
                  FEED IN
                </text>
                <text x="0" y="18" fill="#26382D" fontSize="12" fontFamily="monospace" opacity="0.8">
                  fibre · starch · protein
                </text>

                {/* Solid L-shaped pathway: vertical down → horizontal right → arrow into rumen */}
                <path d="M 40 28 L 40 90 L 232 90" stroke="#167A4A" strokeWidth="1.25" fill="none" />
                <polygon points="232,86 240,90 232,94" fill="#167A4A" />
              </g>

              {/* CENTER RUMEN CAVITY OVAL */}
              <g transform="translate(260, 10)">
                {/* Top Label */}
                <text x="200" y="18" textAnchor="middle" fill="#167A4A" fontSize="11" fontFamily="monospace" fontWeight="700" letterSpacing="1">
                  RUMEN · NO OXYGEN · ~39 °C
                </text>

                {/* Outer Oval (Compact Height ry=85) */}
                <ellipse cx="200" cy="115" rx="175" ry="85" fill="#F4F8F3" stroke="#167A4A" strokeWidth="1.25" />

                {/* Floating Microorganism Symbols inside Oval */}
                {/* Rod Microbes */}
                <rect x="95" y="75" width="20" height="8" rx="4" fill="none" stroke="#167A4A" strokeWidth="1.25" transform="rotate(-15 105 79)" />
                <rect x="180" y="65" width="22" height="8" rx="4" fill="none" stroke="#167A4A" strokeWidth="1.25" transform="rotate(25 191 69)" />
                <rect x="270" y="90" width="20" height="8" rx="4" fill="none" stroke="#167A4A" strokeWidth="1.25" transform="rotate(-30 280 94)" />
                <rect x="140" y="140" width="22" height="8" rx="4" fill="none" stroke="#167A4A" strokeWidth="1.25" transform="rotate(10 151 144)" />

                {/* Cocci Microbes */}
                <circle cx="140" cy="95" r="4" fill="none" stroke="#167A4A" strokeWidth="1.25" />
                <circle cx="150" cy="98" r="4" fill="none" stroke="#167A4A" strokeWidth="1.25" />
                <circle cx="230" cy="115" r="4.5" fill="none" stroke="#167A4A" strokeWidth="1.25" />
                <circle cx="280" cy="135" r="4" fill="none" stroke="#167A4A" strokeWidth="1.25" />

                {/* Fungi / Archaea Spirals */}
                <path d="M 220 140 Q 225 132, 230 140 T 240 140" fill="none" stroke="#C88A35" strokeWidth="1.25" />
                <path d="M 110 120 Q 115 112, 120 120 T 130 120" fill="none" stroke="#167A4A" strokeWidth="1.25" />

                {/* Bottom Label */}
                <text x="200" y="222" textAnchor="middle" fill="#26382D" fontSize="11" fontFamily="monospace" opacity="0.8">
                  bacteria · protozoa · fungi · archaea
                </text>
              </g>

              {/* RIGHT OUTPUT PATHWAYS */}
              {/* Output 1: Methane */}
              <g transform="translate(640, 25)">
                <path d="M -5 75 Q 30 35, 65 20" fill="none" stroke="#C88A35" strokeWidth="1.25" strokeDasharray="3 3" />
                <polygon points="62,15 72,17 67,25" fill="#C88A35" />
                <text x="80" y="22" fill="#C88A35" fontSize="12" fontFamily="monospace" fontWeight="700" letterSpacing="0.5">
                  METHANE · ENERGY LOST
                </text>
              </g>

              {/* Output 2: Volatile Fatty Acids */}
              <g transform="translate(640, 80)">
                <path d="M -5 35 Q 30 20, 65 15" fill="none" stroke="#167A4A" strokeWidth="1.25" />
                <polygon points="65,10 73,15 65,20" fill="#167A4A" />
                <text x="80" y="14" fill="#167A4A" fontSize="12" fontFamily="monospace" fontWeight="700" letterSpacing="0.5">
                  VOLATILE FATTY ACIDS
                </text>
                <text x="80" y="30" fill="#26382D" fontSize="11" fontFamily="sans-serif" opacity="0.85">
                  the cow’s main energy source
                </text>
              </g>

              {/* Output 3: Microbial Protein */}
              <g transform="translate(640, 140)">
                <path d="M -5 -10 Q 30 5, 65 15" fill="none" stroke="#047857" strokeWidth="1.25" />
                <polygon points="65,10 73,15 65,20" fill="#047857" />
                <text x="80" y="14" fill="#047857" fontSize="12" fontFamily="monospace" fontWeight="700" letterSpacing="0.5">
                  MICROBIAL PROTEIN
                </text>
                <text x="80" y="30" fill="#26382D" fontSize="11" fontFamily="sans-serif" opacity="0.85">
                  digested further down the gut
                </text>
              </g>

              {/* Output 4: Lactic Acid */}
              <g transform="translate(640, 195)">
                <path d="M -5 -45 Q 30 0, 65 15" fill="none" stroke="#C96F82" strokeWidth="1.25" strokeDasharray="3 3" />
                <polygon points="62,10 72,12 67,20" fill="#C96F82" />
                <text x="80" y="18" fill="#C96F82" fontSize="12" fontFamily="monospace" fontWeight="700" letterSpacing="0.5">
                  LACTIC ACID · IF STARCH OVERLOADS
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}



