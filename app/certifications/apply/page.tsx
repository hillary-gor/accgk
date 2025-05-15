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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { initiateSTKPush, generatePaymentReference } from "@/lib/mpesa-service"
import { supabase } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"

export default function CertificationApplicationPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    certificationType: "",
    qualifications: "",
    experience: "",
    references: "",
  })

  const certificationTypes = [
    { value: "basic", label: "Basic Caregiving", fee: 1500 },
    { value: "advanced", label: "Advanced Caregiving", fee: 2500 },
    { value: "specialized", label: "Specialized Care (Elderly)", fee: 3000 },
    { value: "pediatric", label: "Pediatric Care", fee: 3000 },
    { value: "palliative", label: "Palliative Care", fee: 3500 },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const getCertificationFee = () => {
    const selectedType = certificationTypes.find((type) => type.value === formData.certificationType)
    return selectedType?.fee || 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to apply for a certification",
        variant: "destructive",
      })
      return
    }

    if (!formData.certificationType) {
      toast({
        title: "Error",
        description: "Please select a certification type",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Create a payment reference
      const paymentReference = generatePaymentReference()

      // Create certification record in pending status
      const { data: certData, error: certError } = await supabase.from("certifications").insert({
        user_id: user.id,
        certification_type: formData.certificationType,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (certError) throw certError

      // Create or update profile information
      const { error: profileError } = await supabase.from("profiles").upsert({
        user_id: user.id,
        first_name: formData.fullName.split(" ")[0],
        last_name: formData.fullName.split(" ").slice(1).join(" "),
        phone_number: formData.phoneNumber,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (profileError) throw profileError

      // Get certification fee
      const certificationFee = getCertificationFee()

      // Create payment record
      const { data: paymentData, error: paymentError } = await supabase.from("payments").insert({
        id: uuidv4(),
        user_id: user.id,
        amount: certificationFee,
        payment_type: "certification",
        status: "pending",
        transaction_id: paymentReference,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (paymentError) throw paymentError

      // Initiate MPesa payment
      const mpesaResponse = await initiateSTKPush(
        formData.phoneNumber,
        certificationFee,
        paymentReference,
        "ACCGK Certification Application Fee",
      )

      if (!mpesaResponse.success) {
        throw new Error(mpesaResponse.error || "Failed to initiate payment")
      }

      toast({
        title: "Application Submitted",
        description:
          "Your certification application has been submitted. Please complete the payment on your phone to finalize the application.",
      })

      // Redirect to payment confirmation page
      router.push(`/payments/confirm?reference=${paymentReference}&type=certification`)
    } catch (error: any) {
      console.error("Error submitting certification application:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to submit certification application",
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
          <h2 className="text-3xl font-bold tracking-tight">Apply for Certification</h2>
          <p className="text-muted-foreground">
            Complete the form below to apply for a caregiver certification. Fees vary based on certification type.
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Certification Application</CardTitle>
              <CardDescription>
                Please provide your details and select the certification you wish to apply for.
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="certificationType">Certification Type</Label>
                <Select
                  value={formData.certificationType}
                  onValueChange={(value) => handleSelectChange("certificationType", value)}
                  required
                >
                  <SelectTrigger id="certificationType">
                    <SelectValue placeholder="Select certification type" />
                  </SelectTrigger>
                  <SelectContent>
                    {certificationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label} - KES {type.fee.toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualifications">Educational Qualifications</Label>
                <Textarea
                  id="qualifications"
                  name="qualifications"
                  placeholder="List your educational qualifications relevant to this certification"
                  value={formData.qualifications}
                  onChange={handleChange}
                  required
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Relevant Experience</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  placeholder="Describe your experience relevant to this certification"
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
                  <p className="font-bold">
                    KES {formData.certificationType ? getCertificationFee().toLocaleString() : "0"}
                  </p>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || !formData.certificationType}>
                {isLoading ? "Processing..." : "Submit Application & Pay"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardShell>
  )
}
