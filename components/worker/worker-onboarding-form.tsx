"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export function WorkerOnboardingForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    experience: "",
    hourlyRate: "",
    services: [] as string[],
    languages: [] as string[],
    certifications: "",
    agreeToTerms: false,
  })

  const services = [
    "Plumbing",
    "Electrical",
    "Carpentry",
    "Cleaning",
    "Painting",
    "Beauty & Hair",
    "Auto Repair",
    "Tech Support",
  ]

  const languages = ["English", "Hausa", "Yoruba", "Igbo", "French", "Arabic", "Swahili"]

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, services: [...formData.services, service] })
    } else {
      setFormData({ ...formData, services: formData.services.filter((s) => s !== service) })
    }
  }

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, languages: [...formData.languages, language] })
    } else {
      setFormData({ ...formData, languages: formData.languages.filter((l) => l !== language) })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeToTerms) {
      toast({
        title: "Please agree to terms",
        description: "You must agree to the terms and conditions to continue.",
        variant: "destructive",
      })
      return
    }

    if (formData.services.length === 0) {
      toast({
        title: "Select services",
        description: "Please select at least one service you offer.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Application submitted!",
      description: "We'll review your application and get back to you within 24 hours.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join as a Professional</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Professional Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Master Electrician, Professional Plumber"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">About You *</Label>
            <Textarea
              id="description"
              placeholder="Describe your experience, skills, and what makes you unique..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience *</Label>
              <Select
                value={formData.experience}
                onValueChange={(value) => setFormData({ ...formData, experience: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2">1-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate (NGN) *</Label>
              <Input
                id="hourlyRate"
                type="number"
                placeholder="e.g., 2500"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Services You Offer *</Label>
            <div className="grid grid-cols-2 gap-3">
              {services.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={formData.services.includes(service)}
                    onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                  />
                  <Label htmlFor={service} className="text-sm font-normal cursor-pointer">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Languages You Speak</Label>
            <div className="grid grid-cols-2 gap-3">
              {languages.map((language) => (
                <div key={language} className="flex items-center space-x-2">
                  <Checkbox
                    id={language}
                    checked={formData.languages.includes(language)}
                    onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                  />
                  <Label htmlFor={language} className="text-sm font-normal cursor-pointer">
                    {language}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="certifications">Certifications & Qualifications</Label>
            <Textarea
              id="certifications"
              placeholder="List any relevant certifications, licenses, or qualifications..."
              value={formData.certifications}
              onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
            />
            <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
              I agree to the{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </Label>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
