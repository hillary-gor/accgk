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
import { Award, Download, FileText } from "lucide-react"

export default function LicensesPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [licenses, setLicenses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchLicenses = async () => {
      setIsLoading(true)
      try {
        // Get user role
        const role = user.user_metadata?.role
        setUserRole(role)

        let query = supabase.from("licenses").select("*")

        // If user is a caregiver, only show their licenses
        if (role === "caregiver") {
          query = query.eq("user_id", user.id)
        }

        const { data, error } = await query.order("created_at", { ascending: false })

        if (error) throw error
        setLicenses(data || [])
      } catch (error) {
        console.error("Error fetching licenses:", error)
        toast({
          title: "Error",
          description: "Failed to fetch licenses",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchLicenses()
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

  const handleDownloadCertificate = async (licenseId: string) => {
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

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Licenses</h2>
            <p className="text-muted-foreground">
              {userRole === "admin"
                ? "Manage and review caregiver license applications"
                : "View and manage your caregiver licenses"}
            </p>
          </div>
          {userRole === "caregiver" && (
            <Button asChild>
              <Link href="/licenses/apply">Apply for License</Link>
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        ) : licenses.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Licenses Found</CardTitle>
              <CardDescription>
                {userRole === "caregiver"
                  ? "You haven't applied for a caregiver license yet."
                  : "There are no license applications to review."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userRole === "caregiver" && (
                <Button asChild>
                  <Link href="/licenses/apply">Apply for License</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {licenses.map((license) => (
              <Card key={license.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-primary" />
                      License #{license.license_number}
                    </CardTitle>
                    <CardDescription>Applied on {new Date(license.created_at).toLocaleDateString()}</CardDescription>
                  </div>
                  <Badge variant={getStatusBadgeVariant(license.status)}>
                    {license.status.charAt(0).toUpperCase() + license.status.slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
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

                  <div className="mt-4 flex flex-wrap gap-2">
                    {license.status === "approved" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                        onClick={() => handleDownloadCertificate(license.id)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Certificate
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="flex items-center" asChild>
                      <Link href={`/licenses/${license.id}`}>
                        <FileText className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </Button>
                    {license.status === "approved" &&
                      license.expiry_date &&
                      new Date(license.expiry_date) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                        <Button variant="outline" size="sm" className="flex items-center" asChild>
                          <Link href="/licenses/renew">Renew License</Link>
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
