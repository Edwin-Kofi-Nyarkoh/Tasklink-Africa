import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MessagesList } from "@/components/messages/messages-list"
import { ChatWindow } from "@/components/messages/chat-window"

export default function MessagesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
            <p className="text-muted-foreground">Chat with professionals about your bookings and services.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
            <div className="lg:col-span-1">
              <MessagesList />
            </div>
            <div className="lg:col-span-2">
              <ChatWindow />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
