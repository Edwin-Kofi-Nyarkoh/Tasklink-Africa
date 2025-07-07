export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Placeholder dashboard stats
    const mockStats = {
      totalBookings: 12,
      completedBookings: 8,
      pendingBookings: 2,
      inProgressBookings: 2,
      totalSpent: 125000,
      averageRating: 4.8,
      favoriteServices: [
        { name: "Electrical", count: 4 },
        { name: "Plumbing", count: 3 },
        { name: "Cleaning", count: 2 },
      ],
      recentActivity: [
        {
          id: "activity_1",
          type: "booking_completed",
          description: "Electrical repair completed by John Adebayo",
          timestamp: new Date("2024-01-15T14:00:00Z"),
        },
        {
          id: "activity_2",
          type: "review_left",
          description: "You left a 5-star review for Sarah Okafor",
          timestamp: new Date("2024-01-14T16:30:00Z"),
        },
      ],
    }

    return NextResponse.json(mockStats)
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}
