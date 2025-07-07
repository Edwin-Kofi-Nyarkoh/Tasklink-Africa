"use client"

import { useBlogPost } from "@/lib/queries"
import { useParams } from "next/navigation"
import { notFound } from "next/navigation"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"

export default function BlogPostPage() {
  const params = useParams()
  const id = typeof params?.id === "string" ? params.id : ""

  const { data: blog, isLoading, isError } = useBlogPost(id)

  if (isError) return notFound()
  if (isLoading) return <p className="text-center py-10">Loading...</p>
  if (!blog) return notFound()

  return (
    <div className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge variant="secondary">{blog.category}</Badge>
            <h1 className="text-3xl font-bold">{blog.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground gap-4">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
              <span>{blog.readTime}</span>
            </div>
          </div>

          <img
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            className="w-full rounded-lg"
          />

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      </div>
    </div>
  )
}
