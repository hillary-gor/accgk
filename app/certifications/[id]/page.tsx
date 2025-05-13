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
import { sendCertificationApprovalEmail } from "@/lib/email-service"
import { CheckCircle, Download, Medal, XCircle } from "lucide-react"

export default function CertificationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [certification, setCertification] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [reviewNotes, setReviewNotes] = useState("")
  const [userRole, setUserRole] = useState<string | null>(null)

  const certificationId = params.id as string

  useEffect(() => {
    if (!user) return

    const fetchCertificationDetails = async () => {
      setIsLoading(true)
      try {
        // Get user role
        const role = user.user_metadata?.role
        setUserRole(role)

        // Fetch certification details
        const { data: certData, error: certError } = await supabase
          .from("certifications")
          .select("*")
          .eq("id", certificationId)
          .single()

        if (certError) throw certError
        setCertification(certData)

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", certData.user_id)
          .single()

        if (profileError && profileError.code !== "PGRST116") throw profileError
        setUserProfile(profileData)
      } catch (error) {
        console.error("Error fetching certification details:", error)
        toast({
          title: "Error",
          description: "Failed to fetch certification details",
          variant: "destructive",
        })
        router.push("/certifications")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCertificationDetails()
  }, [user, certificationId, router, toast])

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

  const handleApprove = async () => {
    if (!user || userRole !== "admin") return

    setIsProcessing(true)
    try {
      // Calculate expiry date (2 years from now)
      const issueDate = new Date()
      const expiryDate = new Date()
      expiryDate.setFullYear(expiryDate.getFullYear() + 2)

      // Update certification status
      const { error } = await supabase
        .from("certifications")
        .update({
          status: "approved",
          issue_date: issueDate.toISOString(),
          expiry_date: expiryDate.toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", certificationId)

      if (error) throw error

      // Send approval email
      if (userProfile) {
        await sendCertificationApprovalEmail(
          userProfile.email || "user@example.com",
          `${userProfile.first_name} ${userProfile.last_name}`,
          getCertificationTypeLabel(certification.certification_type),
        )
      }

      toast({
        title: "Certification Approved",
        description: "The certification has been approved successfully.",
      })

      // Refresh certification data
      const { data } = await supabase.from("certifications").select("*").eq("id", certificationId).single()
      setCertification(data)
    } catch (error) {
      console.error("Error approving certification:", error)
      toast({
        title: "Error",
        description: "Failed to approve certification",
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
      // Update certification status
      const { error } = await supabase
        .from("certifications")
        .update({
          status: "rejected",
          updated_at: new Date().toISOString(),
        })
        .eq("id", certificationId)

      if (error) throw error

      toast({
        title: "Certification Rejected",
        description: "The certification has been rejected.",
      })

      // Refresh certification data
      const { data } = await supabase.from("certifications").select("*").eq("id", certificationId).single()
      setCertification(data)
    } catch (error) {
      console.error("Error rejecting certification:", error)
      toast({
        title: "Error",
        description: "Failed to reject certification",
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
        description: "Your certification has been downloaded successfully.",
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

  if (!certification) {
    return (
      <DashboardShell>
        <Card>
          <CardHeader>
            <CardTitle>Certification Not Found</CardTitle>
            <CardDescription>
              The certification you are looking for does not exist or you don't have access.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/certifications")}>Back to Certifications</Button>
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
            <h2 className="text-3xl font-bold tracking-tight">Certification Details</h2>
            <p className="text-muted-foreground">View detailed information about this certification</p>
          </div>
          <Button variant="outline" onClick={() => router.push("/certifications")}>
            Back to Certifications
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div className="flex items-center">
              <Medal className="mr-2 h-6 w-6 text-primary" />
              <div>
                <CardTitle>{getCertificationTypeLabel(certification.certification_type)}</CardTitle>
                <CardDescription>Applied on {new Date(certification.created_at).toLocaleDateString()}</CardDescription>
              </div>
            </div>
            <Badge variant={getStatusBadgeVariant(certification.status)}>
              {certification.status.charAt(0).toUpperCase() + certification.status.slice(1)}
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
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Certification Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <p className="text-sm font-medium">Type</p>
                      <p className="text-sm text-muted-foreground">
                        {getCertificationTypeLabel(certification.certification_type)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <Badge variant={getStatusBadgeVariant(certification.status)}>
                        {certification.status.charAt(0).toUpperCase() + certification.status.slice(1)}
                      </Badge>
                    </div>
                    {certification.issue_date && (
                      <div>
                        <p className="text-sm font-medium">Issue Date</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(certification.issue_date).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {certification.expiry_date && (
                      <div>
                        <p className="text-sm font-medium">Expiry Date</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(certification.expiry_date).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {userRole === "admin" && certification.status === "pending" && (
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
            {certification.status === "approved" && (
              <Button variant="outline" className="flex items-center" onClick={handleDownloadCertificate}>
                <Download className="mr-2 h-4 w-4" />
                Download Certificate
              </Button>
            )}

            {userRole === "admin" && certification.status === "pending" && (
              <>
                <Button variant="outline" className="flex items-center" onClick={handleApprove} disabled={isProcessing}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve Certification
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center text-destructive"
                  onClick={handleReject}
                  disabled={isProcessing}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Certification
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  )
}
