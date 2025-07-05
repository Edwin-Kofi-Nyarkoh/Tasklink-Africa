"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, MapPin, Loader2 } from "lucide-react"

export function WorkersSearch() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (searchQuery.trim()) params.set("search", searchQuery)
    if (location.trim()) params.set("location", location)

    startTransition(() => {
      router.push(`/workers?${params.toString()}`)
    })
  }

  return (
    <div className="bg-background border rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search for services or professionals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Location Select */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="lagos">Lagos, Nigeria</SelectItem>
              <SelectItem value="abuja">Abuja, Nigeria</SelectItem>
              <SelectItem value="accra">Accra, Ghana</SelectItem>
              <SelectItem value="nairobi">Nairobi, Kenya</SelectItem>
              <SelectItem value="cape-town">Cape Town, South Africa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button className="w-full" onClick={handleSearch} disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Search
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
