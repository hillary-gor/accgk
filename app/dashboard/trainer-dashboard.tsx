"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, School, Users } from "lucide-react"
import Link from "next/link"

export function TrainerDashboard() {
  const { user } = useAuth()
  const [programs, setPrograms] = useState<any[]>([])
  const [participants, setParticipants] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalPrograms: 0,
    activePrograms: 0,
    totalParticipants: 0,
    completionRate: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      setIsLoading(true)

      try {
        // Fetch training programs
        const { data: programData, error: programError } = await supabase
          .from("training_programs")
          .select("*")
          .eq("trainer_id", user.id)
          .order("created_at", { ascending: false })

        if (programError) throw programError
        setPrograms(programData || [])

        // Calculate program stats
        const totalPrograms = programData?.length || 0
        const activePrograms = programData?.filter((p) => p.status === "published").length || 0

        // Fetch participants for all programs
        if (programData && programData.length > 0) {
          const programIds = programData.map((p) => p.id)

          const { data: enrollmentData, error: enrollmentError } = await supabase
            .from("training_enrollments")
            .select(`
              *,
              program:program_id (title),
              caregiver:user_id (
                email,
                profiles!user_id (first_name, last_name)
              )
            `)
            .in("program_id", programIds)
            .order("created_at", { ascending: false })

          if (enrollmentError) throw enrollmentError
          setParticipants(enrollmentData || [])

          // Calculate participant stats
          const totalParticipants = enrollmentData?.length || 0
          const completedParticipants = enrollmentData?.filter((p) => p.status === "completed").length || 0
          const completionRate =
            totalParticipants > 0 ? Math.round((completedParticipants / totalParticipants) * 100) : 0

          setStats({
            totalPrograms,
            activePrograms,
            totalParticipants,
            completionRate,
          })
        } else {
          setStats({
            totalPrograms: 0,
            activePrograms: 0,
            totalParticipants: 0,
            completionRate: 0,
          })
        }
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
        <h2 className="text-3xl font-bold tracking-tight">Trainer Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/programs/create">Create Program</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Programs</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPrograms}</div>
            <p className="text-xs text-muted-foreground">{stats.activePrograms} active programs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalParticipants}</div>
            <p className="text-xs text-muted-foreground">Enrolled in all programs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">Program completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Session</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {programs.filter((p) => p.status === "published").length > 0 ? "Today" : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              {programs.filter((p) => p.status === "published").length > 0
                ? "You have active programs"
                : "No upcoming sessions"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Programs</CardTitle>
            <CardDescription>Training programs you have created</CardDescription>
          </CardHeader>
          <CardContent>
            {programs.length > 0 ? (
              <div className="space-y-4">
                {programs.slice(0, 5).map((program) => (
                  <div key={program.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{program.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Created: {new Date(program.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          program.status === "published"
                            ? "success"
                            : program.status === "draft"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                      </Badge>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/programs/${program.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No training programs created</p>
                <Button className="mt-4" asChild>
                  <Link href="/programs/create">Create Program</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Participants</CardTitle>
            <CardDescription>Recently enrolled participants</CardDescription>
          </CardHeader>
          <CardContent>
            {participants.length > 0 ? (
              <div className="space-y-4">
                {participants.slice(0, 5).map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {participant.caregiver?.profiles?.[0]?.first_name || ""}{" "}
                        {participant.caregiver?.profiles?.[0]?.last_name || participant.caregiver?.email}
                      </p>
                      <p className="text-sm text-muted-foreground">{participant.program?.title || "Unknown Program"}</p>
                    </div>
                    <Badge
                      variant={
                        participant.status === "completed"
                          ? "success"
                          : participant.status === "in_progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {participant.status
                        .split("_")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No participants enrolled</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
