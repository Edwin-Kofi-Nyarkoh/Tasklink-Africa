"use client";

import { useBookings } from "@/lib/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";
import Link from "next/link";

export function RecentBookings() {
  const { data: bookings } = useBookings();

  const recentBookings = bookings?.slice(0, 5) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "CONFIRMED":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "PENDING":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Bookings</CardTitle>
        <Link href="/bookings">
          <Button variant="outline" size="sm" className="bg-transparent">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {recentBookings.length > 0 ? (
          <div className="space-y-4">
            {recentBookings.map((booking: any) => (
              <div
                key={booking.id}
                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={booking.worker.user.image || "/placeholder.svg"}
                  />
                  <AvatarFallback>
                    {booking.worker.user.name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium truncate">{booking.title}</h4>
                    <Badge className={getStatusColor(booking.paymentStatus)}>
                      {booking.paymentStatus}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    with {booking.worker.user.name}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(booking.scheduledDate)}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {booking.service.name}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {formatCurrency(booking.totalAmount)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    #{booking.ticketNumber}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No bookings yet.</p>
            <Link href="/workers">
              <Button className="mt-4">Find Professionals</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
