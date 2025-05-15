"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"

export default function EditProgramPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "draft",
  })

  const programId = params.id as string

  useEffect(() => {
    if (!user) return

    const fetchProgramDetails = async () => {
      setIsLoading(true)
      try {
        // Verify user is a trainer
        if (user.user_metadata?.role !== "trainer") {
          router.push("/dashboard")
          return
        }

        // Fetch program details
        const { data, error } = await supabase
          .from("training_programs")
          .select("*")
          .eq("id", programId)
          .eq("trainer_id", user.id)
          .single()

        if (error) throw error

        setFormData({
          title: data.title,
          description: data.description,
          status: data.status,
        })
      } catch (error) {
        console.error("Error fetching program details:", error)
        toast({
          title: "Error",
          description: "Failed to fetch program details or you don't have permission to edit this program",
          variant: "destructive",
        })
        router.push("/programs")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProgramDetails()
  }, [user, programId, router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to update a training program",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      // Update training program
      const { error } = await supabase
        .from("training_programs")
        .update({
          title: formData.title,
          description: formData.description,
          status: formData.status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", programId)
        .eq("trainer_id", user.id)

      if (error) throw error

      toast({
        title: "Program Updated",
        description: "Your training program has been updated successfully.",
      })

      // Redirect to programs page
      router.push("/programs")
    } catch (error: any) {
      console.error("Error updating training program:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update training program",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Edit Training Program</h2>
          <p className="text-muted-foreground">Update your training program details</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Program Details</CardTitle>
              <CardDescription>Edit the details of your training program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Program Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Program Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="min-h-[200px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Program Status</Label>
                <RadioGroup
                  value={formData.status}
                  onValueChange={handleRadioChange}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="draft" id="draft" />
                    <Label htmlFor="draft" className="font-normal">
                      Draft - Save as draft (not visible to caregivers)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="published" id="published" />
                    <Label htmlFor="published" className="font-normal">
                      Published - Make available for enrollment
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="archived" id="archived" />
                    <Label htmlFor="archived" className="font-normal">
                      Archived - Hide from all users
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/programs")} type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardShell>
  )
}
