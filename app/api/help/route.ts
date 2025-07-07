import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
//import { ArticlePurposes } from "@prisma/client"


// const articles = [
//   {
//     id: "1",
//     title: "How to book a service",
//     content: "To book a service, simply browse the available services, select your preferred provider, choose a time slot, and confirm your booking. You will receive a confirmation email shortly after.",
//     purpose: ArticlePurposes.STARTERS,
//     popular: true,
//   },
//   {
//     id: "2",
//     title: "How to become a verified professional",
//     content: "To become verified, go to your profile settings, upload your ID and certifications, and submit the verification request. Our team will review and approve it within 24-48 hours.",
//     purpose: ArticlePurposes.CUSTOMERS,
//     popular: true,
//   },
//   {
//     id: "3",
//     title: "Payment methods and security",
//     content: "We support payments via credit card, debit card, and mobile money. All transactions are securely processed using industry-standard encryption.",
//     purpose: ArticlePurposes.PROFESSIONALS,
//     popular: true,
//   },
//   {
//     id: "4",
//     title: "Cancellation and refund policy",
//     content: "You can cancel bookings up to 12 hours before the scheduled time. Refunds will be processed automatically within 3–5 business days.",
//     purpose: ArticlePurposes.PAYMENTS,
//     popular: true,
//   },
//   {
//     id: "5",
//     title: "How to leave a review",
//     content: "After a completed service, visit the service provider’s profile or booking history to leave a review and rating based on your experience.",
//     purpose: ArticlePurposes.PAYMENTS,
//     popular: true,
//   },
//   {
//     id: "6",
//     title: "Troubleshooting common issues",
//     content: "If you’re experiencing issues, try refreshing the page, clearing your browser cache, or contacting support via live chat or email.",
//     purpose: ArticlePurposes.PAYMENTS,
//     popular: true,
//   },
// ]

export async function GET(req: Request) {
  // ✅ Only seed if no help articles exist
  // const existing = await prisma.helpArticle.findMany()
  // if (existing.length === 0) {
  //   await prisma.helpArticle.createMany({
  //     data: articles,
  //     skipDuplicates: true,
  //   })
  // }

  // ✅ Support search query
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query") || ""

  const filteredArticles = await prisma.helpArticle.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { content: { contains: query, mode: "insensitive" } },
      ],
    },
    take: 10,
  })

  return NextResponse.json(filteredArticles)
}
