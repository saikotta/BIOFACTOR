import BiofactorScrollHero from "./components/BiofactorScrollHero";
import BiofactorHero from "./components/BiofactorHero";
import PrimordialSection from "./components/PrimordialSection";
import ChemistryFieldSection from "./components/ChemistryFieldSection";
import BiofactorNumbersSection from "./components/BiofactorNumbersSection";
import HowWeThinkSection from "./components/HowWeThinkSection";
import MicrobeField from "./components/MicrobeField";
import BiofactorFooter from "./components/BiofactorFooter";

export default function Home() {
  return (
    <main className="relative isolate min-h-screen bg-[#EAF3EA] text-white selection:bg-green-500 selection:text-black">
      <MicrobeField />
      <BiofactorScrollHero>
        <BiofactorHero />
      </BiofactorScrollHero>
      <PrimordialSection />
      <ChemistryFieldSection />
      <BiofactorNumbersSection />
      <HowWeThinkSection />
      <BiofactorFooter />
    </main>
  );
}

