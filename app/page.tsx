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
      <section className="relative w-full min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-72px)] bg-[linear-gradient(135deg,#06100b_0%,#0a1912_54%,#030806_100%)] flex items-center justify-center overflow-hidden">
        <BiofactorHero />
      </section>
      <PrimordialSection />
      <ChemistryFieldSection />
      <BiofactorNumbersSection />
      <HowWeThinkSection />
      <BiofactorFooter />
    </main>
  );
}
