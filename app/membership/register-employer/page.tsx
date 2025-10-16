"use client"

import { useState } from "react"
import PageLayout from "@/components/page-layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Briefcase } from "lucide-react"

export default function RegisterEmployerPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    // Simulate API submission
    setTimeout(() => {
      setLoading(false)
      alert("Employer registration submitted successfully!")
    }, 1500)
  }

  return (
    <PageLayout
      title="Register as an Employer"
      description="Join ACCGK as an employer or recruitment partner to access a pool of certified caregivers and streamline your hiring process."
    >
      <div className="max-w-3xl mx-auto">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-[color:var(--accgk-blue)]" />
            </div>
            <CardTitle className="text-2xl font-bold text-[color:var(--accgk-blue)]">
              Employer / Recruitment Partner Registration
            </CardTitle>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Company Information */}
              <div>
                <Label htmlFor="companyName">Company / Organization Name</Label>
                <Input id="companyName" name="companyName" placeholder="e.g. CareLink Agency" required />
              </div>

              <div>
                <Label htmlFor="registrationNumber">Company Registration Number</Label>
                <Input id="registrationNumber" name="registrationNumber" placeholder="e.g. BN-123456" required />
              </div>

              <div>
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input id="contactPerson" name="contactPerson" placeholder="e.g. Jane Wanjiku" required />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="e.g. info@carelink.co.ke" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="e.g. +254712345678" required />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Business Location</Label>
                <Input id="location" name="location" placeholder="e.g. Nairobi, Kenya" required />
              </div>

              <div>
                <Label htmlFor="website">Company Website (optional)</Label>
                <Input id="website" name="website" type="url" placeholder="https://example.com" />
              </div>

              <div>
                <Label htmlFor="description">Brief Description of Your Services</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Describe the type of caregivers you recruit or the caregiving services you provide..."
                />
              </div>

              <div>
                <Label htmlFor="employees">Number of Employees</Label>
                <Input id="employees" name="employees" type="number" placeholder="e.g. 25" />
              </div>

              {/* Fees */}
              <div className="border-t pt-4 text-center text-gray-700">
                <p className="text-sm">
                  <strong>Annual Membership Fee:</strong> KES 10,000
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Payment instructions will be provided after form submission.
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center">
              <Button
                type="submit"
                className="w-full bg-[color:var(--accgk-blue)] hover:bg-teal-700"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <p className="text-sm text-center text-muted-foreground mt-6">
          Need help? <a href="/contact" className="text-[color:var(--accgk-blue)] underline">Contact us</a> for
          assistance with your employer registration.
        </p>
      </div>
    </PageLayout>
  )
}
