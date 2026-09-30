import React from "react";

export default function MineralsSection() {
  return (
    <section className="relative w-full bg-[#EAF6EC] px-6 py-20 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Section H2 */}
        <h2 className="font-inter-tight font-extrabold text-[clamp(36px,5vw,56px)] leading-[1.05] text-[#111111] mb-8">
          Minerals shrimp can actually use.
        </h2>

        {/* Two paragraphs */}
        <div className="space-y-6 mb-12 max-w-3xl">
          <p className="font-newsreader text-[18px] leading-[1.6] text-[#2B2B2B]">
            Shrimp absorb minerals directly from water through gills and exoskeleton. In low-salinity ponds, essential minerals like potassium, magnesium and calcium become limiting factors for growth and moulting.
          </p>
          <p className="font-newsreader text-[18px] leading-[1.6] text-[#2B2B2B]">
            Chelated minerals improve bioavailability, allowing shrimp to maintain ion balance and complete successful moults even in freshwater conditions.
          </p>
        </div>

        {/* Bar Chart */}
        <div className="bg-white border border-[#D5E9D8] p-8 rounded-sm mb-12">
          <h4 className="font-jetbrains text-[11px] font-medium uppercase tracking-[0.18em] text-[#5C6B5E] mb-6">
            Why minerals matter: survival in low-salinity water
          </h4>
          <div className="space-y-4">
            {/* Bar 1 */}
            <div className="flex items-center gap-4">
              <div className="w-32 font-newsreader text-[15px] text-[#2B2B2B]">Without minerals</div>
              <div className="flex-1 h-8 bg-[#EAF6EC] rounded-sm">
                <div className="h-full bg-[#B8893A] rounded-sm" style={{ width: "45%" }}></div>
              </div>
              <div className="font-newsreader text-[15px] font-bold text-[#B8893A]">45%</div>
            </div>
            {/* Bar 2 */}
            <div className="flex items-center gap-4">
              <div className="w-32 font-newsreader text-[15px] text-[#2B2B2B]">With minerals</div>
              <div className="flex-1 h-8 bg-[#EAF6EC] rounded-sm">
                <div className="h-full bg-[#6BBF3A] rounded-sm" style={{ width: "92%" }}></div>
              </div>
              <div className="font-newsreader text-[15px] font-bold text-[#6BBF3A]">92%</div>
            </div>
          </div>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* P */}
          <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm border-t-[3px] border-t-[#6BBF3A] hover:translate-y-[-3px] transition-transform duration-300">
            <h4 className="font-inter-tight font-bold text-[16px] text-[#111111] mb-3">
              P
            </h4>
            <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B]">
              Phosphorus supports energy metabolism and skeletal development. Chelation prevents precipitation in alkaline water.
            </p>
          </div>

          {/* K·Mg */}
          <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm border-t-[3px] border-t-[#6BBF3A] hover:translate-y-[-3px] transition-transform duration-300">
            <h4 className="font-inter-tight font-bold text-[16px] text-[#111111] mb-3">
              K·Mg
            </h4>
            <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B]">
              Potassium and magnesium maintain osmotic balance. Critical for successful moulting in low-salinity conditions.
            </p>
          </div>

          {/* Ca */}
          <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm border-t-[3px] border-t-[#6BBF3A] hover:translate-y-[-3px] transition-transform duration-300">
            <h4 className="font-inter-tight font-bold text-[16px] text-[#111111] mb-3">
              Ca
            </h4>
            <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B]">
              Calcium is essential for exoskeleton formation. Chelated calcium improves absorption during intermoult periods.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
