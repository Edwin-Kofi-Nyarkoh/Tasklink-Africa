import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentBookings } from "@/components/dashboard/recent-bookings";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/api/auth/actions";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="pb-8 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your account.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DashboardStats />
            <RecentBookings />
          </div>
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}
