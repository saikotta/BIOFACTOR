import BiofactorScrollHero from "./components/BiofactorScrollHero";
import BiofactorHero from "./components/BiofactorHero";
import PrimordialSection from "./components/PrimordialSection";
import ChemistryFieldSection from "./components/ChemistryFieldSection";
import BiofactorNumbersSection from "./components/BiofactorNumbersSection";
import HowWeThinkSection from "./components/HowWeThinkSection";
import MicrobeField from "./components/MicrobeField";

export default function Home() {
  return (
    <main className="relative isolate min-h-screen bg-[#EAF3EA] text-white selection:bg-green-500 selection:text-black">
      <MicrobeField />
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

