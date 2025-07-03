import { WorkerOnboardingForm } from "@/components/worker/worker-onboarding-form"
import { WorkerBenefits } from "@/components/worker/worker-benefits"

export default function BecomeWorkerPage() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Join as a Professional</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Grow your business by connecting with customers who need your skills. Join thousands of professionals
            already earning on TaskLink.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <WorkerBenefits />
          <WorkerOnboardingForm />
        </div>
      </div>
    </div>
  )
}
