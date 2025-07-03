import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogGrid } from "@/components/blog/blog-grid"

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">TaskLink Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tips, guides, and insights for getting the most out of professional services
            </p>
          </div>
          <BlogGrid />
        </div>
      </main>
      <Footer />
    </div>
  )
}
