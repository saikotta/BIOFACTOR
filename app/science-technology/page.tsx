import React from "react";
import type { Metadata } from "next";
import ScienceHero from "../components/science-technology/ScienceHero";
import TechSection from "../components/science-technology/TechSection";
import Evidence from "../components/science-technology/Evidence";
import DepthMeter from "../components/science-technology/DepthMeter";
import {
  Visual01,
  Visual03,
  Visual04,
  Visual05,
  Visual06,
} from "../components/science-technology/Visuals";
import { SECTIONS } from "../components/science-technology/content";
import BiofactorFooter from "../components/BiofactorFooter";

export const metadata: Metadata = {
  title: "Science & Biotechnology | Microbial Fermentation & Enzyme Technology",
  description:
    "Discover Biofactor's six core biological technologies, including spore-forming bacillus strains, targeted enzyme blends, and advanced microbial fermentation.",
  keywords: [
    "Spore-Forming Bacillus Strains",
    "Industrial Microbial Fermentation",
    "Targeted Enzyme Blends",
    "Agricultural Biotechnology Research",
    "Microflora Balancing Technologies"
  ],
  openGraph: {
    title: "Science & Biotechnology | Biofactor Biologicals",
    description: "Discover Biofactor's six core biological technologies, including spore-forming bacillus strains, targeted enzyme blends, and advanced microbial fermentation.",
    url: "https://biofactor.in/science-technology",
  },
};

export default function ScienceTechnologyPage() {
  const visuals = [
    <Visual01 key="v01" />,
    <Visual03 key="v03" />,
    <Visual04 key="v04" />,
    <Visual05 key="v05" />,
    <Visual06 key="v06" />,
  ];

  return (
    <main style={{ background: "#EDF4ED" }} className="w-full min-h-screen block">
      <DepthMeter />
      <ScienceHero />
      <div id="tech-sections" className="relative z-10">
        {SECTIONS.map((sec, i) => (
          <TechSection
            key={sec.id}
            index={i}
            id={sec.id}
            label={sec.label}
            title={sec.title}
            body={sec.body}
            icon={sec.icon}
            chain={sec.chain}
          >
            {visuals[i]}
          </TechSection>
        ))}
      </div>
      <Evidence />
      <BiofactorFooter />
    </main>
  );
}
