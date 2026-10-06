import React from "react";
import OneHealthHero from "../components/one-health/OneHealthHero";
import OneHealthChapters from "../components/one-health/OneHealthChapters";
import OneHealthClosing from "../components/one-health/OneHealthClosing";
import BiofactorFooter from "../components/BiofactorFooter";

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


