import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { WhyProtect } from "@/components/landing/WhyProtect";
import { KeyRule } from "@/components/landing/KeyRule";
import { ScamPreview } from "@/components/landing/ScamPreview";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <WhyProtect />
        <KeyRule />
        <ScamPreview />
        <Footer />
      </main>
    </>
  );
}
