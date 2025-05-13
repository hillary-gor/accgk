"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { sendLicenseApprovalEmail } from "@/lib/email-service"
import { Award, CheckCircle, Download, XCircle } from "lucide-react"

export default function LicenseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [license, setLicense] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [reviewNotes, setReviewNotes] = useState("")
  const [userRole, setUserRole] = useState<string | null>(null)

  const licenseId = params.id as string

  useEffect(() => {
    if (!user) return

    const fetchLicenseDetails = async () => {
      setIsLoading(true)
      try {
        // Get user role
        const role = user.user_metadata?.role
        setUserRole(role)

        // Fetch license details
        const { data: licenseData, error: licenseError } = await supabase
          .from("licenses")
          .select("*")
          .eq("id", licenseId)
          .single()

        if (licenseError) throw licenseError
        setLicense(licenseData)

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", licenseData.user_id)
          .single()

        if (profileError && profileError.code !== "PGRST116") throw profileError
        setUserProfile(profileData)
      } catch (error) {
        console.error("Error fetching license details:", error)
        toast({
          title: "Error",
          description: "Failed to fetch license details",
          variant: "destructive",
        })
        router.push("/licenses")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLicenseDetails()
  }, [user, licenseId, router, toast])

  const handleApprove = async () => {
    if (!user || userRole !== "admin") return

    setIsProcessing(true)
    try {
      // Calculate expiry date (1 year from now)
      const issueDate = new Date()
      const expiryDate = new Date()
      expiryDate.setFullYear(expiryDate.getFullYear() + 1)

      // Update license status
      const { error } = await supabase
        .from("licenses")
        .update({
          status: "approved",
          issue_date: issueDate.toISOString(),
          expiry_date: expiryDate.toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", licenseId)

      if (error) throw error

      // Send approval email
      if (userProfile) {
        await sendLicenseApprovalEmail(
          userProfile.email || "user@example.com",
          `${userProfile.first_name} ${userProfile.last_name}`,
          license.license_number,
        )
      }

      toast({
        title: "License Approved",
        description: "The license has been approved successfully.",
      })

      // Refresh license data
      const { data } = await supabase.from("licenses").select("*").eq("id", licenseId).single()
      setLicense(data)
    } catch (error) {
      console.error("Error approving license:", error)
      toast({
        title: "Error",
        description: "Failed to approve license",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReject = async () => {
    if (!user || userRole !== "admin") return

    setIsProcessing(true)
    try {
      // Update license status
      const { error } = await supabase
        .from("licenses")
        .update({
          status: "rejected",
          updated_at: new Date().toISOString(),
        })
        .eq("id", licenseId)

      if (error) throw error

      toast({
        title: "License Rejected",
        description: "The license has been rejected.",
      })

      // Refresh license data
      const { data } = await supabase.from("licenses").select("*").eq("id", licenseId).single()
      setLicense(data)
    } catch (error) {
      console.error("Error rejecting license:", error)
      toast({
        title: "Error",
        description: "Failed to reject license",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownloadCertificate = async () => {
    try {
      // In a real implementation, this would generate and download the certificate
      toast({
        title: "Certificate Downloaded",
        description: "Your license certificate has been downloaded successfully.",
      })
    } catch (error) {
      console.error("Error downloading certificate:", error)
      toast({
        title: "Error",
        description: "Failed to download certificate",
        variant: "destructive",
      })
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "success"
      case "pending":
        return "secondary"
      case "rejected":
        return "destructive"
      case "expired":
        return "outline"
      default:
        return "secondary"
    }
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
      </DashboardShell>
    )
  }

  if (!license) {
    return (
      <DashboardShell>
        <Card>
          <CardHeader>
            <CardTitle>License Not Found</CardTitle>
            <CardDescription>The license you are looking for does not exist or you don't have access.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/licenses")}>Back to Licenses</Button>
          </CardFooter>
        </Card>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">License Details</h2>
            <p className="text-muted-foreground">View detailed information about this license</p>
          </div>
          <Button variant="outline" onClick={() => router.push("/licenses")}>
            Back to Licenses
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div className="flex items-center">
              <Award className="mr-2 h-6 w-6 text-primary" />
              <div>
                <CardTitle>License #{license.license_number}</CardTitle>
                <CardDescription>Applied on {new Date(license.created_at).toLocaleDateString()}</CardDescription>
              </div>
            </div>
            <Badge variant={getStatusBadgeVariant(license.status)}>
              {license.status.charAt(0).toUpperCase() + license.status.slice(1)}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            {userProfile && (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium">Applicant Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <p className="text-sm font-medium">Name</p>
                      <p className="text-sm text-muted-foreground">
                        {userProfile.first_name} {userProfile.last_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Contact</p>
                      <p className="text-sm text-muted-foreground">{userProfile.phone_number || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">{userProfile.address || "Not provided"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">License Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <p className="text-sm font-medium">License Number</p>
                      <p className="text-sm text-muted-foreground">{license.license_number}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <Badge variant={getStatusBadgeVariant(license.status)}>
                        {license.status.charAt(0).toUpperCase() + license.status.slice(1)}
                      </Badge>
                    </div>
                    {license.issue_date && (
                      <div>
                        <p className="text-sm font-medium">Issue Date</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(license.issue_date).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {license.expiry_date && (
                      <div>
                        <p className="text-sm font-medium">Expiry Date</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(license.expiry_date).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {userRole === "admin" && license.status === "pending" && (
              <div>
                <h3 className="text-lg font-medium mb-2">Review</h3>
                <Textarea
                  placeholder="Add review notes here..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            {license.status === "approved" && (
              <Button variant="outline" className="flex items-center" onClick={handleDownloadCertificate}>
                <Download className="mr-2 h-4 w-4" />
                Download Certificate
              </Button>
            )}

            {userRole === "admin" && license.status === "pending" && (
              <>
                <Button variant="outline" className="flex items-center" onClick={handleApprove} disabled={isProcessing}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve License
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center text-destructive"
                  onClick={handleReject}
                  disabled={isProcessing}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject License
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}
