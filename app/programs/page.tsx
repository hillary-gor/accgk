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
import { Edit, Eye, Trash, Users } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

export default function ProgramsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [programs, setPrograms] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!user) return

    const fetchPrograms = async () => {
      setIsLoading(true)
      try {
        // Verify user is a trainer
        if (user.user_metadata?.role !== "trainer") {
          router.push("/dashboard")
          return
        }

        // Fetch all programs created by this trainer
        const { data, error } = await supabase
          .from("training_programs")
          .select(`
            *,
            enrollments:training_enrollments(count)
          `)
          .eq("trainer_id", user.id)
          .order("created_at", { ascending: false })

        if (error) throw error
        setPrograms(data || [])
      } catch (error) {
        console.error("Error fetching programs:", error)
        toast({
          title: "Error",
          description: "Failed to fetch training programs",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrograms()
  }, [user, toast, router])

  const handleDeleteProgram = async (programId: string) => {
    try {
      // Check if there are enrollments
      const { count, error: countError } = await supabase
        .from("training_enrollments")
        .select("*", { count: "exact", head: true })
        .eq("program_id", programId)

      if (countError) throw countError

      if (count && count > 0) {
        // If there are enrollments, just archive the program
        const { error } = await supabase
          .from("training_programs")
          .update({
            status: "archived",
            updated_at: new Date().toISOString(),
          })
          .eq("id", programId)

        if (error) throw error

        toast({
          title: "Program Archived",
          description: "The program has been archived as it has active enrollments.",
        })
      } else {
        // If no enrollments, delete the program
        const { error } = await supabase.from("training_programs").delete().eq("id", programId)

        if (error) throw error

        toast({
          title: "Program Deleted",
          description: "The training program has been deleted successfully.",
        })
      }

      // Refresh programs list
      const { data, error } = await supabase
        .from("training_programs")
        .select(`
          *,
          enrollments:training_enrollments(count)
        `)
        .eq("trainer_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setPrograms(data || [])
    } catch (error) {
      console.error("Error deleting program:", error)
      toast({
        title: "Error",
        description: "Failed to delete training program",
        variant: "destructive",
      })
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "published":
        return "success"
      case "draft":
        return "secondary"
      case "archived":
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
            <p className="text-muted-foreground">Manage your training programs</p>
          </div>
          <Button asChild>
            <Link href="/programs/create">Create Program</Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        ) : programs.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Training Programs</CardTitle>
              <CardDescription>You haven't created any training programs yet.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/programs/create">Create Your First Program</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {programs.map((program) => (
              <Card key={program.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle>{program.title}</CardTitle>
                    <CardDescription>Created on {new Date(program.created_at).toLocaleDateString()}</CardDescription>
                  </div>
                  <Badge variant={getStatusBadgeVariant(program.status)}>
                    {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{program.description}</p>
                  <div className="flex items-center text-sm">
                    <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>
                      {program.enrollments?.[0]?.count || 0}{" "}
                      {program.enrollments?.[0]?.count === 1 ? "enrollment" : "enrollments"}
                    </span>
                  </div>
                </CardContent>
                <CardContent className="flex flex-wrap gap-2 pt-0">
                  <Button variant="outline" size="sm" className="flex items-center" asChild>
                    <Link href={`/training/${program.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center" asChild>
                    <Link href={`/programs/${program.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          {program.enrollments?.[0]?.count > 0
                            ? "This program has active enrollments. It will be archived instead of deleted."
                            : "This action cannot be undone. This will permanently delete the training program."}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteProgram(program.id)}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
