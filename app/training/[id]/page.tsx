"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { BookOpen, Calendar, CheckCircle, Clock, Download, Users } from "lucide-react"

export default function TrainingProgramDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [program, setProgram] = useState<any>(null)
  const [enrollment, setEnrollment] = useState<any>(null)
  const [trainer, setTrainer] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)

  const programId = params.id as string

  useEffect(() => {
    if (!user) return

    const fetchProgramDetails = async () => {
      setIsLoading(true)
      try {
        // Get user role
        const role = user.user_metadata?.role
        setUserRole(role)

        // Fetch program details
        const { data: programData, error: programError } = await supabase
          .from("training_programs")
          .select("*")
          .eq("id", programId)
          .single()

        if (programError) throw programError
        setProgram(programData)

        // Fetch trainer details
        const { data: trainerData, error: trainerError } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", programData.trainer_id)
          .single()

        if (trainerError && trainerError.code !== "PGRST116") throw trainerError
        setTrainer(trainerData)

        // If user is a caregiver, check enrollment status
        if (role === "caregiver") {
          const { data: enrollmentData, error: enrollmentError } = await supabase
            .from("training_enrollments")
            .select("*")
            .eq("user_id", user.id)
            .eq("program_id", programId)
            .single()

          if (!enrollmentError) {
            setEnrollment(enrollmentData)
          }
        }
      } catch (error) {
        console.error("Error fetching program details:", error)
        toast({
          title: "Error",
          description: "Failed to fetch program details",
          variant: "destructive",
        })
        router.push("/training")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProgramDetails()
  }, [user, programId, router, toast])

  const handleEnroll = async () => {
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

      // Refresh enrollment
      const { data, error: fetchError } = await supabase
        .from("training_enrollments")
        .select("*")
        .eq("user_id", user.id)
        .eq("program_id", programId)
        .single()

      if (fetchError) throw fetchError
      setEnrollment(data)
    } catch (error) {
      console.error("Error enrolling in program:", error)
      toast({
        title: "Error",
        description: "Failed to enroll in the training program",
        variant: "destructive",
      })
    }
  }

  const handleMarkComplete = async () => {
    if (!user || !enrollment) return

    try {
      // Update enrollment status
      const { error } = await supabase
        .from("training_enrollments")
        .update({
          status: "completed",
          completion_date: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", enrollment.id)

      if (error) throw error

      toast({
        title: "Training Completed",
        description: "Congratulations! You have completed this training program.",
      })

      // Refresh enrollment
      const { data, error: fetchError } = await supabase
        .from("training_enrollments")
        .select("*")
        .eq("id", enrollment.id)
        .single()

      if (fetchError) throw fetchError
      setEnrollment(data)
    } catch (error) {
      console.error("Error marking training as complete:", error)
      toast({
        title: "Error",
        description: "Failed to mark training as complete",
        variant: "destructive",
      })
    }
  }

  const handleDownloadCertificate = async () => {
    try {
      // In a real implementation, this would generate and download the certificate
      toast({
        title: "Certificate Downloaded",
        description: "Your training completion certificate has been downloaded successfully.",
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

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
      </DashboardShell>
    )
  }

  if (!program) {
    return (
      <DashboardShell>
        <Card>
          <CardHeader>
            <CardTitle>Training Program Not Found</CardTitle>
            <CardDescription>
              The training program you are looking for does not exist or you don't have access.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/training")}>Back to Training Programs</Button>
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
            <h2 className="text-3xl font-bold tracking-tight">{program.title}</h2>
            <p className="text-muted-foreground">
              By{" "}
              {trainer
                ? `${trainer.first_name} ${trainer.last_name}`
                : `Trainer ID: ${program.trainer_id.substring(0, 8)}...`}
            </p>
          </div>
          <Button variant="outline" onClick={() => router.push("/training")}>
            Back to Training Programs
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{program.description}</p>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">4 weeks</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Format</p>
                      <p className="text-sm text-muted-foreground">Self-paced</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Modules</p>
                      <p className="text-sm text-muted-foreground">10 modules</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Enrollment</p>
                      <p className="text-sm text-muted-foreground">50+ caregivers</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="content">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="outcomes">Learning Outcomes</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Program Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Module 1: Introduction to Caregiving</h3>
                        {enrollment && <CheckCircle className="h-4 w-4 text-primary" />}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Overview of caregiving principles and ethical considerations.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Module 2: Basic Care Techniques</h3>
                        {enrollment && <CheckCircle className="h-4 w-4 text-primary" />}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Essential techniques for providing daily care and support.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Module 3: Communication Skills</h3>
                        {enrollment && enrollment.status === "in_progress" && (
                          <Badge variant="outline">In Progress</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Effective communication with clients and healthcare professionals.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Module 4: Safety and Emergency Procedures</h3>
                      <p className="text-sm text-muted-foreground">
                        Handling emergencies and maintaining a safe environment.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Module 5: Specialized Care Techniques</h3>
                      <p className="text-sm text-muted-foreground">Advanced techniques for specific care situations.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="requirements" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Program Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Basic literacy and communication skills</li>
                      <li>Access to a computer or mobile device with internet connection</li>
                      <li>Commitment to complete all modules and assessments</li>
                      <li>Previous healthcare experience is beneficial but not required</li>
                      <li>Willingness to participate in practical exercises</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="outcomes" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Outcomes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Understand the fundamental principles of caregiving</li>
                      <li>Develop essential skills for providing daily care</li>
                      <li>Learn effective communication techniques with clients and healthcare professionals</li>
                      <li>Identify and respond appropriately to emergency situations</li>
                      <li>Apply specialized care techniques for specific client needs</li>
                      <li>Demonstrate ethical decision-making in caregiving scenarios</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Status</CardTitle>
              </CardHeader>
              <CardContent>
                {enrollment ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Status</p>
                      <Badge variant={getStatusBadgeVariant(enrollment.status)}>
                        {enrollment.status
                          .split("_")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Progress</p>
                      <Progress value={enrollment.status === "completed" ? 100 : 30} className="h-2" />
                      <p className="text-xs text-right mt-1 text-muted-foreground">
                        {enrollment.status === "completed" ? "100%" : "30%"} complete
                      </p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Enrolled on</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(enrollment.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {enrollment.completion_date && (
                      <div>
                        <p className="font-medium mb-1">Completed on</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(enrollment.completion_date).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-4">You are not enrolled in this program yet.</p>
                    {userRole === "caregiver" && (
                      <Button onClick={handleEnroll} className="w-full">
                        Enroll Now
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
              {enrollment && (
                <CardFooter className="flex flex-col space-y-2">
                  {enrollment.status === "completed" ? (
                    <Button className="w-full" onClick={handleDownloadCertificate}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Certificate
                    </Button>
                  ) : (
                    <Button className="w-full" onClick={handleMarkComplete}>
                      Mark as Completed
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trainer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold">
                      {trainer ? trainer.first_name.charAt(0) + trainer.last_name.charAt(0) : "T"}
                    </span>
                  </div>
                  <h3 className="font-medium text-lg">
                    {trainer ? `${trainer.first_name} ${trainer.last_name}` : "Unknown Trainer"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">Certified Caregiver Trainer</p>
                  <p className="text-sm text-muted-foreground">
                    Experienced trainer with over 10 years in healthcare and caregiving education.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
