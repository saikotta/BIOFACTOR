import React from "react";
import { Bricolage_Grotesque, Newsreader, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import PoultryHero from "../components/poultry/PoultryHero";
import PoultryDataStrip from "../components/poultry/PoultryDataStrip";
import PoultryGutFrontline from "../components/poultry/PoultryGutFrontline";
import PoultryThreeBirds from "../components/poultry/PoultryThreeBirds";
import PoultryLayers from "../components/poultry/PoultryLayers";
import PoultryBroilers from "../components/poultry/PoultryBroilers";
import PoultryGutRestoration from "../components/poultry/PoultryGutRestoration";
import PoultryMineralBioavailability from "../components/poultry/PoultryMineralBioavailability";
import PoultryProductionCycle from "../components/poultry/PoultryProductionCycle";
import PoultryClosing from "../components/poultry/PoultryClosing";
import ProductFooter from "../components/ProductFooter";
import PoultryScrollMotion from "../components/poultry/PoultryScrollMotion";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-bricolage",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-space-grotesk",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-newsreader",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-jetbrains",
  display: "swap",
});

export default function PoultryPage() {
  return (
    <main
      data-poultry-page
      className={`${bricolage.variable} ${spaceGrotesk.variable} ${newsreader.variable} ${jetbrainsMono.variable} relative w-full selection:bg-[#b8e986] selection:text-black overflow-x-hidden bg-[#EAF3EA]`}
    >
      <div className="relative z-10 w-full">
        {/* FRAME 1: APPROVED HERO */}
        <PoultryHero />

        {/* FRAME 2: DATA STRIP */}
        <PoultryDataStrip />

        {/* FRAME 3: GUT FRONTLINE */}
        <PoultryGutFrontline />

        {/* FRAME 4: THREE BIRDS, THREE PRIORITIES */}
        <PoultryThreeBirds />

        {/* FRAME 4.5: LAYERS */}
        <PoultryLayers />

        {/* FRAME 4.6: BROILERS */}
        <PoultryBroilers />

        {/* FRAME 5: GUT RESTORATION AND DISEASE MANAGEMENT */}
        <PoultryGutRestoration />

        {/* FRAME 6: MINERAL BIOAVAILABILITY */}
        <PoultryMineralBioavailability />

        {/* FRAME 7: PRODUCTION CYCLE */}
        <PoultryProductionCycle />

        {/* FRAME 8: CLOSING & REFERENCES */}
        <PoultryClosing />

        {/* FOOTER */}
        <ProductFooter />
      </div>

      {/* SCROLL MOTION SYSTEM — standardized with locked Ruminants motion engine */}
      <PoultryScrollMotion />
    </main>
  );
}
