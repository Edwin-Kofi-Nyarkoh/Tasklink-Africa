import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { amount, bookingId } = body;

    // Initialize Paystack payment
    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          amount: amount * 100, // Paystack expects amount in kobo
          reference: `booking_${bookingId}_${Date.now()}`,
          callback_url: `${process.env.NEXTAUTH_URL}/bookings/verify`,
          metadata: {
            bookingId,
            userId: session.user.id,
          },
        }),
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
      return NextResponse.json(
        { error: "Payment initialization failed" },
        { status: 400 }
      );
    }

    return NextResponse.json(paystackData.data);
  } catch (error) {
    console.error("Error initializing payment:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}
