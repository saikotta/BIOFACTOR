import React from "react";
import type { Metadata } from "next";
import AboutHeroSection from "../components/about/AboutHeroSection";
import AboutBiologicalIntelligenceSection from "../components/about/AboutBiologicalIntelligenceSection";
import AboutSoilCompanySection from "../components/about/AboutSoilCompanySection";
import AboutVisionMissionSection from "../components/about/AboutVisionMissionSection";
import AboutLeadershipSection from "../components/about/AboutLeadershipSection";
import AboutJourneySection from "../components/about/AboutJourneySection";
import BiofactorFooter from "../components/BiofactorFooter";

export const metadata: Metadata = {
  title: "About Us | Pioneering Sustainable Biological Intelligence",
  description: "Learn about Biofactor Biologicals, our mission, leadership, and journey in advancing sustainable biological inputs for agriculture, livestock, and environment.",
  keywords: [
    "Biofactor Biologicals Company",
    "Sustainable Biotechnology Vision",
    "Green Farm Inputs Manufacturer",
    "Agricultural Biotechnology Leadership"
  ],
  openGraph: {
    title: "About Biofactor Biologicals | Biological Intelligence",
    description: "Learn about Biofactor Biologicals, our mission, leadership, and journey in advancing sustainable biological inputs for agriculture, livestock, and environment.",
    url: "https://biofactor.in/about",
  },
};

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
  

