import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const worker = await prisma.workerProfile.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            city: true,
            state: true,
            country: true,
            createdAt: true,
          },
        },
        services: {
          include: {
            service: true,
          },
        },
        workSamples: {
          orderBy: {
            createdAt: "desc",
          },
        },
        reviews: {
          include: {
            customer: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
        _count: {
          select: {
            reviews: true,
            bookings: true,
          },
        },
      },
    })

    if (!worker) {
      return NextResponse.json({ error: "Worker not found" }, { status: 404 })
    }

    return NextResponse.json(worker)
  } catch (error) {
    console.error("Error fetching worker:", error)
    return NextResponse.json({ error: "Failed to fetch worker" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { title, description, hourlyRate, availability } = body

    const worker = await prisma.workerProfile.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        description,
        hourlyRate,
        availability,
      },
      include: {
        user: true,
        services: {
          include: {
            service: true,
          },
        },
      },
    })

    return NextResponse.json(worker)
  } catch (error) {
    console.error("Error updating worker:", error)
    return NextResponse.json({ error: "Failed to update worker" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.workerProfile.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: "Worker profile deleted successfully" })
  } catch (error) {
    console.error("Error deleting worker:", error)
    return NextResponse.json({ error: "Failed to delete worker" }, { status: 500 })
  }
}
