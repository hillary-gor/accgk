"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { initiateSTKPush, generatePaymentReference } from "@/lib/mpesa-service"
import { supabase } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"

export default function LicenseApplicationPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    phoneNumber: "",
    address: "",
    education: "",
    experience: "",
    references: "",
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
        description: "You must be logged in to apply for a license",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Generate a unique license number
      const licenseNumber = `ACCGK-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`

      // Create a payment reference
      const paymentReference = generatePaymentReference()

      // Create license record in pending status
      const { data: licenseData, error: licenseError } = await supabase.from("licenses").insert({
        user_id: user.id,
        license_number: licenseNumber,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (licenseError) throw licenseError

      // Create or update profile information
      const { error: profileError } = await supabase.from("profiles").upsert({
        user_id: user.id,
        first_name: formData.fullName.split(" ")[0],
        last_name: formData.fullName.split(" ").slice(1).join(" "),
        address: formData.address,
        phone_number: formData.phoneNumber,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (profileError) throw profileError

      // Create payment record
      const { data: paymentData, error: paymentError } = await supabase.from("payments").insert({
        id: uuidv4(),
        user_id: user.id,
        amount: 2500, // License application fee in KES
        payment_type: "license",
        status: "pending",
        transaction_id: paymentReference,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (paymentError) throw paymentError

      // Initiate MPesa payment
      const mpesaResponse = await initiateSTKPush(
        formData.phoneNumber,
        2500,
        paymentReference,
        "ACCGK License Application Fee",
      )

      if (!mpesaResponse.success) {
        throw new Error(mpesaResponse.error || "Failed to initiate payment")
      }

      toast({
        title: "Application Submitted",
        description:
          "Your license application has been submitted. Please complete the payment on your phone to finalize the application.",
      })

      // Redirect to payment confirmation page
      router.push(`/payments/confirm?reference=${paymentReference}&type=license`)
    } catch (error: any) {
      console.error("Error submitting license application:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to submit license application",
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
          <h2 className="text-3xl font-bold tracking-tight">Apply for Caregiver License</h2>
          <p className="text-muted-foreground">
            Complete the form below to apply for your caregiver license. A fee of KES 2,500 is required.
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Please provide your personal details. This information will be used for your license.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input
                    id="idNumber"
                    name="idNumber"
                    placeholder="12345678"
                    value={formData.idNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number (for M-Pesa)</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="07XXXXXXXX"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    This number will be used for M-Pesa payment. Format: 07XXXXXXXX or 01XXXXXXXX
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Physical Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="123 Main St, Nairobi"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Educational Background</Label>
                <Textarea
                  id="education"
                  name="education"
                  placeholder="List your educational qualifications relevant to caregiving"
                  value={formData.education}
                  onChange={handleChange}
                  required
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Work Experience</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  placeholder="Describe your caregiving experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="references">Professional References</Label>
                <Textarea
                  id="references"
                  name="references"
                  placeholder="List at least two professional references with their contact information"
                  value={formData.references}
                  onChange={handleChange}
                  required
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="rounded-lg bg-muted p-4 w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Application Fee</p>
                    <p className="text-sm text-muted-foreground">
                      Payment will be processed via M-Pesa to the phone number provided
                    </p>
                  </div>
                  <p className="font-bold">KES 2,500</p>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Processing..." : "Submit Application & Pay"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardShell>
  )
}
