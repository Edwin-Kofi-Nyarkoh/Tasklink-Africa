import { notFound } from "next/navigation"

export async function generateStaticParams() {
  // Skip this for now or use SSG if needed
  return []
}

async function getArticle(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/help/article/${id}`)
  if (!res.ok) return null
  return res.json()
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id)
  if (!article) return notFound()

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <div className="prose dark:prose-invert">{article.content}</div>
    </div>
  )
}
