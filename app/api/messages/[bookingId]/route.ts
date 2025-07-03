import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { bookingId: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Placeholder messages for testing
    const mockMessages = [
      {
        id: "msg_1",
        bookingId: params.bookingId,
        senderId: "worker_123",
        receiverId: session.user.id,
        content: "Hello! I received your booking request for electrical repair. When would be a good time for you?",
        messageType: "TEXT",
        isRead: true,
        createdAt: new Date("2024-01-15T10:30:00Z"),
        sender: {
          name: "John Adebayo",
          image: "/placeholder.svg",
        },
        receiver: {
          name: session.user.name,
          image: session.user.image,
        },
      },
      {
        id: "msg_2",
        bookingId: params.bookingId,
        senderId: session.user.id,
        receiverId: "worker_123",
        content: "Hi John! Thanks for reaching out. Would tomorrow afternoon work for you?",
        messageType: "TEXT",
        isRead: true,
        createdAt: new Date("2024-01-15T10:32:00Z"),
        sender: {
          name: session.user.name,
          image: session.user.image,
        },
        receiver: {
          name: "John Adebayo",
          image: "/placeholder.svg",
        },
      },
      {
        id: "msg_3",
        bookingId: params.bookingId,
        senderId: "worker_123",
        receiverId: session.user.id,
        content: "Yes, tomorrow afternoon works perfectly. I can be there around 2 PM. Is that okay?",
        messageType: "TEXT",
        isRead: false,
        createdAt: new Date("2024-01-15T10:35:00Z"),
        sender: {
          name: "John Adebayo",
          image: "/placeholder.svg",
        },
        receiver: {
          name: session.user.name,
          image: session.user.image,
        },
      },
    ]

    return NextResponse.json(mockMessages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}
