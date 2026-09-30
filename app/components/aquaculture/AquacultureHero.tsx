import React from "react";

export default function AquacultureHero() {
  return (
    <section className="relative w-full bg-[#EAF6EC] px-6 py-20 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-[3px] bg-[#6BBF3A]"></div>
          <span className="font-jetbrains text-[11px] font-medium uppercase tracking-[0.18em] text-[#B8893A]">
            AQUACULTURE
          </span>
        </div>

        {/* Hero H1 */}
        <h1 className="font-inter-tight font-extrabold text-[clamp(56px,8vw,96px)] leading-[0.95] text-[#111111] mb-6">
          <span className="block">BIOLOGY THAT</span>
          <span className="block text-[#6BBF3A]">BALANCES</span>
          <span className="block">THE POND.</span>
        </h1>

        {/* Subline */}
        <p className="font-newsreader italic text-[clamp(18px,3vw,26px)] text-[#2B2B2B] mb-12 max-w-2xl">
          Most pond problems start at the bottom.
        </p>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat 1 */}
          <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm hover:translate-y-[-3px] transition-transform duration-300">
            <div className="font-newsreader text-[clamp(40px,5vw,56px)] font-bold text-[#6BBF3A] mb-2">
              ~74%
            </div>
            <div className="font-jetbrains text-[14px] font-medium uppercase tracking-[0.18em] text-[#5C6B5E]">
              OF FED NITROGEN
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm hover:translate-y-[-3px] transition-transform duration-300">
            <div className="font-newsreader text-[clamp(40px,5vw,56px)] font-bold text-[#6BBF3A] mb-2">
              A few mm
            </div>
            <div className="font-jetbrains text-[14px] font-medium uppercase tracking-[0.18em] text-[#5C6B5E]">
              SEDIMENT LAYER
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm hover:translate-y-[-3px] transition-transform duration-300">
            <div className="font-newsreader text-[clamp(40px,5vw,56px)] font-bold text-[#6BBF3A] mb-2">
              &lt;5 µg/L
            </div>
            <div className="font-jetbrains text-[14px] font-medium uppercase tracking-[0.18em] text-[#5C6B5E]">
              H₂S TOXICITY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
