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
      className={`${bricolage.variable} ${spaceGrotesk.variable} ${newsreader.variable} ${jetbrainsMono.variable} w-full selection:bg-[#b8e986] selection:text-black overflow-x-hidden bg-[#EAF3EA]`}
    >
      {/* FRAME 1: APPROVED HERO - Dark background */}
      <PoultryHero />

      {/* FRAME 2: DATA STRIP - Dark brown background */}
      <PoultryDataStrip />

      {/* FRAME 3: GUT FRONTLINE - New dark background */}
      <PoultryGutFrontline />

      {/* FRAME 4: THREE BIRDS, THREE PRIORITIES - New dark background */}
      <PoultryThreeBirds />

      {/* FRAME 4.5: LAYERS - New dark background */}
      <PoultryLayers />

      {/* FRAME 4.6: BROILERS - New dark background */}
      <PoultryBroilers />

      {/* FRAME 5: GUT RESTORATION AND DISEASE MANAGEMENT - New dark background */}
      <PoultryGutRestoration />

      {/* FRAME 6: MINERAL BIOAVAILABILITY - New dark background */}
      <PoultryMineralBioavailability />

      {/* FRAME 7: PRODUCTION CYCLE - New dark background */}
      <PoultryProductionCycle />

      {/* FRAME 8: CLOSING & REFERENCES - New dark background */}
      <PoultryClosing />
    </main>
  );
}
