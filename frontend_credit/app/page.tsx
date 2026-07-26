import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { BenefitsSection } from "./components/BenefitsSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { IntroSection } from "./components/IntroSection";
import { CallToActionSection } from "./components/CallToActionSection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="relative">
        <HeroSection />
        <BenefitsSection />
        <HowItWorksSection />
        <IntroSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}
