import React from "react";

const stats = [
  {
    value: "3.4 bn",
    desc: "people still lacked safely managed sanitation in 2024.",
    source: "WHO / UNICEF JMP",
    sup: "9",
  },
  {
    value: "14",
    desc: "countries could report how much of their industrial wastewater is treated. The rest of the world has no reliable data.",
    source: "UN-WATER, 2021",
    sup: "3",
  },
  {
    value: "56%",
    desc: "of household wastewater worldwide was safely treated in 2020. Data on industrial wastewater is too thin for a global figure.",
    source: "UN-WATER, 2021",
    sup: "3",
  },
];

export default function BioremidationDataStrip() {
  return (
    <section className="w-full">
      {/* 1. Deep Forest Editorial Data Band */}
      <div
        className="w-full"
        style={{ background: "#1f4d38", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col py-10 sm:py-12 ${
                i < stats.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""
              }`}
              style={{
                paddingInline: "clamp(20px, 5vw, 72px)",
                borderColor: "rgba(107,191,58,0.18)",
              }}
            >
              <span
                data-cu={s.value}
                className="font-inter-tight font-extrabold leading-none mb-5"
                style={{
                  fontSize: "clamp(2.4rem,4.5vw,3.4rem)",
                  color: "#9be39f",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.value}
              </span>

              <p
                className="font-newsreader flex-1 mb-0"
                style={{
                  fontSize: "clamp(0.95rem,1.2vw,1.05rem)",
                  lineHeight: 1.65,
                  color: "rgba(234,244,223,0.80)",
                }}
              >
                {s.desc}
              </p>

              <div
                className="my-5"
                style={{ width: "2.5rem", height: "1px", background: "rgba(107,191,58,0.35)" }}
                aria-hidden="true"
              />

              <span
                className="font-jetbrains uppercase"
                style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "#9be39f" }}
              >
                {s.source}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Editorial Transition Pull-Quote Band — Full Width Spanning to Right Margin */}
      <div className="w-full bg-transparent text-[#173522] pt-10 md:pt-12 lg:pt-14 pb-7 md:pb-9 lg:pb-11 br-rv">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
          <div className="w-full">
            <p className="font-serif text-lg sm:text-xl lg:text-[21px] xl:text-[22px] text-[#173522] leading-[1.48] font-normal">
              The gap between what we generate and what we treat ends up in rivers, lakes and groundwater.{" "}
              <span className="text-[#2D6A4F] font-medium italic">Microbes are the workforce that closes it:</span>{" "}
              they break down organic load, remove nitrogen, decolourise dyes and turn toxic metals into less harmful forms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
