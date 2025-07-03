"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

export function MessagesList() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - in real app, this would come from API
  const conversations = [
    {
      id: "1",
      workerName: "John Adebayo",
      workerImage: "/placeholder.svg",
      lastMessage: "I'll be there at 2 PM as scheduled",
      timestamp: "2 min ago",
      unreadCount: 2,
      bookingTitle: "Electrical Repair",
    },
    {
      id: "2",
      workerName: "Sarah Okafor",
      workerImage: "/placeholder.svg",
      lastMessage: "Thank you for choosing my services!",
      timestamp: "1 hour ago",
      unreadCount: 0,
      bookingTitle: "Hair Styling",
    },
    {
      id: "3",
      workerName: "Michael Asante",
      workerImage: "/placeholder.svg",
      lastMessage: "The plumbing work is complete",
      timestamp: "Yesterday",
      unreadCount: 1,
      bookingTitle: "Pipe Repair",
    },
  ]

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="flex items-center space-x-3 p-4 hover:bg-muted/50 cursor-pointer border-b last:border-b-0"
            >
              <Avatar className="w-12 h-12">
                <AvatarImage src={conversation.workerImage || "/placeholder.svg"} />
                <AvatarFallback>
                  {conversation.workerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium truncate">{conversation.workerName}</h4>
                  <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                <p className="text-xs text-muted-foreground mt-1">{conversation.bookingTitle}</p>
              </div>
              {conversation.unreadCount > 0 && (
                <Badge variant="default" className="bg-primary">
                  {conversation.unreadCount}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
