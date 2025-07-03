"use client"

import { useState } from "react"
import { useWorker } from "@/lib/queries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MessageCircle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useBookingStore } from "@/lib/store"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface WorkerBookingCardProps {
  workerId: string
}

export function WorkerBookingCard({ workerId }: WorkerBookingCardProps) {
  const { data: worker } = useWorker(workerId)
  const { data: session } = useSession()
  const { addItem } = useBookingStore()
  const router = useRouter()
  const { toast } = useToast()

  const [estimatedHours, setEstimatedHours] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [bookingDetails, setBookingDetails] = useState({
    title: "",
    description: "",
    scheduledDate: "",
  })

  if (!worker) return null

  const totalAmount = worker.hourlyRate * estimatedHours

  const handleBookNow = () => {
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to book a service.",
        variant: "destructive",
      })
      router.push("/auth/signin")
      return
    }

    if (!selectedService) {
      toast({
        title: "Select a service",
        description: "Please select a service before booking.",
        variant: "destructive",
      })
      return
    }

    addItem({
      workerId: worker.id,
      serviceId: selectedService,
      workerName: worker.user.name,
      serviceName: worker.services.find((s: any) => s.serviceId === selectedService)?.service.name || "",
      hourlyRate: worker.hourlyRate,
      estimatedHours,
    })

    toast({
      title: "Added to bookings",
      description: "Service has been added to your bookings.",
    })

    router.push("/bookings/cart")
  }

  const handleChatWorker = () => {
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to chat with workers.",
        variant: "destructive",
      })
      router.push("/auth/signin")
      return
    }

    // Navigate to chat (would need a booking first in real implementation)
    router.push("/messages")
  }

  return (
    <div className="space-y-4">
      {/* Pricing Card */}
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Book Service</span>
            <span className="text-2xl font-bold text-primary">{formatCurrency(worker.hourlyRate)}/hr</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Service Selection */}
          <div className="space-y-2">
            <Label>Select Service</Label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a service" />
              </SelectTrigger>
              <SelectContent>
                {worker.services.map((service: any) => (
                  <SelectItem key={service.serviceId} value={service.serviceId}>
                    {service.service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Estimated Hours */}
          <div className="space-y-2">
            <Label>Estimated Hours</Label>
            <Select value={estimatedHours.toString()} onValueChange={(value) => setEstimatedHours(Number(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                  <SelectItem key={hour} value={hour.toString()}>
                    {hour} hour{hour > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Job Title */}
          <div className="space-y-2">
            <Label>Job Title</Label>
            <Input
              placeholder="Brief description of the job"
              value={bookingDetails.title}
              onChange={(e) => setBookingDetails({ ...bookingDetails, title: e.target.value })}
            />
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <Label>Job Description</Label>
            <Textarea
              placeholder="Describe what you need done..."
              value={bookingDetails.description}
              onChange={(e) => setBookingDetails({ ...bookingDetails, description: e.target.value })}
              rows={3}
            />
          </div>

          {/* Preferred Date */}
          <div className="space-y-2">
            <Label>Preferred Date</Label>
            <Input
              type="datetime-local"
              value={bookingDetails.scheduledDate}
              onChange={(e) => setBookingDetails({ ...bookingDetails, scheduledDate: e.target.value })}
            />
          </div>

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Estimated Total:</span>
              <span className="text-xl font-bold text-primary">{formatCurrency(totalAmount)}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Final price may vary based on actual work completed</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button onClick={handleBookNow} className="w-full" size="lg">
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </Button>
            <Button onClick={handleChatWorker} variant="outline" className="w-full bg-transparent">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat Worker
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{worker.completedJobs}</div>
              <div className="text-xs text-muted-foreground">Jobs Done</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{worker.totalReviews}</div>
              <div className="text-xs text-muted-foreground">Reviews</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
