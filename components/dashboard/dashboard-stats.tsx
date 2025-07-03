"use client"

import { useBookings } from "@/lib/queries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckCircle, Clock, Star } from "lucide-react"

export function DashboardStats() {
  const { data: bookings } = useBookings()

  const stats = [
    {
      title: "Total Bookings",
      value: bookings?.length || 0,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      title: "Completed",
      value: bookings?.filter((b: any) => b.status === "COMPLETED").length || 0,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
    {
      title: "In Progress",
      value: bookings?.filter((b: any) => b.status === "IN_PROGRESS").length || 0,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    },
    {
      title: "Pending Review",
      value: bookings?.filter((b: any) => b.status === "COMPLETED" && !b.review).length || 0,
      icon: Star,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`w-8 h-8 ${stat.bgColor} rounded-full flex items-center justify-center`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
