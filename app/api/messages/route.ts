import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get("bookingId")

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID required" }, { status: 400 })
    }

    const messages = await prisma.message.findMany({
      where: {
        bookingId,
        OR: [{ senderId: session.user.id }, { receiverId: session.user.id }],
      },
      include: {
        sender: {
          select: {
            name: true,
            image: true,
          },
        },
        receiver: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        bookingId,
        receiverId: session.user.id,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { bookingId, receiverId, content, messageType = "TEXT" } = body

    const message = await prisma.message.create({
      data: {
        bookingId,
        senderId: session.user.id,
        receiverId,
        content,
        messageType,
      },
      include: {
        sender: {
          select: {
            name: true,
            image: true,
          },
        },
        receiver: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(message)
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
