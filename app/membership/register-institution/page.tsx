"use client"

import type React from "react"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function RegisterInstitutionPage() {
  const [formData, setFormData] = useState({
    institutionName: "",
    registrationNumber: "",
    registrationDate: "",
    institutionType: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    postalCode: "",
    contactPersonName: "",
    contactPersonTitle: "",
    contactPersonEmail: "",
    contactPersonPhone: "",
    numberOfEmployees: "",
    servicesOffered: [],
    description: "",
    accreditationDetails: "",
    agreeTerms: false,
    agreeCode: false,
  })
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      servicesOffered: checked ? [...prev.servicesOffered, service] : prev.servicesOffered.filter((s) => s !== service),
    }))
  }

  const handleNextStep = () => {
    setStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const handlePrevStep = () => {
    setStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Registration submitted successfully",
      description: "We'll review your application and get back to you soon.",
    })

    // Redirect to payment page
    router.push("/membership/payment?type=institution")
  }

  return (
    <PageLayout
      title="Institution Registration"
      description="Complete the form below to register your institution with ACCK."
    >
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Institution Registration Form</CardTitle>
            <CardDescription>
              Please provide accurate information to complete your institution's registration. All fields marked with *
              are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <div className="text-sm font-medium">
                  Step {step} of 3:{" "}
                  {step === 1 ? "Institution Information" : step === 2 ? "Contact & Services" : "Review & Submit"}
                </div>
                <div className="text-sm text-muted-foreground">{Math.round((step / 3) * 100)}% Complete</div>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-600 transition-all duration-300 ease-in-out"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="institutionName">Institution Name *</Label>
                    <Input
                      id="institutionName"
                      name="institutionName"
                      value={formData.institutionName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="registrationNumber">Registration Number *</Label>
                      <Input
                        id="registrationNumber"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registrationDate">Registration Date *</Label>
                      <Input
                        id="registrationDate"
                        name="registrationDate"
                        type="date"
                        value={formData.registrationDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="institutionType">Institution Type *</Label>
                    <Select
                      value={formData.institutionType}
                      onValueChange={(value) => handleSelectChange("institutionType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select institution type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hospital">Hospital</SelectItem>
                        <SelectItem value="nursingHome">Nursing Home</SelectItem>
                        <SelectItem value="trainingCenter">Training Center</SelectItem>
                        <SelectItem value="homecare">Home Care Agency</SelectItem>
                        <SelectItem value="clinic">Clinic</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Institution Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Institution Phone *</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website (if any)</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Physical Address *</Label>
                    <Textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City/Town *</Label>
                      <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPersonName">Contact Person Name *</Label>
                    <Input
                      id="contactPersonName"
                      name="contactPersonName"
                      value={formData.contactPersonName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPersonTitle">Contact Person Title/Position *</Label>
                    <Input
                      id="contactPersonTitle"
                      name="contactPersonTitle"
                      value={formData.contactPersonTitle}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactPersonEmail">Contact Person Email *</Label>
                      <Input
                        id="contactPersonEmail"
                        name="contactPersonEmail"
                        type="email"
                        value={formData.contactPersonEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPersonPhone">Contact Person Phone *</Label>
                      <Input
                        id="contactPersonPhone"
                        name="contactPersonPhone"
                        value={formData.contactPersonPhone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numberOfEmployees">Number of Employees *</Label>
                    <Select
                      value={formData.numberOfEmployees}
                      onValueChange={(value) => handleSelectChange("numberOfEmployees", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of employees" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10</SelectItem>
                        <SelectItem value="11-50">11-50</SelectItem>
                        <SelectItem value="51-100">51-100</SelectItem>
                        <SelectItem value="101-500">101-500</SelectItem>
                        <SelectItem value="500+">More than 500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Services Offered (Select all that apply) *</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="elderCare"
                          checked={formData.servicesOffered.includes("elderCare")}
                          onCheckedChange={(checked) => handleServiceChange("elderCare", checked as boolean)}
                        />
                        <Label htmlFor="elderCare">Elder Care</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="pediatricCare"
                          checked={formData.servicesOffered.includes("pediatricCare")}
                          onCheckedChange={(checked) => handleServiceChange("pediatricCare", checked as boolean)}
                        />
                        <Label htmlFor="pediatricCare">Pediatric Care</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="disabilityCare"
                          checked={formData.servicesOffered.includes("disabilityCare")}
                          onCheckedChange={(checked) => handleServiceChange("disabilityCare", checked as boolean)}
                        />
                        <Label htmlFor="disabilityCare">Disability Care</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="palliativeCare"
                          checked={formData.servicesOffered.includes("palliativeCare")}
                          onCheckedChange={(checked) => handleServiceChange("palliativeCare", checked as boolean)}
                        />
                        <Label htmlFor="palliativeCare">Palliative Care</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="mentalHealth"
                          checked={formData.servicesOffered.includes("mentalHealth")}
                          onCheckedChange={(checked) => handleServiceChange("mentalHealth", checked as boolean)}
                        />
                        <Label htmlFor="mentalHealth">Mental Health</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="trainingEducation"
                          checked={formData.servicesOffered.includes("trainingEducation")}
                          onCheckedChange={(checked) => handleServiceChange("trainingEducation", checked as boolean)}
                        />
                        <Label htmlFor="trainingEducation">Training & Education</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Institution Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Briefly describe your institution, its mission, and the services it provides (100-300 words)"
                      className="min-h-[150px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accreditationDetails">Accreditation Details (if any)</Label>
                    <Textarea
                      id="accreditationDetails"
                      name="accreditationDetails"
                      value={formData.accreditationDetails}
                      onChange={handleChange}
                      placeholder="List any accreditations, certifications, or licenses held by your institution"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Institution Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Institution Name</p>
                        <p className="text-sm text-muted-foreground">{formData.institutionName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Registration Details</p>
                        <p className="text-sm text-muted-foreground">
                          {formData.registrationNumber} (Registered: {formData.registrationDate})
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Institution Type</p>
                        <p className="text-sm text-muted-foreground">{formData.institutionType}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Contact Information</p>
                        <p className="text-sm text-muted-foreground">{formData.email}</p>
                        <p className="text-sm text-muted-foreground">{formData.phone}</p>
                        {formData.website && <p className="text-sm text-muted-foreground">{formData.website}</p>}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        {formData.address}, {formData.city}, {formData.postalCode}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Contact & Services</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Contact Person</p>
                        <p className="text-sm text-muted-foreground">
                          {formData.contactPersonName} ({formData.contactPersonTitle})
                        </p>
                        <p className="text-sm text-muted-foreground">{formData.contactPersonEmail}</p>
                        <p className="text-sm text-muted-foreground">{formData.contactPersonPhone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Number of Employees</p>
                        <p className="text-sm text-muted-foreground">{formData.numberOfEmployees}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Services Offered</p>
                      <p className="text-sm text-muted-foreground">
                        {formData.servicesOffered.length > 0 ? formData.servicesOffered.join(", ") : "None selected"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Institution Description</p>
                      <p className="text-sm text-muted-foreground">{formData.description}</p>
                    </div>
                    {formData.accreditationDetails && (
                      <div>
                        <p className="text-sm font-medium">Accreditation Details</p>
                        <p className="text-sm text-muted-foreground">{formData.accreditationDetails}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 border-t pt-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agreeTerms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) => handleCheckboxChange("agreeTerms", checked as boolean)}
                          required
                        />
                        <Label htmlFor="agreeTerms" className="text-sm">
                          I agree to the{" "}
                          <a href="/terms" className="text-teal-600 hover:underline" target="_blank" rel="noreferrer">
                            Terms and Conditions
                          </a>{" "}
                          and{" "}
                          <a
                            href="/privacy-policy"
                            className="text-teal-600 hover:underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Privacy Policy
                          </a>
                          . *
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agreeCode"
                          checked={formData.agreeCode}
                          onCheckedChange={(checked) => handleCheckboxChange("agreeCode", checked as boolean)}
                          required
                        />
                        <Label htmlFor="agreeCode" className="text-sm">
                          I agree to abide by the ACCK Code of Ethics and Professional Conduct for Institutions. *
                        </Label>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="font-medium mb-2">Membership Fee</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Institutional Membership: KES 100,000 per year
                      </p>
                      <p className="text-sm text-muted-foreground">
                        After submitting this form, you will be directed to the payment page to complete your
                        registration.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={handlePrevStep}>
                    Previous
                  </Button>
                )}
                {step < 3 ? (
                  <Button type="button" className="bg-teal-600 hover:bg-teal-700 ml-auto" onClick={handleNextStep}>
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700 ml-auto"
                    disabled={isSubmitting || !formData.agreeTerms || !formData.agreeCode}
                  >
                    {isSubmitting ? "Processing..." : "Submit Registration"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-start border-t pt-6">
            <p className="text-sm text-muted-foreground">
              Need assistance? Contact our membership support team at membership@acck.org or call +254 700 000000.
            </p>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  )
}
