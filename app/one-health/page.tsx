import React from "react";
import type { Metadata } from "next";
import OneHealthHero from "../components/one-health/OneHealthHero";
import OneHealthChapters from "../components/one-health/OneHealthChapters";
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
      <OneHealthHero />
      <OneHealthChapters />
      <OneHealthClosing />
      <BiofactorFooter />
    </main>
  );
}


