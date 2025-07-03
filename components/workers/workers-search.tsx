"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin } from "lucide-react"

export function WorkersSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")

  return (
    <div className="bg-background border rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search for services or professionals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="Location" />
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

        <Button className="w-full">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  )
}
