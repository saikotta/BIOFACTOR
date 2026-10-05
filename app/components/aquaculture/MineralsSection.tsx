"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function MineralsSection() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setFired(true); return; }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setFired(true);
        observer.disconnect();
      },
      { threshold: 0.45 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
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

      <div className="mx-auto mt-10 w-full max-w-[100%] rounded-[16px] border border-[#B8D5BF] bg-[#F7FBF8] p-3 sm:p-4 lg:p-5" ref={chartRef}>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1.5 font-jetbrains text-[10px] font-medium uppercase tracking-[0.18em] text-[#5A7A5E]">
              LOW-SALINITY SURVIVAL
            </p>
            <h3 className="font-inter-tight text-[clamp(20px,2.6vw,26px)] font-bold leading-tight text-[#10301f]">
              Why minerals matter
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C7DCCN] bg-white/70 px-2.5 py-1">
            <span className="h-2 w-2 rounded-full bg-[#5FBF86]" />
            <p className="font-jetbrains text-[9px] uppercase tracking-[0.14em] text-[#4b6b57]">Survival rate</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              label: "Without minerals",
              value: 45,
              tone: "amber",
              color: "#B8893A",
              chip: "text-[#8F6828] bg-[#F9F1E5] border-[#E9D9BA]",
            },
            {
              label: "With minerals",
              value: 92,
              tone: "green",
              color: "#1F8A57",
              chip: "text-[#0D4F31] bg-[#EAF7EF] border-[#C8E6D0]",
            },
          ].map((item) => (
            <div key={item.label} className="grid gap-2.5 md:grid-cols-[150px_minmax(0,1fr)_76px] md:items-center md:gap-4">
              <p className="font-newsreader text-[14px] text-[#2B2B2B]">{item.label}</p>

              <div className="relative w-full">
                <div className="absolute inset-0 grid grid-cols-5 gap-2 opacity-60">
                  {[0, 1, 2, 3, 4].map((g) => (
                    <span key={g} className="h-full border-l border-[#D5E2D7]" />
                  ))}
                </div>

                <div className="relative h-8 overflow-hidden rounded-full border border-[#CFE2D1] bg-[#E8F0E9] shadow-inner">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#9FCF7B] via-[#5FBF86] to-[#1F8A57]"
                    style={{
                      width: fired ? `${item.value}%` : "0%",
                      transition: fired ? "width 1.2s cubic-bezier(.2,.7,.2,1)" : "none",
                      background: item.tone === "amber" ? "linear-gradient(90deg, #D7A55D 0%, #C48D3A 100%)" : "linear-gradient(90deg, #7BCB9A 0%, #5FBF86 45%, #1F8A57 100%)",
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <span
                  className={`inline-flex min-w-[52px] items-center justify-center rounded-full border px-2 py-0.5 font-inter-tight text-[13px] font-bold ${item.chip}`}
                  style={{
                    opacity: fired ? 1 : 0,
                    transition: fired ? "opacity .45s ease" : "none",
                  }}
                >
                  {item.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
