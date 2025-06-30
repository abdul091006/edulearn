import { getUser } from "./_actions/getUser";
import { Footer } from "./_components/layout/footer";
import { Header } from "./_components/layout/header";
import { CTASection } from "./_components/sections/CTASection";
import { FAQSection } from "./_components/sections/FAQSection";
import { FeaturesSection } from "./_components/sections/FeaturesSection";
import { HeroSection } from "./_components/sections/HeroSection";
import { PricingSection } from "./_components/sections/PricingSection";
import { ScreenshotSection } from "./_components/sections/ScreenshotSection";
import { TestimonialsSection } from "./_components/sections/TestimonialsSection";
import { TrustedBySection } from "./_components/sections/TrustedBySection";

export default async function LandingPage() {
  const user = await getUser()

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} />
      <main className="flex-1">
        <HeroSection />
        <TrustedBySection />
        <FeaturesSection />
        <ScreenshotSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
