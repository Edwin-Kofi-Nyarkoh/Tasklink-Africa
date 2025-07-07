import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendBookingEmail(booking: any) {
  try {
    // Email to customer
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: booking.customer.email,
      subject: "Booking Confirmation - TaskLink Africa",
      html: `
        <h2>Booking Confirmed!</h2>
        <p>Your booking with ${booking.worker.user.name} has been confirmed.</p>
        <p><strong>Service:</strong> ${booking.service.name}</p>
        <p><strong>Date:</strong> ${new Date(
          booking.scheduledDate
        ).toLocaleDateString()}</p>
        <p><strong>Ticket Number:</strong> ${booking.ticketNumber}</p>
        <p>You will receive a QR code ticket for verification.</p>
      `,
    });

    // Email to worker
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: booking.worker.user.email,
      subject: "New Booking - TaskLink Africa",
      html: `
        <h2>New Booking Received!</h2>
        <p>You have a new booking from ${booking.customer.name}.</p>
        <p><strong>Service:</strong> ${booking.service.name}</p>
        <p><strong>Date:</strong> ${new Date(
          booking.scheduledDate
        ).toLocaleDateString()}</p>
        <p><strong>Ticket Number:</strong> ${booking.ticketNumber}</p>
        <p>Please check your dashboard for more details.</p>
      `,
    });
  } catch (error) {
    console.error("Error sending booking email:", error);
  }
}

export async function sendBookingSMS(booking: any) {
  try {
    // This would integrate with Hellosend SMS API
    const smsData = {
      to: booking.worker.user.phone,
      message: `New booking from TaskLink! Service: ${
        booking.service.name
      }, Date: ${new Date(
        booking.scheduledDate
      ).toLocaleDateString()}, Ticket: ${booking.ticketNumber}`,
    };

    // Implement Hellosend SMS integration here
    console.log("SMS would be sent:", smsData);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
}
