"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useServices } from "@/lib/queries"

export function WorkersFilters() {
  const router = useRouter()
  //const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [availability, setAvailability] = useState<"available" | "busy" | "">("")
  const [verified, setVerified] = useState(false)

  const { data: services } = useServices()

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    setSelectedServices((prev) =>
      checked ? [...prev, serviceId] : prev.filter((id) => id !== serviceId)
    )
  }

  const clearFilters = () => {
    setPriceRange([0, 10000])
    setSelectedServices([])
    setAvailability("")
    setVerified(false)
    router.push("/workers")
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams()

      if (selectedServices.length) {
        selectedServices.forEach((id) => params.append("serviceId", id))
      }

      if (priceRange[0] > 0) params.set("minRate", priceRange[0].toString())
      if (priceRange[1] < 10000) params.set("maxRate", priceRange[1].toString())
      if (availability) params.set("availability", availability)
      if (verified) params.set("verified", "true")

      // Only push if there are any filters applied
      const hasFilters =
        selectedServices.length > 0 ||
        priceRange[0] > 0 ||
        priceRange[1] < 10000 ||
        availability !== "" ||
        verified

      if (hasFilters) {
        router.push(`/workers?${params.toString()}`)
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [selectedServices, priceRange, availability, verified, router])


  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range (per hour)</Label>
          <Slider
            value={priceRange}
            onValueChange={(value: [number, number]) => setPriceRange(value)}
            max={10000}
            min={0}
            step={100}
            className="w-full"
          />
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
            {services?.length ? (
              services.map((service: any) => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={service.id}
                    checked={selectedServices.includes(service.id)}
                    onCheckedChange={(checked) =>
                      handleServiceChange(service.id, Boolean(checked))
                    }
                  />
                  <Label htmlFor={service.id} className="text-sm font-normal cursor-pointer">
                    {service.name}
                  </Label>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No services available</p>
            )}
          </div>
        </div>

        <Separator />

        {/* Availability */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Availability</Label>
          <Select
            value={availability}
            onValueChange={(val) => setAvailability(val as "available" | "busy")}
          >
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
          <Checkbox
            id="verified"
            checked={verified}
            onCheckedChange={(checked) => setVerified(Boolean(checked))}
          />
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
