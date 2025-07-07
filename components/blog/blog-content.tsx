"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { BlogGrid } from "@/components/blog/blog-grid"
import { useBlogPosts } from "@/lib/queries"

const categories = ["All", "Home Maintenance", "Safety", "DIY & Tips", "Beauty", "Business"]

export default function BlogContent() {
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
    <>
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
    </>
  )
}
