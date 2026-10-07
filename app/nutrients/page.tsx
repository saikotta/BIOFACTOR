import React from "react";
import type { Metadata } from "next";
import BiofactorHeader from "../components/BiofactorHeader";
import NutrientsHero from "../components/nutrients/NutrientsHero";
import NutrientsComparativeCard from "../components/nutrients/NutrientsComparativeCard";
import NutrientsPrimaryApplications from "../components/nutrients/NutrientsPrimaryApplications";
import NutrientsSecondaryMicronutrients from "../components/nutrients/NutrientsSecondaryMicronutrients";
import NutrientsMatrix from "../components/nutrients/NutrientsMatrix";
import NutrientsClosing from "../components/nutrients/NutrientsClosing";
import NutrientsAnimations from "../components/nutrients/NutrientsAnimations";
import ProductFooter from "../components/ProductFooter";

export const metadata: Metadata = {
  title: "Biological Plant Nutrients & Biofertilizers | Soil Microbial Inoculants",
  description:
    "Explore how soil biology solubilises, fixes, and mobilises primary, secondary, and micronutrients for optimal plant nutrition and sustainable crop yield.",
  keywords: [
    "Biological Soil Inoculants",
    "Plant Bio-stimulants",
    "Biofertilizers and Micro-nutrients",
    "Microbial Plant Protection",
    "Organic Crop Yield Enhancers",
    "Sustainable Soil Health Solutions"
  ],
  openGraph: {
    title: "Biological Plant Nutrients & Biofertilizers | Biofactor Biologicals",
    description: "Explore how soil biology solubilises, fixes, and mobilises primary, secondary, and micronutrients for optimal plant nutrition.",
    url: "https://biofactor.in/nutrients",
  },
};

export default function NutrientsPage() {
  return (
    <main className="min-h-screen w-full bg-[#EAF3EA] text-[#173522] flex flex-col font-sans selection:bg-[#2D6A4F] selection:text-[#EAF3EA]">
      {/* Fixed Navigation Bar */}
      <BiofactorHeader />

      {/* Hero Section */}
      <NutrientsHero />

      {/* Comparative Equation Card (Zero Gap After Hero) */}
      <NutrientsComparativeCard />

      {/* Primary Nutrients (N, P, K) Alternating Chapters */}
      <NutrientsPrimaryApplications />

      {/* Secondary & Micronutrients Section + FAO Graph + 6 Interactive Cards */}
      <NutrientsSecondaryMicronutrients />

      {/* 5-Stage Crop Cycle Matrix & Global Validation */}
      <NutrientsMatrix />

      {/* Closing Editorial Statement & 21 Scientific References */}
      <NutrientsClosing />

      {/* Global Footer */}
      <ProductFooter />
      <NutrientsAnimations />
    </main>
  );
}
