"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download } from "lucide-react"

export function BillingSettings() {
  // Mock data
  const paymentMethods = [
    {
      id: "1",
      type: "card",
      last4: "4242",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
    {
      id: "2",
      type: "card",
      last4: "5555",
      brand: "Mastercard",
      expiryMonth: 8,
      expiryYear: 2024,
      isDefault: false,
    },
  ]

  const transactions = [
    {
      id: "1",
      date: "2024-01-15",
      description: "Electrical Repair - John Adebayo",
      amount: 15000,
      status: "completed",
    },
    {
      id: "2",
      date: "2024-01-10",
      description: "Plumbing Service - Michael Asante",
      amount: 8500,
      status: "completed",
    },
    {
      id: "3",
      date: "2024-01-05",
      description: "Hair Styling - Sarah Okafor",
      amount: 5000,
      status: "completed",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Payment Methods</CardTitle>
          <Button variant="outline" className="bg-transparent">
            Add Payment Method
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">
                    {method.brand} ending in {method.last4}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Expires {method.expiryMonth}/{method.expiryYear}
                  </div>
                </div>
                {method.isDefault && <Badge>Default</Badge>}
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600">
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Transaction History</CardTitle>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-sm text-muted-foreground">{transaction.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₦{transaction.amount.toLocaleString()}</div>
                  <Badge variant="secondary">{transaction.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
