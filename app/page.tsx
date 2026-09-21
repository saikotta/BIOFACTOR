import BiofactorScrollHero from "./components/BiofactorScrollHero";
import BiofactorHero from "./components/BiofactorHero";
import PrimordialSection from "./components/PrimordialSection";
import ChemistryFieldSection from "./components/ChemistryFieldSection";
import BiofactorNumbersSection from "./components/BiofactorNumbersSection";
import HowWeThinkSection from "./components/HowWeThinkSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-green-500 selection:text-black">
      <BiofactorScrollHero>
        <BiofactorHero />
      </BiofactorScrollHero>

      {/* Section 2: Primordial Elements */}
      <PrimordialSection />

      {/* Section 3: Real-World Agriculture / Chemistry Completed */}
      <ChemistryFieldSection />

      {/* Section 4: The Number Behind the Name */}
      <BiofactorNumbersSection />

      {/* Section 5: How We Think */}
      <HowWeThinkSection />
    </main>
  );
}

