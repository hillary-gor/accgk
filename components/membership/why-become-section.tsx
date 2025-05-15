import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function WhyBecomeSection() {
  const caregiverBenefits = [
    "Professional recognition through ACCGK certification",
    "Access to continuing professional development opportunities",
    "Networking with fellow caregivers and healthcare professionals",
    "Career advancement and job placement assistance",
    "Representation in policy discussions and advocacy",
    "Discounted rates for workshops, conferences, and training",
  ]

  const institutionBenefits = [
    "Enhanced credibility through ACCGK institutional accreditation",
    "Access to a database of certified caregivers for recruitment",
    "Participation in setting industry standards and best practices",
    "Discounted group certification for staff members",
    "Visibility through ACCGK's network and marketing channels",
    "Collaborative research and development opportunities",
  ]

  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Become a Member?</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          ACCGK membership offers tailored benefits for both individual caregivers and healthcare institutions, designed
          to enhance professional growth, credibility, and service quality.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Card 1: For Caregivers */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-bold text-teal-600">For Caregivers</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {caregiverBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="border-t border-gray-100 pt-4">
            <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
              <Link href="/membership/join?type=caregiver">Apply as a Caregiver</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Card 2: For Institutions */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-bold text-teal-600">For Institutions</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {institutionBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="border-t border-gray-100 pt-4">
            <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
              <Link href="/membership/join?type=institution">Apply as an Institution</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
