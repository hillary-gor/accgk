"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { v4 as uuidv4 } from "uuid"

export default function HelpPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a support request",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Create complaint/support request
      const { error } = await supabase.from("complaints").insert({
        id: uuidv4(),
        user_id: user.id,
        subject: formData.subject,
        description: formData.message,
        status: "open",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      toast({
        title: "Request Submitted",
        description: "Your support request has been submitted successfully. We'll get back to you soon.",
      })

      // Clear form
      setFormData({
        subject: "",
        message: "",
      })
    } catch (error: any) {
      console.error("Error submitting support request:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to submit support request",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Help & Support</h2>
          <p className="text-muted-foreground">Get help with your account or submit a support request</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I apply for a caregiver license?</AccordionTrigger>
                    <AccordionContent>
                      To apply for a caregiver license, navigate to the Licenses section in your dashboard and click on
                      "Apply for License". Fill out the application form, pay the required fee, and submit your
                      application. Your application will be reviewed by our team, and you'll be notified of the outcome.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How long does the license approval process take?</AccordionTrigger>
                    <AccordionContent>
                      The license approval process typically takes 5-7 business days. You can check the status of your
                      application in the Licenses section of your dashboard.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I enroll in a training program?</AccordionTrigger>
                    <AccordionContent>
                      To enroll in a training program, go to the Training section in your dashboard, browse the
                      available programs, and click "Enroll Now" on the program you're interested in. You can track your
                      progress and access course materials from your dashboard.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I update my profile information?</AccordionTrigger>
                    <AccordionContent>
                      You can update your profile information by navigating to the Profile section in your dashboard.
                      Click on "Edit Profile" to update your personal details, contact information, and professional
                      background.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do I renew my license or certification?</AccordionTrigger>
                    <AccordionContent>
                      When your license or certification is approaching its expiry date, you'll receive a notification.
                      To renew, go to the Licenses or Certifications section in your dashboard and click on "Renew" next
                      to the expiring item. Follow the instructions to complete the renewal process.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Reach out to us directly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">support@accgk.org</p>
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-sm text-muted-foreground">+254 700 123 456</p>
                </div>
                <div>
                  <h3 className="font-medium">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">Monday to Friday, 8:00 AM to 5:00 PM EAT</p>
                </div>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-sm text-muted-foreground">
                    Association of Certified Caregivers Kenya
                    <br />
                    123 Kenyatta Avenue
                    <br />
                    Nairobi, Kenya
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Submit a Support Request</CardTitle>
                <CardDescription>
                  Need help with something specific? Submit a support request and we'll get back to you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="e.g., License Application Issue"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Describe your issue or question in detail"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[200px]"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Request"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
