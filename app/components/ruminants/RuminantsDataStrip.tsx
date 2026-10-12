import React from "react";

const stats = [
  {
    value: "944 Mt",
    desc: "of milk was forecast to be produced worldwide in 2023. The largest producer, India, supplies about a quarter.",
    source: "FAO / FAOSTAT",
    sup: "",
  },
  {
    value: "up to 12%",
    desc: "of a ruminant's energy intake is lost as methane during rumen fermentation.",
    source: "FAO",
    sup: "",
  },
  {
    value: "19–26%",
    desc: "of early- and mid-lactation dairy cows show subacute ruminal acidosis in surveys.",
    source: "PLAIZIER ET AL. 2008",
    sup: "",
  },
];

export default function RuminantsDataStrip() {
  return (
    <section className="w-full" data-ruminants-section="stats" data-n="Key Stats" data-motion style={{ minHeight: 0 }}>
      {/* 1. Deep Forest Editorial Data Band */}
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
                {s.source}{s.sup ? <sup>{s.sup}</sup> : null}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Compact Editorial Transition Pull-Quote Band */}
      <div className="rv w-full bg-[#EAF3EA] text-[#173522] pt-3 md:pt-3 lg:pt-4 pb-4 md:pb-5 lg:pb-6" data-ruminants-section="intro" style={{ minHeight: 0 }}>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[clamp(48px,5vw,72px)]">
          <div className="max-w-[1040px]">
            <p className="font-serif text-lg sm:text-xl lg:text-[21px] xl:text-[22px] text-[#173522] leading-[1.48] font-normal" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
              Every kilogram of milk or meat depends on how well the rumen’s microbes ferment feed.{" "}
              <span className="text-[#2D6A4F] font-medium italic">When that community is balanced</span>, the animal gets more energy and protein from the same ration, stays healthier through stress, and wastes less feed as gas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


