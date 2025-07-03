import { HeroSection } from "@/components/landing/hero-section"
import { ServicesSection } from "@/components/landing/services-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { FeaturedWorkersSection } from "@/components/landing/featured-workers-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { CTASection } from "@/components/landing/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <FeaturedWorkersSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
