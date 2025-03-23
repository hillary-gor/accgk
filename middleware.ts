import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { getSupabaseServer } from "@/lib/supabase";

export async function middleware(request: NextRequest) {
  // Update Supabase session
  const response = await updateSession(request);

  // Role-based access control for protected pages
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  // If user is not logged in, redirect to login
  if (error || !data?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userId = data.user.id;

  // Check if user is in the `admins` table
  const { data: admin, error: adminError } = await supabase
    .from("admins")
    .select("id")
    .eq("id", userId)
    .single();

  // Redirect non-admins trying to access `/dashboard/admin`
  if (pathname.startsWith("/dashboard/admin") && (!admin || adminError)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return response; // Continue with the updated session
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - Static files (`_next/static`, `_next/image`, `favicon.ico`)
     * - Public images (`.svg`, `.png`, `.jpg`, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
