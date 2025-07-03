import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  linkText: string
  linkHref: string
}

export function AuthLayout({ children, title, subtitle, linkText, linkHref }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="font-bold text-2xl text-primary">TaskLink</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href={linkHref} className="text-sm text-muted-foreground hover:text-primary">
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  )
}
