import React from "react";
import { Inter_Tight, Newsreader, JetBrains_Mono } from "next/font/google";
import AquacultureHero from "../components/aquaculture/AquacultureHero";
import AquacultureDataStrip from "../components/aquaculture/AquacultureDataStrip";
import BottomBlock from "../components/aquaculture/BottomBlock";
import ConsortiaBlock from "../components/aquaculture/ConsortiaBlock";
import WaterBlock from "../components/aquaculture/WaterBlock";
import GutHealthSection from "../components/aquaculture/GutHealthSection";
import MineralsSection from "../components/aquaculture/MineralsSection";
import CultureCycleTable from "../components/aquaculture/CultureCycleTable";
import AquacultureFooter from "../components/aquaculture/AquacultureFooter";

import AquacultureAnimations from "../components/aquaculture/AquacultureAnimations";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-inter-tight",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-jetbrains",
  display: "swap",
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aquaculture Solutions | Probiotics & Bioremediation for Shrimp Farming",
  description: "Discover Biofactor's advanced biological solutions for aquaculture, including probiotics, shrimp gut health supplements, pond bioremediation, and vibrio control.",
  keywords: [
    "Probiotics for Aquaculture",
    "Shrimp Gut Health Supplements",
    "Pond Bioremediation Solutions",
    "Aquaculture Water Quality Management",
    "Vibrio Control in Shrimp Farming",
    "Pond Bottom Sludge Treatment",
    "Biofloc Microbial Culture",
    "Fish & Shrimp Yield Enhancers"
  ],
  openGraph: {
    title: "Aquaculture Solutions | Probiotics & Bioremediation for Shrimp Farming",
    description: "Discover Biofactor's advanced biological solutions for aquaculture, including probiotics, shrimp gut health supplements, pond bioremediation, and vibrio control.",
    url: "https://biofactor.in/aquaculture",
  },
};

export default function AquaculturePage() {
  return (
    <main
      className={`${interTight.variable} ${newsreader.variable} ${jetbrainsMono.variable} w-full selection:bg-[#6BBF3A] selection:text-black overflow-x-hidden`}
      style={{ background: "linear-gradient(180deg, #f4f9ee 0%, #eaf4df 25%, #d6ebc6 55%, #c4e0b2 80%, #b6d8a3 100%)" }}
    >
      <AquacultureHero />
      <AquacultureDataStrip />
      <BottomBlock />
      <ConsortiaBlock />
      <WaterBlock />
      <GutHealthSection />
      <MineralsSection />
      <CultureCycleTable />
      <AquacultureFooter />
      <AquacultureAnimations />
    </main>
  );
}
