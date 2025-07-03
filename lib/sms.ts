// Hellosend SMS Integration
interface SMSResponse {
  success: boolean
  message: string
  messageId?: string
}

export async function sendSMS(to: string, message: string, from = "TaskLink"): Promise<SMSResponse> {
  try {
    const response = await fetch("https://api.hellosend.com/v1/sms/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HELLOSEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        message,
        from,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        message: "SMS sent successfully",
        messageId: data.messageId,
      }
    } else {
      return {
        success: false,
        message: data.error || "Failed to send SMS",
      }
    }
  } catch (error) {
    console.error("SMS sending error:", error)
    return {
      success: false,
      message: "Failed to send SMS",
    }
  }
}

export async function sendBookingConfirmationSMS(
  phone: string,
  workerName: string,
  serviceName: string,
  date: string,
  ticketNumber: string,
): Promise<SMSResponse> {
  const message = `Hi! Your booking with ${workerName} for ${serviceName} on ${date} is confirmed. Ticket: ${ticketNumber}. - TaskLink Africa`
  return sendSMS(phone, message)
}

export async function sendWorkerNotificationSMS(
  phone: string,
  customerName: string,
  serviceName: string,
  date: string,
  ticketNumber: string,
): Promise<SMSResponse> {
  const message = `New booking from ${customerName} for ${serviceName} on ${date}. Ticket: ${ticketNumber}. Check your TaskLink dashboard. - TaskLink Africa`
  return sendSMS(phone, message)
}
