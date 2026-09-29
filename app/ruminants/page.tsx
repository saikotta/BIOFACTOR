import React from "react";
import { Bricolage_Grotesque, Newsreader, JetBrains_Mono } from "next/font/google";
import RuminantsHero from "../components/ruminants/RuminantsHero";
import RuminantsDataStrip from "../components/ruminants/RuminantsDataStrip";
import RuminantsRumenFactory from "../components/ruminants/RuminantsRumenFactory";
import RuminantsLifeStages from "../components/ruminants/RuminantsLifeStages";
import RuminantsMethane from "../components/ruminants/RuminantsMethane";
import RuminantsMatrix from "../components/ruminants/RuminantsMatrix";
import RuminantsClosing from "../components/ruminants/RuminantsClosing";

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
      className={`${bricolage.variable} ${newsreader.variable} ${jetbrainsMono.variable} w-full bg-[#080d09] text-white selection:bg-[#b8e986] selection:text-black overflow-x-hidden`}
    >
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
    </main>
  );
}
