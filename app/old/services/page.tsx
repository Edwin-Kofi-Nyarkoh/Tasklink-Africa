import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ServicesGrid } from "@/components/services/services-grid"
import { ServicesHero } from "@/components/services/services-hero"

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <ServicesHero />
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ServicesGrid />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
