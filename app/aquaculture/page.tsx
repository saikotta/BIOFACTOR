import React from "react";
import { Inter_Tight, Newsreader, JetBrains_Mono } from "next/font/google";
import AquacultureHero from "../components/aquaculture/AquacultureHero";
import OrganicLoadSection from "../components/aquaculture/OrganicLoadSection";
import BottomBlock from "../components/aquaculture/BottomBlock";
import ConsortiaBlock from "../components/aquaculture/ConsortiaBlock";
import WaterBlock from "../components/aquaculture/WaterBlock";
import GutHealthSection from "../components/aquaculture/GutHealthSection";
import MineralsSection from "../components/aquaculture/MineralsSection";
import CultureCycleSection from "../components/aquaculture/CultureCycleSection";
import AquacultureClosing from "../components/aquaculture/AquacultureClosing";
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

export default function AquaculturePage() {
  return (
    <main
      className={`${interTight.variable} ${newsreader.variable} ${jetbrainsMono.variable} w-full selection:bg-[#6BBF3A] selection:text-black overflow-x-hidden bg-[#EAF6EC]`}
    >
      <AquacultureAnimations />
      <AquacultureHero />
      <OrganicLoadSection />
      <BottomBlock />
      <ConsortiaBlock />
      <WaterBlock />
      <GutHealthSection />
      <MineralsSection />
      <CultureCycleSection />
      <AquacultureClosing />
    </main>
  );
}
