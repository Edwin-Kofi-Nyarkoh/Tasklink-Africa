import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const location = searchParams.get("location")
    const serviceId = searchParams.get("serviceId")
    const minRate = searchParams.get("minRate")
    const maxRate = searchParams.get("maxRate")
    const availability = searchParams.get("availability")
    const verified = searchParams.get("verified")

    const where: any = {
      availability: availability === "true" ? true : undefined,
      isVerified: verified === "true" ? true : undefined,
    }

    if (minRate || maxRate) {
      where.hourlyRate = {
        gte: minRate ? Number.parseFloat(minRate) : undefined,
        lte: maxRate ? Number.parseFloat(maxRate) : undefined,
      }
    }

    if (location && location.trim() !=="all") {
      where.user = {
        city: {
          contains: location,
          mode: "insensitive",
        },
      }
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          user: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ]
    }

    const serviceIds = searchParams.getAll("serviceId")
if (serviceIds.length > 0) {
  where.services = {
    some: {
      serviceId: {
        in: serviceIds,
      },
    },
  }
}


    const workers = await prisma.workerProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            city: true,
            state: true,
          },
        },
        services: {
          include: {
            service: true,
          },
        },
        workSamples: {
          take: 3,
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            reviews: true,
            bookings: true,
          },
        },
      },
      orderBy: [
        {
          isVerified: "desc",
        },
        {
          rating: "desc",
        },
        {
          totalReviews: "desc",
        },
      ],
    })


    return NextResponse.json(workers)
  } catch (error) {
    console.error("Error fetching workers:", error)
    return NextResponse.json({ error: "Failed to fetch workers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, title, description, experience, hourlyRate, services, languages, certifications } = body

    const workerProfile = await prisma.workerProfile.create({
      data: {
        userId,
        title,
        description,
        experience,
        hourlyRate,
        languages,
        certifications,
        services: {
          create: services.map((serviceId: string) => ({
            serviceId,
          })),
        },
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

    return NextResponse.json(workerProfile)
  } catch (error) {
    console.error("Error creating worker profile:", error)
    return NextResponse.json({ error: "Failed to create worker profile" }, { status: 500 })
  }
}
