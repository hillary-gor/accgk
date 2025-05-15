"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, CreditCard, FileText, Users } from "lucide-react"
import Link from "next/link"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCaregivers: 0,
    totalInstitutions: 0,
    totalLicenses: 0,
    totalCertifications: 0,
    totalTrainings: 0,
    totalPayments: 0,
    revenueTotal: 0,
  })
  const [recentUsers, setRecentUsers] = useState<any[]>([])
  const [pendingLicenses, setPendingLicenses] = useState<any[]>([])
  const [pendingCertifications, setPendingCertifications] = useState<any[]>([])
  const [revenueData, setRevenueData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      setIsLoading(true)

      try {
        // Fetch user stats
        const { count: totalUsers } = await supabase.from("users").select("*", { count: "exact", head: true })

        const { count: totalCaregivers } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .eq("role", "caregiver")

        const { count: totalInstitutions } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .eq("role", "institution")

        // Fetch license stats
        const { count: totalLicenses } = await supabase.from("licenses").select("*", { count: "exact", head: true })

        // Fetch certification stats
        const { count: totalCertifications } = await supabase
          .from("certifications")
          .select("*", { count: "exact", head: true })

        // Fetch training stats
        const { count: totalTrainings } = await supabase
          .from("training_programs")
          .select("*", { count: "exact", head: true })

        // Fetch payment stats
        const { data: payments } = await supabase.from("payments").select("amount, status")

        const totalPayments = payments?.length || 0
        const revenueTotal =
          payments?.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0) || 0

        setStats({
          totalUsers: totalUsers || 0,
          totalCaregivers: totalCaregivers || 0,
          totalInstitutions: totalInstitutions || 0,
          totalLicenses: totalLicenses || 0,
          totalCertifications: totalCertifications || 0,
          totalTrainings: totalTrainings || 0,
          totalPayments,
          revenueTotal,
        })

        // Fetch recent users
        const { data: recentUsersData } = await supabase
          .from("users")
          .select(`
            *,
            profiles!user_id (first_name, last_name)
          `)
          .order("created_at", { ascending: false })
          .limit(5)

        setRecentUsers(recentUsersData || [])

        // Fetch pending licenses
        const { data: pendingLicensesData } = await supabase
          .from("licenses")
          .select(`
            *,
            user:user_id (
              email,
              profiles!user_id (first_name, last_name)
            )
          `)
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(5)

        setPendingLicenses(pendingLicensesData || [])

        // Fetch pending certifications
        const { data: pendingCertificationsData } = await supabase
          .from("certifications")
          .select(`
            *,
            user:user_id (
              email,
              profiles!user_id (first_name, last_name)
            )
          `)
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(5)

        setPendingCertifications(pendingCertificationsData || [])

        // Generate revenue data (mock data for now)
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const currentMonth = new Date().getMonth()

        const mockRevenueData = Array.from({ length: 6 }, (_, i) => {
          const monthIndex = (currentMonth - 5 + i + 12) % 12
          return {
            name: months[monthIndex],
            revenue: Math.floor(Math.random() * 50000) + 10000,
          }
        })

        setRevenueData(mockRevenueData)
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/reports">View Reports</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalCaregivers} caregivers, {stats.totalInstitutions} institutions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Licenses</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLicenses}</div>
            <p className="text-xs text-muted-foreground">{pendingLicenses.length} pending approvals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certifications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCertifications}</div>
            <p className="text-xs text-muted-foreground">{pendingCertifications.length} pending approvals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {stats.revenueTotal.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From {stats.totalPayments} payments</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>New users that have joined the platform</CardDescription>
          </CardHeader>
          <CardContent>
            {recentUsers.length > 0 ? (
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {user.profiles?.[0]?.first_name || ""} {user.profiles?.[0]?.last_name || user.email}
                      </p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <Badge>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No recent users</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pending Licenses</CardTitle>
            <CardDescription>License applications awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingLicenses.length > 0 ? (
              <div className="space-y-4">
                {pendingLicenses.map((license) => (
                  <div key={license.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {license.user?.profiles?.[0]?.first_name || ""}{" "}
                        {license.user?.profiles?.[0]?.last_name || license.user?.email}
                      </p>
                      <p className="text-sm text-muted-foreground">License #{license.license_number}</p>
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/licenses/${license.id}`}>Review</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No pending license applications</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Certifications</CardTitle>
            <CardDescription>Certification applications awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingCertifications.length > 0 ? (
              <div className="space-y-4">
                {pendingCertifications.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {cert.user?.profiles?.[0]?.first_name || ""}{" "}
                        {cert.user?.profiles?.[0]?.last_name || cert.user?.email}
                      </p>
                      <p className="text-sm text-muted-foreground">{cert.certification_type}</p>
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/certifications/${cert.id}`}>Review</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No pending certification applications</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
