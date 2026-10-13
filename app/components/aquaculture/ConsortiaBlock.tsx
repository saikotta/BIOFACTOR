"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "@/app/i18n/useTranslation";

export default function ConsortiaBlock() {
  const { t } = useTranslation();

  return (
    <section
      className="relative w-full py-20"
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
      <div
        className="rv d2 mx-auto mt-12 w-full bg-[#0F2A1A] px-8 py-10 sm:px-12 sm:py-12"
        style={{ width: "calc(100% - 2 * clamp(20px, 5vw, 72px))", maxWidth: "1280px" }}
      >
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">

          {/* Big number */}
          <div className="flex-shrink-0 border-r-0 pr-0 sm:border-r sm:border-[#1F8A57]/30 sm:pr-10">
            <span
              className="font-inter-tight font-extrabold leading-none text-[#6FCB5A]"
              data-cu="93%"
              style={{ fontSize: "clamp(4rem,8vw,6rem)", letterSpacing: "-0.035em" }}
            >
              93%
            </span>
            <p className="mt-1 font-jetbrains text-[10px] font-medium uppercase tracking-[0.18em] text-[#6fbf73]/60">
              {t("aqua_consortia_stat_sub")}
            </p>
          </div>

          {/* Divider — horizontal on mobile */}
          <div className="h-px w-full bg-[#2f8f4e]/30 sm:hidden" aria-hidden="true" />

          {/* Explanation */}
          <div>
            <p className="font-newsreader text-[16.5px] leading-[1.65] text-[#FFFFFF]">
              {t("aqua_consortia_stat_desc")}
            </p>
            <p className="mt-3 font-jetbrains text-[10px] uppercase tracking-[0.14em] text-[#cfe6bd]/50">
              Xu &amp; Pan 2013,{" "}
              <em className="not-italic normal-case text-[#cfe6bd]/40">Aquaculture</em>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
