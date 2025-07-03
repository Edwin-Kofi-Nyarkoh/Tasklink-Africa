import { BookingCart } from "@/components/bookings/booking-cart"
import { BookingCheckout } from "@/components/bookings/booking-checkout"

export default function BookingCartPage() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Bookings</h1>
          <p className="text-muted-foreground">Review your selected services and proceed to checkout.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BookingCart />
          </div>
          <div className="lg:col-span-1">
            <BookingCheckout />
          </div>
        </div>
      </div>
    </div>
  )
}
