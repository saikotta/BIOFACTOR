import React from "react";
import Image from "next/image";

export default function WaterBlock() {
  return (
    <section className="relative w-full bg-[#EAF6EC] px-6 py-20 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <div className="relative order-1 min-h-[300px] overflow-hidden rounded-sm lg:order-1 lg:col-span-5">
          <Image
            src="/images/aquaculture-water-column.jpg"
            alt="Fish swimming among lily pads in a pond"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
        </div>

        <div className="order-2 lg:order-2 lg:col-start-6 lg:col-span-7">
          <h2 className="font-inter-tight font-extrabold text-[clamp(48px,8vw,72px)] leading-[0.9] text-[#1F8A57]">
            WATER
          </h2>

          <h3 className="mt-4 font-inter-tight font-bold text-[clamp(20px,3vw,28px)] text-[#111111] mb-8">
            Keeping the water column stable.
          </h3>

          {/* 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Surface */}
            <div className="bg-transparent border border-[#B8D5BF] p-6 rounded-sm border-t-[3px] border-t-[#1F8A57] hover:translate-y-[-3px] transition-transform duration-300">
              <h4 className="font-inter-tight font-bold text-[16px] text-[#111111] mb-3">
                Surface: aerobic
              </h4>
              <p className="font-newsreader text-[15px] leading-[1.55] text-[#2B2B2B]">
                Oxygen-rich zone where aerobic probiotics maintain water quality and reduce algal blooms.
              </p>
            </div>

            {/* Mid-water */}
            <div className="bg-transparent border border-[#B8D5BF] p-6 rounded-sm border-t-[3px] border-t-[#1F8A57] hover:translate-y-[-3px] transition-transform duration-300">
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
