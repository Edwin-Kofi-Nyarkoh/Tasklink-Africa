import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "./api"
interface WorkerFilters {
  search?: string
  location?: string
  minRate?: number
  maxRate?: number
  availability?: "available" | "busy"
  verified?: boolean
  serviceId?: string[] // or string if you support only one
}

export interface BlogFilters {
  category?: string
  author?: string
  search?: string       // searches in title or excerpt
  page?: number         // for pagination
  limit?: number        // default: 10 or your preferred page size
}

// Workers queries
export const useWorkers = (filters?: WorkerFilters) => {
  return useQuery({
    queryKey: ["workers", filters],
    queryFn: async () => {
      const { data } = await api.get("/workers", { params: filters })
      return data
    },
  })
}


export const useWorker = (id: string) => {
  return useQuery({
    queryKey: ["worker", id],
    queryFn: async () => {
      const { data } = await api.get(`/workers/${id}`)
      return data
    },
    enabled: !!id,
  })
}

//blog queries
// Fetch all blog posts with filters
export const useBlogPosts = (filter?: BlogFilters) => {
  return useQuery({
    queryKey: ["blogPosts", filter],
    queryFn: async () => {
      const { data } = await api.get("/blog", { params: filter })
      return data
    }
  })
}

// Fetch single post by ID
export const useBlogPost = (id: string) => {
  return useQuery({
    queryKey: ["blogPosts", id],
    queryFn: async () => {
      const { data } = await api.get(`/blog/${id}`)
      return data
    },
    enabled: !!id
  })
}

export const useHelpSearch = (query: string) => {
  return useQuery({
    queryKey: ["help", query],
    queryFn: async () => {
      const {data} = await api.get(`/help?query=${encodeURIComponent(query)}`)
      return data
    },
    enabled: query.length > 2,
  })
}

export const useAllArticles = () => {
  return useQuery({
    queryKey: ["help", "articles"],
    queryFn: async () => {
      const {data} = await api.get("/help/articles")
      return data
    },
  })
}

export const usePopularArticles = () => {
  return useQuery({
    queryKey: ["help", "popular"],
    queryFn: async () => {
      const {data} = await api.get("/help/articles/popular")
      console.log("Popular articles fetched:", data)
      return data
    },
  })
}

// Services queries
export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data } = await api.get("/services")
      return data
    },
  })
}

export const useHelpArticle = (id: string) => {
  return useQuery({
    queryKey: ["help", "article", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await api.get(`/help/articles/${id}`)
      return data
    },
  })
}

// Bookings queries
export const useBookings = (filters?: any) => {
  return useQuery({
    queryKey: ["bookings", filters],
    queryFn: async () => {
      const { data } = await api.get("/bookings", { params: filters })
      return data
    },
  })
}

export const useBooking = (id: string) => {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      const { data } = await api.get(`/bookings/${id}`)
      return data
    },
    enabled: !!id,
  })
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (bookingData: any) => {
      const { data } = await api.post("/bookings", bookingData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
    },
  })
}

export const useUpdateBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...updateData }: any) => {
      const { data } = await api.put(`/bookings/${id}`, updateData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
    },
  })
}

// Messages queries
export const useMessages = (bookingId: string) => {
  return useQuery({
    queryKey: ["messages", bookingId],
    queryFn: async () => {
      const { data } = await api.get(`/messages/${bookingId}`)
      return data
    },
    enabled: !!bookingId,
  })
}

export const useSendMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (messageData: any) => {
      const { data } = await api.post("/messages", messageData)
      return data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["messages", variables.bookingId] })
    },
  })
}

// Reviews queries
export const useReviews = (workerId?: string) => {
  return useQuery({
    queryKey: ["reviews", workerId],
    queryFn: async () => {
      const { data } = await api.get("/reviews", { params: { workerId } })
      return data
    },
    enabled: !!workerId,
  })
}

export const useCreateReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (reviewData: any) => {
      const { data } = await api.post("/reviews", reviewData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] })
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
    },
  })
}

// Search queries
export const useSearch = (searchParams: any) => {
  return useQuery({
    queryKey: ["search", searchParams],
    queryFn: async () => {
      const { data } = await api.get("/search", { params: searchParams })
      return data
    },
    enabled: !!searchParams.q || !!searchParams.location,
  })
}

// Dashboard queries
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const { data } = await api.get("/dashboard/stats")
      return data
    },
  })
}

// Notifications queries
export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data } = await api.get("/notifications")
      return data
    },
  })
}

export const useUpdateNotification = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ notificationId, isRead }: any) => {
      const { data } = await api.put("/notifications", { notificationId, isRead })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    },
  })
}

// Upload mutation
export const useUpload = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append("file", file)
      const { data } = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return data
    },
  })
}

// Analytics mutation
export const useTrackEvent = () => {
  return useMutation({
    mutationFn: async (eventData: any) => {
      const { data } = await api.post("/analytics", eventData)
      return data
    },
  })
}
