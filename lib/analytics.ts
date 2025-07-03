// Google Analytics and custom analytics
export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
}

export function trackEvent({ action, category, label, value }: AnalyticsEvent) {
  // Google Analytics 4
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }

  // Custom analytics (you can send to your own backend)
  if (typeof window !== "undefined") {
    fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: action,
        category,
        label,
        value,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    }).catch(console.error)
  }
}

export function trackPageView(url: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

export function trackBooking(data: {
  workerId: string
  serviceId: string
  amount: number
  location: string
}) {
  trackEvent({
    action: "booking_created",
    category: "booking",
    label: `${data.serviceId}_${data.location}`,
    value: data.amount,
  })
}

export function trackWorkerView(workerId: string, serviceName: string) {
  trackEvent({
    action: "worker_profile_view",
    category: "worker",
    label: `${workerId}_${serviceName}`,
  })
}

export function trackSearch(query: string, location: string, resultsCount: number) {
  trackEvent({
    action: "search",
    category: "search",
    label: `${query}_${location}`,
    value: resultsCount,
  })
}
