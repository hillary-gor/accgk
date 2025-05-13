"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { Download, FileText, Medal } from "lucide-react"

export default function CertificationsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [certifications, setCertifications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchCertifications = async () => {
      setIsLoading(true)
      try {
        // Get user role
        const role = user.user_metadata?.role
        setUserRole(role)

        let query = supabase.from("certifications").select("*")

        // If user is a caregiver, only show their certifications
        if (role === "caregiver") {
          query = query.eq("user_id", user.id)
        }

        const { data, error } = await query.order("created_at", { ascending: false })

        if (error) throw error
        setCertifications(data || [])
      } catch (error) {
        console.error("Error fetching certifications:", error)
        toast({
          title: "Error",
          description: "Failed to fetch certifications",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCertifications()
  }, [user, toast])

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

  const handleDownloadCertificate = async (certificationId: string) => {
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

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Certifications</h2>
            <p className="text-muted-foreground">
              {userRole === "admin"
                ? "Manage and review caregiver certification applications"
                : "View and manage your caregiver certifications"}
            </p>
          </div>
          {userRole === "caregiver" && (
            <Button asChild>
              <Link href="/certifications/apply">Apply for Certification</Link>
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        ) : certifications.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Certifications Found</CardTitle>
              <CardDescription>
                {userRole === "caregiver"
                  ? "You haven't applied for any certifications yet."
                  : "There are no certification applications to review."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userRole === "caregiver" && (
                <Button asChild>
                  <Link href="/certifications/apply">Apply for Certification</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {certifications.map((certification) => (
              <Card key={certification.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="flex items-center">
                      <Medal className="mr-2 h-5 w-5 text-primary" />
                      {getCertificationTypeLabel(certification.certification_type)}
                    </CardTitle>
                    <CardDescription>
                      Applied on {new Date(certification.created_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusBadgeVariant(certification.status)}>
                    {certification.status.charAt(0).toUpperCase() + certification.status.slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
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

                  <div className="mt-4 flex flex-wrap gap-2">
                    {certification.status === "approved" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                        onClick={() => handleDownloadCertificate(certification.id)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Certificate
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="flex items-center" asChild>
                      <Link href={`/certifications/${certification.id}`}>
                        <FileText className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </Button>
                    {certification.status === "approved" &&
                      certification.expiry_date &&
                      new Date(certification.expiry_date) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                        <Button variant="outline" size="sm" className="flex items-center" asChild>
                          <Link href="/certifications/renew">Renew Certification</Link>
                        </Button>
                      )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
