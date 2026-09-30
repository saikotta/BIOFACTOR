import React from "react";
import { Bricolage_Grotesque, Newsreader, JetBrains_Mono } from "next/font/google";
import RuminantsHero from "../components/ruminants/RuminantsHero";
import RuminantsDataStrip from "../components/ruminants/RuminantsDataStrip";
import RuminantsRumenFactory from "../components/ruminants/RuminantsRumenFactory";
import RuminantsLifeStages from "../components/ruminants/RuminantsLifeStages";
import RuminantsMethane from "../components/ruminants/RuminantsMethane";
import RuminantsMatrix from "../components/ruminants/RuminantsMatrix";
import RuminantsClosing from "../components/ruminants/RuminantsClosing";
import RuminantsAnimations from "../components/ruminants/RuminantsAnimations";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-bricolage",
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

export default function RuminantsPage() {
  return (
    <main
      className={`${bricolage.variable} ${newsreader.variable} ${jetbrainsMono.variable} relative min-h-screen w-full bg-[#EAF3EA] text-[#173522] selection:bg-[#B8E986] selection:text-[#173522] overflow-x-hidden`}
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
      </div>
      <RuminantsAnimations />
    </main>
  );
}
