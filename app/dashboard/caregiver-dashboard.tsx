"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Award, BookOpen, CreditCard, FileText } from "lucide-react"
import Link from "next/link"

export function CaregiverDashboard() {
  const { user } = useAuth()
  const [licenses, setLicenses] = useState<any[]>([])
  const [certifications, setCertifications] = useState<any[]>([])
  const [trainings, setTrainings] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      setIsLoading(true)

      try {
        // Fetch licenses
        const { data: licenseData, error: licenseError } = await supabase
          .from("licenses")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5)

        if (licenseError) throw licenseError
        setLicenses(licenseData || [])

        // Fetch certifications
        const { data: certData, error: certError } = await supabase
          .from("certifications")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5)

        if (certError) throw certError
        setCertifications(certData || [])

        // Fetch training enrollments
        const { data: trainingData, error: trainingError } = await supabase
          .from("training_enrollments")
          .select(`
            *,
            training_programs:program_id (
              title,
              description
            )
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5)

        if (trainingError) throw trainingError
        setTrainings(trainingData || [])

        // Fetch payments
        const { data: paymentData, error: paymentError } = await supabase
          .from("payments")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5)

        if (paymentError) throw paymentError
        setPayments(paymentData || [])
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user])

  if (isLoading) {
    return <div>Loading dashboard data...</div>
  }

  // Check if license is about to expire (within 30 days)
  const hasExpiringLicense = licenses.some((license) => {
    if (!license.expiry_date) return false
    const expiryDate = new Date(license.expiry_date)
    const today = new Date()
    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays > 0
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Caregiver Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/licenses/apply">Apply for License</Link>
          </Button>
        </div>
      </div>

      {hasExpiringLicense && (
        <Alert
          variant="warning"
          className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>License Expiring Soon</AlertTitle>
          <AlertDescription>Your license is about to expire. Please renew it to continue practicing.</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">License Status</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {licenses.length > 0 ? (
                <Badge variant={licenses[0].status === "approved" ? "success" : "secondary"}>
                  {licenses[0].status.charAt(0).toUpperCase() + licenses[0].status.slice(1)}
                </Badge>
              ) : (
                "Not Applied"
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {licenses.length > 0
                ? `License #${licenses[0].license_number}`
                : "Apply for a license to practice as a caregiver"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certifications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certifications.length}</div>
            <p className="text-xs text-muted-foreground">Active certifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Programs</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainings.length}</div>
            <p className="text-xs text-muted-foreground">Enrolled training programs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.filter((p) => p.status === "completed").length}</div>
            <p className="text-xs text-muted-foreground">Completed payments</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Licenses</CardTitle>
            <CardDescription>Your license applications and status</CardDescription>
          </CardHeader>
          <CardContent>
            {licenses.length > 0 ? (
              <div className="space-y-4">
                {licenses.map((license) => (
                  <div key={license.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">License #{license.license_number}</p>
                      <p className="text-sm text-muted-foreground">
                        {license.issue_date
                          ? `Issued: ${new Date(license.issue_date).toLocaleDateString()}`
                          : "Pending approval"}
                      </p>
                    </div>
                    <Badge
                      variant={
                        license.status === "approved"
                          ? "success"
                          : license.status === "pending"
                            ? "secondary"
                            : license.status === "rejected"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {license.status.charAt(0).toUpperCase() + license.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No license applications found</p>
                <Button className="mt-4" asChild>
                  <Link href="/licenses/apply">Apply for License</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Programs</CardTitle>
            <CardDescription>Your enrolled training programs</CardDescription>
          </CardHeader>
          <CardContent>
            {trainings.length > 0 ? (
              <div className="space-y-4">
                {trainings.map((training) => (
                  <div key={training.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{training.training_programs?.title || "Unknown Program"}</p>
                      <p className="text-sm text-muted-foreground">
                        Enrolled: {new Date(training.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant={
                        training.status === "completed"
                          ? "success"
                          : training.status === "in_progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {training.status
                        .split("_")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No training programs enrolled</p>
                <Button className="mt-4" asChild>
                  <Link href="/training">Browse Programs</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
