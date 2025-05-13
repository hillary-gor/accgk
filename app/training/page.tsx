"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { BookOpen, Calendar, Clock, Users } from "lucide-react"

export default function TrainingProgramsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [programs, setPrograms] = useState<any[]>([])
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchTrainingPrograms = async () => {
      setIsLoading(true)
      try {
        // Get user role
        const role = user.user_metadata?.role
        setUserRole(role)

        // Fetch all published training programs
        const { data: programsData, error: programsError } = await supabase
          .from("training_programs")
          .select(`
            *,
            trainer:trainer_id (
              profiles!user_id (first_name, last_name)
            )
          `)
          .eq("status", "published")
          .order("created_at", { ascending: false })

        if (programsError) throw programsError
        setPrograms(programsData || [])

        // If user is a caregiver, fetch their enrollments
        if (role === "caregiver") {
          const { data: enrollmentsData, error: enrollmentsError } = await supabase
            .from("training_enrollments")
            .select("*")
            .eq("user_id", user.id)

          if (enrollmentsError) throw enrollmentsError
          setEnrollments(enrollmentsData || [])
        }
      } catch (error) {
        console.error("Error fetching training programs:", error)
        toast({
          title: "Error",
          description: "Failed to fetch training programs",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrainingPrograms()
  }, [user, toast])

  const isEnrolled = (programId: string) => {
    return enrollments.some((enrollment) => enrollment.program_id === programId)
  }

  const getEnrollmentStatus = (programId: string) => {
    const enrollment = enrollments.find((e) => e.program_id === programId)
    return enrollment ? enrollment.status : null
  }

  const handleEnroll = async (programId: string) => {
    if (!user || userRole !== "caregiver") return

    try {
      // Create enrollment record
      const { error } = await supabase.from("training_enrollments").insert({
        user_id: user.id,
        program_id: programId,
        status: "enrolled",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      toast({
        title: "Enrolled Successfully",
        description: "You have been enrolled in the training program.",
      })

      // Refresh enrollments
      const { data, error: fetchError } = await supabase.from("training_enrollments").select("*").eq("user_id", user.id)

      if (fetchError) throw fetchError
      setEnrollments(data || [])
    } catch (error) {
      console.error("Error enrolling in program:", error)
      toast({
        title: "Error",
        description: "Failed to enroll in the training program",
        variant: "destructive",
      })
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "success"
      case "in_progress":
        return "secondary"
      case "enrolled":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Training Programs</h2>
            <p className="text-muted-foreground">
              {userRole === "trainer"
                ? "Manage your training programs"
                : "Browse and enroll in caregiver training programs"}
            </p>
          </div>
          {userRole === "trainer" && (
            <Button asChild>
              <Link href="/programs/create">Create Program</Link>
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        ) : programs.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Training Programs Available</CardTitle>
              <CardDescription>There are currently no training programs available.</CardDescription>
            </CardHeader>
            {userRole === "trainer" && (
              <CardFooter>
                <Button asChild>
                  <Link href="/programs/create">Create Program</Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => {
              const enrolled = isEnrolled(program.id)
              const enrollmentStatus = getEnrollmentStatus(program.id)

              return (
                <Card key={program.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{program.title}</CardTitle>
                    <CardDescription>
                      By{" "}
                      {program.trainer?.profiles?.[0]
                        ? `${program.trainer.profiles[0].first_name} ${program.trainer.profiles[0].last_name}`
                        : "Unknown Trainer"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{program.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>4 weeks</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>Self-paced</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>10 modules</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>50+ enrolled</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-stretch gap-2">
                    {enrolled ? (
                      <>
                        <Badge variant={getStatusBadgeVariant(enrollmentStatus)} className="self-start">
                          {enrollmentStatus
                            .split("_")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </Badge>
                        <Button asChild>
                          <Link href={`/training/${program.id}`}>Continue Learning</Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => handleEnroll(program.id)}>Enroll Now</Button>
                        <Button variant="outline" asChild>
                          <Link href={`/training/${program.id}`}>View Details</Link>
                        </Button>
                      </>
                    )}
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
