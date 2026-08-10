import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PopularTests } from "@/components/PopularTests";
import { FeatureSection } from "@/components/FeatureSection";
import { AdFitBanner } from "@/components/AdFitBanner";
import { CoupangPartnersBanner } from "@/components/CoupangPartnersBanner";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <AdFitBanner placement="home" />
        <PopularTests />
        <FeatureSection />
        <CoupangPartnersBanner id={1015883} trackingCode="AF5753023" width={680} height={140} />
      </main>
      <Footer />
    </div>
  );
}
