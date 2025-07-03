import { Card, CardContent } from "@/components/ui/card"
import { Search, UserCheck, Calendar, CheckCircle, Star, Shield } from "lucide-react"

export function ProcessSteps() {
  const customerSteps = [
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

  const workerSteps = [
    {
      icon: UserCheck,
      title: "Create Profile",
      description: "Sign up and create your professional profile with your skills and experience.",
      step: "01",
    },
    {
      icon: Shield,
      title: "Get Verified",
      description: "Complete our verification process to build trust with customers.",
      step: "02",
    },
    {
      icon: Calendar,
      title: "Receive Bookings",
      description: "Get notified when customers book your services and manage your schedule.",
      step: "03",
    },
    {
      icon: Star,
      title: "Build Reputation",
      description: "Complete jobs, earn reviews, and grow your business on our platform.",
      step: "04",
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* For Customers */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">For Customers</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Book professional services in just a few simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {customerSteps.map((step, index) => (
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
                {index < customerSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30 transform -translate-y-1/2 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* For Workers */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">For Professionals</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our platform and start growing your business today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workerSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
                        <step.icon className="w-8 h-8 text-secondary-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>

                {/* Connector Line */}
                {index < workerSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-secondary/30 transform -translate-y-1/2 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
