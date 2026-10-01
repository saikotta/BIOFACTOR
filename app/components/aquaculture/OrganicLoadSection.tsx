import React from "react";

export default function OrganicLoadSection() {
  return (
    <section className="relative w-full bg-[#EAF6EC] px-6 py-20 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Section H2 */}
        <h2 className="font-inter-tight font-extrabold text-[48px] leading-[1.05] text-[#111111] mb-8 text-left">
          Where organic load turns into toxic gas.
        </h2>

        {/* Intro paragraph */}
        <p className="font-newsreader text-[18px] leading-[1.6] text-[#2B2B2B] mb-12 max-w-3xl text-left">
          Uneaten feed, faeces and dead plankton settle on the bottom every day. Just below the surface of that sludge there is no oxygen, and microbes break it down anaerobically. The by-products seep up into the water where the shrimp live.
        </p>

        {/* Pond Cross-Section Diagram */}
        <div className="bg-white border border-[#D5E9D8] p-8 rounded-sm">
          <svg viewBox="0 0 900 500" className="w-full h-auto">
            {/* Water Column - SHRIMP */}
            <rect x="50" y="20" width="800" height="200" fill="#E8F5E9" stroke="#6BBF3A" strokeWidth="2" />
            <text x="70" y="50" fontFamily="JetBrains Mono" fontSize="12" fontWeight="500" fill="#111111" letterSpacing="0.18em">
              WATER COLUMN - SHRIMP
            </text>

            {/* Shrimp representation */}
            <ellipse cx="450" cy="120" rx="80" ry="30" fill="#6BBF3A" opacity="0.3" />
            <path d="M370 120 Q450 80 530 120" stroke="#6BBF3A" strokeWidth="3" fill="none" />
            <circle cx="410" cy="115" r="5" fill="#111111" />
            <circle cx="490" cy="115" r="5" fill="#111111" />

            {/* Soil-Water Interface - Thin Oxidised Layer */}
            <rect x="50" y="220" width="800" height="30" fill="#C8E6C9" stroke="#6BBF3A" strokeWidth="2" />
            <text x="70" y="240" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500" fill="#111111" letterSpacing="0.18em">
              SOIL-WATER INTERFACE - THIN OXIDISED LAYER
            </text>

            {/* Anaerobic Sediment - No Oxygen */}
            <rect x="50" y="250" width="800" height="200" fill="#8D6E63" stroke="#5D4037" strokeWidth="2" />
            <text x="70" y="275" fontFamily="JetBrains Mono" fontSize="12" fontWeight="500" fill="#FFFFFF" letterSpacing="0.18em">
              ANAEROBIC SEDIMENT - NO OXYGEN
            </text>

            {/* Organic matter settling arrow */}
            <path d="M450 160 L450 260" stroke="#FF9800" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead-orange)" />
            <text x="460" y="210" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500" fill="#FF9800" letterSpacing="0.18em">
              Organic matter settling
            </text>

            {/* Anaerobic digestion */}
            <text x="450" y="310" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500" fill="#FFFFFF" letterSpacing="0.18em" textAnchor="middle">
              Anaerobic digestion
            </text>

            {/* Toxic gases arrows */}
            {/* Ammonia */}
            <path d="M250 250 L250 150" stroke="#6BBF3A" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead)" />
            <text x="250" y="135" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500" fill="#6BBF3A" letterSpacing="0.18em" textAnchor="middle">
              AMMONIA
            </text>

            {/* Nitrite */}
            <path d="M450 250 L450 150" stroke="#6BBF3A" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead)" />
            <text x="450" y="135" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500" fill="#6BBF3A" letterSpacing="0.18em" textAnchor="middle">
              NITRITE
            </text>

            {/* Hydrogen sulfide */}
            <path d="M650 250 L650 150" stroke="#6BBF3A" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead)" />
            <text x="650" y="135" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500" fill="#6BBF3A" letterSpacing="0.18em" textAnchor="middle">
              H₂S
            </text>

            {/* Arrow marker definitions */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#6BBF3A" />
              </marker>
              <marker id="arrowhead-orange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#FF9800" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
