"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Clock, CheckCircle, MessageCircle } from "lucide-react"
import { useBookingStore } from "@/lib/store"
import { formatCurrency } from "@/lib/utils"

interface WorkerCardProps {
  worker: any
}

export function WorkerCard({ worker }: WorkerCardProps) {
  const { addItem } = useBookingStore()

  const handleHireNow = () => {
    addItem({
      workerId: worker.id,
      serviceId: worker.services[0]?.serviceId || "",
      workerName: worker.user.name,
      serviceName: worker.services[0]?.service.name || "",
      hourlyRate: worker.hourlyRate,
      estimatedHours: 1,
    })
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            <Avatar className="w-16 h-16">
              <AvatarImage src={worker.user.image || "/placeholder.svg"} alt={worker.user.name} />
              <AvatarFallback>
                {worker.user.name
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {worker.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{worker.user.name}</h3>
            <p className="text-muted-foreground">{worker.title}</p>
            <div className="flex items-center space-x-1 mt-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{worker.rating}</span>
              <span className="text-muted-foreground text-sm">({worker.totalReviews} reviews)</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            {worker.user.city}, {worker.user.state}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            Responds {worker.responseTime || "within 2 hours"}
          </div>
          <div className="text-lg font-semibold text-primary">{formatCurrency(worker.hourlyRate)}/hour</div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {worker.services.slice(0, 2).map((service: any, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {service.service.name}
            </Badge>
          ))}
          {worker.services.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{worker.services.length - 2} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex space-x-2">
        <Link href={`/workers/${worker.id}`} className="flex-1">
          <Button variant="outline" className="w-full bg-transparent">
            View Profile
          </Button>
        </Link>
        <Button onClick={handleHireNow} className="flex-1">
          <MessageCircle className="w-4 h-4 mr-2" />
          Hire Now
        </Button>
      </CardFooter>
    </Card>
  )
}
