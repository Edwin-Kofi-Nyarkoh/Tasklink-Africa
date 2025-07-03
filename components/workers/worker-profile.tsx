"use client"

import { useWorker } from "@/lib/queries"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Clock, CheckCircle, Calendar, Award } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"

interface WorkerProfileProps {
  workerId: string
}

export function WorkerProfile({ workerId }: WorkerProfileProps) {
  const { data: worker, isLoading } = useWorker(workerId)

  if (isLoading) {
    return <WorkerProfileSkeleton />
  }

  if (!worker) {
    return <div>Worker not found</div>
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage src={worker.user.image || "/placeholder.svg"} alt={worker.user.name} />
                <AvatarFallback className="text-2xl">
                  {worker.user.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {worker.isVerified && (
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center border-4 border-background">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{worker.user.name}</h1>
              <p className="text-xl text-muted-foreground">{worker.title}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-lg">{worker.rating}</span>
                <span className="text-muted-foreground">({worker.totalReviews} reviews)</span>
              </div>
              <Badge variant="secondary">{worker.completedJobs} jobs completed</Badge>
            </div>

            {/* Location & Availability */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>
                  {worker.user.city}, {worker.user.state}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Responds {worker.responseTime || "within 2 hours"}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{worker.experience} years experience</span>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold mb-2">Services Offered</h3>
              <div className="flex flex-wrap gap-2">
                {worker.services.map((service: any, index: number) => (
                  <Badge key={index} variant="outline">
                    {service.service.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Languages */}
            {worker.languages && worker.languages.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {worker.languages.map((language: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {worker.certifications && worker.certifications.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  Certifications
                </h3>
                <div className="space-y-1">
                  {worker.certifications.map((cert: string, index: number) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      • {cert}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing */}
            <div className="bg-primary/5 p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary">{formatCurrency(worker.hourlyRate)}/hour</div>
              <p className="text-sm text-muted-foreground">Starting rate • Final price may vary</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="font-semibold mb-3">About</h3>
          <p className="text-muted-foreground leading-relaxed">{worker.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function WorkerProfileSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Skeleton className="w-32 h-32 rounded-full" />
          <div className="flex-1 space-y-4">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-6 w-40" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-36" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-18" />
              </div>
            </div>
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
        <div className="mt-6 pt-6 border-t">
          <Skeleton className="h-6 w-16 mb-3" />
          <Skeleton className="h-20 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}
