import { z } from "zod"

// User validation schemas
export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
})

// Worker profile validation
export const workerProfileSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  experience: z.number().min(0, "Experience cannot be negative").max(50, "Experience cannot exceed 50 years"),
  hourlyRate: z.number().min(500, "Hourly rate must be at least ₦500").max(50000, "Hourly rate cannot exceed ₦50,000"),
  services: z.array(z.string()).min(1, "At least one service must be selected"),
  languages: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
})

// Booking validation
export const bookingSchema = z.object({
  workerId: z.string().min(1, "Worker ID is required"),
  serviceId: z.string().min(1, "Service ID is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  customerAddress: z.string().min(10, "Address must be at least 10 characters"),
  customerPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  scheduledDate: z.string().refine((date) => new Date(date) > new Date(), "Scheduled date must be in the future"),
  estimatedHours: z.number().min(0.5, "Minimum 0.5 hours").max(24, "Maximum 24 hours"),
})

// Message validation
export const messageSchema = z.object({
  bookingId: z.string().min(1, "Booking ID is required"),
  receiverId: z.string().min(1, "Receiver ID is required"),
  content: z.string().min(1, "Message cannot be empty").max(1000, "Message too long"),
  messageType: z.enum(["TEXT", "IMAGE", "FILE"]).default("TEXT"),
})

// Review validation
export const reviewSchema = z.object({
  bookingId: z.string().min(1, "Booking ID is required"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  comment: z.string().max(500, "Comment too long").optional(),
})

// Search validation
export const searchSchema = z.object({
  query: z.string().optional(),
  location: z.string().optional(),
  serviceId: z.string().optional(),
  minRate: z.number().min(0).optional(),
  maxRate: z.number().min(0).optional(),
  availability: z.boolean().optional(),
  verified: z.boolean().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(20),
})

export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors.map((e) => e.message).join(", "))
    }
    throw error
  }
}
