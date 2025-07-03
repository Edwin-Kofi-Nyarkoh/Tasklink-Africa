import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Shield } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Customer CTA */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of satisfied customers who trust TaskLink for their professional service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/workers">
                <Button size="lg" variant="secondary" className="px-8">
                  Find a Professional
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 bg-transparent border-white text-white hover:bg-white hover:text-primary"
                >
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Worker CTA */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Are You a Professional?</h3>
            <p className="text-white/90 mb-6">
              Join our network of verified professionals and grow your business with TaskLink.
            </p>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex items-center text-white/90">
                <Shield className="w-4 h-4 mr-2" />
                <span className="text-sm">Verified Badge</span>
              </div>
              <div className="flex items-center text-white/90">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">More Customers</span>
              </div>
            </div>
            <Link href="/become-worker">
              <Button size="lg" variant="secondary" className="w-full">
                Join as a Professional
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
