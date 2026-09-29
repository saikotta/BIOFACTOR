import React from "react";

export default function PoultryProductionCycle() {
  return (
    <section className="w-full bg-[#EAF3EA] text-[#0a2d1a] py-20 lg:py-32">
      <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <h2 className="font-display font-bold text-[clamp(2.5rem,4vw,4rem)] text-[#0a2d1a] tracking-tight leading-[0.95] mb-6">
            The right biology at<br />
            every stage of the<br />
            bird's life.
          </h2>
          <p className="text-[#2d4a3a] text-base leading-relaxed max-w-2xl">
            The gut faces different pressures at each stage. Biologicals work best matched to those pressures.
          </p>
        </div>

        {/* Production Table */}
        <div className="bg-white border border-[#c4d4c4] overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#c4d4c4]">
                <th className="font-mono text-xs font-semibold tracking-widest text-[#4a7c59] uppercase px-6 py-4 min-w-[150px]">
                  Stage
                </th>
                <th className="font-mono text-xs font-semibold tracking-widest text-[#D4A574] uppercase px-6 py-4 min-w-[180px]">
                  Gut restoration
                </th>
                <th className="font-mono text-xs font-semibold tracking-widest text-[#6B8F7A] uppercase px-6 py-4 min-w-[180px]">
                  Disease management
                </th>
                <th className="font-mono text-xs font-semibold tracking-widest text-[#8B7F6F] uppercase px-6 py-4 min-w-[180px]">
                  Mineral availability
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#c4d4c4]/50">
                <td className="px-6 py-4">
                  <div className="font-display font-semibold text-[#0a2d1a] text-sm mb-1">Breeder flock</div>
                  <div className="text-[#4a7c59] text-xs">Parent stock</div>
                </td>
                <td className="px-6 py-4 text-[#2d4a3a] text-sm">
                  Pre- and probiotics
                </td>
                <td className="px-6 py-4 text-[#2d4a3a] text-sm">
                  Less Salmonella passed through the egg
                </td>
                <td className="px-6 py-4 text-[#2d4a3a] text-sm">
                  Shell quality for hatching eggs
                </td>
              </tr>
              <tr className="border-b border-[#c4d4c4]/50">
                <td className="px-6 py-4">
                  <div className="font-display font-semibold text-[#0a2d1a] text-sm mb-1">Hatchery</div>
                  <div className="text-[#4a7c59] text-xs">Egg to chick</div>
                </td>
                <td className="px-6 py-4 text-[#2d4a3a] text-sm">
                  First beneficial microbes for the chick
                </td>
                <td className="px-6 py-4 text-[#2d4a3a] text-sm">
                  Protect the embryo on the shell
                </td>
                <td className="px-6 py-4 text-[#2d4a3a] text-sm">
                  —
                </td>
              </tr>
              <tr className="border-b border-[#c4d4c4]/50">
                <td className="px-6 py-4">
                  <div className="font-display font-semibold text-[#0a2d1a] text-sm mb-1">Brooding</div>
                  <div className="text-[#4a7c59] text-xs">Days 0–14</div>
                </td>
                <td className="px-6 py-4 text-[#2d4a3a] text-sm">
                  Seed the empty gut early
                </td>
                <td className="px-6 py-4 text-[#2d4a3a] text-sm">
                  Early exclusion of Salmonella
                </td>
                <td className="px-6 py-4 text-[#2d4a3a] text-sm">
                  Bone development
                </td>
              </tr>
              <tr className="border-b border-[#c4d4c4]/50">
                <td className="px-6 py-4">
                  <div className="font-display font-semibold text-[#0a2d1a] text-sm mb-1">Grow-out</div>
                  <div className="text-[#4a7c59] text-xs">Broilers · pullets</div>
                </td>
                <td className="px-6 py-4 text-[#2d4a3a] text-sm">
                  Recover after feed changes and stress
                </td>
                <td className="px-6 py-4 text-[#2d4a3a] text-sm">
                  Necrotic enteritis window
                </td>
                <td className="px-6 py-4 text-[#2d4a3a] text-sm">
                  Phytate P for fast growth
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4">
                  <div className="font-display font-semibold text-[#0a2d1a] text-sm mb-1">Production</div>
                  <div className="text-[#4a7c59] text-xs">Lay · market</div>
                </td>
                <td className="px-6 py-4 text-[#2d4a3a] text-sm">
                  Hold stability over a long lay
                </td>
                <td className="px-6 py-4 text-[#2d4a3a] text-sm">
                  Keep Salmonella off eggs
                </td>
                <td className="px-6 py-4 text-[#2d4a3a] text-sm">
                  Calcium for every eggshell
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Transition Band from Frame 7 to Frame 8 */}
      <div className="w-full h-[8px] sm:h-[10px] lg:h-[12px]" aria-hidden="true" />
    </section>
  );
}