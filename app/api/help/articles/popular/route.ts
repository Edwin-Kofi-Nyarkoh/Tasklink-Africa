import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {

  const articles = await prisma.helpArticle.findMany({
    where: {
     popular: true
    },
  })

  return NextResponse.json(articles)
}
