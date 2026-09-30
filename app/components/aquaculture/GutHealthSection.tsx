import React from "react";

export default function GutHealthSection() {
  return (
    <section className="relative w-full bg-[#EAF6EC] px-6 py-20 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Section H2 */}
        <h2 className="font-inter-tight font-extrabold text-[clamp(36px,5vw,56px)] leading-[1.05] text-[#111111] mb-8">
          A healthy gut is the first line of disease defence.
        </h2>

        {/* Gut Diagram + Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Gut Diagram */}
          <div className="bg-white border border-[#D5E9D8] p-8 rounded-sm">
            <svg viewBox="0 0 400 300" className="w-full h-auto">
              {/* Gut outline */}
              <path d="M50 150 Q100 50 200 80 Q300 110 350 150 Q300 250 200 220 Q100 190 50 150" fill="#EAF6EC" stroke="#6BBF3A" strokeWidth="3" />

              {/* Gut lumen */}
              <path d="M80 150 Q120 100 200 120 Q280 140 320 150 Q280 200 200 180 Q120 160 80 150" fill="#FFFFFF" stroke="#B8893A" strokeWidth="2" />

              {/* Beneficial bacteria dots */}
              <circle cx="150" cy="140" r="8" fill="#6BBF3A" />
              <circle cx="170" cy="150" r="6" fill="#6BBF3A" />
              <circle cx="200" cy="145" r="7" fill="#6BBF3A" />
              <circle cx="230" cy="155" r="6" fill="#6BBF3A" />
              <circle cx="250" cy="140" r="8" fill="#6BBF3A" />

              {/* Pathogen bacteria dots */}
              <circle cx="120" cy="165" r="5" fill="#B8893A" />
              <circle cx="280" cy="165" r="5" fill="#B8893A" />

              {/* Labels */}
              <text x="200" y="70" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500" fill="#111111" letterSpacing="0.18em" textAnchor="middle">
                GUT MICROBIOME
              </text>
              <text x="150" y="190" fontFamily="JetBrains Mono" fontSize="10" fontWeight="500" fill="#6BBF3A" letterSpacing="0.18em" textAnchor="middle">
                BENEFICIAL
              </text>
              <text x="280" y="190" fontFamily="JetBrains Mono" fontSize="10" fontWeight="500" fill="#B8893A" letterSpacing="0.18em" textAnchor="middle">
                PATHOGEN
              </text>
            </svg>
          </div>

          {/* 4 Cards */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm border-t-[3px] border-t-[#6BBF3A] hover:translate-y-[-3px] transition-transform duration-300">
              <h4 className="font-inter-tight font-bold text-[16px] text-[#111111] mb-3">
                Competitive exclusion
              </h4>
              <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B]">
                Probiotics colonise the gut and compete with pathogens for attachment sites and nutrients.
              </p>
            </div>

            <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm border-t-[3px] border-t-[#6BBF3A] hover:translate-y-[-3px] transition-transform duration-300">
              <h4 className="font-inter-tight font-bold text-[16px] text-[#111111] mb-3">
                Quorum quenching
              </h4>
              <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B]">
                Disrupts pathogen communication, preventing coordinated virulence and biofilm formation.
              </p>
            </div>

            <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm border-t-[3px] border-t-[#6BBF3A] hover:translate-y-[-3px] transition-transform duration-300">
              <h4 className="font-inter-tight font-bold text-[16px] text-[#111111] mb-3">
                Feeding the good bacteria
              </h4>
              <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B]">
                Prebiotics support beneficial microbial populations, enhancing gut health and nutrient absorption.
              </p>
            </div>

            <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm border-t-[3px] border-t-[#6BBF3A] hover:translate-y-[-3px] transition-transform duration-300">
              <h4 className="font-inter-tight font-bold text-[16px] text-[#111111] mb-3">
                Immune priming and digestion
              </h4>
              <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B]">
                Probiotics stimulate immune response and produce digestive enzymes for better feed conversion.
              </p>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white border border-[#D5E9D8] p-8 rounded-sm">
          <h4 className="font-jetbrains text-[11px] font-medium uppercase tracking-[0.18em] text-[#5C6B5E] mb-6">
            What pooled shrimp studies show
          </h4>
          <div className="space-y-4">
            {/* Bar 1 */}
            <div className="flex items-center gap-4">
              <div className="w-32 font-newsreader text-[15px] text-[#2B2B2B]">Growth rate</div>
              <div className="flex-1 h-8 bg-[#EAF6EC] rounded-sm">
                <div className="h-full bg-[#6BBF3A] rounded-sm" style={{ width: "75%" }}></div>
              </div>
              <div className="font-newsreader text-[15px] font-bold text-[#6BBF3A]">+18%</div>
            </div>
            {/* Bar 2 */}
            <div className="flex items-center gap-4">
              <div className="w-32 font-newsreader text-[15px] text-[#2B2B2B]">FCR</div>
              <div className="flex-1 h-8 bg-[#EAF6EC] rounded-sm">
                <div className="h-full bg-[#6BBF3A] rounded-sm" style={{ width: "60%" }}></div>
              </div>
              <div className="font-newsreader text-[15px] font-bold text-[#6BBF3A]">-12%</div>
            </div>
            {/* Bar 3 */}
            <div className="flex items-center gap-4">
              <div className="w-32 font-newsreader text-[15px] text-[#2B2B2B]">Survival</div>
              <div className="flex-1 h-8 bg-[#EAF6EC] rounded-sm">
                <div className="h-full bg-[#6BBF3A] rounded-sm" style={{ width: "85%" }}></div>
              </div>
              <div className="font-newsreader text-[15px] font-bold text-[#6BBF3A]">+22%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
