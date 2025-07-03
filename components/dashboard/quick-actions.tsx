import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, MessageCircle, Settings, Star } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Find Workers",
      description: "Browse and book professionals",
      icon: Search,
      href: "/workers",
      color: "text-blue-600",
    },
    {
      title: "Messages",
      description: "Chat with your workers",
      icon: MessageCircle,
      href: "/messages",
      color: "text-green-600",
    },
    {
      title: "Settings",
      description: "Manage your account",
      icon: Settings,
      href: "/settings",
      color: "text-gray-600",
    },
    {
      title: "Leave Review",
      description: "Rate completed services",
      icon: Star,
      href: "/bookings?status=completed",
      color: "text-yellow-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <Link key={index} href={action.href}>
            <Button variant="ghost" className="w-full justify-start h-auto p-4 bg-transparent">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-muted rounded-full flex items-center justify-center`}>
                  <action.icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-muted-foreground">{action.description}</div>
                </div>
              </div>
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
