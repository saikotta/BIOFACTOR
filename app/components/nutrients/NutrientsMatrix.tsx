import React from "react";
import Image from "next/image";

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
  bg: string;
  darkText: boolean;
  cells: MatrixCell[];
}

const NUTRIENT_STAGES: StageColumn[] = [
  {
    number: "01",
    name: "ESTABLISHMENT",
    bg: "#C8E6C9",
    darkText: false,
    cells: [
      { text: "Root colonisation; early P for root growth", fill: "70%", barColor: "#2D6A4F" },
      { text: "Root-zone protection against damping-off", fill: "65%", barColor: "#C25975" },
      { text: "—", fill: "0%", barColor: "#D97706", empty: true },
    ],
  },
  {
    number: "02",
    name: "VEGETATIVE",
    bg: "#A5D6A7",
    darkText: false,
    cells: [
      { text: "Peak N demand met by fixation & mobilisation", fill: "90%", barColor: "#2D6A4F" },
      { text: "Induced systemic resistance primes plant", fill: "80%", barColor: "#C25975", sup: "8" },
      { text: "Balanced nutrition builds sound tissue", fill: "70%", barColor: "#D97706" },
    ],
  },
  {
    number: "03",
    name: "FLOWERING",
    bg: "#81C784",
    darkText: false,
    cells: [
      { text: "P and K support flowering & energy transfer", fill: "85%", barColor: "#2D6A4F" },
      { text: "Lipopeptides act against foliar pathogens", fill: "85%", barColor: "#C25975", sup: "9" },
      { text: "Better set and uniformity", fill: "75%", barColor: "#D97706" },
    ],
  },
  {
    number: "04",
    name: "GRAIN / FILL",
    bg: "#66BB6A",
    darkText: false,
    cells: [
      { text: "K for filling; Zn & Fe loading into grain", fill: "85%", barColor: "#2D6A4F", sup: "15" },
      { text: "Primed defences hold through fill", fill: "75%", barColor: "#C25975" },
      { text: "Protein, sugars, soluble solids", fill: "85%", barColor: "#D97706", sup: "11" },
    ],
  },
  {
    number: "05",
    name: "POST-HARVEST",
    bg: "#4CAF50",
    darkText: true,
    cells: [
      { text: "—", fill: "0%", barColor: "#2D6A4F", empty: true },
      { text: "Biocontrol of storage rots", fill: "80%", barColor: "#F472B6", sup: "10" },
      { text: "Less decay in storage and at retail", fill: "90%", barColor: "#FBBF24", sup: "10" },
    ],
  },
];

