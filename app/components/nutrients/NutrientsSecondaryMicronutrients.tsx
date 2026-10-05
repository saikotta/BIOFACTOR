"use client";

import React, { useState } from "react";
import Image from "next/image";
import MicrobeField from "../MicrobeField";

export default function NutrientsSecondaryMicronutrients() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveCard(index);
    setTimeout(() => {
      setActiveCard(null);
    }, 400);
  };

  const deficiencies = [
    { symbol: "Zn", name: "Zinc", percent: 49 },
    { symbol: "B", name: "Boron", percent: 31 },
    { symbol: "Mo", name: "Molybdenum", percent: 15 },
    { symbol: "Cu", name: "Copper", percent: 14 },
    { symbol: "Mn", name: "Manganese", percent: 10 },
    { symbol: "Fe", name: "Iron", percent: 3 },
  ];

  const traceCards = [
    {
      symbol: "S",
      type: "SECONDARY",
      title: "Released from organic matter",
      body: "Soil bacteria and fungi use sulphatase enzymes to free sulphate from organic compounds. Sulphur-oxidising bacteria convert elemental sulphur into sulphate that roots can take up.¹³ ¹⁴",
      metric: (
        <span>
          <strong className="text-[#2D6A4F] font-bold">&gt;95%</strong> of soil sulphur is in organic form, locked away from roots until microbes release it.¹³
        </span>
      ),
    },
    {
      symbol: "Ca · Mg",
      type: "SECONDARY",
      title: "Dissolved from carbonates",
      body: "Calcite-dissolving bacteria lower pH with organic acids, and some Bacillus strains produce carbonic anhydrase. Organic acid anions then chelate calcium and magnesium into soluble forms.¹⁹",
      metric: (
        <span>
          Most relevant in <strong className="text-[#173522] font-bold">calcareous, alkaline soils</strong>, where Ca is abundant but tied up as CaCO₃.¹⁹
        </span>
      ),
    },
    {
      symbol: "Zn",
      type: "MICRO",
      title: "Solubilised and moved into grain",
      body: "Zinc-solubilising bacteria release gluconic acid and chelators that dissolve insoluble zinc compounds. Mycorrhizal fungi extend the root’s reach for zinc.¹⁵ ¹⁶",
      metric: (
        <div className="space-y-1">
          <div>
            <strong className="text-[#2D6A4F] font-bold">+23%</strong> grain Zn in wheat with a bacterial consortium in field trials.¹⁵
          </div>
          <div>
            <strong className="text-[#2D6A4F] font-bold">+13%</strong> fruit Zn with mycorrhizal fungi (104 articles, 263 trials).¹⁶
          </div>
        </div>
      ),
    },
    {
      symbol: "Fe",
      type: "MICRO",
      title: "Captured by siderophores",
      body: "In aerated soils, iron sits as insoluble Fe³⁺. Microbial siderophores bind it into soluble complexes, and iron-reducing bacteria convert it to the more soluble Fe²⁺.¹⁸ ²⁰",
      metric: (
        <span>
          <strong className="text-[#2D6A4F] font-bold">+7%</strong> average Fe concentration in crops with mycorrhizal fungi.¹⁷
        </span>
      ),
    },
    {
      symbol: "Cu",
      type: "MICRO",
      title: "Taken up through fungal networks",
      body: "Mycorrhizal hyphae explore soil beyond the root’s depletion zone and pass copper back to the plant.¹⁷",
      metric: (
        <span>
          <strong className="text-[#2D6A4F] font-bold">+29%</strong> average Cu concentration in crops with mycorrhizal fungi (233 publications).¹⁷
        </span>
      ),
    },
    {
      symbol: "Mn · B",
      type: "MICRO",
      title: "Where the evidence is still thin",
      body: "Manganese and boron matter. Boron is short in about 31% of agricultural soils worldwide.²¹ But published evidence for consistent microbial gains is limited, so we do not claim them here.",
      metric: (
        <span>
          Mycorrhizal fungi showed <strong className="text-[#173522] font-bold">no average Mn gain</strong> (-4%, not significant).¹⁷
        </span>
      ),
    },
  ];

  return (
    <section id="secondary-nutrients" className="relative w-full bg-[#EAF3EA] text-[#173522] py-16 md:py-24 overflow-hidden">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)] space-y-16">
        
        {/* TOP & MIDDLE SECTION (With Floating Microbes Background) */}
        <div className="relative space-y-16 pb-4">
          {/* Microbe Field scoped ONLY to Top/Middle area */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-80 overflow-hidden">
            <MicrobeField
              position="absolute"
              densityMultiplier={2.0}
              motionMultiplier={0.5}
              opacityMultiplier={0.8}
              rotationMultiplier={0.4}
            />
          </div>

          <div className="relative z-10 space-y-16">
            {/* Section Heading */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1.5px] bg-[#2D6A4F]" />
                <span className="font-mono text-xs font-semibold tracking-widest text-[#2D6A4F] uppercase">
                  SECONDARY &amp; MICRONUTRIENTS (Ca · Mg · S · Fe · Zn · B)
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#173522] uppercase tracking-tight">
                BIOLOGICAL MOBILISATION OF TRACE ELEMENTS
              </h2>
            </div>

            {/* TOP ROW: 2-Column Layout (Left: Text Narrative, Right: Micronutrients Image) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* LEFT: Text Narrative & 3 Mechanism Bullets */}
              <div className="lg:col-span-6 flex flex-col space-y-6">
                <div className="space-y-4 text-base sm:text-lg text-[#173522]/90 leading-relaxed font-sans">
                  <p>
                    Secondary nutrients like calcium, magnesium, and sulphur, alongside trace micronutrients such as zinc, iron, manganese, and boron are needed in smaller amounts, but a crop cannot replace one with another. When one runs short, yield and grain quality fall with it.
                  </p>
                  <p>
                    Like P and K, these nutrients are often present in the soil but held in organic matter, carbonates, silicates or insoluble oxides. Microbes loosen them in three main ways:
                  </p>
                  <ul className="space-y-3.5 pl-4 list-disc marker:text-[#2D6A4F] text-base sm:text-lg text-[#173522]/90">
                    <li>
                      <strong>They release organic acids</strong> that dissolve insoluble soil minerals.
                    </li>
                    <li>
                      <strong>They produce chelators</strong> such as siderophores that keep trace metals soluble and plant-accessible.
                    </li>
                    <li>
                      <strong>They make enzymes</strong> that free bound nutrients from soil organic matter.¹⁸
                    </li>
                  </ul>
                </div>
              </div>

              {/* RIGHT: Related Micronutrients Image */}
              <div className="lg:col-span-6 relative w-full h-[400px] sm:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden shadow-xl border border-[#2D6A4F]/20">
                <Image
                  src="/images/nutriants/secondary-micronutriants.jpg"
                  alt="Secondary and Micronutrients Biological Mobilisation"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#173522]/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* MIDDLE ROW: Full-Width Horizontal FAO Soil Deficiency Bar Chart (Clean directly on page background) */}
            <div className="w-full space-y-6 pt-4 border-t border-[#173522]/15">
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#173522] uppercase tracking-tight">
                  HOW MUCH OF THE WORLD'S FARMLAND IS SHORT
                </h3>
                <p className="text-xs sm:text-sm text-[#173522]/70 font-sans">
                  Share of agricultural soils deficient, from FAO's global soil study across 30 countries.
                </p>
              </div>

              {/* Horizontal Grid of 6 Deficiency Progress Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {deficiencies.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/80 border border-[#2D6A4F]/15 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold font-mono text-[#173522]">
                      <span className="text-sm font-semibold">{item.symbol} <span className="text-xs font-normal text-[#173522]/60 font-sans">({item.name})</span></span>
                      <span className="text-sm font-bold text-[#2D6A4F]">{item.percent}%</span>
                    </div>
                    <div className="w-full h-3 bg-[#EAF3EA] rounded-full overflow-hidden border border-[#2D6A4F]/10">
                      <div
                        className="h-full bg-[#2D6A4F] rounded-full transition-all duration-700"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart Footnote */}
              <div className="pt-4 border-t border-[#173522]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[11px] sm:text-xs text-[#173522]/70 font-sans">
                <p>Scale 0–100%. Sillanpää (FAO, 1990), cited in Graham 2008.²¹</p>
                <p className="text-[#2D6A4F] font-medium leading-normal">
                  Regional surveys can run higher: in India, 242,827 recent samples showed 58.6% of soils short of sulphur and 51.2% short of zinc.¹²
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Clean 6 White Cards Grid (NO MICROBES IN BACKGROUND) */}
        <div className="relative z-10 space-y-8 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {traceCards.map((card, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick(idx)}
                className={`p-6 sm:p-8 rounded-2xl bg-white border border-[#2D6A4F]/20 shadow-md space-y-4 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#2D6A4F]/50 ${
                  activeCard === idx ? "scale-95 duration-150 shadow-inner" : "scale-100"
                }`}
              >
                {/* Element Symbol Header */}
                <div className="flex justify-between items-baseline border-b border-[#173522]/10 pb-3">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#173522] tracking-tight">
                    {card.symbol}
                  </span>
                  <span className="font-mono text-[10px] font-bold tracking-widest text-[#2D6A4F] uppercase">
                    {card.type}
                  </span>
                </div>

                {/* Card Title & Narrative */}
                <div className="space-y-2">
                  <h4 className="font-sans font-bold text-lg text-[#173522] leading-snug">
                    {card.title}
                  </h4>
                  <p className="font-sans text-sm text-[#173522]/80 leading-relaxed">
                    {card.body}
                  </p>
                </div>

                {/* Metric Summary Footnote */}
                <div className="pt-3 border-t border-[#173522]/10 text-xs sm:text-sm font-sans text-[#173522]/90 leading-normal">
                  {card.metric}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Editorial Quote Line */}
          <div className="border-l-4 border-[#2D6A4F] pl-6 py-2 mt-8">
            <p className="font-serif italic text-xl sm:text-2xl text-[#173522] leading-relaxed">
              "Nutrient density starts in the soil. When biology makes zinc and iron available to the root, more of it can reach the grain."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
