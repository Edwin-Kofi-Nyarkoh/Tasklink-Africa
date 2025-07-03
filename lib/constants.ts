export const APP_CONFIG = {
  name: "TaskLink Africa",
  description: "Find trusted professionals across Africa",
  url: process.env.NEXTAUTH_URL || "https://tasklinkafrica.com",
  supportEmail: "support@tasklinkafrica.com",
  supportPhone: "+234 800 TASKLINK",

  // Business settings
  serviceFeePercentage: 0.05, // 5%
  minimumBookingHours: 0.5,
  maximumBookingHours: 24,
  cancellationWindowHours: 4,

  // Pagination
  defaultPageSize: 20,
  maxPageSize: 50,

  // File upload limits
  maxImageSize: 5 * 1024 * 1024, // 5MB
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedImageTypes: ["image/jpeg", "image/png", "image/webp"],
  allowedFileTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],

  // Rate limits
  rateLimits: {
    booking: 10, // per hour
    message: 100, // per hour
    search: 1000, // per hour
  },

  // Supported countries and cities
  supportedLocations: {
    nigeria: {
      name: "Nigeria",
      cities: ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt", "Benin City"],
      currency: "NGN",
      currencySymbol: "₦",
    },
    ghana: {
      name: "Ghana",
      cities: ["Accra", "Kumasi", "Tamale", "Cape Coast"],
      currency: "GHS",
      currencySymbol: "₵",
    },
    kenya: {
      name: "Kenya",
      cities: ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
      currency: "KES",
      currencySymbol: "KSh",
    },
    southAfrica: {
      name: "South Africa",
      cities: ["Cape Town", "Johannesburg", "Durban", "Pretoria"],
      currency: "ZAR",
      currencySymbol: "R",
    },
  },
}

export const SERVICE_CATEGORIES = [
  {
    id: "home-maintenance",
    name: "Home Maintenance",
    icon: "home",
    services: ["Plumbing", "Electrical", "Carpentry", "Painting", "Cleaning"],
  },
  {
    id: "personal-care",
    name: "Personal Care",
    icon: "scissors",
    services: ["Hair Styling", "Beauty Services", "Massage Therapy"],
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: "car",
    services: ["Auto Repair", "Car Wash", "Tire Services"],
  },
  {
    id: "technology",
    name: "Technology",
    icon: "laptop",
    services: ["Computer Repair", "Phone Repair", "IT Support"],
  },
  {
    id: "business",
    name: "Business Services",
    icon: "briefcase",
    services: ["Accounting", "Legal Services", "Consulting"],
  },
]

export const BOOKING_STATUSES = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  DISPUTED: "disputed",
} as const

export const PAYMENT_STATUSES = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const

export const MESSAGE_TYPES = {
  TEXT: "text",
  IMAGE: "image",
  FILE: "file",
} as const
