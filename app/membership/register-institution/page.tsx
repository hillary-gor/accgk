"use client"

import type React from "react"

import { useState } from "react"
import PageLayout from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Building, FileText, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export default function RegisterInstitutionPage() {
  const [formData, setFormData] = useState({
    institutionName: "",
    registrationNumber: "",
    email: "",
    phone: "",
    physicalLocation: "",
    postalAddress: "",
    contactPersonName: "",
    contactPersonTitle: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [paymentInitiated, setPaymentInitiated] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
      title="Register Your Institution"
      description="Become a recognized ACCGK member institution and enhance your organization's credibility"
    >
      <div className="max-w-2xl mx-auto">
        {!isSubmitted ? (
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Institutional Membership Application</CardTitle>
              <CardDescription className="text-center">
                Register your healthcare facility, training institution, or caregiving agency with ACCGK
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="institutionName">Institution Name</Label>
                    <Input
                      id="institutionName"
                      name="institutionName"
                      placeholder="Enter the full legal name of your institution"
                      value={formData.institutionName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="registrationNumber">Registration/License Number</Label>
                    <Input
                      id="registrationNumber"
                      name="registrationNumber"
                      placeholder="Enter your institution's official registration number"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Contact Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="institution@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Contact Phone</Label>
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

                  <div>
                    <Label htmlFor="physicalLocation">Physical Location</Label>
                    <Textarea
                      id="physicalLocation"
                      name="physicalLocation"
                      placeholder="Enter detailed physical address of your institution"
                      value={formData.physicalLocation}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="postalAddress">Postal Address</Label>
                    <Input
                      id="postalAddress"
                      name="postalAddress"
                      placeholder="P.O. Box..."
                      value={formData.postalAddress}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Primary Contact Person</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contactPersonName">Full Name</Label>
                        <Input
                          id="contactPersonName"
                          name="contactPersonName"
                          placeholder="Name of authorized representative"
                          value={formData.contactPersonName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactPersonTitle">Title/Position</Label>
                        <Input
                          id="contactPersonTitle"
                          name="contactPersonTitle"
                          placeholder="e.g., Director, HR Manager"
                          value={formData.contactPersonTitle}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Upload Accreditation Documents</Label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                      <div className="space-y-1 text-center">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
                          >
                            <span>Upload files</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF, JPG up to 10MB (Registration certificate, licenses, accreditation documents)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Membership Fee Payment</h3>
                  <p className="text-sm text-muted-foreground">
                    The annual membership fee for institutions is <strong>KES 50,000</strong>. You will be directed to
                    make payment after submitting your application.
                  </p>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Benefits Include</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                        <li>Official ACCGK institutional accreditation</li>
                        <li>Access to certified caregivers database</li>
                        <li>Discounted certification for your staff</li>
                        <li>Participation in industry standards development</li>
                      </ul>
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
                Your institutional membership application has been received
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/30 p-4 rounded-md">
                <p className="font-medium">Application Reference: ACCGK-I-{Date.now().toString().slice(-6)}</p>
                <p className="text-sm text-muted-foreground">
                  Please save this reference number for future correspondence
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Next Steps</h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Complete your payment to proceed with the application process</li>
                  <li>Our team will review your institution's documentation</li>
                  <li>A verification visit may be scheduled to your facility</li>
                  <li>Upon approval, you will receive your institutional membership certificate</li>
                </ol>
              </div>

              {!paymentInitiated ? (
                <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                  <h3 className="text-lg font-semibold mb-4">Complete Your Payment</h3>
                  <p className="mb-4">
                    To finalize your application, please pay the institutional membership fee of{" "}
                    <strong>KES 50,000</strong> via MPesa or bank transfer.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Button onClick={initiatePayment} className="w-full bg-primary hover:bg-primary/90">
                      Pay via MPesa
                    </Button>
                    <Button
                      variant="outline"
                      onClick={initiatePayment}
                      className="w-full border-primary text-primary hover:bg-primary/5"
                    >
                      Bank Transfer
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                  <h3 className="text-lg font-semibold text-green-800 mb-4">Payment Options</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Option 1: MPesa Payment</h4>
                      <ol className="list-decimal list-inside space-y-2 text-green-700">
                        <li>Go to your M-PESA menu on your phone</li>
                        <li>Select "Lipa na M-PESA"</li>
                        <li>Select "Pay Bill"</li>
                        <li>
                          Enter Business Number: <strong>880100</strong>
                        </li>
                        <li>
                          Enter Account Number: <strong>ACCGK-{formData.registrationNumber}</strong>
                        </li>
                        <li>
                          Enter Amount: <strong>50,000</strong>
                        </li>
                        <li>Enter your M-PESA PIN and confirm</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Option 2: Bank Transfer</h4>
                      <div className="bg-white/50 p-4 rounded border border-green-100 text-green-800">
                        <p className="mb-2">Please make a transfer to the following account:</p>
                        <p>
                          <strong>Bank Name:</strong> Kenya Commercial Bank
                        </p>
                        <p>
                          <strong>Account Name:</strong> Association of Certified Caregivers Kenya
                        </p>
                        <p>
                          <strong>Account Number:</strong> 123321
                        </p>
                        <p>
                          <strong>Branch:</strong> Nairobi Main
                        </p>
                        <p>
                          <strong>Reference:</strong> ACCGK-{formData.registrationNumber}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-green-600">
                    After payment, please email the transaction confirmation to finance@accgk.org with your application
                    reference number.
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
