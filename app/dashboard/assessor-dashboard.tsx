"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckSquare, Clipboard, Users } from "lucide-react"
import Link from "next/link"

export function AssessorDashboard() {
  const { user } = useAuth()
  const [assessments, setAssessments] = useState<any[]>([])
  const [upcomingAssessments, setUpcomingAssessments] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalAssessments: 0,
    completedAssessments: 0,
    scheduledAssessments: 0,
    assessedCaregivers: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      setIsLoading(true)

      try {
        // Fetch assessments
        const { data: assessmentData, error: assessmentError } = await supabase
          .from("assessments")
          .select(`
            *,
            caregiver:user_id (
              email,
              profiles!user_id (first_name, last_name)
            )
          `)
          .eq("assessor_id", user.id)
          .order("assessment_date", { ascending: false })

        if (assessmentError) throw assessmentError
        setAssessments(assessmentData || [])

        // Calculate stats
        const totalAssessments = assessmentData?.length || 0
        const completedAssessments = assessmentData?.filter((a) => a.status === "completed").length || 0
        const scheduledAssessments = assessmentData?.filter((a) => a.status === "scheduled").length || 0

        // Get unique caregivers
        const uniqueCaregivers = new Set(assessmentData?.map((a) => a.user_id) || [])

        setStats({
          totalAssessments,
          completedAssessments,
          scheduledAssessments,
          assessedCaregivers: uniqueCaregivers.size,
        })

        // Get upcoming assessments
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const upcoming =
          assessmentData
            ?.filter((a) => {
              const assessmentDate = new Date(a.assessment_date)
              assessmentDate.setHours(0, 0, 0, 0)
              return a.status === "scheduled" && assessmentDate >= today
            })
            .sort((a, b) => new Date(a.assessment_date).getTime() - new Date(b.assessment_date).getTime())
            .slice(0, 5) || []

        setUpcomingAssessments(upcoming)
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
        <h2 className="text-3xl font-bold tracking-tight">Assessor Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/assessments/schedule">Schedule Assessment</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <Clipboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAssessments}</div>
            <p className="text-xs text-muted-foreground">All time assessments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedAssessments}</div>
            <p className="text-xs text-muted-foreground">Completed assessments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.scheduledAssessments}</div>
            <p className="text-xs text-muted-foreground">Upcoming assessments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Caregivers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assessedCaregivers}</div>
            <p className="text-xs text-muted-foreground">Unique caregivers assessed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assessments</CardTitle>
            <CardDescription>Scheduled assessments for the coming days</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingAssessments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAssessments.map((assessment) => (
                  <div key={assessment.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {assessment.caregiver?.profiles?.[0]?.first_name || ""}{" "}
                        {assessment.caregiver?.profiles?.[0]?.last_name || assessment.caregiver?.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(assessment.assessment_date).toLocaleDateString()} - {assessment.assessment_type}
                      </p>
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/assessments/${assessment.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No upcoming assessments</p>
                <Button className="mt-4" asChild>
                  <Link href="/assessments/schedule">Schedule Assessment</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Assessments</CardTitle>
            <CardDescription>Your recently completed assessments</CardDescription>
          </CardHeader>
          <CardContent>
            {assessments.filter((a) => a.status === "completed").length > 0 ? (
              <div className="space-y-4">
                {assessments
                  .filter((a) => a.status === "completed")
                  .slice(0, 5)
                  .map((assessment) => (
                    <div key={assessment.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {assessment.caregiver?.profiles?.[0]?.first_name || ""}{" "}
                          {assessment.caregiver?.profiles?.[0]?.last_name || assessment.caregiver?.email}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(assessment.assessment_date).toLocaleDateString()} - Score: {assessment.score}
                        </p>
                      </div>
                      <Badge variant={assessment.score >= 70 ? "success" : "destructive"}>
                        {assessment.score >= 70 ? "Passed" : "Failed"}
                      </Badge>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No completed assessments</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
