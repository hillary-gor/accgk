"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardShell } from "@/components/dashboard-shell"
import { CaregiverDashboard } from "@/app/dashboard/caregiver-dashboard"
import { InstitutionDashboard } from "@/app/dashboard/institution-dashboard"
import { AdminDashboard } from "@/app/dashboard/admin-dashboard"
import { AssessorDashboard } from "@/app/dashboard/assessor-dashboard"
import { TrainerDashboard } from "@/app/dashboard/trainer-dashboard"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/signin")
    } else if (user) {
      setRole(user.user_metadata?.role || null)
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-full">
          <p>Loading...</p>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      {role === "caregiver" && <CaregiverDashboard />}
      {role === "institution" && <InstitutionDashboard />}
      {role === "admin" && <AdminDashboard />}
      {role === "assessor" && <AssessorDashboard />}
      {role === "trainer" && <TrainerDashboard />}
      {!role && (
        <div className="flex items-center justify-center h-full">
          <p>Role not assigned. Please contact an administrator.</p>
        </div>
      )}
    </DashboardShell>
  )
}
