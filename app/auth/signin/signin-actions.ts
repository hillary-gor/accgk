"use server";

import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await getSupabaseServer();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return redirect("/auth/signin?message=Could not authenticate user");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/signin?message=User not found after login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile || !profile.role) {
    return redirect("/account");
  }

  const userRole = profile.role;

  switch (userRole) {
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
