
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const blogs = await prisma.blog.findUnique({
    where: { id: params.id }
  })

  if (!blogs) return new NextResponse("Not Found", { status: 404 })

  return NextResponse.json(blogs)
}
