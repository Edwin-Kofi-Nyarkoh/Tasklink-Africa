"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useServices } from "@/lib/queries"

export function WorkersFilters() {
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [availability, setAvailability] = useState<string>("")
  const [verified, setVerified] = useState(false)

  const { data: services } = useServices()

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, serviceId])
    } else {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId))
    }
  }

  const clearFilters = () => {
    setPriceRange([0, 10000])
    setSelectedServices([])
    setAvailability("")
    setVerified(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range (per hour)</Label>
          <Slider value={priceRange} onValueChange={setPriceRange} max={10000} min={0} step={100} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₦{priceRange[0].toLocaleString()}</span>
            <span>₦{priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        <Separator />

        {/* Services */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Services</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {services?.map((service: any) => (
              <div key={service.id} className="flex items-center space-x-2">
                <Checkbox
                  id={service.id}
                  checked={selectedServices.includes(service.id)}
                  onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                />
                <Label htmlFor={service.id} className="text-sm font-normal cursor-pointer">
                  {service.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Availability */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Availability</Label>
          <Select value={availability} onValueChange={setAvailability}>
            <SelectTrigger>
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available Now</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Verified */}
        <div className="flex items-center space-x-2">
          <Checkbox id="verified" checked={verified} onCheckedChange={setVerified} />
          <Label htmlFor="verified" className="text-sm font-normal cursor-pointer">
            Verified professionals only
          </Label>
        </div>

        <Separator />

        <Button onClick={clearFilters} variant="outline" className="w-full bg-transparent">
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  )
}
