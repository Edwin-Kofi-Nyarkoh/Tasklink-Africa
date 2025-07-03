"use client"

import { useBookings } from "@/lib/queries"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, MessageCircle, Star } from "lucide-react"
import { formatDate, formatCurrency } from "@/lib/utils"
import Link from "next/link"

export function BookingsList() {
  const { data: bookings, isLoading } = useBookings()

  if (isLoading) {
    return <div>Loading bookings...</div>
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">No bookings found</h3>
        <p className="text-muted-foreground mb-4">You haven't made any bookings yet.</p>
        <Link href="/workers">
          <Button>Find Professionals</Button>
        </Link>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "CONFIRMED":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "PENDING":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      case "CANCELLED":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking: any) => (
        <Card key={booking.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={booking.worker.user.image || "/placeholder.svg"} />
                  <AvatarFallback>
                    {booking.worker.user.name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{booking.title}</h3>
                  <p className="text-muted-foreground">with {booking.worker.user.name}</p>
                </div>
              </div>
              <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(booking.scheduledDate)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  {booking.service.name}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{formatCurrency(booking.totalAmount)}</div>
                <div className="text-sm text-muted-foreground">Ticket: #{booking.ticketNumber}</div>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">{booking.description}</p>

            <div className="flex flex-wrap gap-2">
              <Link href={`/messages?bookingId=${booking.id}`}>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
              </Link>
              {booking.status === "COMPLETED" && !booking.review && (
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Star className="w-4 h-4 mr-2" />
                  Leave Review
                </Button>
              )}
              <Link href={`/bookings/${booking.id}`}>
                <Button variant="outline" size="sm" className="bg-transparent">
                  View Details
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
