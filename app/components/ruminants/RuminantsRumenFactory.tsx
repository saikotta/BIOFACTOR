import React from "react";

export default function RuminantsRumenFactory() {
  return (
    <section id="s1" className="relative w-full text-[#173522] pt-3 md:pt-4 lg:pt-5 pb-8 md:pb-9 lg:pb-10 overflow-hidden bg-[#EAF3EA]" data-ruminants-section="rumen" data-n="A living fermenter" data-motion>
      {/* Opaque Base Color Layer to Mask Global MicrobeField Canvas */}
      <div className="absolute inset-0 z-0 bg-[#EAF3EA]" aria-hidden="true" />

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
        <div className="rv max-w-[1020px] mb-12 md:mb-16">
          <h2 className="font-display font-extrabold text-[clamp(2.5rem,4vw,4.25rem)] text-[#173522] tracking-tight leading-[1.02] uppercase mb-6" data-motion-heading>
            The rumen is a microbial
            <br />
            factory with one customer.
          </h2>
          <p className="font-serif text-lg sm:text-xl text-[#26382D]/85 leading-relaxed max-w-[920px]">
            Bacteria, protozoa, fungi and archaea in the rumen break down fibre and starch. What they produce feeds the animal. What they waste leaves as methane.
          </p>
        </div>

        {/* Technical Biological Diagram Canvas (Glossy Glass Card) */}
        <div
          className="dia rv relative w-full rounded-2xl p-6 sm:p-10 overflow-x-auto"
          style={{
            background: "linear-gradient(160deg, rgba(255,255,255,0.82) 0%, rgba(234,243,234,0.60) 100%)",
            backdropFilter: "blur(18px) saturate(1.4)",
            WebkitBackdropFilter: "blur(18px) saturate(1.4)",
            border: "1px solid rgba(255,255,255,0.72)",
            boxShadow:
              "0 2px 0px rgba(255,255,255,0.90) inset," +   /* top specular edge */
              "0 -1px 0px rgba(23,53,34,0.06) inset," +      /* bottom inner shadow */
              "0 8px 32px rgba(23,53,34,0.08)," +            /* ambient drop shadow */
              "0 1px 4px rgba(23,53,34,0.06)",               /* tight contact shadow */
          }}
          data-motion="diagram"
        >
          {/* Glossy radial highlight — top-left specular lobe */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
          >
            <div
              className="absolute"
              style={{
                top: "-30%",
                left: "-10%",
                width: "70%",
                height: "60%",
                background:
                  "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.0) 70%)",
              }}
            />
          </div>
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

              {/* LEFT INPUT WITH FLOW PATHWAY */}
              <g transform="translate(20, 35)">
                <text x="0" y="0" fill="#167A4A" fontSize="12" fontFamily="monospace" fontWeight="700" letterSpacing="1">
                  FEED IN
                </text>
                <text x="0" y="18" fill="#26382D" fontSize="12" fontFamily="monospace" opacity="0.8">
                  fibre · starch · protein
                </text>

                {/* Animated Flow pathway into Petri dish */}
                <path className="flow" d="M 40 28 L 40 90 L 332 90" stroke="#167A4A" strokeWidth="1.6" fill="none" />
                <polygon points="332,86 340,90 332,94" fill="#167A4A" className="ah" />
              </g>

              {/* CENTER CIRCULAR PETRI DISH WITH RUMEN PULSE & MICROBIAL BOBBING */}
              <g transform="translate(260, 10)">
                {/* Top Label */}
                <text x="200" y="18" textAnchor="middle" fill="#167A4A" fontSize="11" fontFamily="monospace" fontWeight="700" letterSpacing="1">
                  RUMEN · NO OXYGEN · ~39 °C
                </text>

                {/* Inner Pulse Group — Stationary center at local (200px, 115px) */}
                <g className="rumenPulse">
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

                  {/* Bobbing Microbes Overlay */}
                  <g className="mic">
                    <circle cx="165" cy="90" r="7" />
                    <circle cx="220" cy="75" r="6" />
                    <circle cx="240" cy="130" r="8" />
                    <circle cx="180" cy="150" r="7" />
                    <circle cx="210" cy="110" r="5" />
                    <circle cx="152" cy="125" r="5" />
                  </g>
                </g>

                {/* Bottom Label */}
                <text x="200" y="222" textAnchor="middle" fill="#26382D" fontSize="11" fontFamily="monospace" opacity="0.8">
                  bacteria · protozoa · fungi · archaea
                </text>
              </g>

              {/* RIGHT OUTPUT PATHWAYS */}
              {/* Output 1: Methane */}
              <g transform="translate(640, 25)">
                <path className="flow am" d="M -80 75 Q 5 35, 65 20" fill="none" stroke="#C88A35" strokeWidth="1.6" />
                <polygon points="62,15 72,17 67,25" fill="#C88A35" className="ah" />
                <text x="80" y="22" fill="#C88A35" fontSize="12" fontFamily="monospace" fontWeight="700" letterSpacing="0.5">
                  METHANE · ENERGY LOST
                </text>
              </g>

              {/* Output 2: Volatile Fatty Acids */}
              <g transform="translate(640, 80)">
                <path className="flow gn" d="M -80 35 Q 5 20, 65 15" fill="none" stroke="#167A4A" strokeWidth="1.6" />
                <polygon points="65,10 73,15 65,20" fill="#167A4A" className="ah" />
                <text x="80" y="14" fill="#167A4A" fontSize="12" fontFamily="monospace" fontWeight="700" letterSpacing="0.5">
                  VOLATILE FATTY ACIDS
                </text>
                <text x="80" y="30" fill="#26382D" fontSize="11" fontFamily="sans-serif" opacity="0.85">
                  the cow’s main energy source
                </text>
              </g>

              {/* Output 3: Microbial Protein */}
              <g transform="translate(640, 140)">
                <path className="flow gn" d="M -80 -10 Q 5 5, 65 15" fill="none" stroke="#047857" strokeWidth="1.6" />
                <polygon points="65,10 73,15 65,20" fill="#047857" className="ah" />
                <text x="80" y="14" fill="#047857" fontSize="12" fontFamily="monospace" fontWeight="700" letterSpacing="0.5">
                  MICROBIAL PROTEIN
                </text>
                <text x="80" y="30" fill="#26382D" fontSize="11" fontFamily="sans-serif" opacity="0.85">
                  digested further down the gut
                </text>
              </g>

              {/* Output 4: Lactic Acid */}
              <g transform="translate(640, 195)">
                <path className="flow pk" d="M -80 -45 Q 5 0, 65 15" fill="none" stroke="#C96F82" strokeWidth="1.6" />
                <polygon points="62,10 72,12 67,20" fill="#C96F82" className="ah" />
                <text x="80" y="18" fill="#C96F82" fontSize="12" fontFamily="monospace" fontWeight="700" letterSpacing="0.5">
                  LACTIC ACID · IF STARCH OVERLOADS
                </text>
              </g>
            </svg>
          </div>
        </div>{/* end glossy card */}
      </div>
    </section>
  );
}




