"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function FeaturedWorkersSection() {
  const featuredWorkers = [
    {
      id: "1",
      name: "John Adebayo",
      title: "Master Electrician",
      rating: 4.9,
      reviews: 127,
      location: "Lagos, Nigeria",
      hourlyRate: 2500,
      responseTime: "Within 1 hour",
      image: "/placeholder.svg?height=100&width=100",
      verified: true,
      completedJobs: 89,
      services: ["Electrical", "Wiring", "Installation"],
    },
    {
      id: "2",
      name: "Sarah Okafor",
      title: "Professional Hairdresser",
      rating: 5.0,
      reviews: 203,
      location: "Abuja, Nigeria",
      hourlyRate: 1800,
      responseTime: "Within 30 mins",
      image: "/placeholder.svg?height=100&width=100",
      verified: true,
      completedJobs: 156,
      services: ["Hair Styling", "Braiding", "Treatment"],
    },
    {
      id: "3",
      name: "Michael Asante",
      title: "Expert Plumber",
      rating: 4.8,
      reviews: 94,
      location: "Accra, Ghana",
      hourlyRate: 2200,
      responseTime: "Within 2 hours",
      image: "/placeholder.svg?height=100&width=100",
      verified: true,
      completedJobs: 73,
      services: ["Plumbing", "Pipe Repair", "Installation"],
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Featured Professionals
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet some of our top-rated professionals who consistently deliver
            excellent service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredWorkers.map((worker) => (
            <Card
              key={worker.id}
              className="group hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={worker.image || "/placeholder.svg"}
                        alt={worker.name}
                      />
                      <AvatarFallback>
                        {worker.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {worker.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{worker.name}</h3>
                    <p className="text-muted-foreground">{worker.title}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{worker.rating}</span>
                      <span className="text-muted-foreground text-sm">
                        ({worker.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {worker.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    Responds {worker.responseTime}
                  </div>
                  <div className="text-lg font-semibold text-primary">
                    ₦{worker.hourlyRate.toLocaleString()}/hour
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {worker.services.slice(0, 2).map((service, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {worker.services.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{worker.services.length - 2} more
                    </Badge>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Link href={`/workers/${worker.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Profile
                    </Button>
                  </Link>
                  <Link href={`/workers/${worker.id}/book`} className="flex-1">
                    <Button
                      className="w-full"
                      onClick={() => {
                        toast.success("Worker booked successfully!", {
                          description:
                            "You can now visit your bookings to proceed.",
                        });
                      }}
                    >
                      Book Worker
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/workers">
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              View All Professionals
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
