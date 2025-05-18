"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Download, Flag, Calendar, Award, Building, CheckCircle, XCircle } from "lucide-react"
import Image from "next/image"

export default function VerificationResult() {
  // In a real app, this would come from an API response
  // For demo purposes, we're using static data
  const [verificationStatus] = useState<"verified" | "not-found">("verified")

  // Demo data for a verified caregiver
  const caregiverData = {
    name: "Jane Muthoni Kamau",
    certificationId: "ACCGK-2023-78945",
    status: "Active", // Active, Expired, Revoked
    issuedDate: "15 March 2023",
    expiryDate: "14 March 2025",
    trainingInstitution: "Kenya Medical Training College",
    specialization: "Geriatric Care",
    photo: "/placeholder.svg?height=200&width=200&text=Caregiver+Photo",
  }

  return (
    <div id="verification-result" className="hidden animate-fade-in-up">
      <h2 className="text-2xl font-bold text-[color:var(--accgk-blue)] mb-6 text-center">Verification Result</h2>

      {verificationStatus === "verified" ? <VerifiedResult caregiverData={caregiverData} /> : <NotFoundResult />}
    </div>
  )
}

function VerifiedResult({ caregiverData }: { caregiverData: any }) {
  const isActive = caregiverData.status === "Active"

  return (
    <Card className="overflow-hidden border-t-4 border-t-green-500 animate-slide-up">
      <CardContent className="p-0">
        <div className="bg-green-50 p-4 flex items-center border-b border-green-100">
          <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
          <h3 className="font-semibold text-green-800">Certification Verified Successfully</h3>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Left column - Photo and basic info */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[color:var(--accgk-blue)]/20 mb-4">
                  <Image
                    src={caregiverData.photo || "/placeholder.svg"}
                    alt={caregiverData.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{caregiverData.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{caregiverData.certificationId}</p>
                <Badge
                  className={`
                  ${
                    isActive
                      ? "bg-green-100 text-green-800"
                      : caregiverData.status === "Expired"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                  }
                `}
                >
                  {caregiverData.status}
                </Badge>
              </div>
            </div>

            {/* Right column - Detailed information */}
            <div className="md:col-span-2">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-700 mb-1">
                      <Calendar className="h-4 w-4 mr-2 text-[color:var(--accgk-blue)]" />
                      <span className="text-sm font-medium">Issued Date</span>
                    </div>
                    <p>{caregiverData.issuedDate}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-700 mb-1">
                      <Calendar className="h-4 w-4 mr-2 text-[color:var(--accgk-blue)]" />
                      <span className="text-sm font-medium">Expiry Date</span>
                    </div>
                    <p>{caregiverData.expiryDate}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-1">
                    <Building className="h-4 w-4 mr-2 text-[color:var(--accgk-blue)]" />
                    <span className="text-sm font-medium">Training Institution</span>
                  </div>
                  <p>{caregiverData.trainingInstitution}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-1">
                    <Award className="h-4 w-4 mr-2 text-[color:var(--accgk-blue)]" />
                    <span className="text-sm font-medium">Specialization</span>
                  </div>
                  <p>{caregiverData.specialization}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Button
                    className={`flex-1 ${isActive ? "bg-[color:var(--accgk-blue)] hover:bg-[color:var(--accgk-blue)]/90" : "bg-gray-300 cursor-not-allowed"}`}
                    disabled={!isActive}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Certificate
                  </Button>
                  <Button variant="outline" className="flex-1 border-[color:var(--accgk-pink)] text-[color:var(--accgk-pink)] hover:bg-[color:var(--accgk-pink)]/10">
                    <Flag className="mr-2 h-4 w-4" />
                    Report a Concern
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function NotFoundResult() {
  return (
    <Card className="overflow-hidden border-t-4 border-t-amber-500 animate-slide-up">
      <CardContent className="p-0">
        <div className="bg-amber-50 p-4 flex items-center border-b border-amber-100">
          <AlertTriangle className="h-6 w-6 text-amber-500 mr-2" />
          <h3 className="font-semibold text-amber-800">No Matching Certification Found</h3>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-800 mb-4">We couldn't verify this certification</h3>
              <p className="text-gray-600 mb-4">
                The information you provided doesn't match any certified caregiver in our database. Please check the
                details and try again.
              </p>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center">
                  <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  The name or certification number may be incorrect
                </p>
                <p className="flex items-center">
                  <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  The certification may not be registered with ACCGK
                </p>
              </div>

              <div className="mt-6">
                <Button className="bg-[color:var(--accgk-blue)] hover:bg-[color:var(--accgk-blue)]/90">Try Another Search</Button>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="relative h-64 w-full">
                <Image
                  src="/placeholder.svg?height=400&width=400&text=Not+Found+Illustration"
                  alt="No results found illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
