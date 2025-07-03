import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Placeholder notifications
    const mockNotifications = [
      {
        id: "notif_1",
        userId: session.user.id,
        title: "Booking Confirmed",
        message: "Your booking with John Adebayo has been confirmed for tomorrow at 2 PM",
        type: "booking",
        isRead: false,
        createdAt: new Date("2024-01-15T10:00:00Z"),
      },
      {
        id: "notif_2",
        userId: session.user.id,
        title: "New Message",
        message: "You have a new message from your electrician",
        type: "message",
        isRead: false,
        createdAt: new Date("2024-01-15T09:30:00Z"),
      },
      {
        id: "notif_3",
        userId: session.user.id,
        title: "Payment Successful",
        message: "Your payment of ₦15,000 has been processed successfully",
        type: "payment",
        isRead: true,
        createdAt: new Date("2024-01-14T16:45:00Z"),
      },
    ]

    return NextResponse.json(mockNotifications)
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { notificationId, isRead } = body

    // Placeholder notification update
    const updatedNotification = {
      id: notificationId,
      isRead,
      updatedAt: new Date(),
    }

    return NextResponse.json(updatedNotification)
  } catch (error) {
    console.error("Error updating notification:", error)
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 })
  }
}
