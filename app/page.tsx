import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PopularTests } from "@/components/PopularTests";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeatureSection } from "@/components/FeatureSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <PopularTests />
        <CategoryGrid />
        <FeatureSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
