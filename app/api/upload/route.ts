import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Placeholder upload response
    // In production, this would upload to Cloudinary
    const mockUploadResult = {
      public_id: `tasklink/${Date.now()}_${file.name}`,
      secure_url: `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(file.name)}`,
      width: 400,
      height: 400,
      format: file.type.split("/")[1] || "jpg",
    }

    return NextResponse.json(mockUploadResult)
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
