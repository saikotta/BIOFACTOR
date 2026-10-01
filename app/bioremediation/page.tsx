import React from "react";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader, JetBrains_Mono } from "next/font/google";
import BioremidationHero from "../components/bioremediation/BioremidationHero";
import BioremidationDataStrip from "../components/bioremediation/BioremidationDataStrip";
import BioremidationOxygenConnect from "../components/bioremediation/BioremidationOxygenConnect";
import BioremidationApplications from "../components/bioremediation/BioremidationApplications";
import BioremidationMatrix from "../components/bioremediation/BioremidationMatrix";
import BioremidationClosing from "../components/bioremediation/BioremidationClosing";
import BiofactorFooter from "../components/BiofactorFooter";

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

export const metadata: Metadata = {
  title: "Bio-Remediation — Biofactor Biologicals",
  description:
    "Targeted microbial consortia that degrade complex organic contaminants, eliminate toxic sludge, and restore natural water quality without synthetic chemicals.",
};

export default function BioremediationPage() {
  return (
    <main
      className={`${bricolage.variable} ${newsreader.variable} ${jetbrainsMono.variable} relative min-h-screen w-full bg-[#EAF3EA] text-[#173522] selection:bg-[#B8E986] selection:text-[#173522] overflow-x-hidden`}
    >
      {/* BIO-REMEDIATION PAGE CONTENT */}
      <div className="relative z-10 w-full">
        {/* FRAME 1: HERO SECTION - MATCHED TO RUMINANTS HERO */}
        <BioremidationHero />

        {/* FRAME 2: BIO-REMEDIATION STATS DATA STRIP & PULL-QUOTE */}
        <BioremidationDataStrip />

        {/* FRAME 3: HOW BIOLOGICAL TREATMENT WORKS (3-OXYGEN CONDITIONS FLOW) */}
        <BioremidationOxygenConnect />

        {/* FRAME 4: TARGET APPLICATIONS (INDUSTRIAL, SEWAGE, SEPTIC) */}
        <BioremidationApplications />

        {/* FRAME 5: SYSTEMIC APPLICATION MATRIX (LIGHT #EAF3EA BG + MICROBEFIELD) */}
        <BioremidationMatrix />

        {/* FRAME 6: CLOSING & REFERENCES */}
        <BioremidationClosing />
      </div>
      <BiofactorFooter />
    </main>
  );
}
