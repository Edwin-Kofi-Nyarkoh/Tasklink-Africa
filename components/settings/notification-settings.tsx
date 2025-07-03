"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function NotificationSettings() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailMessages: true,
    emailPromotions: false,
    smsBookings: true,
    smsMessages: false,
    pushBookings: true,
    pushMessages: true,
    pushPromotions: false,
  })

  const handleSave = () => {
    toast({
      title: "Notifications updated",
      description: "Your notification preferences have been saved.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Notifications */}
        <div>
          <h3 className="font-semibold mb-4">Email Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailBookings">Booking confirmations and updates</Label>
              <Switch
                id="emailBookings"
                checked={notifications.emailBookings}
                onCheckedChange={(checked) => setNotifications({ ...notifications, emailBookings: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="emailMessages">New messages</Label>
              <Switch
                id="emailMessages"
                checked={notifications.emailMessages}
                onCheckedChange={(checked) => setNotifications({ ...notifications, emailMessages: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="emailPromotions">Promotions and offers</Label>
              <Switch
                id="emailPromotions"
                checked={notifications.emailPromotions}
                onCheckedChange={(checked) => setNotifications({ ...notifications, emailPromotions: checked })}
              />
            </div>
          </div>
        </div>

        {/* SMS Notifications */}
        <div>
          <h3 className="font-semibold mb-4">SMS Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="smsBookings">Booking confirmations and updates</Label>
              <Switch
                id="smsBookings"
                checked={notifications.smsBookings}
                onCheckedChange={(checked) => setNotifications({ ...notifications, smsBookings: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="smsMessages">New messages</Label>
              <Switch
                id="smsMessages"
                checked={notifications.smsMessages}
                onCheckedChange={(checked) => setNotifications({ ...notifications, smsMessages: checked })}
              />
            </div>
          </div>
        </div>

        {/* Push Notifications */}
        <div>
          <h3 className="font-semibold mb-4">Push Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="pushBookings">Booking confirmations and updates</Label>
              <Switch
                id="pushBookings"
                checked={notifications.pushBookings}
                onCheckedChange={(checked) => setNotifications({ ...notifications, pushBookings: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="pushMessages">New messages</Label>
              <Switch
                id="pushMessages"
                checked={notifications.pushMessages}
                onCheckedChange={(checked) => setNotifications({ ...notifications, pushMessages: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="pushPromotions">Promotions and offers</Label>
              <Switch
                id="pushPromotions"
                checked={notifications.pushPromotions}
                onCheckedChange={(checked) => setNotifications({ ...notifications, pushPromotions: checked })}
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSave}>Save Preferences</Button>
      </CardContent>
    </Card>
  )
}
