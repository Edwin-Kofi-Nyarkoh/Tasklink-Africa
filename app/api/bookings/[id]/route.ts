import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Placeholder data for testing
    const mockBooking = {
      id: params.id,
      customerId: session.user.id,
      workerId: "worker_123",
      serviceId: "service_123",
      title: "Electrical Repair",
      description: "Fix electrical outlet in living room",
      customerAddress: "123 Main Street, Lagos, Nigeria",
      customerPhone: "+234 800 123 4567",
      scheduledDate: new Date("2024-02-15T14:00:00Z"),
      estimatedHours: 2,
      totalAmount: 15000,
      status: "CONFIRMED",
      paymentStatus: "PAID",
      ticketNumber: "TL123456",
      notes: "Please bring necessary tools",
      createdAt: new Date(),
      updatedAt: new Date(),
      worker: {
        id: "worker_123",
        user: {
          name: "John Adebayo",
          image: "/placeholder.svg",
          phone: "+234 800 987 6543",
        },
      },
      service: {
        id: "service_123",
        name: "Electrical Services",
      },
      review: null,
    }

    return NextResponse.json(mockBooking)
  } catch (error) {
    console.error("Error fetching booking:", error)
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { status, notes } = body

    // Placeholder response
    const updatedBooking = {
      id: params.id,
      status,
      notes,
      updatedAt: new Date(),
    }

    return NextResponse.json(updatedBooking)
  } catch (error) {
    console.error("Error updating booking:", error)
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
  }
}
