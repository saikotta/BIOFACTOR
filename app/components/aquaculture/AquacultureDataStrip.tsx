import React from "react";

const stats = [
  {
    value: "~74%",
    valueColor: "#86EFAC",
    desc: "of the phosphorus added to a vannamei pond settles into the sediment. Only about a third of the nitrogen leaves as harvested shrimp.",
    source: "Pond nutrient budget",
    sup: "1",
  },
  {
    value: "A few mm",
    valueColor: "#86EFAC",
    desc: "below the sediment surface, pore water usually holds no oxygen at all.",
    source: "Boyd 2004",
    sup: "14",
  },
  {
    value: "<5 µg/L",
    valueColor: "#86EFAC",
    desc: "is the safe limit for hydrogen sulphide in brackish-water ponds. At 50–500 µg/L, half of exposed marine animals can die within 96 hours.",
    source: "Boyd 2014",
    sup: "3",
  },
];

export default function AquacultureDataStrip() {
  return (
    <section
      className="w-full bg-[#1B4332]"
      style={{ borderTop: "1px solid rgba(107,191,58,0.25)" }}
    >
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-3">
        {stats.map((s, i) => (
          <div
            key={i}
            className="flex flex-col px-[clamp(1.5rem,3vw,2.5rem)] py-12"
            style={{
              borderRight:
                i < stats.length - 1
                  ? "1px solid rgba(107,191,58,0.18)"
                  : "none",
            }}
          >
            {/* Big number */}
            <span
              className="font-inter-tight font-extrabold leading-none mb-5"
              style={{
                fontSize: "clamp(2.4rem,4.5vw,3.4rem)",
                color: s.valueColor,
                letterSpacing: "-0.02em",
              }}
            >
              {s.value}
            </span>

            {/* Description */}
            <p
              className="font-newsreader flex-1 mb-0"
              style={{
                fontSize: "clamp(0.95rem,1.2vw,1.05rem)",
                lineHeight: 1.65,
                color: "#D9F5D0",
              }}
            >
              {s.desc}
            </p>

            {/* Divider */}
            <div
              className="my-5"
              style={{
                width: "2.5rem",
                height: "1px",
                background: "rgba(107,191,58,0.35)",
              }}
              aria-hidden="true"
            />

            {/* Source */}
            <span
              className="font-jetbrains uppercase"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                color: "#86EFAC",
              }}
            >
              {s.source}
              <sup>{s.sup}</sup>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
