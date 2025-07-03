import { HowItWorksHero } from "@/components/how-it-works/how-it-works-hero"
import { ProcessSteps } from "@/components/how-it-works/process-steps"
import { SafetyFeatures } from "@/components/how-it-works/safety-features"
import { FAQ } from "@/components/how-it-works/faq"

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorksHero />
      <ProcessSteps />
      <SafetyFeatures />
      <FAQ />
    </>
  )
}
