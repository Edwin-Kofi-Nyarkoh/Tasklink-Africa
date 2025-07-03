"use client"

import { useState } from "react"
import { useBookingStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Edit3, Save, X, Calendar, Clock } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export function BookingCart() {
  const { items, removeItem, updateItem, clearItems } = useBookingStore()
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({
    estimatedHours: 1,
    jobTitle: "",
    jobDescription: "",
    scheduledDate: "",
  })

  const startEditing = (item: any) => {
    setEditingItem(`${item.workerId}-${item.serviceId}`)
    setEditForm({
      estimatedHours: item.estimatedHours,
      jobTitle: item.jobTitle || "",
      jobDescription: item.jobDescription || "",
      scheduledDate: item.scheduledDate || "",
    })
  }

  const saveEdit = (workerId: string, serviceId: string) => {
    updateItem(workerId, serviceId, editForm)
    setEditingItem(null)
  }

  const cancelEdit = () => {
    setEditingItem(null)
    setEditForm({
      estimatedHours: 1,
      jobTitle: "",
      jobDescription: "",
      scheduledDate: "",
    })
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">Your booking cart is empty</h3>
          <p className="text-muted-foreground mb-4">Add services to your cart to get started.</p>
          <Button asChild>
            <a href="/workers">Browse Workers</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Your Bookings ({items.length})
        </CardTitle>
        <Button variant="outline" size="sm" onClick={clearItems} className="bg-transparent">
          Clear All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => {
          const itemKey = `${item.workerId}-${item.serviceId}`
          const isEditing = editingItem === itemKey

          return (
            <div key={itemKey} className="border rounded-lg p-4 space-y-4">
              {/* Item Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{item.workerName}</h4>
                  <p className="text-muted-foreground">{item.serviceName}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.estimatedHours} hour{item.estimatedHours > 1 ? "s" : ""}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{formatCurrency(item.hourlyRate)}/hour</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">
                    {formatCurrency(item.hourlyRate * item.estimatedHours)}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {!isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditing(item)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.workerId, item.serviceId)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              {(item.jobTitle || item.jobDescription || item.scheduledDate) && !isEditing && (
                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  {item.jobTitle && (
                    <div>
                      <span className="text-sm font-medium">Job: </span>
                      <span className="text-sm">{item.jobTitle}</span>
                    </div>
                  )}
                  {item.jobDescription && (
                    <div>
                      <span className="text-sm font-medium">Description: </span>
                      <span className="text-sm">{item.jobDescription}</span>
                    </div>
                  )}
                  {item.scheduledDate && (
                    <div>
                      <span className="text-sm font-medium">Scheduled: </span>
                      <span className="text-sm">{new Date(item.scheduledDate).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Edit Form */}
              {isEditing && (
                <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Estimated Hours */}
                    <div className="space-y-2">
                      <Label>Estimated Hours</Label>
                      <Select
                        value={editForm.estimatedHours.toString()}
                        onValueChange={(value) => setEditForm({ ...editForm, estimatedHours: Number(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                            <SelectItem key={hour} value={hour.toString()}>
                              {hour} hour{hour > 1 ? "s" : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Scheduled Date */}
                    <div className="space-y-2">
                      <Label>Preferred Date</Label>
                      <Input
                        type="datetime-local"
                        value={editForm.scheduledDate}
                        onChange={(e) => setEditForm({ ...editForm, scheduledDate: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Job Title */}
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input
                      placeholder="Brief description of the job"
                      value={editForm.jobTitle}
                      onChange={(e) => setEditForm({ ...editForm, jobTitle: e.target.value })}
                    />
                  </div>

                  {/* Job Description */}
                  <div className="space-y-2">
                    <Label>Job Description</Label>
                    <Textarea
                      placeholder="Describe what you need done..."
                      value={editForm.jobDescription}
                      onChange={(e) => setEditForm({ ...editForm, jobDescription: e.target.value })}
                      rows={3}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => saveEdit(item.workerId, item.serviceId)}
                      className="flex items-center gap-1"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={cancelEdit}
                      className="flex items-center gap-1 bg-transparent"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
