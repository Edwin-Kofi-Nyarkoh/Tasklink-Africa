import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Amina Hassan",
      location: "Lagos, Nigeria",
      image: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "TaskLink made it so easy to find a reliable electrician. The booking process was smooth, and the professional arrived exactly on time. Highly recommended!",
      service: "Electrical Work",
    },
    {
      name: "David Mensah",
      location: "Accra, Ghana",
      image: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "I needed urgent plumbing help and found an amazing plumber through TaskLink. The quality of work was excellent and the pricing was fair.",
      service: "Plumbing",
    },
    {
      name: "Grace Ochieng",
      location: "Nairobi, Kenya",
      image: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "The hairdresser I booked through TaskLink was professional and skilled. She transformed my hair beautifully. Will definitely use the platform again!",
      service: "Hair Styling",
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what real customers have to say about their TaskLink experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-6">
                <div className="absolute top-4 right-4 text-primary/20">
                  <Quote className="w-8 h-8" />
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>

                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    <div className="text-xs text-primary">{testimonial.service}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
