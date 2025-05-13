import type React from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ResponsiveContainer } from "@/components/responsive-container"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <SidebarInset>
            <main className="flex-1 p-4 md:p-6">
              <ResponsiveContainer>{children}</ResponsiveContainer>
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
