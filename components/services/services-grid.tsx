"use client"

import { useServices } from "@/lib/queries"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wrench, Zap, Hammer, Scissors, PaintBucket, Car, Home, Laptop } from "lucide-react"
import Link from "next/link"

const serviceIcons: { [key: string]: any } = {
  plumbing: Wrench,
  electrical: Zap,
  carpentry: Hammer,
  beauty: Scissors,
  painting: PaintBucket,
  automotive: Car,
  cleaning: Home,
  tech: Laptop,
}

export function ServicesGrid() {
  const { data: services, isLoading } = useServices()

  if (isLoading) {
    return <div>Loading services...</div>
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-4">All Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find skilled professionals for any task. All our workers are verified and rated by customers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services?.map((service: any) => {
          const IconComponent = serviceIcons[service.icon] || Wrench
          return (
            <Card key={service.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                <Badge variant="secondary" className="mb-4">
                  {service._count.workerServices} professionals
                </Badge>
                <Link href={`/workers?serviceId=${service.id}`}>
                  <Button className="w-full">Find Professionals</Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
