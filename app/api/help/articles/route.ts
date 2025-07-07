import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// app/api/help/articles/popular/route.ts
export async function GET() {
  const articles = await prisma.helpArticle.findMany()

  console.log("All articles:", articles)

  return NextResponse.json(articles)
}

