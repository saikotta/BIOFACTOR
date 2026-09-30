import React from "react";

export default function ConsortiaBlock() {
  return (
    <section className="relative w-full bg-[#EAF6EC] px-6 py-20 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Giant word CONSORTIA */}
        <div className="lg:col-span-4 flex items-start">
          <h2 className="font-inter-tight font-extrabold text-[clamp(48px,8vw,72px)] leading-[0.9] text-[#B8893A]">
            CONSORTIA
          </h2>
        </div>

        {/* Right column content */}
        <div className="lg:col-span-8">
          {/* H3 */}
          <h3 className="font-inter-tight font-bold text-[clamp(20px,3vw,28px)] text-[#111111] mb-8">
            Anaerobic probiotics manage the load at its source.
          </h3>

          {/* 2x2 Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Card 1 */}
            <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm border-t-[3px] border-t-[#6BBF3A] hover:translate-y-[-3px] transition-transform duration-300">
              <h4 className="font-inter-tight font-bold text-[16px] text-[#111111] mb-3">
                Organic breakdown
              </h4>
              <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B]">
                Specialised anaerobes accelerate decomposition of accumulated organic matter in sediment.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm border-t-[3px] border-t-[#6BBF3A] hover:translate-y-[-3px] transition-transform duration-300">
              <h4 className="font-inter-tight font-bold text-[16px] text-[#111111] mb-3">
                Competes with pathogens
              </h4>
              <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B]">
                Beneficial microbes outcompete harmful bacteria for resources in the sediment environment.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm border-t-[3px] border-t-[#6BBF3A] hover:translate-y-[-3px] transition-transform duration-300">
              <h4 className="font-inter-tight font-bold text-[16px] text-[#111111] mb-3">
                Reduced gas formation
              </h4>
              <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B]">
                Diverts organic breakdown pathways away from methane and hydrogen sulphide production.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-[#D5E9D8] p-6 rounded-sm border-t-[3px] border-t-[#6BBF3A] hover:translate-y-[-3px] transition-transform duration-300">
              <h4 className="font-inter-tight font-bold text-[16px] text-[#111111] mb-3">
                Sludge reduction
              </h4>
              <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B]">
                Faster organic breakdown reduces sediment accumulation over production cycles.
              </p>
            </div>
          </div>

          {/* Callout box */}
          <div className="bg-white border-2 border-[#B8893A] p-6 rounded-sm">
            <div className="font-newsreader text-[clamp(28px,4vw,36px)] font-bold text-[#6BBF3A] mb-2">
              93% less hydrogen sulphide
            </div>
            <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B] italic">
              In pond trials with anaerobic probiotic application.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
