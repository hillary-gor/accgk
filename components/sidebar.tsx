"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import {
  BarChart3,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  Home,
  LifeBuoy,
  Settings,
  Users,
  Award,
  Clipboard,
  School,
  Building,
  CheckSquare,
} from "lucide-react"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  // Get user role from metadata
  const userRole = user?.user_metadata?.role || "guest"

  // Define sidebar items based on user role
  const sidebarItems = {
    caregiver: [
      { href: "/dashboard", label: "Dashboard", icon: Home },
      { href: "/licenses", label: "Licenses", icon: Award },
      { href: "/certifications", label: "Certifications", icon: FileText },
      { href: "/training", label: "Training", icon: BookOpen },
      { href: "/payments", label: "Payments", icon: CreditCard },
      { href: "/profile", label: "Profile", icon: Users },
      { href: "/settings", label: "Settings", icon: Settings },
      { href: "/help", label: "Help & Support", icon: LifeBuoy },
    ],
    institution: [
      { href: "/dashboard", label: "Dashboard", icon: Home },
      { href: "/caregivers", label: "Caregivers", icon: Users },
      { href: "/compliance", label: "Compliance", icon: CheckSquare },
      { href: "/certifications", label: "Certifications", icon: FileText },
      { href: "/payments", label: "Payments", icon: CreditCard },
      { href: "/profile", label: "Profile", icon: Building },
      { href: "/settings", label: "Settings", icon: Settings },
      { href: "/help", label: "Help & Support", icon: LifeBuoy },
    ],
    admin: [
      { href: "/dashboard", label: "Dashboard", icon: Home },
      { href: "/users", label: "Users", icon: Users },
      { href: "/licenses", label: "Licenses", icon: Award },
      { href: "/certifications", label: "Certifications", icon: FileText },
      { href: "/training", label: "Training", icon: BookOpen },
      { href: "/payments", label: "Payments", icon: CreditCard },
      { href: "/reports", label: "Reports", icon: BarChart3 },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
    assessor: [
      { href: "/dashboard", label: "Dashboard", icon: Home },
      { href: "/assessments", label: "Assessments", icon: Clipboard },
      { href: "/schedule", label: "Schedule", icon: Calendar },
      { href: "/reports", label: "Reports", icon: BarChart3 },
      { href: "/profile", label: "Profile", icon: Users },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
    trainer: [
      { href: "/dashboard", label: "Dashboard", icon: Home },
      { href: "/programs", label: "Programs", icon: School },
      { href: "/participants", label: "Participants", icon: Users },
      { href: "/schedule", label: "Schedule", icon: Calendar },
      { href: "/reports", label: "Reports", icon: BarChart3 },
      { href: "/profile", label: "Profile", icon: Users },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  }

  // Get sidebar items for the current user role
  const items = sidebarItems[userRole as keyof typeof sidebarItems] || []

  if (items.length === 0) return null

  return (
    <ShadcnSidebar className={className}>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">AC</span>
          </div>
          <span className="text-lg font-semibold">ACCGK</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} ACCGK</div>
      </SidebarFooter>
      <SidebarRail />
    </ShadcnSidebar>
  )
}
