import React from "react";

export default function RuminantsRumenFactory() {
  return (
    <section className="relative w-full text-[#173522] pt-3 md:pt-4 lg:pt-5 pb-8 md:pb-9 lg:pb-10 overflow-hidden bg-[#EAF3EA]" data-ruminants-section="rumen" data-motion>
      {/* Opaque Base Color Layer to Mask Global MicrobeField Canvas */}
      <div className="absolute inset-0 z-0 bg-[#EAF3EA]" aria-hidden="true" />

      {/* Background Microbes Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat bg-[position:80%_center]"
        style={{ backgroundImage: "url('/images/ruminants-rumen-microbes-bg.png')" }}
        aria-hidden="true"
      />

      {/* Pale Warm Botanical Overlay (85% Opacity) */}
      <div className="absolute inset-0 z-0 bg-[#EAF3EA]/85" aria-hidden="true" />

      {/* Section Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
        {/* Eyebrow Label */}
        <div className="flex items-center gap-3 mb-4" data-motion-eyebrow>
          <span className="w-8 h-[1.5px] bg-[#2D6A4F]" aria-hidden="true" />
          <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">
            01 / A LIVING FERMENTER
          </span>
        </div>

        {/* Headline & Supporting Copy Stack */}
        <div className="max-w-[1020px] mb-12 md:mb-16">
          <h2 className="font-display font-extrabold text-[clamp(2.5rem,4vw,4.25rem)] text-[#173522] tracking-tight leading-[1.02] uppercase mb-6" data-motion-heading>
            The rumen is a microbial
            <br />
            factory with one customer.
          </h2>
          <p className="font-serif text-lg sm:text-xl text-[#26382D]/85 leading-relaxed max-w-[920px]">
            Bacteria, protozoa, fungi and archaea in the rumen break down fibre and starch. What they produce feeds the animal. What they waste leaves as methane.
          </p>
        </div>

        {/* Technical Biological Diagram Canvas (Unboxed, Breathable Layout) */}
        <div className="w-full bg-[#FFFFFF]/70 rounded-2xl p-6 sm:p-10 border border-[#173522]/08 shadow-[0_4px_24px_rgba(23,53,34,0.03)] overflow-x-auto" data-motion="diagram">
          <div className="min-w-[880px]">
            <svg
              viewBox="0 0 960 250"
              fill="none"
              className="w-full h-auto select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="petriDishCircleClip">
                  <circle cx="200" cy="115" r="90" />
                </clipPath>
              </defs>

              {/* LEFT INPUT WITH SOLID L-SHAPED PATHWAY */}
              <g transform="translate(20, 35)">
                <text x="0" y="0" fill="#167A4A" fontSize="12" fontFamily="monospace" fontWeight="700" letterSpacing="1">
                  FEED IN
                </text>
                <text x="0" y="18" fill="#26382D" fontSize="12" fontFamily="monospace" opacity="0.8">
                  fibre · starch · protein
                </text>

                {/* Solid L-shaped pathway: vertical down → horizontal right → arrow into Petri dish */}
                <path d="M 40 28 L 40 90 L 332 90" stroke="#167A4A" strokeWidth="1.25" fill="none" />
                <polygon points="332,86 340,90 332,94" fill="#167A4A" />
              </g>

              {/* CENTER CIRCULAR PETRI DISH (RUMEN BIOLOGICAL VISUAL) */}
              <g transform="translate(260, 10)">
                {/* Top Label */}
                <text x="200" y="18" textAnchor="middle" fill="#167A4A" fontSize="11" fontFamily="monospace" fontWeight="700" letterSpacing="1">
                  RUMEN · NO OXYGEN · ~39 °C
                </text>

                {/* 1:1 Circular Petri Dish Image (180px Diameter) */}
                <image
                  href="/images/ruminants-petri-dish.png"
                  x="110"
                  y="25"
                  width="180"
                  height="180"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#petriDishCircleClip)"
                  opacity="0.95"
                />

                {/* Bottom Label */}
                <text x="200" y="222" textAnchor="middle" fill="#26382D" fontSize="11" fontFamily="monospace" opacity="0.8">
                  bacteria · protozoa · fungi · archaea
                </text>
              </g>

              {/* RIGHT OUTPUT PATHWAYS */}
              {/* Output 1: Methane */}
              <g transform="translate(640, 25)">
                <path d="M -80 75 Q 5 35, 65 20" fill="none" stroke="#C88A35" strokeWidth="1.25" strokeDasharray="3 3" />
                <polygon points="62,15 72,17 67,25" fill="#C88A35" />
                <text x="80" y="22" fill="#C88A35" fontSize="12" fontFamily="monospace" fontWeight="700" letterSpacing="0.5">
                  METHANE · ENERGY LOST
                </text>
              </g>

              {/* Output 2: Volatile Fatty Acids */}
              <g transform="translate(640, 80)">
                <path d="M -80 35 Q 5 20, 65 15" fill="none" stroke="#167A4A" strokeWidth="1.25" />
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
                <path d="M -80 -10 Q 5 5, 65 15" fill="none" stroke="#047857" strokeWidth="1.25" />
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
                <path d="M -80 -45 Q 5 0, 65 15" fill="none" stroke="#C96F82" strokeWidth="1.25" strokeDasharray="3 3" />
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




