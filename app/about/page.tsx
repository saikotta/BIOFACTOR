import React from "react";
import AboutHeroSection from "../components/about/AboutHeroSection";
import AboutBiologicalIntelligenceSection from "../components/about/AboutBiologicalIntelligenceSection";
import AboutSoilCompanySection from "../components/about/AboutSoilCompanySection";
import AboutVisionMissionSection from "../components/about/AboutVisionMissionSection";
import AboutLeadershipSection from "../components/about/AboutLeadershipSection";
import AboutJourneySection from "../components/about/AboutJourneySection";
import BiofactorFooter from "../components/BiofactorFooter";

export default function AboutPage() {
  return (
    <main className="w-full bg-[#EDF4ED] text-[#173522] font-sans select-none overflow-x-hidden">
      <AboutHeroSection />
      <AboutBiologicalIntelligenceSection />
      <AboutSoilCompanySection />
      <AboutVisionMissionSection />
      <AboutLeadershipSection />
      <AboutJourneySection />
      <BiofactorFooter />
    </main>
  );
}




