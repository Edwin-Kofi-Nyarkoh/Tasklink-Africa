"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin } from "lucide-react"
import { HeroStats } from "./hero-stats"
import { HeroImage } from "./hero-image"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Find Trusted <span className="text-primary">Professionals</span> Near You
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Connect with verified skilled workers across Africa. Book plumbers, electricians, carpenters,
                hairdressers, and more with confidence.
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-2xl border shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="What service do you need?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lagos">Lagos, Nigeria</SelectItem>
                      <SelectItem value="abuja">Abuja, Nigeria</SelectItem>
                      <SelectItem value="accra">Accra, Ghana</SelectItem>
                      <SelectItem value="nairobi">Nairobi, Kenya</SelectItem>
                      <SelectItem value="cape-town">Cape Town, South Africa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Link href={`/workers?search=${searchQuery}&location=${location}`}>
                  <Button className="w-full h-10">Search Workers</Button>
                </Link>
              </div>
            </div>

            <HeroStats />
          </div>

          <HeroImage />
        </div>
      </div>
    </section>
  )
}