export default function NutrientsMatrix() {
  return (
    <section id="nutrients-matrix" className="relative w-full bg-[#EAF3EA] text-[#173522] pt-8 md:pt-12 lg:pt-16 pb-12 md:pb-16 overflow-hidden">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)] space-y-16">
        
        {/* ==========================================
            SECTION 1: TRANSFORMATION TABLE (FIX. SOLUBILISE. MOBILISE.)
            With Classic Green Background (#173522) - NO FALLING MICROBES
            ========================================== */}
        <div className="relative p-8 sm:p-12 md:p-14 rounded-3xl bg-[#173522] text-[#EAF3EA] shadow-2xl border border-[#2D6A4F]/40 space-y-10 overflow-hidden">
          <div className="relative z-10 space-y-8">
            {/* Header & Eyebrow */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-6 h-[1.5px] bg-[#50E3C2]/80" />
                <span className="font-mono text-xs font-semibold tracking-widest text-[#B8E986] uppercase">
                  THE REAL POWER OF BIOLOGICALS
                </span>
              </div>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
                FIX. SOLUBILISE. <span className="text-[#50E3C2]">MOBILISE.</span>
              </h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left font-serif text-base sm:text-lg border-collapse">
                <thead>
                  <tr className="border-b border-white/15 text-white/50 font-mono text-xs uppercase tracking-widest">
                    <th className="py-3 px-4 font-normal">NUTRIENT</th>
                    <th className="py-3 px-4 font-normal">FROM</th>
                    <th className="py-3 px-4 font-normal">TO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/90">
                  <tr>
                    <td className="py-4 px-4 font-bold text-[#60A5FA] font-sans">Nitrogen</td>
                    <td className="py-4 px-4 text-white/80">Atmosphere</td>
                    <td className="py-4 px-4 text-white/95">→ Biologically available nitrogen</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-bold text-[#FBBF24] font-sans">Phosphorus</td>
                    <td className="py-4 px-4 text-white/80">Insoluble pools</td>
                    <td className="py-4 px-4 text-white/95">→ More plant-available phosphorus</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-bold text-[#C084FC] font-sans">Potassium</td>
                    <td className="py-4 px-4 text-white/80">Mineral reserves</td>
                    <td className="py-4 px-4 text-white/95">→ More accessible potassium</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-bold text-[#FEF08A] font-sans">S · Ca · Mg · Zn · Fe · Cu</td>
                    <td className="py-4 px-4 text-white/80">Organic, carbonate and oxide-bound forms</td>
                    <td className="py-4 px-4 text-white/95">→ Mineralised and chelated forms roots can absorb</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Row: Left message + Right Strikethrough statement */}
            <div className="pt-8 border-t border-white/15 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              {/* Left Side */}
              <div className="md:col-span-6 font-serif text-base sm:text-lg text-white/60 leading-relaxed">
                This is the fundamental promise of biological nutrient management:
              </div>

              {/* Right Side */}
              <div className="md:col-span-6 text-left md:text-right space-y-1">
                <div className="font-serif text-2xl sm:text-3xl text-white/40 line-through decoration-red-500/80 decoration-2">
                  Not simply adding more.
                </div>
                <div className="font-serif text-3xl sm:text-4xl text-white">
                  But making <em className="italic font-normal">more available.</em>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            SECTION 2: ROOT EXUDATES & CROP CYCLE
            With 3-Line Heading & Larger Image Size
            ========================================== */}
        <div className="space-y-8">
          {/* Top Heading & Narrative with Larger Image Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Narrative with 3-Line Heading */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1.5px] bg-[#2D6A4F]" />
                <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">
                  ACROSS THE CROP CYCLE
                </span>
              </div>
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#173522] uppercase tracking-tight leading-[1.08]">
                ONE BIOLOGY,<br />
                THREE ROLES,<br />
                FROM SOWING TO SHELF.
              </h3>
              <p className="text-base sm:text-lg text-[#173522]/90 font-sans leading-relaxed">
                Beneficial microbes work as nutrient enablers, disease managers, and quality and shelf-life enhancers. They are coordinated by chemical signals exchanged between root and microbe.
              </p>
            </div>

            {/* Right: Larger Featured `one-biology.jpg` Image */}
            <div className="lg:col-span-6 relative w-full h-[340px] sm:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-[#2D6A4F]/20">
              <Image
                src="/images/nutriants/one-biology.jpg"
                alt="One Biology, Three Roles across the crop cycle"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173522]/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Full Width White Card with Hover Effect */}
          <div className="w-full p-6 sm:p-8 lg:p-10 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#2D6A4F]/20 shadow-xl space-y-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#2D6A4F]/40 cursor-pointer">
            
            {/* Top Flow Diagram (Light background + Crisp dark lines & text + Perfect Root Spacing) */}
            <div className="w-full bg-[#F4FAF4] rounded-xl p-6 sm:p-8 text-[#173522] flex items-center justify-center border border-[#2D6A4F]/15">
              <svg viewBox="0 0 700 220" className="w-full max-w-[650px] h-auto font-mono text-xs select-none">
                {/* Main Root Line */}
                <path d="M 80 20 L 80 175" fill="none" stroke="#173522" strokeWidth="5" strokeLinecap="round" />
                {/* Side Root Branch */}
                <path d="M 80 85 Q 115 120 150 155" fill="none" stroke="#173522" strokeWidth="4" strokeLinecap="round" />
                {/* ROOT Label cleanly positioned below root line */}
                <text x="68" y="198" fill="#2D6A4F" fontSize="11" fontWeight="bold">ROOT</text>

                {/* Exudates Signal Arrow (Top Dark Green Dashed Arc) */}
                <path d="M 115 60 Q 280 15 440 60" fill="none" stroke="#2D6A4F" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#green-arrow)" />
                <text x="200" y="32" fill="#2D6A4F" fontSize="11" fontWeight="bold" letterSpacing="0.1em">EXUDATES · SIGNALS</text>

                {/* Microbe Capsules (Right side) */}
                <g transform="translate(465, 35)">
                  <rect x="0" y="0" width="75" height="32" rx="16" fill="#EAF3EA" stroke="#2D6A4F" strokeWidth="2.5" />
                </g>
                <g transform="translate(545, 85)">
                  <rect x="0" y="0" width="75" height="32" rx="16" fill="#EAF3EA" stroke="#2D6A4F" strokeWidth="2.5" />
                </g>
                <g transform="translate(480, 115)">
                  <circle cx="15" cy="15" r="13" fill="#EAF3EA" stroke="#2D6A4F" strokeWidth="2.5" />
                </g>
                <g transform="translate(530, 150)">
                  <rect x="0" y="0" width="75" height="32" rx="16" fill="#EAF3EA" stroke="#2D6A4F" strokeWidth="2.5" />
                </g>

                {/* Nutrients Released Arrow (Bottom Amber Dashed Arc) */}
                <path d="M 465 150 Q 300 180 155 135" fill="none" stroke="#D97706" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#gold-arrow)" />
                {/* Text cleanly placed underneath without touching lines */}
                <text x="180" y="195" fill="#D97706" fontSize="11" fontWeight="bold" letterSpacing="0.1em">N · P · K · Zn · Fe RELEASED</text>

                {/* Arrowhead Definitions */}
                <defs>
                  <marker id="green-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#2D6A4F" />
                  </marker>
                  <marker id="gold-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#D97706" />
                  </marker>
                </defs>
              </svg>
            </div>

            {/* Bottom Horizontal Narrative */}
            <div className="pt-4 border-t border-[#173522]/15 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">
                  ROOT EXUDATES · SIGNALS
                </span>
              </div>
              <h4 className="font-display font-extrabold text-xl sm:text-2xl text-[#173522] tracking-tight">
                Why nutrients arrive when the crop asks
              </h4>
              <p className="text-base text-[#173522]/90 font-sans leading-relaxed">
                Plants invest <strong>up to 20–40% of the carbon they fix</strong> in root exudates.⁶ That is sugars, organic acids and signal molecules released into the soil. Exudation changes with the plant's nutrient status. Under phosphorus deficiency, for example, roots release more organic acids such as malate.⁶ Microbes living on this carbon are most active where and when roots are growing hardest, so <strong>release tracks the crop's demand</strong> instead of arriving in a single dose.
              </p>
            </div>
          </div>
        </div>

        {/* ==========================================
            SECTION 3: 5-STAGE CROP CYCLE MATRIX TABLE (SLENDER CAPSULE FORMAT)
            Strict Visual & Structural Parity with Ruminants
            ========================================== */}
        <div className="space-y-6 pt-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1.5px] bg-[#2D6A4F]" />
              <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">
                ALONG THE CROP CYCLE MATRIX
              </span>
            </div>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-[#173522] uppercase tracking-tight">
              WHERE BIOLOGY DOES THE WORK.
            </h3>
          </div>

          <div className="w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-8 pt-4">
            <div className="min-w-[960px] lg:min-w-0 w-full group/matrix">
              <div className="grid grid-cols-[130px_repeat(5,minmax(0,1fr))] lg:grid-cols-[140px_repeat(5,minmax(0,1fr))] gap-3 sm:gap-4.5 items-stretch">
                
                {/* Left Column: Row Labels */}
                <div className="flex flex-col justify-between pt-36 pb-16 space-y-16">
                  {/* Row 1 Label: Nutrient Enabler */}
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#2D6A4F] flex-shrink-0" />
                    <div>
                      <h3 className="font-display font-bold text-xs sm:text-sm lg:text-base text-[#2D6A4F] leading-tight uppercase">
                        Nutrient Enabler
                      </h3>
                    </div>
                  </div>

                  {/* Row 2 Label: Disease Manager */}
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#C25975] flex-shrink-0" />
                    <div>
                      <h3 className="font-display font-bold text-xs sm:text-sm lg:text-base text-[#C25975] leading-tight uppercase">
                        Disease Manager
                      </h3>
                    </div>
                  </div>

                  {/* Row 3 Label: Quality & Shelf Life */}
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#D97706] flex-shrink-0" />
                    <div>
                      <h3 className="font-display font-bold text-xs sm:text-sm lg:text-base text-[#D97706] leading-tight uppercase">
                        Quality &amp; Shelf Life
                      </h3>
                    </div>
                  </div>
                </div>

                {/* 5 Stage Capsule Columns (Slender Ruminants Parity) */}
                {NUTRIENT_STAGES.map((stage, colIdx) => (
                  <div
                    key={colIdx}
                    className={`relative flex flex-col justify-between rounded-[90px] px-3.5 sm:px-4 lg:px-5 py-8 sm:py-10 border shadow-[0_12px_28px_rgba(23,53,34,0.18)] transition-all duration-300 ease-out hover:scale-[1.035] hover:-translate-y-2 hover:shadow-[0_22px_44px_rgba(23,53,34,0.22)] hover:z-20 cursor-pointer group/capsule group-hover/matrix:opacity-70 group-hover/matrix:hover:opacity-100 min-h-[520px] sm:min-h-[560px] ${
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
                      <strong className="font-display font-extrabold text-xs sm:text-sm lg:text-[15px] uppercase leading-tight block relative">
                        {stage.name}
                        <span className="block w-8 h-[1px] bg-current mx-auto mt-2 opacity-55 scale-x-0 group-hover/capsule:scale-x-100 transition-transform duration-300" />
                      </strong>
                    </div>

                    {/* Cell 1: Nutrient Enabler */}
                    <div className="py-5 flex flex-col justify-center text-center border-b border-current/20 flex-1">
                      {!stage.cells[0].empty ? (
                        <>
                          <div className="relative w-full h-1.5 bg-current/20 rounded-full mb-2.5 overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                              style={{ width: stage.cells[0].fill, backgroundColor: stage.cells[0].barColor }}
                            />
                          </div>
                          <p className="font-serif text-xs sm:text-sm leading-snug">
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

                    {/* Cell 2: Disease Manager */}
                    <div className="py-5 flex flex-col justify-center text-center border-b border-current/20 flex-1">
                      {!stage.cells[1].empty ? (
                        <>
                          <div className="relative w-full h-1.5 bg-current/20 rounded-full mb-2.5 overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                              style={{ width: stage.cells[1].fill, backgroundColor: stage.cells[1].barColor }}
                            />
                          </div>
                          <p className="font-serif text-xs sm:text-sm leading-snug">
                            {stage.cells[1].text}
                            {stage.cells[1].sup && (
                              <sup className="text-[9px] font-mono ml-0.5">{stage.cells[1].sup}</sup>
                            )}
                          </p>
                        </>
                      ) : (
                        <p className="font-mono text-sm opacity-40">—</p>
                      )}
                    </div>

                    {/* Cell 3: Quality & Shelf Life */}
                    <div className="py-5 flex flex-col justify-center text-center pb-3 flex-1">
                      {!stage.cells[2].empty ? (
                        <>
                          <div className="relative w-full h-1.5 bg-current/20 rounded-full mb-2.5 overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                              style={{ width: stage.cells[2].fill, backgroundColor: stage.cells[2].barColor }}
                            />
                          </div>
                          <p className="font-serif text-xs sm:text-sm leading-snug">
                            {stage.cells[2].text}
                            {stage.cells[2].sup && (
                              <sup className="text-[9px] font-mono ml-0.5">{stage.cells[2].sup}</sup>
                            )}
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

        {/* ==========================================
            SECTION 4: META-ANALYSIS GLOBAL VALIDATION CARDS
            With Clean Uniform Borders (No thick left border line)
            ========================================== */}
        <div className="space-y-8">
          <div>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-[#173522] uppercase">
              Validated across hundreds of studies.
            </h3>
            <p className="text-sm sm:text-base text-[#173522]/80 font-sans max-w-3xl mt-2">
              These figures come from meta-analyses and reviews that pool many independent field and laboratory trials. They show what biology can do across many conditions, not what any single product guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#2D6A4F]/20 shadow-lg space-y-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#2D6A4F]/40 cursor-pointer">
              <span className="font-mono text-xs font-bold text-[#2D6A4F] uppercase">NUTRIENT ENABLER</span>
              <div className="font-display font-extrabold text-4xl text-[#173522]">+20%</div>
              <p className="text-xs sm:text-sm text-[#173522]/85 font-sans">
                average yield gain from biofertilisers in dry climates, and +14.9% in tropical climates.
              </p>
              <div className="pt-2 text-[11px] font-mono text-[#2D6A4F] font-semibold">171 publications · Global meta-analysis¹</div>
            </div>

            <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#2D6A4F]/20 shadow-lg space-y-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#2D6A4F]/40 cursor-pointer">
              <span className="font-mono text-xs font-bold text-[#C25975] uppercase">DISEASE MANAGER</span>
              <div className="font-display font-extrabold text-4xl text-[#173522]">60%</div>
              <p className="text-xs sm:text-sm text-[#173522]/85 font-sans">
                average reduction in disease with Bacillus biocontrol agents compared with untreated controls.
              </p>
              <div className="pt-2 text-[11px] font-mono text-[#C25975] font-semibold">399 studies · Meta-analysis⁷</div>
            </div>

            <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#2D6A4F]/20 shadow-lg space-y-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#2D6A4F]/40 cursor-pointer">
              <span className="font-mono text-xs font-bold text-[#D97706] uppercase">QUALITY &amp; SHELF LIFE</span>
              <div className="font-display font-extrabold text-4xl text-[#173522]">50–70%</div>
              <p className="text-xs sm:text-sm text-[#173522]/85 font-sans">
                less soft rot and black mold in tomato treated with Bacillus subtilis. 40–60% less rot in leafy greens.
              </p>
              <div className="pt-2 text-[11px] font-mono text-[#D97706] font-semibold">Post-harvest biocontrol review¹⁰</div>
            </div>
          </div>
        </div>

        {/* ==========================================
            SECTION 5: YIELD RESPONSE BY CLIMATE CHART
            With Hovering Card Effect
            ========================================== */}
        <div className="p-8 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#2D6A4F]/20 shadow-xl space-y-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#2D6A4F]/40 cursor-pointer">
          <div>
            <h4 className="font-display font-bold text-xl text-[#173522] uppercase">
              Yield response to biofertilisers, by climate
            </h4>
            <p className="text-xs text-[#173522]/70 font-sans mt-1">
              Mean change in yield vs. untreated control (± standard error). Responses were strongest in dry and tropical climates.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-[#EAF3EA] border border-[#2D6A4F]/20">
              <div className="font-mono text-xs font-bold text-[#2D6A4F] uppercase mb-1">DRY</div>
              <div className="font-display font-extrabold text-3xl text-[#173522]">+20.0%</div>
            </div>
            <div className="p-4 rounded-xl bg-[#EAF3EA] border border-[#2D6A4F]/20">
              <div className="font-mono text-xs font-bold text-[#2D6A4F] uppercase mb-1">TROPICAL</div>
              <div className="font-display font-extrabold text-3xl text-[#173522]">+14.9%</div>
            </div>
            <div className="p-4 rounded-xl bg-[#EAF3EA] border border-[#2D6A4F]/20">
              <div className="font-mono text-xs font-bold text-[#2D6A4F] uppercase mb-1">OCEANIC</div>
              <div className="font-display font-extrabold text-3xl text-[#173522]">+10.0%</div>
            </div>
            <div className="p-4 rounded-xl bg-[#EAF3EA] border border-[#2D6A4F]/20">
              <div className="font-mono text-xs font-bold text-[#2D6A4F] uppercase mb-1">CONTINENTAL</div>
              <div className="font-display font-extrabold text-3xl text-[#173522]">+8.5%</div>
            </div>
          </div>

          <p className="text-xs font-mono text-[#173522]/70 pt-2 border-t border-[#173522]/10">
            Scale 0–25%. Nitrogen-use efficiency also improved by +5.8 kg yield per kg N applied. Source: Schütz et al. 2018.¹
          </p>
        </div>

      </div>
    </section>
  );
}
