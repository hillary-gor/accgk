import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "./utils/supabase/middleware";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the user is authenticated
  if (!session) {
    // If the user is not authenticated and trying to access a protected route, redirect to the login page
    if (
      req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/licenses") ||
      req.nextUrl.pathname.startsWith("/certifications") ||
      req.nextUrl.pathname.startsWith("/training") ||
      req.nextUrl.pathname.startsWith("/payments") ||
      req.nextUrl.pathname.startsWith("/profile") ||
      req.nextUrl.pathname.startsWith("/settings") ||
      req.nextUrl.pathname.startsWith("/users") ||
      req.nextUrl.pathname.startsWith("/assessments") ||
      req.nextUrl.pathname.startsWith("/programs") ||
      req.nextUrl.pathname.startsWith("/participants") ||
      req.nextUrl.pathname.startsWith("/reports") ||
      req.nextUrl.pathname.startsWith("/caregivers") ||
      req.nextUrl.pathname.startsWith("/compliance") ||
      req.nextUrl.pathname.startsWith("/schedule")
    ) {
      return NextResponse.redirect(new URL("/auth/signin", req.url))
    }
  }

  // If the user is authenticated and trying to access auth pages, redirect to the dashboard
  if (session) {
    if (req.nextUrl.pathname.startsWith("/auth/")) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/licenses/:path*",
    "/certifications/:path*",
    "/training/:path*",
    "/payments/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/users/:path*",
    "/assessments/:path*",
    "/programs/:path*",
    "/participants/:path*",
    "/reports/:path*",
    "/caregivers/:path*",
    "/compliance/:path*",
    "/schedule/:path*",
    "/auth/:path*",
  ],
}
