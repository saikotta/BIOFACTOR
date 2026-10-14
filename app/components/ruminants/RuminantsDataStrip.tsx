"use client";

import React from "react";
import { useTranslation } from "@/app/i18n/useTranslation";

export default function RuminantsDataStrip() {
  const { t } = useTranslation();

  const stats = [
    {
      value: "944 Mt",
      desc: t("ruminants_data_milk_desc"),
      source: t("ruminants_data_milk_source"),
      sup: "",
    },
    {
      value: t("ruminants_data_methane_value"),
      desc: t("ruminants_data_methane_desc"),
      source: t("ruminants_data_methane_source"),
      sup: "",
    },
    {
      value: "19–26%",
      desc: t("ruminants_data_acid_desc"),
      source: t("ruminants_data_acid_source"),
      sup: "",
    },
  ];

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
              {t("ruminants_data_pullquote")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


