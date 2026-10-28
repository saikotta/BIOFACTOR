"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "@/app/i18n/useTranslation";

interface Centre {
  id: string;
  name: string;
  location: string;
  state: string;
  services: string;
  status: "OPEN" | "COMING SOON";
}

// Exactly the 5 requested locations: Guntur, East Godavari, Ananthapur, Kadapa, Hyderabad
const CENTRES: Centre[] = [
  {
    id: "guntur",
    name: "OHC Guntur",
    location: "Guntur, Andhra Pradesh",
    state: "Andhra Pradesh",
    services: "Soil testing · Crop advisory · Biological solutions",
    status: "OPEN",
  },
  {
    id: "east-godavari",
    name: "OHC East Godavari",
    location: "East Godavari, Andhra Pradesh",
    state: "Andhra Pradesh",
    services: "Inputs · Diagnosis · Sustainable agriculture",
    status: "OPEN",
  },
  {
    id: "ananthapur",
    name: "OHC Ananthapur",
    location: "Ananthapur, Andhra Pradesh",
    state: "Andhra Pradesh",
    services: "Soil & water testing · Climate-resilient advisory",
    status: "OPEN",
  },
  {
    id: "kadapa",
    name: "OHC Kadapa",
    location: "Kadapa, Andhra Pradesh",
    state: "Andhra Pradesh",
    services: "Machinery · IoT smart farming · Insurance",
    status: "OPEN",
  },
  {
    id: "hyderabad",
    name: "OHC Hyderabad",
    location: "Hyderabad, Telangana",
    state: "Telangana",
    services: "Regional agronomy hub · Training · Research link",
    status: "OPEN",
  },
];

export default function OneHealthFindCentre() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const states = useMemo(() => {
    const unique = Array.from(new Set(CENTRES.map((c) => c.state)));
    return ["All", ...unique];
  }, []);

  const filteredCentres = useMemo(() => {
    return CENTRES.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.services.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = selectedState === "All" || c.state === selectedState;
      return matchesSearch && matchesState;
    });
  }, [searchQuery, selectedState]);

  return (
    <section
      ref={sectionRef}
      id="find-centre"
      className="relative w-full bg-[#0C2619] text-white py-16 lg:py-24 px-6 sm:px-10 lg:px-14 overflow-hidden"
    >
      {/* Background Decorative Gradient Aura */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(203,234,123,0.3) 0%, rgba(12,38,25,0) 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1180px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="text-[clamp(30px,4.2vw,48px)] font-serif font-bold text-white leading-tight tracking-tight">
            {t("ohc_find_heading", "Find a One Health Centre")}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#A3C2B0] italic font-sans">
            {t("ohc_find_subtitle", "Search by district, village or state.")}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-[760px] mx-auto mb-10">
          {/* Search Input */}
          <div className="relative w-full sm:flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("ohc_find_search_placeholder", "Search district or centre...")}
              className="w-full bg-white text-[#173522] placeholder-[#173522]/50 text-xs sm:text-sm rounded-xl px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#CBEA7B] shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#173522]/60 hover:text-[#173522] font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* State Filter Dropdown */}
          <div className="relative w-full sm:w-[200px]">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-white text-[#173522] text-xs sm:text-sm font-medium rounded-xl px-3.5 py-2.5 sm:py-3 pr-9 focus:outline-none focus:ring-2 focus:ring-[#CBEA7B] shadow-sm appearance-none cursor-pointer transition-all"
            >
              {states.map((st) => (
                <option key={st} value={st}>
                  {st === "All" ? t("ohc_find_all_states", "All States") : st}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#173522]">
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

        {/* Compact Small Cards Grid (3-column layout on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredCentres.map((centre, idx) => {
            const delayMs = idx * 60;

            return (
              <div
                key={centre.id}
                suppressHydrationWarning
                className="group relative rounded-2xl bg-[#133827] border border-[#1E4D37] p-4 sm:p-5 hover:border-[#CBEA7B] hover:shadow-[0_16px_36px_rgba(0,0,0,0.35),0_0_24px_rgba(203,234,123,0.18)] hover:-translate-y-2 hover:scale-[1.025] transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden cursor-pointer"
                style={{
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed
                    ? "scale(1) translateY(0)"
                    : "scale(0.9) translateY(20px)",
                  transitionProperty: "opacity, transform, border-color, box-shadow",
                  transitionDuration: "500ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: isRevealed ? `${delayMs}ms` : "0ms",
                }}
              >
                {/* Subtle ambient light sheen on card hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#CBEA7B]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Top Row: Title + Status Badge */}
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight group-hover:text-[#E8F8C8] transition-colors duration-200">
                      {centre.name}
                    </h3>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#CBEA7B] text-[#0C2619] font-mono text-[10px] font-bold tracking-wider transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(203,234,123,0.4)]">
                      {centre.status === "OPEN"
                        ? t("ohc_find_status_open", "OPEN")
                        : t("ohc_find_status_coming", "COMING SOON")}
                    </span>
                  </div>

                  {/* Location */}
                  <p className="text-xs sm:text-[13px] text-[#A3C2B0] font-sans mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CBEA7B]/60" />
                    {centre.location}
                  </p>

                  {/* Services */}
                  <p className="text-xs text-[#D4E8DC]/85 font-sans leading-relaxed">
                    {centre.services}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCentres.length === 0 && (
          <div className="text-center py-14 text-[#A3C2B0]">
            <p className="text-base font-serif">No centres found matching your search.</p>
            <p className="text-xs mt-1">Try clearing your filters or search terms.</p>
          </div>
        )}
      </div>
    </section>
  );
}
