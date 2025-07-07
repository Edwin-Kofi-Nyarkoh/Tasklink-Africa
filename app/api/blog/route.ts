import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// const sampleBlogs = [
//   {
//     id: "1",
//     title: "How to Choose the Right Plumber for Your Home",
//     excerpt: "Finding a reliable plumber can be challenging. Here's what to look for when hiring plumbing services.",
//     content: "Full content about choosing the right plumber...",
//     image: "/placeholder.svg?height=200&width=400",
//     category: "Home Maintenance",
//     author: "TaskLink Team",
//     publishedAt: new Date("2024-01-15"),
//     readTime: "5 min read",
//   },
//   {
//     id: "2",
//     title: "Electrical Safety Tips Every Homeowner Should Know",
//     excerpt: "Stay safe with these essential electrical safety tips and know when to call a professional electrician.",
//     content: "Full content on electrical safety tips...",
//     image: "/placeholder.svg?height=200&width=400",
//     category: "Safety",
//     author: "John Adebayo",
//     publishedAt: new Date("2024-01-12"),
//     readTime: "7 min read",
//   },
//   {
//     id: "3",
//     title: "The Ultimate Guide to Home Carpentry Projects",
//     excerpt: "From basic repairs to custom furniture, learn about different carpentry services and what to expect.",
//     content: "Full content about home carpentry projects...",
//     image: "/placeholder.svg?height=200&width=400",
//     category: "DIY & Tips",
//     author: "Sarah Okafor",
//     publishedAt: new Date("2024-01-10"),
//     readTime: "10 min read",
//   },
//   {
//     id: "4",
//     title: "Hair Care Trends in Africa: What's Popular Now",
//     excerpt: "Discover the latest hair styling trends and techniques popular across African countries.",
//     content: "Full content about hair care trends in Africa...",
//     image: "/placeholder.svg?height=200&width=400",
//     category: "Beauty",
//     author: "Grace Ochieng",
//     publishedAt: new Date("2024-01-08"),
//     readTime: "6 min read",
//   },
//   {
//     id: "5",
//     title: "Starting Your Service Business: A Professional's Guide",
//     excerpt: "Tips for skilled workers looking to grow their business and attract more customers.",
//     content: "Full content on starting your service business...",
//     image: "/placeholder.svg?height=200&width=400",
//     category: "Business",
//     author: "Michael Asante",
//     publishedAt: new Date("2024-01-05"),
//     readTime: "8 min read",
//   },
//   {
//     id: "6",
//     title: "Seasonal Home Maintenance Checklist",
//     excerpt: "Keep your home in top condition with this comprehensive seasonal maintenance guide.",
//     content: "Full content about seasonal home maintenance...",
//     image: "/placeholder.svg?height=200&width=400",
//     category: "Home Maintenance",
//     author: "TaskLink Team",
//     publishedAt: new Date("2024-01-03"),
//     readTime: "12 min read",
//   },
// ]

export async function GET(req: Request) {
  // Seed blogs if not present
  // const existing = await prisma.blog.findMany()
  // if (existing.length === 0) {
  //   await prisma.blog.createMany({
  //     data: sampleBlogs,
  //     skipDuplicates: true,
  //   })
  // }

  // Query params
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category") || undefined
  const author = searchParams.get("author") || undefined
  const search = searchParams.get("search") || undefined
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")

  const where: any = {}

  if (category) where.category = category
  if (author) where.author = author
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } }
    ]
  }

  const blogs = await prisma.blog.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    skip: (page - 1) * limit,
    take: limit
  })

  const total = await prisma.blog.count({ where })

  return NextResponse.json({ blogs, total, page, limit })
}
