import React from "react";

export default function BottomBlock() {
  return (
    <section className="relative w-full bg-[#EAF6EC] px-6 py-20 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Giant word BOTTOM */}
        <div className="lg:col-span-4 flex items-start">
          <h2 className="font-inter-tight font-extrabold text-[clamp(48px,8vw,72px)] leading-[0.9] text-[#B8893A]">
            BOTTOM
          </h2>
        </div>

        {/* Right column content */}
        <div className="lg:col-span-8">
          {/* H3 */}
          <h3 className="font-inter-tight font-bold text-[clamp(20px,3vw,28px)] text-[#111111] mb-8">
            Three toxic metabolites, one source.
          </h3>

          {/* 2x2 Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ammonia */}
            <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm border-t-[3px] border-t-[#6BBF3A] hover:translate-y-[-3px] transition-transform duration-300">
              <h4 className="font-inter-tight font-bold text-[16px] text-[#111111] mb-3">
                Ammonia
              </h4>
              <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B]">
                Accumulates from uneaten feed and excreta. High levels damage gills and reduce oxygen uptake.
              </p>
            </div>

            {/* Nitrite */}
            <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm border-t-[3px] border-t-[#6BBF3A] hover:translate-y-[-3px] transition-transform duration-300">
              <h4 className="font-inter-tight font-bold text-[16px] text-[#111111] mb-3">
                Nitrite
              </h4>
              <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B]">
                Interferes with oxygen transport in shrimp blood. Causes brown blood disease at elevated levels.
              </p>
            </div>

            {/* Hydrogen sulphide */}
            <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm border-t-[3px] border-t-[#6BBF3A] hover:translate-y-[-3px] transition-transform duration-300">
              <h4 className="font-inter-tight font-bold text-[16px] text-[#111111] mb-3">
                Hydrogen sulphide
              </h4>
              <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B]">
                Generated under anaerobic conditions in sediment. Highly toxic even at low concentrations.
              </p>
            </div>

            {/* Released upward */}
            <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm border-t-[3px] border-t-[#6BBF3A] hover:translate-y-[-3px] transition-transform duration-300">
              <h4 className="font-inter-tight font-bold text-[16px] text-[#111111] mb-3">
                Released upward
              </h4>
              <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B]">
                All three metabolites diffuse from sediment into the water column, where shrimp are exposed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
