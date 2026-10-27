"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

interface Centre {
  id: string;
  name: string;
  location: string;
  state: string;
  services: string;
  status: "OPEN" | "COMING SOON";
  phone: string;
}

const OFFICIAL_PHONE = "+91 7013074400";

const CENTRES: Centre[] = [
  {
    id: "guntur",
    name: "OHC Guntur",
    location: "Guntur, Andhra Pradesh",
    state: "Andhra Pradesh",
    services: "Soil testing · Advisory",
    status: "OPEN",
    phone: OFFICIAL_PHONE,
  },
  {
    id: "warangal",
    name: "OHC Warangal",
    location: "Warangal, Telangana",
    state: "Telangana",
    services: "Inputs · Training",
    status: "OPEN",
    phone: OFFICIAL_PHONE,
  },
  {
    id: "nashik",
    name: "OHC Nashik",
    location: "Nashik, Maharashtra",
    state: "Maharashtra",
    services: "Soil testing · Diagnosis",
    status: "OPEN",
    phone: OFFICIAL_PHONE,
  },
  {
    id: "belagavi",
    name: "OHC Belagavi",
    location: "Belagavi, Karnataka",
    state: "Karnataka",
    services: "Advisory · Market links",
    status: "OPEN",
    phone: OFFICIAL_PHONE,
  },
  {
    id: "coimbatore",
    name: "OHC Coimbatore",
    location: "Coimbatore, Tamil Nadu",
    state: "Tamil Nadu",
    services: "Full service",
    status: "OPEN",
    phone: OFFICIAL_PHONE,
  },
  {
    id: "indore",
    name: "OHC Indore",
    location: "Indore, Madhya Pradesh",
    state: "Madhya Pradesh",
    services: "Inputs · Advisory",
    status: "OPEN",
    phone: OFFICIAL_PHONE,
  },
  {
    id: "kadapa",
    name: "OHC Kadapa",
    location: "Kadapa, Andhra Pradesh",
    state: "Andhra Pradesh",
    services: "Machinery · IoT · Insurance",
    status: "OPEN",
    phone: OFFICIAL_PHONE,
  },
];

interface ModalState {
  centre: Centre;
  mode: "call" | "service";
}

