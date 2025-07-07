import { Suspense } from "react"
import BlogContent from "@/components/blog/blog-content"

export const dynamic = "force-dynamic"

export default function BlogPage() {
  return (
    <div className="pb-8 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">TaskLink Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tips, guides, and insights for getting the most out of professional services
          </p>
        </div>

        <Suspense fallback={<div className="text-center">Loading blog posts...</div>}>
          <BlogContent />
        </Suspense>
      </div>
    </div>
  )
}
