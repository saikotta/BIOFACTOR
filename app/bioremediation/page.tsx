import React from "react";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader, JetBrains_Mono } from "next/font/google";
import BioremediationHero from "../components/bioremediation/BioremediationHero";
import OxygenConditionsDiagram from "../components/bioremediation/OxygenConditionsDiagram";
import DifferentWastesSection from "../components/bioremediation/DifferentWastesSection";
import TreatmentChainTable from "../components/bioremediation/TreatmentChainTable";
import BioremediationClosing from "../components/bioremediation/BioremediationClosing";
import PulseLineDivider from "../components/bioremediation/PulseLineDivider";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-newsreader",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Biology That Cleans Water (Bioremediation) — Biofactor Biologicals",
  description:
    "Every sewage plant, septic tank and effluent pond already depends on microbes. Targeted biological solutions for industrial, municipal sewage, and septic wastewater.",
};

export default function BioremediationPage() {
  return (
    <main
      className={`${bricolage.variable} ${newsreader.variable} ${jetbrainsMono.variable} relative min-h-screen w-full bg-[#EAF6EC] text-[#111111] selection:bg-[#0284C7] selection:text-white overflow-x-hidden`}
    >
      <div className="relative z-10 w-full animate-fadeIn">
        {/* FRAME 1: HERO */}
        <BioremediationHero />

        {/* PULSE LINE DIVIDER */}
        <PulseLineDivider centerText="THREE OXYGEN CONDITIONS" />

        {/* FRAME 2: THREE OXYGEN CONDITIONS DIAGRAM */}
        <OxygenConditionsDiagram />

        {/* PULSE LINE DIVIDER */}
        <PulseLineDivider centerText="THREE WASTE STREAMS" />

        {/* FRAME 3: DIFFERENT WASTES NEED DIFFERENT MICROBES */}
        <DifferentWastesSection />

        {/* PULSE LINE DIVIDER */}
        <PulseLineDivider centerText="TREATMENT CHAIN" />

        {/* FRAME 4: WHERE BIOLOGY DOES THE WORK (5-STAGE TABLE) */}
        <TreatmentChainTable />

        {/* PULSE LINE DIVIDER */}
        <PulseLineDivider centerText="BIOLOGICAL PRINCIPLE" />

        {/* FRAME 5: CLOSING QUOTE, WORDMARK, REFERENCES & DISCLAIMER */}
        <BioremediationClosing />
      </div>
    </main>
  );
}
