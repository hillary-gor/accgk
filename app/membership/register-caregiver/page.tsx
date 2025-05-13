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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function RegisterCaregiverPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    idNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    certificationLevel: "",
    certificationNumber: "",
    certificationDate: "",
    yearsExperience: "",
    specialties: [],
    bio: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
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

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      specialties: checked ? [...prev.specialties, specialty] : prev.specialties.filter((s) => s !== specialty),
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
    router.push("/membership/payment?type=caregiver")
  }

  return (
    <PageLayout
      title="Caregiver Registration"
      description="Complete the form below to register as a caregiver with ACCK."
    >
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Caregiver Registration Form</CardTitle>
            <CardDescription>
              Please provide accurate information to complete your registration. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <div className="text-sm font-medium">
                  Step {step} of 3:{" "}
                  {step === 1 ? "Personal Information" : step === 2 ? "Professional Details" : "Review & Submit"}
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
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
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="idNumber">ID/Passport Number *</Label>
                      <Input id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Gender *</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => handleSelectChange("gender", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Physical Address *</Label>
                    <Textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City/Town *</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
                    <Input
                      id="emergencyContactName"
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactPhone">Emergency Contact Phone *</Label>
                    <Input
                      id="emergencyContactPhone"
                      name="emergencyContactPhone"
                      value={formData.emergencyContactPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="certificationLevel">Certification Level *</Label>
                    <Select
                      value={formData.certificationLevel}
                      onValueChange={(value) => handleSelectChange("certificationLevel", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select certification level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic Caregiving Certificate</SelectItem>
                        <SelectItem value="intermediate">Intermediate Caregiver</SelectItem>
                        <SelectItem value="advanced">Advanced Caregiver</SelectItem>
                        <SelectItem value="specialist">Specialist Caregiver</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="certificationNumber">Certification Number *</Label>
                      <Input
                        id="certificationNumber"
                        name="certificationNumber"
                        value={formData.certificationNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="certificationDate">Certification Date *</Label>
                      <Input
                        id="certificationDate"
                        name="certificationDate"
                        type="date"
                        value={formData.certificationDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearsExperience">Years of Experience *</Label>
                    <Select
                      value={formData.yearsExperience}
                      onValueChange={(value) => handleSelectChange("yearsExperience", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select years of experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">Less than 1 year</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">More than 10 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Specialties (Select all that apply) *</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="elderCare"
                          checked={formData.specialties.includes("elderCare")}
                          onCheckedChange={(checked) => handleSpecialtyChange("elderCare", checked as boolean)}
                        />
                        <Label htmlFor="elderCare">Elder Care</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="pediatricCare"
                          checked={formData.specialties.includes("pediatricCare")}
                          onCheckedChange={(checked) => handleSpecialtyChange("pediatricCare", checked as boolean)}
                        />
                        <Label htmlFor="pediatricCare">Pediatric Care</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="disabilityCare"
                          checked={formData.specialties.includes("disabilityCare")}
                          onCheckedChange={(checked) => handleSpecialtyChange("disabilityCare", checked as boolean)}
                        />
                        <Label htmlFor="disabilityCare">Disability Care</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="palliativeCare"
                          checked={formData.specialties.includes("palliativeCare")}
                          onCheckedChange={(checked) => handleSpecialtyChange("palliativeCare", checked as boolean)}
                        />
                        <Label htmlFor="palliativeCare">Palliative Care</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="mentalHealth"
                          checked={formData.specialties.includes("mentalHealth")}
                          onCheckedChange={(checked) => handleSpecialtyChange("mentalHealth", checked as boolean)}
                        />
                        <Label htmlFor="mentalHealth">Mental Health</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="postSurgical"
                          checked={formData.specialties.includes("postSurgical")}
                          onCheckedChange={(checked) => handleSpecialtyChange("postSurgical", checked as boolean)}
                        />
                        <Label htmlFor="postSurgical">Post-Surgical Care</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio *</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Briefly describe your experience, skills, and approach to caregiving (100-300 words)"
                      className="min-h-[150px]"
                      required
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Full Name</p>
                        <p className="text-sm text-muted-foreground">
                          {formData.firstName} {formData.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Contact Information</p>
                        <p className="text-sm text-muted-foreground">{formData.email}</p>
                        <p className="text-sm text-muted-foreground">{formData.phone}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">ID/Passport Number</p>
                        <p className="text-sm text-muted-foreground">{formData.idNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Date of Birth</p>
                        <p className="text-sm text-muted-foreground">{formData.dateOfBirth}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        {formData.address}, {formData.city}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Emergency Contact</p>
                      <p className="text-sm text-muted-foreground">
                        {formData.emergencyContactName} ({formData.emergencyContactPhone})
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Professional Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Certification Level</p>
                        <p className="text-sm text-muted-foreground">{formData.certificationLevel}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Certification Number</p>
                        <p className="text-sm text-muted-foreground">{formData.certificationNumber}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Certification Date</p>
                        <p className="text-sm text-muted-foreground">{formData.certificationDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Years of Experience</p>
                        <p className="text-sm text-muted-foreground">{formData.yearsExperience}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Specialties</p>
                      <p className="text-sm text-muted-foreground">
                        {formData.specialties.length > 0 ? formData.specialties.join(", ") : "None selected"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Professional Bio</p>
                      <p className="text-sm text-muted-foreground">{formData.bio}</p>
                    </div>
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
                          I agree to abide by the ACCK Code of Ethics and Professional Conduct. *
                        </Label>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="font-medium mb-2">Membership Fee</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Individual Caregiver Membership: KES 5,000 per year
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
