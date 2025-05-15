"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import PageLayout from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Kenya counties list
const kenyaCounties = [
  "Mombasa",
  "Kwale",
  "Kilifi",
  "Tana River",
  "Lamu",
  "Taita Taveta",
  "Garissa",
  "Wajir",
  "Mandera",
  "Marsabit",
  "Isiolo",
  "Meru",
  "Tharaka-Nithi",
  "Embu",
  "Kitui",
  "Machakos",
  "Makueni",
  "Nyandarua",
  "Nyeri",
  "Kirinyaga",
  "Murang'a",
  "Kiambu",
  "Turkana",
  "West Pokot",
  "Samburu",
  "Trans Nzoia",
  "Uasin Gishu",
  "Elgeyo-Marakwet",
  "Nandi",
  "Baringo",
  "Laikipia",
  "Nakuru",
  "Narok",
  "Kajiado",
  "Kericho",
  "Bomet",
  "Kakamega",
  "Vihiga",
  "Bungoma",
  "Busia",
  "Siaya",
  "Kisumu",
  "Homa Bay",
  "Migori",
  "Kisii",
  "Nyamira",
  "Nairobi",
]

export default function RegisterCaregiverPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    idNumber: "",
    county: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [paymentInitiated, setPaymentInitiated] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCountyChange = (value: string) => {
    setFormData((prev) => ({ ...prev, county: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission delay
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  const initiatePayment = () => {
    // Simulate payment initiation
    setPaymentInitiated(true)
  }

  return (
    <PageLayout
      title="Register as a Caregiver"
      description="Join the ACCGK caregiver network and unlock professional opportunities"
    >
      <div className="max-w-2xl mx-auto">
        {!isSubmitted ? (
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Caregiver Membership Application</CardTitle>
              <CardDescription className="text-center">
                Complete the form below to begin your registration process with ACCGK
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name as it appears on your ID"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="e.g., 0712345678"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="idNumber">ID/Passport Number</Label>
                      <Input
                        id="idNumber"
                        name="idNumber"
                        placeholder="Enter your ID or passport number"
                        value={formData.idNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="county">County</Label>
                      <Select value={formData.county} onValueChange={handleCountyChange} required>
                        <SelectTrigger id="county">
                          <SelectValue placeholder="Select your county" />
                        </SelectTrigger>
                        <SelectContent>
                          {kenyaCounties.map((county) => (
                            <SelectItem key={county} value={county}>
                              {county}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="documents">Upload Documents (Optional)</Label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB (ID copy, certificates, etc.)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Membership Fee Payment</h3>
                  <p className="text-sm text-muted-foreground">
                    The annual membership fee for individual caregivers is <strong>KES 5,000</strong>. You will be
                    directed to make payment after submitting your application.
                  </p>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                      Your membership will be activated after verification of your details and confirmation of payment.
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Application Submitted Successfully</CardTitle>
              <CardDescription className="text-center">
                Your caregiver membership application has been received
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/30 p-4 rounded-md">
                <p className="font-medium">Application Reference: ACCGK-C-{Date.now().toString().slice(-6)}</p>
                <p className="text-sm text-muted-foreground">
                  Please save this reference number for future correspondence
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Next Steps</h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Complete your payment to proceed with the application process</li>
                  <li>Our team will verify your submitted information</li>
                  <li>You will receive an email confirmation within 3-5 business days</li>
                  <li>Upon approval, you will receive your digital membership certificate</li>
                </ol>
              </div>

              {!paymentInitiated ? (
                <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                  <h3 className="text-lg font-semibold mb-4">Complete Your Payment</h3>
                  <p className="mb-4">
                    To finalize your application, please pay the membership fee of <strong>KES 5,000</strong> via MPesa.
                  </p>
                  <Button onClick={initiatePayment} className="w-full bg-primary hover:bg-primary/90">
                    Pay via MPesa
                  </Button>
                </div>
              ) : (
                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">MPesa Payment Instructions</h3>
                  <ol className="list-decimal list-inside space-y-2 text-green-700">
                    <li>Go to your M-PESA menu on your phone</li>
                    <li>Select "Lipa na M-PESA"</li>
                    <li>Select "Pay Bill"</li>
                    <li>
                      Enter Business Number: <strong>522522</strong>
                    </li>
                    <li>
                      Enter Account Number: <strong>ACCGK-{formData.idNumber}</strong>
                    </li>
                    <li>
                      Enter Amount: <strong>5,000</strong>
                    </li>
                    <li>Enter your M-PESA PIN and confirm</li>
                  </ol>
                  <p className="mt-4 text-sm text-green-600">
                    You will receive an SMS confirmation from M-PESA once the payment is complete.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/membership">Return to Membership Page</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