export default function OneHealthFindCentre() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All");

  // In-app Popup Modal State
  const [activeModal, setActiveModal] = useState<ModalState | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [serviceSubmitted, setServiceSubmitted] = useState(false);
  const [farmerName, setFarmerName] = useState("");
  const [farmerMobile, setFarmerMobile] = useState("");

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

  const openModal = (centre: Centre, mode: "call" | "service") => {
    setActiveModal({ centre, mode });
    setCopiedPhone(false);
    setServiceSubmitted(false);
    setFarmerName("");
    setFarmerMobile("");
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="find-centre"
      className="relative w-full bg-[#0C2619] text-white py-20 lg:py-28 px-6 sm:px-10 lg:px-14 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(203,234,123,0.3) 0%, rgba(12,38,25,0) 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1180px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-[clamp(32px,4.5vw,54px)] font-serif font-bold text-white leading-tight tracking-tight">
            Find a <span className="text-[#CBEA7B]">One Health Centre</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#A3C2B0] italic font-sans">
            Search by district, village or state.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 max-w-[820px] mx-auto mb-12">
          {/* Search Input */}
          <div className="relative w-full sm:flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search district or centre..."
              className="w-full bg-white text-[#173522] placeholder-[#173522]/50 text-sm sm:text-base rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#CBEA7B] shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#173522]/60 hover:text-[#173522] font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* State Filter Dropdown */}
          <div className="relative w-full sm:w-[220px]">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-white text-[#173522] text-sm sm:text-base font-medium rounded-xl px-4 py-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-[#CBEA7B] shadow-sm appearance-none cursor-pointer transition-all"
            >
              {states.map((st) => (
                <option key={st} value={st}>
                  {st}
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

        {/* Centres Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {filteredCentres.map((centre, idx) => {
            const delayMs = idx * 60;

            return (
              <div
                key={centre.id}
                className="group relative rounded-2xl bg-[#133827] border border-[#1E4D37] p-6 sm:p-7 hover:border-[#CBEA7B]/60 hover:shadow-[0_16px_36px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 hover:scale-[1.015] transition-all duration-350 ease-out flex flex-col justify-between"
                style={{
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed
                    ? "scale(1) translateY(0)"
                    : "scale(0.9) translateY(24px)",
                  transitionProperty: "opacity, transform, border-color, box-shadow",
                  transitionDuration: "600ms, 600ms, 300ms, 300ms",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: isRevealed ? `${delayMs}ms` : "0ms",
                }}
              >
                <div>
                  {/* Top Row: Title + Status Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg sm:text-[20px] font-serif font-bold text-white tracking-tight">
                      {centre.name}
                    </h3>
                    <span className="inline-block px-3 py-0.5 rounded-full bg-[#CBEA7B] text-[#0C2619] font-mono text-[11px] font-bold tracking-wider">
                      {centre.status}
                    </span>
                  </div>

                  {/* Location */}
                  <p className="text-sm text-[#A3C2B0] font-sans mb-3">
                    {centre.location}
                  </p>

                  {/* Services */}
                  <p className="text-xs sm:text-[13px] text-[#D4E8DC] font-sans mb-6">
                    {centre.services}
                  </p>
                </div>

                {/* Bottom Row: Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => openModal(centre, "call")}
                    className="inline-flex items-center justify-center px-5 py-1.5 rounded-full bg-[#CBEA7B] text-[#0C2619] text-xs font-semibold hover:bg-[#bce067] hover:scale-105 transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    Call
                  </button>
                  <button
                    onClick={() => openModal(centre, "service")}
                    className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/35 text-white text-xs font-semibold hover:border-[#CBEA7B] hover:text-[#CBEA7B] hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    Request service
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCentres.length === 0 && (
          <div className="text-center py-16 text-[#A3C2B0]">
            <p className="text-lg font-serif">No centres found matching your search.</p>
            <p className="text-sm mt-1">Try clearing your filters or search terms.</p>
          </div>
        )}
      </div>

      {/* Elegant In-App Modal for Call & Request Service (Positioned safely down below navbar) */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-28 sm:pt-36 md:pt-40 bg-black/75 backdrop-blur-sm animate-fadeIn overflow-y-auto"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md bg-[#113122] border border-[#27533E] rounded-3xl p-6 sm:p-7 text-white shadow-2xl animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="mb-5 pr-8">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#CBEA7B] text-[#0C2619] font-mono text-[10px] font-bold tracking-wider mb-2">
                {activeModal.centre.status}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {activeModal.centre.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#A3C2B0] mt-0.5">
                {activeModal.centre.location}
              </p>
            </div>

            {activeModal.mode === "call" ? (
              /* CALL MODAL CONTENT — ONLY THE NUMBER AS REQUESTED */
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  Call the agronomy coordinator at {activeModal.centre.name}:
                </p>

                {/* Direct Phone Card with Footer Number */}
                <div className="bg-[#1A4230] border border-[#27533E] rounded-2xl p-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-[#A3C2B0] uppercase font-mono block">Contact Number</span>
                    <span className="text-base sm:text-lg font-bold font-mono text-[#CBEA7B]">{OFFICIAL_PHONE}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(OFFICIAL_PHONE)}
                    className="px-3 py-1.5 rounded-xl bg-[#CBEA7B] text-[#0C2619] text-xs font-semibold hover:bg-[#bce067] transition-colors cursor-pointer shrink-0"
                  >
                    {copiedPhone ? "Copied!" : "Copy"}
                  </button>
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={closeModal}
                    className="w-full py-2.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* REQUEST SERVICE MODAL CONTENT */
              <div>
                {serviceSubmitted ? (
                  <div className="py-6 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#CBEA7B] text-[#0C2619] font-bold text-2xl flex items-center justify-center mx-auto">
                      ✓
                    </div>
                    {/* Compact "Request Received" as requested */}
                    <h4 className="text-lg font-serif font-bold text-white">Request Received</h4>
                    <button
                      onClick={closeModal}
                      className="mt-3 px-6 py-2 rounded-full bg-[#CBEA7B] text-[#0C2619] text-xs font-bold hover:bg-[#bce067] transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setServiceSubmitted(true);
                    }}
                    className="space-y-3.5"
                  >
                    <p className="text-xs text-white/80">
                      Services: <span className="text-[#CBEA7B] font-medium">{activeModal.centre.services}</span>
                    </p>

                    <div>
                      <label className="block text-xs font-semibold text-[#A3C2B0] mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={farmerName}
                        onChange={(e) => setFarmerName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-[#1A4230] border border-[#27533E] rounded-xl px-3.5 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#CBEA7B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#A3C2B0] mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={farmerMobile}
                        onChange={(e) => setFarmerMobile(e.target.value)}
                        placeholder="Enter mobile number"
                        className="w-full bg-[#1A4230] border border-[#27533E] rounded-xl px-3.5 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#CBEA7B]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-full bg-[#CBEA7B] text-[#0C2619] text-xs sm:text-sm font-bold hover:bg-[#bce067] transition-all shadow-md cursor-pointer mt-1"
                    >
                      Submit Service Request
                    </button>

                    <p className="text-[11px] text-[#A3C2B0]/70 text-center">
                      Or contact directly: <span className="text-white font-mono">{OFFICIAL_PHONE}</span>
                    </p>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
