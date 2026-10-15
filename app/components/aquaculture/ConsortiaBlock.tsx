"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "@/app/i18n/useTranslation";

export default function ConsortiaBlock() {
  const { t } = useTranslation();

  return (
    <section
      className="relative w-full pt-20 pb-16"
      data-n="Consortia"
      data-motion
      style={{ background: "linear-gradient(180deg, #D9EBC4 0%, #EDF7DF 50%, #E5F0D4 100%)" }}
    >
      <div
        className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-12"
        style={{ paddingInline: "clamp(20px, 5vw, 72px)" }}
      >
        {/* Left column — image + heading */}
        <div className="order-1 flex flex-col lg:order-2 lg:col-span-5 lg:col-start-8 rv">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1F8A57]">
            {t("aqua_consortia_eyebrow")}
          </p>
          <h2 className="mb-4 font-inter-tight text-[72px] font-extrabold leading-[0.9] text-[#1F8A57]">
            {t("aqua_consortia_title")}
          </h2>
          <p className="font-newsreader text-[18px] leading-[1.6] text-[#2B2B2B]">
            {t("aqua_consortia_subtitle")}
          </p>
          <div className="ph relative mt-8 aspect-square w-full overflow-hidden rounded-sm">
            <Image
              src="/images/aquaculture-consortia.jpg"
              alt="Underwater view of pond-bottom sediment"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Right column — bullet content */}
        <div className="order-2 lg:order-1 lg:col-span-7 lg:col-start-1 rv d1">
          <h3 className="font-inter-tight font-bold text-[36px] text-[#111111] mb-6">
            {t("aqua_consortia_heading")}
          </h3>

          <p className="font-newsreader text-[18px] leading-[1.6] text-[#2B2B2B] mb-8">
            {t("aqua_consortia_desc")}
          </p>

          <div className="space-y-6 mb-8">
            <div className="rv d1 border-l-4 border-[#1F8A57] pl-4">
              <h4 className="font-inter-tight font-bold text-[18px] text-[#111111] mb-2">{t("aqua_consortia_bullet1_title")}</h4>
              <p className="font-newsreader text-[16px] leading-[1.5] text-[#2B2B2B]">
                {t("aqua_consortia_bullet1_desc")}
              </p>
            </div>

            <div className="rv d2 border-l-4 border-[#1F8A57] pl-4">
              <h4 className="font-inter-tight font-bold text-[18px] text-[#111111] mb-2">{t("aqua_consortia_bullet2_title")}</h4>
              <p className="font-newsreader text-[16px] leading-[1.5] text-[#2B2B2B]">
                {t("aqua_consortia_bullet2_desc")}
              </p>
            </div>

            <div className="rv d3 border-l-4 border-[#1F8A57] pl-4">
              <h4 className="font-inter-tight font-bold text-[18px] text-[#111111] mb-2">{t("aqua_consortia_bullet3_title")}</h4>
              <p className="font-newsreader text-[16px] leading-[1.5] text-[#2B2B2B]">
                {t("aqua_consortia_bullet3_desc")}
              </p>
            </div>

            <div className="rv d4 border-l-4 border-[#1F8A57] pl-4">
              <h4 className="font-inter-tight font-bold text-[18px] text-[#111111] mb-2">{t("aqua_consortia_bullet4_title")}</h4>
              <p className="font-newsreader text-[16px] leading-[1.5] text-[#2B2B2B]">
                {t("aqua_consortia_bullet4_desc")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── STAT CALLOUT ── */}
    </section>
  );
}
