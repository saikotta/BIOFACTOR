import React from "react";

export default function OrganicLoadSection() {
  return (
    <section className="relative w-full bg-[#EAF6EC] px-6 py-20 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Section H2 */}
        <h2 className="font-inter-tight font-extrabold text-[clamp(36px,5vw,56px)] leading-[1.05] text-[#111111] mb-8">
          Where organic load turns into toxic gas.
        </h2>

        {/* Intro paragraph */}
        <p className="font-newsreader text-[18px] leading-[1.6] text-[#2B2B2B] mb-12 max-w-3xl">
          Uneaten feed, faeces and dead algae accumulate at the pond bottom. Without active microbial breakdown, this organic load creates a cascade of toxic metabolites that stress shrimp, reduce growth and cause mortality.
        </p>

        {/* Pond Cross-Section Diagram */}
        <div className="bg-white border border-[#D5E9D8] p-8 rounded-sm">
          <svg viewBox="0 0 800 400" className="w-full h-auto">
            {/* Water column background */}
            <rect x="50" y="20" width="700" height="300" fill="#EAF6EC" stroke="#6BBF3A" strokeWidth="2" />

            {/* Sediment layer */}
            <rect x="50" y="320" width="700" height="60" fill="#B8893A" stroke="#B8893A" strokeWidth="2" />

            {/* Water column label */}
            <text x="100" y="60" fontFamily="JetBrains Mono" fontSize="12" fontWeight="500" fill="#111111" letterSpacing="0.18em">
              WATER COLUMN
            </text>

            {/* Shrimp representation */}
            <ellipse cx="400" cy="180" rx="80" ry="30" fill="#6BBF3A" opacity="0.3" />
            <path d="M320 180 Q400 140 480 180" stroke="#6BBF3A" strokeWidth="3" fill="none" />
            <circle cx="360" cy="175" r="5" fill="#111111" />
            <circle cx="440" cy="175" r="5" fill="#111111" />
            <text x="400" y="220" fontFamily="JetBrains Mono" fontSize="12" fontWeight="500" fill="#111111" letterSpacing="0.18em" textAnchor="middle">
              SHRIMP
            </text>

            {/* Sediment label */}
            <text x="100" y="355" fontFamily="JetBrains Mono" fontSize="12" fontWeight="500" fill="#FFFFFF" letterSpacing="0.18em">
              SEDIMENT
            </text>

            {/* Toxic metabolites arrows */}
            {/* Ammonia */}
            <path d="M250 310 L250 250" stroke="#6BBF3A" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead)" />
            <text x="250" y="235" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500" fill="#6BBF3A" letterSpacing="0.18em" textAnchor="middle">
              AMMONIA
            </text>

            {/* Nitrite */}
            <path d="M400 310 L400 250" stroke="#6BBF3A" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead)" />
            <text x="400" y="235" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500" fill="#6BBF3A" letterSpacing="0.18em" textAnchor="middle">
              NITRITE
            </text>

            {/* Hydrogen sulfide */}
            <path d="M550 310 L550 250" stroke="#6BBF3A" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead)" />
            <text x="550" y="235" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500" fill="#6BBF3A" letterSpacing="0.18em" textAnchor="middle">
              H₂S
            </text>

            {/* Arrow marker definition */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#6BBF3A" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
