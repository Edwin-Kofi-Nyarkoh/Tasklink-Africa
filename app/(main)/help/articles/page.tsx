// app/help/articles/page.tsx
"use client"

import Link from "next/link"
import { useAllArticles } from "@/lib/queries"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AllArticlesPage() {
  const { data: articles, isLoading } = useAllArticles()

  return (
    <div className="max-w-4xl mx-auto pb-10 pt-24 space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-center">All Help Articles</h1>

      <Card>
        <CardContent className="space-y-4 py-6">
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-6 rounded-md" />
            ))}

          {!isLoading && articles?.length === 0 && (
            <p className="text-muted-foreground">No help articles found.</p>
          )}

          {!isLoading &&
            articles?.map((article: any) => (
              <Link
                key={article.id}
                href={`/help/articles/${article.id}`}
                className="block p-4 hover:bg-muted/50 rounded-lg transition-colors border"
              >
                <h2 className="font-semibold">{article.title}</h2>
              </Link>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}
