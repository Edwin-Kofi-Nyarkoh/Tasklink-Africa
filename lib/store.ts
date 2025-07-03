import { create } from "zustand"
import { persist } from "zustand/middleware"

interface BookingItem {
  workerId: string
  serviceId: string
  workerName: string
  serviceName: string
  hourlyRate: number
  estimatedHours: number
  jobTitle?: string
  jobDescription?: string
  scheduledDate?: string
}

interface BookingStore {
  items: BookingItem[]
  addItem: (item: BookingItem) => void
  removeItem: (workerId: string, serviceId: string) => void
  updateItem: (workerId: string, serviceId: string, updates: Partial<BookingItem>) => void
  clearItems: () => void
  getTotalAmount: () => number
  getItemCount: () => number
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.workerId === item.workerId && i.serviceId === item.serviceId,
          )
          if (existingIndex >= 0) {
            // Update existing item
            const newItems = [...state.items]
            newItems[existingIndex] = { ...newItems[existingIndex], ...item }
            return { items: newItems }
          }
          // Add new item
          return { items: [...state.items, item] }
        }),

      removeItem: (workerId, serviceId) =>
        set((state) => ({
          items: state.items.filter((item) => !(item.workerId === workerId && item.serviceId === serviceId)),
        })),

      updateItem: (workerId, serviceId, updates) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.workerId === workerId && item.serviceId === serviceId ? { ...item, ...updates } : item,
          ),
        })),

      clearItems: () => set({ items: [] }),

      getTotalAmount: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.hourlyRate * item.estimatedHours, 0)
      },

      getItemCount: () => {
        const { items } = get()
        return items.length
      },
    }),
    {
      name: "booking-storage",
    },
  ),
)
