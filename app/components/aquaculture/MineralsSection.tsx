import React from "react";
import Image from "next/image";

export default function MineralsSection() {
  return (
    <section className="relative w-full bg-[#EAF6EC] px-6 py-20 md:px-12 lg:px-20 xl:px-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-6 sm:grid-cols-12 lg:gap-10">
        <div className="sm:col-span-6">
          <h2 className="mb-8 font-inter-tight text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.05] text-[#111111]">
            Minerals shrimp can actually use.
          </h2>

          <div className="mb-10 max-w-3xl space-y-6">
            <p className="font-newsreader text-[18px] leading-[1.6] text-[#2B2B2B]">
              Shrimp absorb minerals directly from water through gills and exoskeleton. In low-salinity ponds, essential minerals like potassium, magnesium and calcium become limiting factors for growth and moulting.
            </p>
            <p className="font-newsreader text-[18px] leading-[1.6] text-[#2B2B2B]">
              Chelated minerals improve bioavailability, allowing shrimp to maintain ion balance and complete successful moults even in freshwater conditions.
            </p>
          </div>

          <div className="mt-10 border-y border-[#B8D5BF]">
            <article className="grid grid-cols-[76px_1fr] gap-4 border-b border-[#B8D5BF] py-4">
              <div className="border-r border-[#B8D5BF] pr-3">
                <p className="font-jetbrains text-[10px] tracking-[0.16em] text-[#5A7A5E]">01</p>
                <h4 className="mt-1 font-inter-tight text-[32px] font-extrabold leading-none text-[#1F8A57]">P</h4>
              </div>
              <div>
                <p className="mb-1 font-jetbrains text-[10px] uppercase tracking-[0.12em] text-[#5A7A5E]">Phosphorus</p>
                <p className="font-newsreader text-[15px] leading-[1.5] text-[#2B2B2B]">
                  Supports energy metabolism and skeletal development. Chelation prevents precipitation in alkaline water.
                </p>
              </div>
            </article>

            <article className="grid grid-cols-[76px_1fr] gap-4 border-b border-[#B8D5BF] py-4">
              <div className="border-r border-[#B8D5BF] pr-3">
                <p className="font-jetbrains text-[10px] tracking-[0.16em] text-[#5A7A5E]">02</p>
                <h4 className="mt-1 font-inter-tight text-[25px] font-extrabold leading-none text-[#1F8A57]">K·Mg</h4>
              </div>
              <div>
                <p className="mb-1 font-jetbrains text-[10px] uppercase tracking-[0.12em] text-[#5A7A5E]">Potassium + magnesium</p>
                <p className="font-newsreader text-[15px] leading-[1.5] text-[#2B2B2B]">
                  Maintain osmotic balance. Critical for successful moulting in low-salinity conditions.
                </p>
              </div>
            </article>

            <article className="grid grid-cols-[76px_1fr] gap-4 py-4">
              <div className="border-r border-[#B8D5BF] pr-3">
                <p className="font-jetbrains text-[10px] tracking-[0.16em] text-[#5A7A5E]">03</p>
                <h4 className="mt-1 font-inter-tight text-[32px] font-extrabold leading-none text-[#1F8A57]">Ca</h4>
              </div>
              <div>
                <p className="mb-1 font-jetbrains text-[10px] uppercase tracking-[0.12em] text-[#5A7A5E]">Calcium</p>
                <p className="font-newsreader text-[15px] leading-[1.5] text-[#2B2B2B]">
                  Essential for exoskeleton formation. Chelated calcium improves absorption during intermoult periods.
                </p>
              </div>
            </article>
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:col-span-6 sm:justify-between">
          <div className="relative mt-0 aspect-[4/3] w-full overflow-hidden sm:mt-20 sm:aspect-square">
            <Image
              src="/images/aquaculture-minerals.jpg"
              alt="Shrimp in water"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 w-full max-w-6xl border border-[#B8D5BF] bg-transparent p-6 sm:p-8 lg:p-10">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 font-jetbrains text-[11px] font-medium uppercase tracking-[0.18em] text-[#5A7A5E]">
              LOW-SALINITY SURVIVAL
            </p>
            <h3 className="font-inter-tight text-[clamp(22px,3vw,32px)] font-bold leading-tight text-[#10301f]">
              Why minerals matter
            </h3>
          </div>
          <p className="font-newsreader text-[14px] text-[#4b6b57]">Survival rate</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-[minmax(100px,180px)_1fr_48px] items-center gap-4">
            <p className="font-newsreader text-[15px] text-[#2B2B2B]">Without minerals</p>
            <div className="h-6 overflow-hidden bg-[#D8E8DC]">
              <div className="h-full bg-[#B8893A]" style={{ width: "45%" }} />
            </div>
            <p className="text-right font-inter-tight text-[15px] font-bold text-[#8F6828]">45%</p>
          </div>
          <div className="grid grid-cols-[minmax(100px,180px)_1fr_48px] items-center gap-4">
            <p className="font-newsreader text-[15px] text-[#2B2B2B]">With minerals</p>
            <div className="h-6 overflow-hidden bg-[#D8E8DC]">
              <div className="h-full bg-[#5FBF86]" style={{ width: "92%" }} />
            </div>
            <p className="text-right font-inter-tight text-[15px] font-bold text-[#0D4F31]">92%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
