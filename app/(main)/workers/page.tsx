import { WorkersGrid } from "@/components/workers/workers-grid"
import { WorkersFilters } from "@/components/workers/workers-filters"
import { WorkersSearch } from "@/components/workers/workers-search"

export default function WorkersPage() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Professionals</h1>
          <p className="text-muted-foreground">
            Browse verified professionals in your area and book their services instantly.
          </p>
        </div>

        <WorkersSearch />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <div className="lg:col-span-1">
            <WorkersFilters />
          </div>
          <div className="lg:col-span-3">
            <WorkersGrid />
          </div>
        </div>
      </div>
    </div>
  )
}
