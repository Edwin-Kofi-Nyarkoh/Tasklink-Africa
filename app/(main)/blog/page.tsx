"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { BlogGrid } from "@/components/blog/blog-grid"
import { useBlogPosts } from "@/lib/queries"

const categories = ["All", "Home Maintenance", "Safety", "DIY & Tips", "Beauty", "Business"]

export default function BlogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category") || "All"

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category === "All") {
      params.delete("category")
    } else {
      params.set("category", category)
    }
    router.push(`/blog?${params.toString()}`)
  }

  const category = activeCategory === "All" ? undefined : activeCategory
  const { data, isLoading } = useBlogPosts({ category })
  const blogs = data?.blogs || []

  return (
    <div className="pb-8 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">TaskLink Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tips, guides, and insights for getting the most out of professional services
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === activeCategory ? "default" : "outline"}
              onClick={() => handleCategoryClick(category)}
              className="cursor-pointer"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Blog Grid */}
        <BlogGrid blogs={blogs} isLoading={isLoading} />
      </div>
    </div>
  )
}
