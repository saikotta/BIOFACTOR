"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/app/i18n/useTranslation";

export default function OneHealthFranchise() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    proposedLocation: "",
    background: "Agri-input dealer",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const BENEFITS = [
    t("ohc_benefit_1", "Low investment, quick setup"),
    t("ohc_benefit_2", "Agronomy & lab training"),
    t("ohc_benefit_3", "Assured product supply"),
    t("ohc_benefit_4", "Digital centre-management tools"),
    t("ohc_benefit_5", "Marketing & brand support"),
    t("ohc_benefit_6", "Recurring service revenue"),
  ];

  const BACKGROUND_OPTIONS = [
    { value: "Agri-input dealer", label: t("ohc_bg_dealer", "Agri-input dealer") },
    { value: "Progressive farmer", label: t("ohc_bg_farmer", "Progressive farmer") },
    { value: "Agronomist / Agriculture graduate", label: t("ohc_bg_agronomist", "Agronomist / Agriculture graduate") },
    { value: "Rural entrepreneur", label: t("ohc_bg_entrepreneur", "Rural entrepreneur") },
    { value: "Other", label: t("ohc_bg_other", "Other") },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <section
      ref={sectionRef}
      id="franchise"
      className="relative w-full bg-[#EDF4ED] text-[#173522] pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 lg:pb-12 px-6 sm:px-10 lg:px-14 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Original typography, layout & 6 benefit cards restored */}
          <div
            className="lg:col-span-6 flex flex-col items-start transition-all duration-1000 ease-out"
            style={{
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? "translateY(0)" : "translateY(32px)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#173522]/10 text-[#173522] text-xs font-mono font-semibold tracking-wider uppercase mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#3F7D4B] animate-pulse" />
              {t("ohc_franchise_eyebrow", "FRANCHISE")}
            </div>

            {/* Headline */}
            <h2 className="text-[clamp(34px,4.5vw,56px)] font-serif font-bold text-[#173522] leading-[1.08] tracking-tight mb-4">
              {t("ohc_franchise_heading", "Open a One Health Centre")}
            </h2>

            {/* Subtitle */}
            <p className="text-[16px] sm:text-[18px] text-[#173522]/80 leading-relaxed font-sans mb-10 max-w-[500px]">
              {t("ohc_franchise_subtitle", "Build a purposeful rural business backed by Biofactor's science, products and brand.")}
            </p>

            {/* 6 Benefit Pills: 2 columns x 3 rows grid with uniform sizing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 w-full">
              {BENEFITS.map((benefit, idx) => {
                const delayMs = 120 + idx * 70;

                return (
                  <div
                    key={idx}
                    className="h-[74px] sm:h-[76px] flex items-center gap-3.5 bg-white rounded-2xl px-5 border border-[#173522]/8 shadow-[0_2px_12px_rgba(23,53,34,0.03)] hover:shadow-[0_8px_24px_rgba(23,53,34,0.08)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 cursor-default"
                    style={{
                      opacity: isRevealed ? 1 : 0,
                      transform: isRevealed ? "translateY(0)" : "translateY(20px)",
                      transitionDelay: isRevealed ? `${delayMs}ms` : "0ms",
                      transitionDuration: "600ms",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#3F7D4B] shrink-0" />
                    <span className="text-[14px] sm:text-[14.5px] font-semibold text-[#173522] leading-snug">
                      {benefit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Right card with reduced height and stacked single-column inputs */}
          <div
            className="lg:col-span-6 w-full flex justify-center lg:justify-end transition-all duration-1000 ease-out"
            style={{
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? "translateY(0)" : "translateY(36px)",
              transitionDelay: "180ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="w-full max-w-[460px] bg-white rounded-3xl p-6 sm:p-7 lg:p-8 border border-[#173522]/10 shadow-[0_10px_36px_rgba(23,53,34,0.06)]">
              {submitted ? (
                /* Compact submitted state matching card height */
                <div className="py-8 text-center space-y-3.5 flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#EDF4ED] border border-[#3F7D4B]/30 text-[#3F7D4B] font-bold text-2xl flex items-center justify-center shadow-sm">
                    ✓
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#173522]">
                    {t("ohc_form_success_title", "Application Submitted!")}
                  </h3>
                  <p className="text-[#173522]/75 max-w-sm mx-auto text-sm leading-relaxed font-sans">
                    {t("ohc_form_success_pre", "Thank you,")}{" "}
                    <span className="font-semibold text-[#173522]">{formData.name}</span>.{" "}
                    {t("ohc_form_success_mid", "Our franchise operations director will review your enquiry for")}{" "}
                    <span className="font-semibold text-[#173522]">{formData.proposedLocation || "your location"}</span>{" "}
                    {t("ohc_form_success_post", "and contact you shortly.")}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        mobile: "",
                        email: "",
                        proposedLocation: "",
                        background: "Agri-input dealer",
                      });
                    }}
                    className="mt-2 px-5 py-2 rounded-full border border-[#173522]/20 text-[#173522] text-xs font-semibold hover:bg-[#EDF4ED] transition-colors cursor-pointer"
                  >
                    {t("ohc_form_another", "Submit another enquiry")}
                  </button>
                </div>
              ) : (
                /* Stacked Form with reduced padding and spacing */
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#173522] mb-1 font-sans">
                      {t("ohc_form_name", "Name")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder=""
                      className="w-full rounded-2xl border border-[#173522]/20 px-4 py-2.5 sm:py-3 text-sm text-[#173522] focus:outline-none focus:ring-2 focus:ring-[#3F7D4B] focus:border-transparent transition-all shadow-sm"
                    />
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#173522] mb-1 font-sans">
                      {t("ohc_form_mobile", "Mobile")}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder=""
                      className="w-full rounded-2xl border border-[#173522]/20 px-4 py-2.5 sm:py-3 text-sm text-[#173522] focus:outline-none focus:ring-2 focus:ring-[#3F7D4B] focus:border-transparent transition-all shadow-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#173522] mb-1 font-sans">
                      {t("ohc_form_email", "Email")}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder=""
                      className="w-full rounded-2xl border border-[#173522]/20 px-4 py-2.5 sm:py-3 text-sm text-[#173522] focus:outline-none focus:ring-2 focus:ring-[#3F7D4B] focus:border-transparent transition-all shadow-sm"
                    />
                  </div>

                  {/* Proposed location */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#173522] mb-1 font-sans">
                      {t("ohc_form_location", "Proposed location")}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.proposedLocation}
                      onChange={(e) => setFormData({ ...formData, proposedLocation: e.target.value })}
                      placeholder=""
                      className="w-full rounded-2xl border border-[#173522]/20 px-4 py-2.5 sm:py-3 text-sm text-[#173522] focus:outline-none focus:ring-2 focus:ring-[#3F7D4B] focus:border-transparent transition-all shadow-sm"
                    />
                  </div>

                  {/* Background */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#173522] mb-1 font-sans">
                      {t("ohc_form_background", "Background")}
                    </label>
                    <div className="relative">
                      <select
                        value={formData.background}
                        onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                        className="w-full rounded-2xl border border-[#173522]/20 px-4 py-2.5 sm:py-3 pr-10 text-sm text-[#173522] font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#3F7D4B] focus:border-transparent appearance-none cursor-pointer transition-all shadow-sm"
                      >
                        {BACKGROUND_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#173522]">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 sm:py-3.5 rounded-full bg-[#17402F] hover:bg-[#0F2D1F] text-white font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? t("ohc_form_submitting", "Submitting...") : t("ohc_form_btn_apply", "Apply for franchise")}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
