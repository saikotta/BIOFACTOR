import React from "react";
import type { Metadata } from "next";
import OneHealthCentresHero from "../components/one-health/OneHealthCentresHero";
import OneHealthAbout from "../components/one-health/OneHealthAbout";
import OneHealthHero from "../components/one-health/OneHealthHero";
import OneHealthChapters from "../components/one-health/OneHealthChapters";
import OneHealthServices from "../components/one-health/OneHealthServices";
import OneHealthFindCentre from "../components/one-health/OneHealthFindCentre";
import OneHealthFranchise from "../components/one-health/OneHealthFranchise";
import OneHealthClosing from "../components/one-health/OneHealthClosing";
import BiofactorFooter from "../components/BiofactorFooter";

export const metadata: Metadata = {
  title: "One Health Framework | Interconnected Soil, Animal & Human Biotechnology",
  description: "Explore Biofactor's One Health framework uniting soil microbiology, livestock health, and environmental sustainability.",
  keywords: [
    "One Health Biotechnology",
    "Ecosystem Health Balance",
    "Sustainable Farm Ecosystems",
    "Human-Animal-Soil Interconnection"
  ],
  openGraph: {
    title: "One Health Framework | Biofactor Biologicals",
    description: "Explore Biofactor's One Health framework uniting soil microbiology, livestock health, and environmental sustainability.",
    url: "https://biofactor.in/one-health",
  },
};

export default function OneHealthPage() {
  return (
    <main className="w-full bg-[#EDF4ED] min-h-screen">
      {/* NEW: Photo-hero — Plant to Planet 1 Health, stats, CTAs */}
      <OneHealthCentresHero />
      {/* NEW: About One Health Centres — 3 animated cards */}
      <OneHealthAbout />
      {/* Orbit Hero — 2-Column Split: Interactive 3D Orbit on Left, 3 Value Cards on Right */}
      <OneHealthHero />
      <OneHealthChapters />
      {/* What every centre offers — 3x3 Grid of 9 Services with staggered entrance & hover pop-up */}
      <OneHealthServices />
      {/* Find a One Health Centre — Search, state dropdown filter, interactive centre cards */}
      <OneHealthFindCentre />
      {/* Open a One Health Centre — Franchise enquiry form & benefits */}
      <OneHealthFranchise />
      <OneHealthClosing />
      <BiofactorFooter />
    </main>
  );
}
