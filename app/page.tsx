import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { StarsBackground } from '@/components/stars-background'
import { HeroSection } from '@/components/landing/hero-section'
import { AboutSection } from '@/components/landing/about-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { TechnologiesSection } from '@/components/landing/technologies-section'
import { CTASection } from '@/components/landing/cta-section'

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background">
      <StarsBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <TechnologiesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
