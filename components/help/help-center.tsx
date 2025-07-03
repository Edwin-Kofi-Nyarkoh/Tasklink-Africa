"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, MessageCircle, Phone, Mail, Book, Users, Shield, CreditCard } from "lucide-react"

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of using TaskLink",
      articles: 12,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      icon: Users,
      title: "For Customers",
      description: "How to book and manage services",
      articles: 8,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
    {
      icon: Shield,
      title: "For Professionals",
      description: "Guide for service providers",
      articles: 15,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
    },
    {
      icon: CreditCard,
      title: "Payments & Billing",
      description: "Payment methods and billing info",
      articles: 6,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
    },
  ]

  const popularArticles = [
    "How to book a service",
    "How to become a verified professional",
    "Payment methods and security",
    "Cancellation and refund policy",
    "How to leave a review",
    "Troubleshooting common issues",
  ]

  const faqs = [
    {
      question: "How do I book a service?",
      answer:
        "Simply search for the service you need, browse available professionals, select one that fits your requirements, and book directly through our platform.",
    },
    {
      question: "Is my payment secure?",
      answer:
        "Yes, all payments are processed through secure, encrypted channels. We use industry-standard security measures to protect your financial information.",
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer:
        "We offer a satisfaction guarantee. Contact our support team within 24 hours if you're not happy with the service, and we'll work to resolve the issue.",
    },
    {
      question: "How do I become a professional on TaskLink?",
      answer:
        "Click 'Join as a Professional', fill out the application form, complete our verification process, and start receiving bookings within 24-48 hours.",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Search */}
      <Card>
        <CardContent className="p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">How can we help you?</h1>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div
                className={`w-12 h-12 ${category.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <category.icon className={`w-6 h-6 ${category.color}`} />
              </div>
              <h3 className="font-semibold mb-2">{category.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
              <Badge variant="secondary">{category.articles} articles</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Articles */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {popularArticles.map((article, index) => (
              <div key={index} className="p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors">
                <p className="text-sm">{article}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Still need help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold mb-2">Live Chat</h4>
              <p className="text-sm text-muted-foreground mb-3">Chat with our support team</p>
              <Button size="sm">Start Chat</Button>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold mb-2">Email Support</h4>
              <p className="text-sm text-muted-foreground mb-3">support@tasklinkafrica.com</p>
              <Button size="sm" variant="outline" className="bg-transparent">
                Send Email
              </Button>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Phone className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold mb-2">Phone Support</h4>
              <p className="text-sm text-muted-foreground mb-3">+234 800 TASKLINK</p>
              <Button size="sm" variant="outline" className="bg-transparent">
                Call Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
