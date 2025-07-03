import { Card, CardContent } from "@/components/ui/card"
import { Shield, CheckCircle, Star, Lock, Phone, FileText } from "lucide-react"

export function SafetyFeatures() {
  const features = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All workers go through background checks and verification processes.",
    },
    {
      icon: Star,
      title: "Rating System",
      description: "Read reviews and ratings from previous customers to make informed decisions.",
    },
    {
      icon: Lock,
      title: "Secure Payments",
      description: "Your payments are protected with bank-level security and encryption.",
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Our customer support team is available around the clock to help you.",
    },
    {
      icon: FileText,
      title: "Service Guarantee",
      description: "We guarantee quality service or your money back.",
    },
    {
      icon: CheckCircle,
      title: "Insurance Coverage",
      description: "All bookings are covered by our comprehensive insurance policy.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Your Safety is Our Priority</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We've built multiple layers of protection to ensure you have a safe and secure experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
