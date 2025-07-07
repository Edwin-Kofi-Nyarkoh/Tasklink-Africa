import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const articles = await prisma.helpArticle.findMany({
    orderBy: { createdAt: "desc" }
  })

  return NextResponse.json(articles)
}
