"use client"

import { useWorker } from "@/lib/queries"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface WorkerTabsProps {
  workerId: string
}

export function WorkerTabs({ workerId }: WorkerTabsProps) {
  const { data: worker } = useWorker(workerId)

  if (!worker) return null

  return (
    <div className="mt-6">
      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({worker.totalReviews})</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Previous Work</h3>
              {worker.workSamples && worker.workSamples.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {worker.workSamples.map((sample: any) => (
                    <div key={sample.id} className="space-y-2">
                      <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                        <img
                          src={sample.imageUrl || "/placeholder.svg?height=200&width=200"}
                          alt={sample.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{sample.title}</h4>
                        {sample.description && <p className="text-sm text-muted-foreground">{sample.description}</p>}
                        <p className="text-xs text-muted-foreground mt-1">Completed {formatDate(sample.completedAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No portfolio items available yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Customer Reviews</h3>
              {worker.reviews && worker.reviews.length > 0 ? (
                <div className="space-y-6">
                  {worker.reviews.map((review: any) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={review.customer.image || "/placeholder.svg"} />
                          <AvatarFallback>
                            {review.customer.name
                              ?.split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{review.customer.name}</h4>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-2">{review.comment}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(review.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No reviews yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Professional Background</h3>
                  <p className="text-muted-foreground leading-relaxed">{worker.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Experience</h3>
                  <p className="text-muted-foreground">{worker.experience} years in the industry</p>
                </div>

                {worker.certifications && worker.certifications.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Certifications & Qualifications</h3>
                    <div className="space-y-2">
                      {worker.certifications.map((cert: string, index: number) => (
                        <Badge key={index} variant="outline" className="mr-2 mb-2">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-3">Member Since</h3>
                  <p className="text-muted-foreground">{formatDate(worker.user.createdAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
