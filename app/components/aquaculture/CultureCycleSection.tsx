import React from "react";

export default function CultureCycleSection() {
  return (
    <section className="relative w-full bg-[#EAF6EC] px-6 py-20 md:px-12 lg:px-20 xl:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Section H2 */}
        <h2 className="font-inter-tight font-extrabold text-[clamp(36px,5vw,56px)] leading-[1.05] text-[#111111] mb-12">
          The right biology at each stage.
        </h2>

        {/* Table */}
        <div className="bg-white border border-[#D5E9D8] rounded-sm overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-[#D5E9D8]">
                <th className="font-jetbrains text-[11px] font-medium uppercase tracking-[0.18em] text-[#5C6B5E] text-left p-4">
                  Stage
                </th>
                <th className="font-jetbrains text-[11px] font-medium uppercase tracking-[0.18em] text-[#5C6B5E] text-left p-4">
                  Pond bottom
                </th>
                <th className="font-jetbrains text-[11px] font-medium uppercase tracking-[0.18em] text-[#5C6B5E] text-left p-4">
                  Water column
                </th>
                <th className="font-jetbrains text-[11px] font-medium uppercase tracking-[0.18em] text-[#5C6B5E] text-left p-4">
                  Gut
                </th>
                <th className="font-jetbrains text-[11px] font-medium uppercase tracking-[0.18em] text-[#5C6B5E] text-left p-4">
                  Minerals
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#D5E9D8]">
                <td className="font-inter-tight font-bold text-[16px] text-[#111111] p-4">
                  Pond prep
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  Anaerobic inoculation
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  Nitrifying bacteria
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  —
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  Ion balance
                </td>
              </tr>
              <tr className="border-b border-[#D5E9D8]">
                <td className="font-inter-tight font-bold text-[16px] text-[#111111] p-4">
                  Stocking
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  Load management
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  Probiotic boost
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  Gut colonisation
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  K·Mg support
                </td>
              </tr>
              <tr className="border-b border-[#D5E9D8]">
                <td className="font-inter-tight font-bold text-[16px] text-[#111111] p-4">
                  Early grow-out
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  Sludge reduction
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  Algal control
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  Prebiotic feed
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  Ca for moulting
                </td>
              </tr>
              <tr className="border-b border-[#D5E9D8]">
                <td className="font-inter-tight font-bold text-[16px] text-[#111111] p-4">
                  Peak biomass
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  H₂S suppression
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  Oxygen stability
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  Immune support
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  P for energy
                </td>
              </tr>
              <tr>
                <td className="font-inter-tight font-bold text-[16px] text-[#111111] p-4">
                  Harvest
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  Bottom preparation
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  Water reset
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  —
                </td>
                <td className="font-newsreader text-[15px] text-[#2B2B2B] p-4">
                  Rebalancing
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
