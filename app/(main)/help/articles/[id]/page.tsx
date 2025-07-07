"use client"

import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"

export default function ArticlePage() {
  const params = useParams()
  const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : ""

  const [validId, setValidId] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      setValidId(id)
    }
  }, [id])

  const { data: article, isLoading, isError } = useQuery({
    queryKey: ["help", "article", validId],
    enabled: !!validId,
    queryFn: async () => {
      const res = await fetch(`/api/help/articles/${validId}`)
      if (!res.ok) throw new Error("Not found")
      return res.json()
    },
  })

  if (isLoading) {
    return <div className="p-6 text-center">Loading article...</div>
  }

  if (isError || !article) {
    return notFound()
  }

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <div className="prose dark:prose-invert">{article.content}</div>
    </div>
  )
}
