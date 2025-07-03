import { Card, CardContent } from "@/components/ui/card"
import { Search, UserCheck, Calendar, CheckCircle } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: Search,
      title: "Search & Browse",
      description: "Find skilled professionals in your area by service type, ratings, and availability.",
      step: "01",
    },
    {
      icon: UserCheck,
      title: "Choose Your Pro",
      description: "Review profiles, ratings, and previous work to select the perfect professional.",
      step: "02",
    },
    {
      icon: Calendar,
      title: "Book & Pay",
      description: "Schedule your service and pay securely through our platform.",
      step: "03",
    },
    {
      icon: CheckCircle,
      title: "Get It Done",
      description: "Your professional arrives on time and completes the job to your satisfaction.",
      step: "04",
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">How TaskLink Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting professional help has never been easier. Follow these simple steps to connect with skilled workers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30 transform -translate-y-1/2 z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
