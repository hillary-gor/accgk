"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { ResponsiveContainer } from "@/components/responsive-container"
import { StatusAlert } from "@/components/ui/status-alert"
import { CheckCircle, Search, XCircle } from "lucide-react"

export default function VerifyPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [licenseId, setLicenseId] = useState("")
  const [certificationId, setCertificationId] = useState("")
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [verificationError, setVerificationError] = useState<string | null>(null)
  const [verificationType, setVerificationType] = useState<"license" | "certification">("license")

  const handleVerifyLicense = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!licenseId) return

    setIsLoading(true)
    setVerificationResult(null)
    setVerificationError(null)

    try {
      const { data, error } = await supabase
        .from("licenses")
        .select(`
          *,
          user:user_id (
            email,
            profiles!user_id (first_name, last_name, phone_number)
          )
        `)
        .eq("id", licenseId)
        .single()

      if (error) throw error

      if (!data) {
        setVerificationError("No license found with the provided ID")
        return
      }

      setVerificationResult({
        type: "license",
        data,
      })
    } catch (error) {
      console.error("Error verifying license:", error)
      setVerificationError("Failed to verify license. Please check the ID and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCertification = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!certificationId) return

    setIsLoading(true)
    setVerificationResult(null)
    setVerificationError(null)

    try {
      const { data, error } = await supabase
        .from("certifications")
        .select(`
          *,
          user:user_id (
            email,
            profiles!user_id (first_name, last_name, phone_number)
          )
        `)
        .eq("id", certificationId)
        .single()

      if (error) throw error

      if (!data) {
        setVerificationError("No certification found with the provided ID")
        return
      }

      setVerificationResult({
        type: "certification",
        data,
      })
    } catch (error) {
      console.error("Error verifying certification:", error)
      setVerificationError("Failed to verify certification. Please check the ID and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getCertificationTypeLabel = (type: string) => {
    switch (type) {
      case "basic":
        return "Basic Caregiving"
      case "advanced":
        return "Advanced Caregiving"
      case "specialized":
        return "Specialized Care (Elderly)"
      case "pediatric":
        return "Pediatric Care"
      case "palliative":
        return "Palliative Care"
      default:
        return type.charAt(0).toUpperCase() + type.slice(1)
    }
  }

  const getLicenseTypeLabel = (type: string) => {
    switch (type) {
      case "individual":
        return "Individual Caregiver"
      case "institution":
        return "Institution"
      default:
        return type.charAt(0).toUpperCase() + type.slice(1)
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <ResponsiveContainer maxWidth="lg">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Verify Credentials</h1>
            <p className="mt-2 text-muted-foreground">
              Verify the authenticity of a caregiver's license or certification
            </p>
          </div>

          <Card className="w-full max-w-2xl">
            <Tabs
              defaultValue="license"
              onValueChange={(value) => setVerificationType(value as "license" | "certification")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="license">License</TabsTrigger>
                <TabsTrigger value="certification">Certification</TabsTrigger>
              </TabsList>
              <TabsContent value="license">
                <form onSubmit={handleVerifyLicense}>
                  <CardHeader>
                    <CardTitle>Verify License</CardTitle>
                    <CardDescription>Enter the license ID to verify its authenticity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="licenseId">License ID</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="licenseId"
                          placeholder="Enter license ID"
                          value={licenseId}
                          onChange={(e) => setLicenseId(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        The license ID is a unique identifier found on the caregiver's license document
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Verifying..." : "Verify License"}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
              <TabsContent value="certification">
                <form onSubmit={handleVerifyCertification}>
                  <CardHeader>
                    <CardTitle>Verify Certification</CardTitle>
                    <CardDescription>Enter the certification ID to verify its authenticity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="certificationId">Certification ID</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="certificationId"
                          placeholder="Enter certification ID"
                          value={certificationId}
                          onChange={(e) => setCertificationId(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        The certification ID is a unique identifier found on the caregiver's certification document
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Verifying..." : "Verify Certification"}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>

          {verificationError && (
            <StatusAlert
              variant="error"
              title="Verification Failed"
              description={verificationError}
              className="w-full max-w-2xl"
            />
          )}

          {verificationResult && (
            <Card className="w-full max-w-2xl">
              <CardHeader className="flex flex-row items-center gap-4">
                {verificationResult.data.status === "approved" ? (
                  <CheckCircle className="h-8 w-8 text-green-500" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-500" />
                )}
                <div>
                  <CardTitle>
                    {verificationResult.type === "license" ? "License" : "Certification"} Verification Result
                  </CardTitle>
                  <CardDescription>
                    {verificationResult.data.status === "approved"
                      ? "This credential is valid and authentic"
                      : "This credential is not currently valid"}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm font-medium">Status</p>
                  <p
                    className={`text-lg font-bold ${
                      verificationResult.data.status === "approved" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {getStatusLabel(verificationResult.data.status)}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium">Holder Name</p>
                    <p className="text-sm text-muted-foreground">
                      {verificationResult.data.user?.profiles?.[0]?.first_name || "N/A"}{" "}
                      {verificationResult.data.user?.profiles?.[0]?.last_name || ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Type</p>
                    <p className="text-sm text-muted-foreground">
                      {verificationResult.type === "license"
                        ? getLicenseTypeLabel(verificationResult.data.license_type)
                        : getCertificationTypeLabel(verificationResult.data.certification_type)}
                    </p>
                  </div>
                  {verificationResult.data.issue_date && (
                    <div>
                      <p className="text-sm font-medium">Issue Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(verificationResult.data.issue_date).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {verificationResult.data.expiry_date && (
                    <div>
                      <p className="text-sm font-medium">Expiry Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(verificationResult.data.expiry_date).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <p className="text-xs text-muted-foreground">
                  This verification was performed on {new Date().toLocaleString()} and reflects the current status in
                  the ACCGK database.
                </p>
                <div className="flex w-full justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/">Return to Home</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setVerificationResult(null)
                      setVerificationError(null)
                      if (verificationType === "license") {
                        setLicenseId("")
                      } else {
                        setCertificationId("")
                      }
                    }}
                  >
                    Verify Another
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </ResponsiveContainer>
    </div>
  )
}
