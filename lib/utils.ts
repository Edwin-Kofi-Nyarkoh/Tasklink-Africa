import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import QRCode from "qrcode"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTicketNumber(): string {
  return `TL${Date.now().toString().slice(-6)}${Math.random().toString(36).substring(2, 5).toUpperCase()}`
}

export async function generateQRCode(data: string): Promise<string> {
  try {
    return await QRCode.toDataURL(data)
  } catch (error) {
    console.error("Error generating QR code:", error)
    throw error
  }
}

export function formatCurrency(amount: number, currency = "NGN"): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export function formatTime(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}
