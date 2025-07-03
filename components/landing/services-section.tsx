import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wrench, Zap, Hammer, Scissors, PaintBucket, Car, Home, Laptop } from "lucide-react"
import Link from "next/link"

export function ServicesSection() {
  const services = [
    {
      icon: Wrench,
      name: "Plumbing",
      description: "Professional plumbers for all your water and pipe needs",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      icon: Zap,
      name: "Electrical",
      description: "Licensed electricians for safe electrical work",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    },
    {
      icon: Hammer,
      name: "Carpentry",
      description: "Skilled carpenters for furniture and construction",
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
    },
    {
      icon: Scissors,
      name: "Beauty & Hair",
      description: "Professional hairdressers and beauty specialists",
      color: "text-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-950/20",
    },
    {
      icon: PaintBucket,
      name: "Painting",
      description: "Expert painters for interior and exterior work",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
    {
      icon: Car,
      name: "Auto Repair",
      description: "Certified mechanics for vehicle maintenance",
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/20",
    },
    {
      icon: Home,
      name: "Cleaning",
      description: "Professional cleaning services for homes and offices",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
    },
    {
      icon: Laptop,
      name: "Tech Support",
      description: "IT specialists for computer and device repairs",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Popular Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find skilled professionals for any task. All our workers are verified and rated by customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/services">
            <Button size="lg" className="px-8">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
