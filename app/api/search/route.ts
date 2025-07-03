import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const location = searchParams.get("location")
    const category = searchParams.get("category")

    // Placeholder search results
    const mockResults = {
      workers: [
        {
          id: "worker_1",
          name: "John Adebayo",
          title: "Master Electrician",
          rating: 4.9,
          reviews: 127,
          location: "Lagos, Nigeria",
          hourlyRate: 2500,
          image: "/placeholder.svg",
          verified: true,
          services: ["Electrical", "Wiring", "Installation"],
        },
        {
          id: "worker_2",
          name: "Sarah Okafor",
          title: "Professional Hairdresser",
          rating: 5.0,
          reviews: 203,
          location: "Abuja, Nigeria",
          hourlyRate: 1800,
          image: "/placeholder.svg",
          verified: true,
          services: ["Hair Styling", "Braiding", "Treatment"],
        },
      ],
      services: [
        {
          id: "service_1",
          name: "Electrical Services",
          description: "Professional electrical work and repairs",
          workerCount: 45,
        },
        {
          id: "service_2",
          name: "Hair Styling",
          description: "Professional hair care and styling",
          workerCount: 32,
        },
      ],
      total: 2,
      query,
      location,
      category,
    }

    return NextResponse.json(mockResults)
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Failed to perform search" }, { status: 500 })
  }
}
