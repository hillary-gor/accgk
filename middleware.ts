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
    global: { headers: { Authorization: `Bearer ${req.cookies.get("sb-access-token")?.value}` } },
  });

  // Fetch session
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Fetch user role from Supabase
  const { data: userData } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = userData?.role || "caregiver"; // Default role

  // Redirect based on role
  const dashboardRoutes: Record<string, string> = {
    admin: "/dashboard/admin",
    institution: "/dashboard/institution",
    data_team: "/dashboard/data-team",
    caregiver: "/dashboard/caregiver",
  };

  const redirectTo = dashboardRoutes[role] || "/dashboard/caregiver";

  if (!req.nextUrl.pathname.startsWith(redirectTo)) {
    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
