"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Building, CheckSquare, CreditCard, Users } from "lucide-react"
import Link from "next/link"

export function InstitutionDashboard() {
  const { user } = useAuth()
  const [institution, setInstitution] = useState<any>(null)
  const [caregivers, setCaregivers] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      setIsLoading(true)

      try {
        // Fetch institution details
        const { data: institutionData, error: institutionError } = await supabase
          .from("institutions")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (institutionError && institutionError.code !== "PGRST116") throw institutionError
        setInstitution(institutionData || null)

        if (institutionData) {
          // Fetch caregivers
          const { data: caregiverData, error: caregiverError } = await supabase
            .from("institution_caregivers")
            .select(`
              *,
              caregiver:caregiver_id (
                id,
                email:user_id (email),
                profile:profiles!caregiver_id (first_name, last_name)
              )
            `)
            .eq("institution_id", institutionData.id)
            .order("created_at", { ascending: false })

          if (caregiverError) throw caregiverError
          setCaregivers(caregiverData || [])
        }

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

  // Check if institution profile is incomplete
  const isProfileIncomplete = !institution

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Institution Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/caregivers/add">Add Caregiver</Link>
          </Button>
        </div>
      </div>

      {isProfileIncomplete && (
        <Alert
          variant="warning"
          className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Profile Incomplete</AlertTitle>
          <AlertDescription>
            Please complete your institution profile to access all features.
            <Button variant="link" asChild className="p-0 h-auto font-normal">
              <Link href="/profile">Complete Profile</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Institution</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{institution ? institution.name : "Not Set"}</div>
            <p className="text-xs text-muted-foreground">
              {institution ? `Reg #${institution.registration_number}` : "Complete your profile"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Caregivers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caregivers.length}</div>
            <p className="text-xs text-muted-foreground">Registered caregivers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {caregivers.length > 0
                ? `${Math.round((caregivers.filter((c) => c.status === "active").length / caregivers.length) * 100)}%`
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Caregiver compliance rate</p>
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
            <CardTitle>Recent Caregivers</CardTitle>
            <CardDescription>Caregivers registered with your institution</CardDescription>
          </CardHeader>
          <CardContent>
            {caregivers.length > 0 ? (
              <div className="space-y-4">
                {caregivers.slice(0, 5).map((caregiver) => (
                  <div key={caregiver.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {caregiver.caregiver?.profile?.[0]?.first_name || ""}{" "}
                        {caregiver.caregiver?.profile?.[0]?.last_name || "Unknown"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {caregiver.caregiver?.email?.[0]?.email || "No email"}
                      </p>
                    </div>
                    <Badge variant={caregiver.status === "active" ? "success" : "secondary"}>
                      {caregiver.status.charAt(0).toUpperCase() + caregiver.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No caregivers registered</p>
                <Button className="mt-4" asChild>
                  <Link href="/caregivers/add">Add Caregiver</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Your recent payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {payments.length > 0 ? (
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {payment.payment_type.charAt(0).toUpperCase() + payment.payment_type.slice(1)} Payment
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(payment.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">KES {payment.amount.toFixed(2)}</p>
                      <Badge
                        variant={
                          payment.status === "completed"
                            ? "success"
                            : payment.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No payment transactions found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
