import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { WhyProtect } from "@/components/landing/WhyProtect";
import { KeyRule } from "@/components/landing/KeyRule";
import { ScamPreview } from "@/components/landing/ScamPreview";
import { JourneyPath } from "@/components/landing/JourneyPath";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-6 sm:px-8">
        <Hero />
        <WhyProtect />
        <KeyRule />
        <ScamPreview />
        <JourneyPath />
      </main>
      <Footer />
    </>
  );
}
