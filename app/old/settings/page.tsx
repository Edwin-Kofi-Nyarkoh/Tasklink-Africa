import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SettingsTabs } from "@/components/settings/settings-tabs"

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences.</p>
          </div>

          <SettingsTabs />
        </div>
      </main>
      <Footer />
    </div>
  )
}
