import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Get Supabase credentials
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // Create Supabase client
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${req.cookies.get("sb-access-token")?.value}`,
      },
    },
  });

  // Fetch session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Fetch user role from `approved_users`
  const { data: userData, error } = await supabase
    .from("approved_users") // Changed from `users` to `approved_users`
    .select("role")
    .eq("email", user.email)
    .single();

  if (error || !userData) {
    return NextResponse.redirect(new URL("/not-approved", req.url)); // Redirect if not approved
  }

  const role = userData.role || "caregiver"; // Default role

  // Define role-based dashboard routes
  const dashboardRoutes: Record<string, string> = {
    admin: "/dashboard/admin",
    institution: "/dashboard/institution",
    data_team: "/dashboard/data-team",
    caregiver: "/dashboard/caregiver",
  };

  const redirectTo = dashboardRoutes[role] || "/dashboard/caregiver";

  // Prevent unnecessary redirects (only redirect if user is in the wrong dashboard)
  if (!req.nextUrl.pathname.startsWith(redirectTo)) {
    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  return res;
}

// Apply middleware only to dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
