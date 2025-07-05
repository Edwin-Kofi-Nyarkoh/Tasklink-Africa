"use client"

import { useSearchParams } from "next/navigation"
import { useWorkers } from "@/lib/queries"
import { WorkerCard } from "./worker-card"
import { WorkerCardSkeleton } from "./worker-card-skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function WorkersGrid() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<Record<string, string> | undefined>(undefined)

  useEffect(() => {
    const query: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      query[key] = value
    })

    // Only set filters if there's something to filter
    setFilters(Object.keys(query).length > 0 ? query : undefined)
  }, [searchParams])

  const { data: workers, isLoading, error } = useWorkers(filters)

  if (isLoading || filters === undefined && searchParams.size > 0) {
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
        <p className="text-muted-foreground">
          {filters ? "Try adjusting your search or filters." : "There are no workers available at the moment."}
        </p>
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
