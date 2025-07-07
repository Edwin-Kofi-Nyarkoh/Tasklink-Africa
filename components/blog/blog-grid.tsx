// components/blog/blog-grid.tsx

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  category: string
  author: string
  publishedAt: string
  readTime: string
}

interface BlogGridProps {
  blogs: BlogPost[]
  isLoading: boolean
}

export function BlogGrid({ blogs, isLoading }: BlogGridProps) {
  if (isLoading) return <p>Loading blogs...</p>

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Card key={blog.id} className="group hover:shadow-lg transition-all duration-300">
            <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
              <img
                src={blog.image || "/placeholder.svg"}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">{blog.category}</Badge>
                <span className="text-xs text-muted-foreground">{blog.readTime}</span>
              </div>

              <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {blog.title}
              </h3>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{blog.excerpt}</p>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(blog.publishedAt)}</span>
                </div>
              </div>

              <Link
                href={`/blog/${blog.id}`}
                className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium"
              >
                Read More
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}



// "use client"

// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Calendar, User, ArrowRight } from "lucide-react"
// import Link from "next/link"
// import { formatDate } from "@/lib/utils"

// export function BlogGrid() {
//   // Mock blog blogs - in real app, this would come from CMS or API
//   const blogs = [
//     {
//       id: "1",
//       title: "How to Choose the Right Plumber for Your Home",
//       excerpt: "Finding a reliable plumber can be challenging. Here's what to look for when hiring plumbing services.",
//       image: "/placeholder.svg?height=200&width=400",
//       category: "Home Maintenance",
//       author: "TaskLink Team",
//       publishedAt: "2024-01-15",
//       readTime: "5 min read",
//     },
//     {
//       id: "2",
//       title: "Electrical Safety Tips Every Homeowner Should Know",
//       excerpt:
//         "Stay safe with these essential electrical safety tips and know when to call a professional electrician.",
//       image: "/placeholder.svg?height=200&width=400",
//       category: "Safety",
//       author: "John Adebayo",
//       publishedAt: "2024-01-12",
//       readTime: "7 min read",
//     },
//     {
//       id: "3",
//       title: "The Ultimate Guide to Home Carpentry Projects",
//       excerpt: "From basic repairs to custom furniture, learn about different carpentry services and what to expect.",
//       image: "/placeholder.svg?height=200&width=400",
//       category: "DIY & Tips",
//       author: "Sarah Okafor",
//       publishedAt: "2024-01-10",
//       readTime: "10 min read",
//     },
//     {
//       id: "4",
//       title: "Hair Care Trends in Africa: What's Popular Now",
//       excerpt: "Discover the latest hair styling trends and techniques popular across African countries.",
//       image: "/placeholder.svg?height=200&width=400",
//       category: "Beauty",
//       author: "Grace Ochieng",
//       publishedAt: "2024-01-08",
//       readTime: "6 min read",
//     },
//     {
//       id: "5",
//       title: "Starting Your Service Business: A Professional's Guide",
//       excerpt: "Tips for skilled workers looking to grow their business and attract more customers.",
//       image: "/placeholder.svg?height=200&width=400",
//       category: "Business",
//       author: "Michael Asante",
//       publishedAt: "2024-01-05",
//       readTime: "8 min read",
//     },
//     {
//       id: "6",
//       title: "Seasonal Home Maintenance Checklist",
//       excerpt: "Keep your home in top condition with this comprehensive seasonal maintenance guide.",
//       image: "/placeholder.svg?height=200&width=400",
//       category: "Home Maintenance",
//       author: "TaskLink Team",
//       publishedAt: "2024-01-03",
//       readTime: "12 min read",
//     },
//   ]

//   const categories = ["All", "Home Maintenance", "Safety", "DIY & Tips", "Beauty", "Business"]

//   return (
//     <div className="space-y-8">
//       {/* Categories */}
//       <div className="flex flex-wrap gap-2">
//         {categories.map((category) => (
//           <Badge
//             key={category}
//             variant="outline"
//             className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
//           >
//             {category}
//           </Badge>
//         ))}
//       </div>

//       {/* Blog Posts Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {blogs.map((blog) => (
//           <Card key={blog.id} className="group hover:shadow-lg transition-all duration-300">
//             <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
//               <img
//                 src={blog.image || "/placeholder.svg"}
//                 alt={blog.title}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//               />
//             </div>
//             <CardContent className="p-6">
//               <div className="flex items-center gap-2 mb-3">
//                 <Badge variant="secondary">{blog.category}</Badge>
//                 <span className="text-xs text-muted-foreground">{blog.readTime}</span>
//               </div>

//               <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
//                 {blog.title}
//               </h3>

//               <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{blog.excerpt}</p>

//               <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
//                 <div className="flex items-center gap-1">
//                   <User className="w-3 h-3" />
//                   <span>{blog.author}</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Calendar className="w-3 h-3" />
//                   <span>{formatDate(blog.publishedAt)}</span>
//                 </div>
//               </div>

//               <Link
//                 href={`/blog/${blog.id}`}
//                 className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium"
//               >
//                 Read More
//                 <ArrowRight className="w-4 h-4 ml-1" />
//               </Link>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }
