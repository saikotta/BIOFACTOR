import React from "react";
import { Inter_Tight } from "next/font/google";
import ProductFooter from "../components/ProductFooter";
import NutrientsHero from "../components/nutrients/NutrientsHero";
import NutrientsComparativeCard from "../components/nutrients/NutrientsComparativeCard";
import NutrientsPrimaryApplications from "../components/nutrients/NutrientsPrimaryApplications";
import NutrientsSecondaryMicronutrients from "../components/nutrients/NutrientsSecondaryMicronutrients";
import NutrientsMatrix from "../components/nutrients/NutrientsMatrix";
import NutrientsClosing from "../components/nutrients/NutrientsClosing";
import NutrientsAnimations from "../components/nutrients/NutrientsAnimations";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata = {
  title: "Nutrients | Biofactor Biologicals",
  description:
    "Explore how soil biology solubilises, fixes, and mobilises primary, secondary, and micronutrients for optimal plant nutrition.",
};

export default function NutrientsPage() {
  return (
    <main className={`${interTight.variable} min-h-screen w-full bg-[#EAF3EA] text-[#173522] flex flex-col font-sans selection:bg-[#2D6A4F] selection:text-[#EAF3EA]`}>
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
      <ProductFooter />
      <NutrientsAnimations />
    </main>
  );
}
