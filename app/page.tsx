import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PopularTests } from "@/components/PopularTests";
import { FeatureSection } from "@/components/FeatureSection";
import { AdFitBanner } from "@/components/AdFitBanner";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <PopularTests />
        <FeatureSection />
        <AdFitBanner placement="home" />
      </main>
      <Footer />
    </div>
  );
}
