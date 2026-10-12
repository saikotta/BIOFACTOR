import React from "react";

const stats = [
  {
    value: "~US$6 bn",
    desc: "Estimated yearly global cost of necrotic enteritis, a gut disease of broilers.",
    source: "2015 industry estimate",
    sup: "",
  },
  {
    value: "2006",
    desc: "The EU banned all antibiotics as feed growth promoters. Other markets have followed, including India's 2019 ban on colistin for food animals.",
    source: "European Commission · India",
    sup: "",
  },
  {
    value: "10–30%",
    desc: "of the phosphorus in corn and soybean meal is available to poultry. The rest passes through into the litter.",
    source: "Feed phosphorus",
    sup: "",
  },
];

export default function PoultryDataStrip() {
  return (
    <section className="w-full" data-ruminants-section="stats" data-n="Key Stats">
      {/* Full-Bleed Dark Green Data Table */}
      <div
        className="w-full"
        style={{
          background: "#1f4d38",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
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

      {/* 3. Bottom Editorial Paragraph */}
      <div className="rv w-full pt-6 lg:pt-8 pb-3 lg:pb-4 bg-[#E8F3EA] !min-h-0">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-[clamp(48px,5vw,72px)]">
          <div className="max-w-[850px]">
            <div
              className="text-[clamp(1.25rem,1.55vw,1.5rem)] leading-[1.52]"
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                color: '#0a2d1a',
              }}
            >
              As antibiotics leave poultry feed, the gut has to be protected in other ways.{" "}
              <span className="font-medium" style={{ color: '#6DBE45' }}>Beneficial microbes and the fibres that feed them</span> can hold back pathogens, support growth and free up minerals the bird would otherwise waste.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}