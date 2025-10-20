"use server";

import { getSupabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const errorParam = requestUrl.searchParams.get("error");
  const errorCodeParam = requestUrl.searchParams.get("error_code");
  const errorDescriptionParam =
    requestUrl.searchParams.get("error_description");

  // Handle errors returned from Supabase callback
  if (errorParam || errorCodeParam || errorDescriptionParam) {
    console.error("Supabase callback error:", {
      errorParam,
      errorCodeParam,
      errorDescriptionParam,
    });

    let userFriendlyMessage =
      "Something unexpected happened. Please try again!";

    if (errorCodeParam === "otp_expired") {
      userFriendlyMessage =
        "This link has gone on a little vacation. Please request a new one!";
    } else if (errorDescriptionParam) {
      if (
        errorDescriptionParam.includes("invalid") ||
        errorDescriptionParam.includes("expired")
      ) {
        userFriendlyMessage =
          "Oops! Looks like that link is no longer valid. Please try logging in again!";
      } else {
        userFriendlyMessage =
          "Our digital gremlins are acting up. Please try again!";
      }
    }

    return redirect(
      `/auth/signin?error=${encodeURIComponent(userFriendlyMessage)}`
    );
  }

  // Handle magic link callback with auth code
  if (code) {
    const supabase = await getSupabaseServer();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error.message);
      return redirect(
        `/auth/signin?error=${encodeURIComponent(
          "Our magic link machine is a bit shy right now. Please try again!"
        )}`
      );
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect("/auth/signin?error=User not found after signin.");
    }

    // Fetch user profile
    const { data: member, error: profileError } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", user.id)
      .single();

    if (profileError || !member?.full_name) {
      return redirect("/account");
    }

    // Role-based redirect logic
    const role = member.role;

    switch (role) {
      case "guest":
        return redirect("/dashboard/guest");
      case "caregiver":
        return redirect("/dashboard/caregiver");
      case "institution":
        return redirect("/dashboard/institution");
      case "admin":
        return redirect("/dashboard/admin");
      case "assessor":
        return redirect("/dashboard/assessor");
      case "trainer":
        return redirect("/dashboard/trainer");
      case "employer":
        return redirect("/dashboard/employer");
      default:
        return redirect("/unauthorized");
    }
  }

  // No code provided in callback
  return redirect(
    `/auth/signin?error=${encodeURIComponent(
      "Did a digital ninja steal your code? Please try logging in again!"
    )}`
  );
}
