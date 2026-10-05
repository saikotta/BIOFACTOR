import React from "react";
import Image from "next/image";

const ZONES = [
  {
    depth: "0 – 30 cm",
    label: "Surface: aerobic",
    color: "#1F8A57",
    body: (
      <>
        Nitrifying bacteria near aerators convert ammonia to nitrate, and{" "}
        <em>Bacillus</em> clear dissolved organic matter so the plankton bloom stays steady.<sup>7</sup>
      </>
    ),
  },
  {
    depth: "30 – 100 cm",
    label: "Mid-water: micro-aerophilic",
    color: "#5FBF86",
    body: (
      <>
        Facultative and photosynthetic bacteria such as{" "}
        <em>Rhodopseudomonas palustris</em> keep taking up ammonia and nitrite through night-time oxygen dips.<sup>8</sup>
      </>
    ),
  },
];

export default function WaterBlock() {
  return (
    <section className="relative w-full bg-[#EAF6EC] px-6 pb-16 pt-28 md:px-12 md:pb-16 md:pt-32 lg:px-20 lg:pb-20 lg:pt-36 xl:px-32" aria-label="Water column section">
      <div className="mx-auto max-w-7xl">

        {/* ── GRID: LEFT (HEADER + IMAGE) | RIGHT (PARALLEL MATTER CARDS) ── */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">

          {/* LEFT COLUMN: Header on top of the image, then image below */}
          <div className="flex flex-col lg:col-span-5">
            {/* Header section on the top left */}
            <div className="mb-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-[2px] w-6 bg-[#1F8A57]" />
                <p className="font-jetbrains text-[11px] font-bold uppercase tracking-[0.22em] text-[#1F8A57]">
                  ABOVE THE BOTTOM
                </p>
              </div>
              <h2 className="mb-2 font-inter-tight text-[54px] font-extrabold leading-[0.95] text-[#1F8A57] sm:text-[64px] lg:text-[72px]">
                WATER
              </h2>
              <p className="font-newsreader text-[18px] italic leading-[1.45] text-[#2B2B2B]">
                Oxygen-rich at the surface. Low and shifting at night.
              </p>
            </div>

            {/* Image below the header */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#B8D5BF] shadow-md">
              <Image
                src="/images/aquaculture-water-column.jpg"
                alt="Fish swimming in a pond water column"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              {/* Depth ruler overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 flex flex-col justify-between py-5 pl-4"
                style={{ pointerEvents: "none" }}
              >
                {ZONES.map((z) => (
                  <div key={z.label} className="flex items-center gap-2">
                    <span
                      className="h-[1.5px] w-5 flex-shrink-0"
                      style={{ background: z.color, opacity: 0.9 }}
                    />
                    <span
                      className="rounded px-2 py-0.5 font-jetbrains text-[9px] font-semibold uppercase tracking-[0.14em]"
                      style={{
                        background: "rgba(0,0,0,0.60)",
                        color: z.color,
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {z.depth}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Table Header + Reduced Size Zone Cards */}
          <div className="flex flex-col gap-4 lg:col-span-7 lg:pt-24">
            {/* Header of the table/cards on top right */}
            <div className="pb-1 border-b border-[#B8D5BF]/70">
              <h3 className="font-inter-tight text-[26px] font-extrabold leading-snug text-[#10301f] sm:text-[30px]">
                Keeping the water column stable.
              </h3>
            </div>

            {/* Reduced size cards */}
            <div className="flex flex-col gap-4">
              {ZONES.map((z) => (
                <div
                  key={z.label}
                  className="group relative flex flex-col justify-center rounded-lg border border-[#B8D5BF] bg-white/70 p-5 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#1F8A57]/50 hover:bg-white/95 hover:shadow-md"
                >
                  {/* Visual Depth Tag */}
                  <div className="mb-2.5 flex items-center gap-2.5">
                    <span
                      className="inline-flex items-center rounded-md px-2.5 py-0.5 font-jetbrains text-[9.5px] font-bold uppercase tracking-[0.14em]"
                      style={{
                        background: `${z.color}15`,
                        color: z.color,
                        border: `1px solid ${z.color}35`,
                      }}
                    >
                      {z.depth}
                    </span>
                    <span className="h-px flex-1 bg-[#B8D5BF]/60" />
                  </div>

                  {/* Zone Label / Heading */}
                  <h4 className="mb-2 font-inter-tight text-[20px] font-extrabold leading-tight text-[#10301f] sm:text-[22px]">
                    {z.label}
                  </h4>

                  {/* Body Matter */}
                  <p className="font-newsreader text-[16px] leading-[1.55] text-[#345240]">
                    {z.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
