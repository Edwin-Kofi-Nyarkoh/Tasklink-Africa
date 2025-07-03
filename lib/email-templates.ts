export const bookingConfirmationTemplate = (data: {
  customerName: string
  workerName: string
  serviceName: string
  date: string
  time: string
  address: string
  amount: string
  ticketNumber: string
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Booking Confirmation - TaskLink Africa</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2BC0E4; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .booking-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
    .footer { text-align: center; padding: 20px; color: #666; }
    .button { background: #2BC0E4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Booking Confirmed!</h1>
    </div>
    
    <div class="content">
      <p>Hi ${data.customerName},</p>
      
      <p>Great news! Your booking with <strong>${data.workerName}</strong> has been confirmed.</p>
      
      <div class="booking-details">
        <h3>📋 Booking Details</h3>
        <p><strong>Service:</strong> ${data.serviceName}</p>
        <p><strong>Date & Time:</strong> ${data.date} at ${data.time}</p>
        <p><strong>Location:</strong> ${data.address}</p>
        <p><strong>Amount:</strong> ${data.amount}</p>
        <p><strong>Ticket Number:</strong> ${data.ticketNumber}</p>
      </div>
      
      <p>Your professional will arrive at the scheduled time. You'll receive a QR code ticket for verification.</p>
      
      <p style="text-align: center;">
        <a href="${process.env.NEXTAUTH_URL}/dashboard" class="button">View Dashboard</a>
      </p>
    </div>
    
    <div class="footer">
      <p>Need help? Contact us at support@tasklinkafrica.com</p>
      <p>© 2024 TaskLink Africa. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`

export const workerBookingTemplate = (data: {
  workerName: string
  customerName: string
  serviceName: string
  date: string
  time: string
  address: string
  amount: string
  ticketNumber: string
  customerPhone: string
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Booking - TaskLink Africa</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2BC0E4; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .booking-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
    .footer { text-align: center; padding: 20px; color: #666; }
    .button { background: #2BC0E4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔔 New Booking Received!</h1>
    </div>
    
    <div class="content">
      <p>Hi ${data.workerName},</p>
      
      <p>You have a new booking from <strong>${data.customerName}</strong>!</p>
      
      <div class="booking-details">
        <h3>📋 Job Details</h3>
        <p><strong>Service:</strong> ${data.serviceName}</p>
        <p><strong>Date & Time:</strong> ${data.date} at ${data.time}</p>
        <p><strong>Location:</strong> ${data.address}</p>
        <p><strong>Amount:</strong> ${data.amount}</p>
        <p><strong>Ticket Number:</strong> ${data.ticketNumber}</p>
        <p><strong>Customer Phone:</strong> ${data.customerPhone}</p>
      </div>
      
      <p>Please confirm your availability and prepare for the job. Contact the customer if you need any clarification.</p>
      
      <p style="text-align: center;">
        <a href="${process.env.NEXTAUTH_URL}/dashboard" class="button">View Dashboard</a>
      </p>
    </div>
    
    <div class="footer">
      <p>Need help? Contact us at support@tasklinkafrica.com</p>
      <p>© 2024 TaskLink Africa. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`
