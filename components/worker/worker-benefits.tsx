import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Star, Shield, Clock, TrendingUp } from "lucide-react"

export function WorkerBenefits() {
  const benefits = [
    {
      icon: Users,
      title: "Access to Customers",
      description: "Connect with thousands of potential customers looking for your services",
    },
    {
      icon: Star,
      title: "Build Your Reputation",
      description: "Earn reviews and ratings to establish trust and credibility",
    },
    {
      icon: Shield,
      title: "Verified Badge",
      description: "Get verified to stand out and increase your booking rate",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Work when you want and set your own availability",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Use our platform to expand your reach and increase income",
    },
    {
      icon: CheckCircle,
      title: "Secure Payments",
      description: "Get paid safely and on time through our secure payment system",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Why Join TaskLink?</h2>
        <p className="text-muted-foreground">
          Join thousands of professionals who are already growing their business with TaskLink Africa.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {benefits.map((benefit, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-lg mb-2">Ready to Get Started?</h3>
          <p className="text-muted-foreground mb-4">
            Fill out the application form and start receiving booking requests within 24 hours of approval.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
              Free to join
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
              Quick approval
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
              No hidden fees
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
