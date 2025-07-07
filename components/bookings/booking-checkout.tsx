"use client";

import { useState } from "react";
import { useBookingStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CreditCard, User, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function BookingCheckout() {
  const { items, getTotalAmount, clearItems } = useBookingStore();
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const [isProcessing, setIsProcessing] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    address: "",
    specialInstructions: "",
  });

  const totalAmount = getTotalAmount();
  const serviceFee = totalAmount * 0.05; // 5% service fee
  const finalTotal = totalAmount + serviceFee;

  const handleCheckout = async () => {
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to complete booking.",
        variant: "destructive",
      });
      router.push("/auth/signin");
      return;
    }

    if (!contactInfo.phone || !contactInfo.address) {
      toast({
        title: "Missing information",
        description: "Please provide your phone number and address.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Create bookings for each item
      const bookingPromises = items.map(async (item) => {
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            workerId: item.workerId,
            serviceId: item.serviceId,
            estimatedHours: item.estimatedHours,
            totalAmount: item.hourlyRate * item.estimatedHours,
            jobTitle: item.jobTitle,
            jobDescription: item.jobDescription,
            scheduledDate: item.scheduledDate,
            contactInfo,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to create booking for ${item.workerName}`);
        }

        return response.json();
      });

      const bookings = await Promise.all(bookingPromises);

      // Initialize payment
      const paymentResponse = await fetch("/api/payment/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: finalTotal,
          bookingIds: bookings.map((b) => b.id),
          email: session.user?.email,
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error("Failed to initialize payment");
      }

      const paymentData = await paymentResponse.json();

      // Clear cart and redirect to payment
      clearItems();

      toast({
        title: "Bookings created successfully!",
        description: `${items.length} booking${
          items.length > 1 ? "s" : ""
        } created. Redirecting to payment...`,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description:
          "There was an error processing your bookings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No items in cart</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+234 xxx xxx xxxx"
              value={contactInfo.phone}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, phone: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Service Address *</Label>
            <Textarea
              id="address"
              placeholder="Enter the address where services will be performed"
              value={contactInfo.address}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, address: e.target.value })
              }
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Special Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="Any special instructions for the workers"
              value={contactInfo.specialInstructions}
              onChange={(e) =>
                setContactInfo({
                  ...contactInfo,
                  specialInstructions: e.target.value,
                })
              }
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Items */}
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={`${item.workerId}-${item.serviceId}`}
                className="flex justify-between items-start"
              >
                <div className="flex-1">
                  <p className="font-medium">{item.workerName}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.serviceName}
                  </p>
                  <Badge variant="outline" className="mt-1">
                    {item.estimatedHours}h × {formatCurrency(item.hourlyRate)}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {formatCurrency(item.hourlyRate * item.estimatedHours)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Totals */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Service Fee (5%)</span>
              <span>{formatCurrency(serviceFee)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">{formatCurrency(finalTotal)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <Button
            onClick={handleCheckout}
            className="w-full"
            size="lg"
            disabled={
              isProcessing || !contactInfo.phone || !contactInfo.address
            }
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {isProcessing
              ? "Processing..."
              : `Pay ${formatCurrency(finalTotal)}`}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By proceeding, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
