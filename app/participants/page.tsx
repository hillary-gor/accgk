"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { CheckCircle, Search, XCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function ParticipantsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [participants, setParticipants] = useState<any[]>([])
  const [programs, setPrograms] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [programFilter, setProgramFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!user) return

    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Verify user is a trainer
        if (user.user_metadata?.role !== "trainer") {
          router.push("/dashboard")
          return
        }

        // Fetch all programs created by this trainer
        const { data: programsData, error: programsError } = await supabase
          .from("training_programs")
          .select("id, title")
          .eq("trainer_id", user.id)
          .order("created_at", { ascending: false })

        if (programsError) throw programsError
        setPrograms(programsData || [])

        // Fetch all participants for this trainer's programs
        const { data: participantsData, error: participantsError } = await supabase
          .from("training_enrollments")
          .select(`
            *,
            caregiver:user_id (
              email,
              profiles!user_id (first_name, last_name, phone_number)
            ),
            program:program_id (
              title
            )
          `)
          .in("program_id", programsData?.map((p) => p.id) || [])
          .order("created_at", { ascending: false })

        if (participantsError) throw participantsError
        setParticipants(participantsData || [])
      } catch (error) {
        console.error("Error fetching participants:", error)
        toast({
          title: "Error",
          description: "Failed to fetch participants",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user, toast, router])

  const handleUpdateStatus = async (enrollmentId: string, newStatus: string) => {
    setIsUpdating(true)
    try {
      const updates: any = {
        status: newStatus,
        updated_at: new Date().toISOString(),
      }

      // If status is completed, add completion date
      if (newStatus === "completed") {
        updates.completion_date = new Date().toISOString()
      }

      const { error } = await supabase.from("training_enrollments").update(updates).eq("id", enrollmentId)

      if (error) throw error

      toast({
        title: "Status Updated",
        description: "The participant's status has been updated successfully.",
      })

      // Update local state
      setParticipants((prev) => prev.map((p) => (p.id === enrollmentId ? { ...p, status: newStatus, ...updates } : p)))
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        title: "Error",
        description: "Failed to update participant status",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const filteredParticipants = participants.filter((participant) => {
    // Filter by program
    if (programFilter !== "all" && participant.program_id !== programFilter) {
      return false
    }

    // Filter by status
    if (statusFilter !== "all" && participant.status !== statusFilter) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const firstName = participant.caregiver?.profiles?.[0]?.first_name || ""
      const lastName = participant.caregiver?.profiles?.[0]?.last_name || ""
      const email = participant.caregiver?.email || ""
      const fullName = `${firstName} ${lastName}`.toLowerCase()
      const query = searchQuery.toLowerCase()

      return fullName.includes(query) || email.toLowerCase().includes(query)
    }

    return true
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "success"
      case "in_progress":
        return "secondary"
      case "enrolled":
        return "outline"
      case "failed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Participants</h2>
            <p className="text-muted-foreground">Manage participants enrolled in your training programs</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search participants..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={programFilter} onValueChange={setProgramFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Programs</SelectItem>
              {programs.map((program) => (
                <SelectItem key={program.id} value={program.id}>
                  {program.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="enrolled">Enrolled</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        ) : filteredParticipants.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Participants Found</CardTitle>
              <CardDescription>
                {participants.length === 0
                  ? "There are no participants enrolled in your training programs yet."
                  : "No participants match your current filters."}
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Program</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Enrolled On</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredParticipants.map((participant) => (
                    <tr
                      key={participant.id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle">
                        <div>
                          <p className="font-medium">
                            {participant.caregiver?.profiles?.[0]?.first_name || ""}{" "}
                            {participant.caregiver?.profiles?.[0]?.last_name || ""}
                          </p>
                          <p className="text-sm text-muted-foreground">{participant.caregiver?.email}</p>
                        </div>
                      </td>
                      <td className="p-4 align-middle">{participant.program?.title}</td>
                      <td className="p-4 align-middle">{new Date(participant.created_at).toLocaleDateString()}</td>
                      <td className="p-4 align-middle">
                        <Badge variant={getStatusBadgeVariant(participant.status)}>
                          {participant.status
                            .split("_")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex space-x-2">
                          {participant.status !== "completed" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleUpdateStatus(participant.id, "completed")}
                              disabled={isUpdating}
                              title="Mark as Completed"
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span className="sr-only">Mark as Completed</span>
                            </Button>
                          )}
                          {participant.status !== "failed" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleUpdateStatus(participant.id, "failed")}
                              disabled={isUpdating}
                              title="Mark as Failed"
                            >
                              <XCircle className="h-4 w-4" />
                              <span className="sr-only">Mark as Failed</span>
                            </Button>
                          )}
                          {participant.status === "enrolled" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleUpdateStatus(participant.id, "in_progress")}
                              disabled={isUpdating}
                              title="Mark as In Progress"
                            >
                              <span className="h-4 w-4">IP</span>
                              <span className="sr-only">Mark as In Progress</span>
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
