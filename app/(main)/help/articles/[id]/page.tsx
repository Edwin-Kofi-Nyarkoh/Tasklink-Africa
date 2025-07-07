"use client"

import { useParams } from "next/navigation"
import { useHelpArticle } from "@/lib/queries"

export default function ArticlePage() {
  const params = useParams()
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : ""

  const { data: article, isLoading, isError } = useHelpArticle(id)

  if (isLoading) return <div className="p-6 text-center">Loading article...</div>
  if (isError || !article) return <div className="text-center py-10">Article not found.</div>

  return (
    <div className="max-w-3xl mx-auto py-44 space-y-6">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <div className="prose dark:prose-invert">{article.content}</div>
    </div>
  )
}
