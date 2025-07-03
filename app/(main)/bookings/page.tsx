import { BookingsList } from "@/components/bookings/bookings-list"
import { BookingsFilters } from "@/components/bookings/bookings-filters"

export default function BookingsPage() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Manage all your service bookings and track their progress.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <BookingsFilters />
          </div>
          <div className="lg:col-span-3">
            <BookingsList />
          </div>
        </div>
      </div>
    </div>
  )
}
