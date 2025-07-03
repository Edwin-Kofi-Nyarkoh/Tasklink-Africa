import { CheckCircle, Star } from "lucide-react"

export function HeroImage() {
  return (
    <div className="relative">
      <div className="relative z-10">
        <img
          src="https://res.cloudinary.com/dggaqzud0/image/upload/v1751066199/worker1_rvnba1.png"
          alt="Professional worker"
          className="rounded-2xl shadow-2xl w-full h-auto"
        />
      </div>

      {/* Floating Cards */}
      <div className="absolute -top-4 -left-4 bg-background border rounded-lg p-4 shadow-lg z-20">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-semibold text-sm">Verified</div>
            <div className="text-xs text-muted-foreground">Background checked</div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 -right-4 bg-background border rounded-lg p-4 shadow-lg z-20">
        <div className="flex items-center space-x-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <div>
            <div className="font-semibold text-sm">4.9/5</div>
            <div className="text-xs text-muted-foreground">1,234 reviews</div>
          </div>
        </div>
      </div>
    </div>
  )
}
