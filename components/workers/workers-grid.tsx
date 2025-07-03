"use client"

import { useWorkers } from "@/lib/queries"
import { WorkerCard } from "./worker-card"
import { WorkerCardSkeleton } from "./worker-card-skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function WorkersGrid() {
  const { data: workers, isLoading, error } = useWorkers()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <WorkerCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load workers. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  if (!workers || workers.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">No workers found</h3>
        <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workers.map((worker: any) => (
        <WorkerCard key={worker.id} worker={worker} />
      ))}
    </div>
  )
}
