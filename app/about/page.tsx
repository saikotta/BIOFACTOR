import React from "react";
import AboutHeroSection from "../components/about/AboutHeroSection";
import AboutBiologicalIntelligenceSection from "../components/about/AboutBiologicalIntelligenceSection";
import AboutSoilCompanySection from "../components/about/AboutSoilCompanySection";
import AboutVisionMissionSection from "../components/about/AboutVisionMissionSection";
import AboutLeadershipSection from "../components/about/AboutLeadershipSection";
import AboutJourneySection from "../components/about/AboutJourneySection";

export default function AboutPage() {
  return (
    <main className="w-full bg-[#EDF4ED] text-[#173522] font-sans select-none overflow-x-hidden">
      {/* SECTION 1: ABOUT HERO */}
      <AboutHeroSection />

      {/* SECTION 2: BIOLOGICAL INTELLIGENCE */}
      <AboutBiologicalIntelligenceSection />

      {/* SECTION 3: THE SOIL COMPANY */}
      <AboutSoilCompanySection />

      {/* SECTION 4: VISION & MISSION */}
      <AboutVisionMissionSection />

      {/* FRAME 5: LEADERSHIP */}
      <AboutLeadershipSection />

      {/* FRAME 6: OUR JOURNEY (FINAL SECTION) */}
      <AboutJourneySection />
    </main>
  );
}




