import React from "react";

export default function WaterBlock() {
  return (
    <section className="relative w-full bg-[#EAF6EC] px-6 py-20 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Giant word WATER */}
        <div className="lg:col-span-4 flex items-start">
          <h2 className="font-inter-tight font-extrabold text-[clamp(48px,8vw,72px)] leading-[0.9] text-[#B8893A]">
            WATER
          </h2>
        </div>

        {/* Right column content */}
        <div className="lg:col-span-8">
          {/* H3 */}
          <h3 className="font-inter-tight font-bold text-[clamp(20px,3vw,28px)] text-[#111111] mb-8">
            Keeping the water column stable.
          </h3>

          {/* 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Surface */}
            <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm border-t-[3px] border-t-[#6BBF3A] hover:translate-y-[-3px] transition-transform duration-300">
              <h4 className="font-inter-tight font-bold text-[16px] text-[#111111] mb-3">
                Surface: aerobic
              </h4>
              <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B]">
                Oxygen-rich zone where aerobic probiotics maintain water quality and reduce algal blooms.
              </p>
            </div>

            {/* Mid-water */}
            <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm border-t-[3px] border-t-[#6BBF3A] hover:translate-y-[-3px] transition-transform duration-300">
              <h4 className="font-inter-tight font-bold text-[16px] text-[#111111] mb-3">
                Mid-water: micro-aerophilic
              </h4>
              <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B]">
                Transition zone where facultative bacteria handle intermediate organic load.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
