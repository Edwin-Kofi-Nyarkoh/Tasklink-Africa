import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { bookingId, workerId, rating, comment } = body

    // Placeholder review creation
    const mockReview = {
      id: "review_123",
      bookingId,
      customerId: session.user.id,
      workerId,
      rating,
      comment,
      createdAt: new Date(),
      customer: {
        name: session.user.name,
        image: session.user.image,
      },
    }

    return NextResponse.json(mockReview)
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const workerId = searchParams.get("workerId")

    // Placeholder reviews for testing
    const mockReviews = [
      {
        id: "review_1",
        rating: 5,
        comment: "Excellent work! Very professional and completed the job on time.",
        createdAt: new Date("2024-01-10"),
        customer: {
          name: "Sarah Johnson",
          image: "/placeholder.svg",
        },
      },
      {
        id: "review_2",
        rating: 4,
        comment: "Good service, would recommend to others.",
        createdAt: new Date("2024-01-05"),
        customer: {
          name: "Michael Brown",
          image: "/placeholder.svg",
        },
      },
    ]

    return NextResponse.json(mockReviews)
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}
