"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "./profile-settings"
import { NotificationSettings } from "./notification-settings"
import { SecuritySettings } from "./security-settings"
import { BillingSettings } from "./billing-settings"

export function SettingsTabs() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="mt-6">
        <ProfileSettings />
      </TabsContent>

      <TabsContent value="notifications" className="mt-6">
        <NotificationSettings />
      </TabsContent>

      <TabsContent value="security" className="mt-6">
        <SecuritySettings />
      </TabsContent>

      <TabsContent value="billing" className="mt-6">
        <BillingSettings />
      </TabsContent>
    </Tabs>
  )
}
