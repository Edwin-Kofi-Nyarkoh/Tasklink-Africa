import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HelpCenter } from "@/components/help/help-center"

export default function HelpPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <HelpCenter />
        </div>
      </main>
      <Footer />
    </div>
  )
}
