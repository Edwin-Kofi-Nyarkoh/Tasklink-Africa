"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Phone, Video, MoreVertical } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ChatWindow() {
  const [message, setMessage] = useState("")

  // Mock data - in real app, this would come from API
  const messages = [
    {
      id: "1",
      senderId: "worker",
      senderName: "John Adebayo",
      content: "Hello! I received your booking request for electrical repair. When would be a good time for you?",
      timestamp: "10:30 AM",
      isOwn: false,
    },
    {
      id: "2",
      senderId: "customer",
      senderName: "You",
      content: "Hi John! Thanks for reaching out. Would tomorrow afternoon work for you?",
      timestamp: "10:32 AM",
      isOwn: true,
    },
    {
      id: "3",
      senderId: "worker",
      senderName: "John Adebayo",
      content: "Yes, tomorrow afternoon works perfectly. I can be there around 2 PM. Is that okay?",
      timestamp: "10:35 AM",
      isOwn: false,
    },
    {
      id: "4",
      senderId: "customer",
      senderName: "You",
      content:
        "Perfect! 2 PM works great. I'll be home. Do you need any specific information about the electrical issue?",
      timestamp: "10:37 AM",
      isOwn: true,
    },
    {
      id: "5",
      senderId: "worker",
      senderName: "John Adebayo",
      content:
        "It would be helpful if you could describe the issue briefly. Also, please ensure the main power is accessible.",
      timestamp: "10:40 AM",
      isOwn: false,
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // In real app, this would send the message via API
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  return (
    <Card className="h-full flex flex-col">
      {/* Chat Header */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JA</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">John Adebayo</h3>
            <p className="text-sm text-muted-foreground">Electrical Repair</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[400px] p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] ${msg.isOwn ? "order-2" : "order-1"}`}>
                  <div className={`p-3 rounded-lg ${msg.isOwn ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <p className={`text-xs text-muted-foreground mt-1 ${msg.isOwn ? "text-right" : "text-left"}`}>
                    {msg.timestamp}
                  </p>
                </div>
                {!msg.isOwn && (
                  <Avatar className="w-8 h-8 order-1 mr-2">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JA</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!message.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
