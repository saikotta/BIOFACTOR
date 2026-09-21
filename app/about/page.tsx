import React from "react";
import AboutHeroSection from "../components/about/AboutHeroSection";

export default function AboutPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-72px)] bg-black text-white font-sans select-none">
      {/* SECTION 1: ABOUT HERO */}
      <AboutHeroSection />
    </main>
  );
}
