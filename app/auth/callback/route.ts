import { getSupabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET() {
  const supabase = await getSupabaseServer();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    return redirect("/login");
  }

  // Fetch role from members table
  const { data: member, error: memberError } = await supabase
    .from("members")
    .select("role")
    .eq("id", user.id)
    .single();

  if (memberError || !member?.role) {
    console.error(
      "[AUTH REDIRECT ERROR]",
      memberError?.message || "No role found in members table"
    );
    return redirect("/unauthorized");
  }

  const role = member.role;

  switch (role) {
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
    default:
      return redirect("/unauthorized");
  }
}
