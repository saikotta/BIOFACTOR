import React from "react";
import { Bricolage_Grotesque, Inter_Tight, Newsreader, JetBrains_Mono } from "next/font/google";
import RuminantsHero from "../components/ruminants/RuminantsHero";
import RuminantsDataStrip from "../components/ruminants/RuminantsDataStrip";
import RuminantsRumenFactory from "../components/ruminants/RuminantsRumenFactory";
import RuminantsLifeStages from "../components/ruminants/RuminantsLifeStages";
import RuminantsMethane from "../components/ruminants/RuminantsMethane";
import RuminantsMatrix from "../components/ruminants/RuminantsMatrix";
import RuminantsClosing from "../components/ruminants/RuminantsClosing";
import RuminantsAnimations from "../components/ruminants/RuminantsAnimations";
import RuminantsFooter from "../components/ruminants/RuminantsFooter";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-bricolage",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-inter-tight",
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

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ruminants & Livestock Nutrition | Rumen Fermentation Boosters",
  description: "Optimize rumen fermentation and cattle gut health with Biofactor's biological feed additives and bio-available mineral supplements.",
  keywords: [
    "Rumen Fermentation Boosters",
    "Cattle Feed Additives",
    "Dairy Cattle Gut Health",
    "Bio-Available Minerals for Livestock",
    "Livestock Nutritional Supplements",
    "Ruminant Bio-efficiency"
  ],
  openGraph: {
    title: "Ruminants & Livestock Nutrition | Rumen Fermentation Boosters",
    description: "Optimize rumen fermentation and cattle gut health with Biofactor's biological feed additives and bio-available mineral supplements.",
    url: "https://biofactor.in/ruminants",
  },
};

export default function RuminantsPage() {
  return (
    <main
      className={`${interTight.variable} ${bricolage.variable} ${newsreader.variable} ${jetbrainsMono.variable} relative w-full bg-[#EAF3EA] text-[#173522] selection:bg-[#B8E986] selection:text-[#173522] overflow-x-hidden`}
    >
      {/* RUMINANTS PAGE CONTENT */}
      <div className="relative z-10 w-full">
        {/* FRAME 1: APPROVED HERO (LOCKED & UNTOUCHED) */}
        <RuminantsHero />

        {/* FRAME 2: DATA STRIP */}
        <RuminantsDataStrip />

        {/* FRAME 3: RUMEN / MICROBIAL FACTORY */}
        <RuminantsRumenFactory />

        {/* FRAME 4: LIFE STAGES */}
        <RuminantsLifeStages />

        {/* FRAME 5: METHANE */}
        <RuminantsMethane />

        {/* FRAME 6: LIFE-CYCLE SYSTEM MATRIX */}
        <RuminantsMatrix />

        {/* FRAME 7: CLOSING & REFERENCES */}
        <RuminantsClosing />

        {/* FOOTER */}
        <RuminantsFooter />
      </div>
      <RuminantsAnimations />
    </main>
  );
}
