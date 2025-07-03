import { WorkerProfile } from "@/components/workers/worker-profile"
import { WorkerTabs } from "@/components/workers/worker-tabs"
import { WorkerBookingCard } from "@/components/workers/worker-booking-card"

interface WorkerPageProps {
  params: {
    id: string
  }
}

export default function WorkerPage({ params }: WorkerPageProps) {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <WorkerProfile workerId={params.id} />
            <WorkerTabs workerId={params.id} />
          </div>
          <div className="lg:col-span-1">
            <WorkerBookingCard workerId={params.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
