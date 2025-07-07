import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { generateTicketNumber, generateQRCode } from "@/lib/utils";
import { sendBookingEmail, sendBookingSMS } from "@/lib/notifications";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const where: any = {
      customerId: session.user.id,
    };

    if (status) {
      where.status = status;
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        worker: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
                phone: true,
              },
            },
          },
        },
        service: true,
        review: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      workerId,
      serviceId,
      jobTitle,
      jobDescription,
      contactInfo,
      scheduledDate,
      estimatedHours,
      totalAmount,
    } = body;

    // Validate and parse scheduledDate
    let parsedScheduledDate = new Date(scheduledDate);
    if (!scheduledDate || isNaN(parsedScheduledDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid or missing scheduledDate" },
        { status: 400 }
      );
    }

    const ticketNumber = generateTicketNumber();

    const booking = await prisma.booking.create({
      data: {
        customerId: session.user.id,
        workerId,
        serviceId,
        title: jobTitle,
        description: jobDescription,
        customerAddress: contactInfo.address,
        customerPhone: contactInfo.phone,
        scheduledDate: parsedScheduledDate,
        estimatedHours,
        totalAmount,
        ticketNumber: ticketNumber,
      },
      include: {
        customer: true,
        worker: {
          include: {
            user: true,
          },
        },
        service: true,
      },
    });

    // Generate QR codes for both customer and worker
    const qrCodeData = {
      bookingId: booking.id,
      ticketNumber: booking.ticketNumber,
      customerId: booking.customerId,
      workerId: booking.workerId,
    };

    const customerQRCode = await generateQRCode(JSON.stringify(qrCodeData));
    const workerQRCode = await generateQRCode(JSON.stringify(qrCodeData));

    // Create tickets for both customer and worker
    await prisma.ticket.createMany({
      data: [
        {
          bookingId: booking.id,
          userId: booking.customerId,
          ticketNumber: booking.ticketNumber,
          qrCode: customerQRCode,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        },
        {
          bookingId: booking.id,
          userId: booking.worker.userId, // FIX: use worker.userId, not workerId
          ticketNumber: booking.ticketNumber,
          qrCode: workerQRCode,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        },
      ],
    });

    // Send notifications
    await sendBookingEmail(booking);
    await sendBookingSMS(booking);

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
