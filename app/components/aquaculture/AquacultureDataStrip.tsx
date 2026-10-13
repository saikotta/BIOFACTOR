"use client";

import React from "react";
import { useTranslation } from "@/app/i18n/useTranslation";

export default function AquacultureDataStrip() {
  const { t } = useTranslation();

  const stats = [
    {
      value: "~74%",
      desc: t("aqua_data_p_desc"),
      source: t("aqua_data_p_source"),
      sup: "1",
    },
    {
      value: "A few mm",
      desc: t("aqua_data_mm_desc"),
      source: t("aqua_data_mm_source"),
      sup: "14",
    },
    {
      value: "<5 µg/L",
      desc: t("aqua_data_h2s_desc"),
      source: t("aqua_data_h2s_source"),
      sup: "3",
    },
  ];
  return (
    <section
      className="w-full"
      style={{ background: "#1f4d38", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-3">
        {stats.map((s, i) => (
          <div
            key={i}
            className="flex flex-col py-12"
            style={{
              paddingInline: "clamp(20px, 5vw, 72px)",
              borderRight:
                i < stats.length - 1
                  ? "1px solid rgba(107,191,58,0.18)"
                  : "none",
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
    </section>
  );
}
