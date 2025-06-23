// app/account/page.tsx
import { getSupabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AccountForm } from "./account-form";

export default async function AccountPage() {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/signin"); // Redirect to signin if no user

  const { data: profile, error } = await supabase
    .from("users")
    .select(
      // Ensure all fields used in the form and for completion check are selected
      "full_name, phone, gender, date_of_birth, location, avatar_url, role, user_id, onboarded"
    )
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    console.error("[Supabase Error]", error?.message || "No profile found");
    // If no profile found, it might be a new user, so redirect to account setup without error
    // Or you might want to create a default profile record via a trigger on auth.users insert
    // For now, we proceed to the form to let them fill it
  }

  // Determine if the profile is "complete" for the purpose of redirecting away from this page
  // A profile is complete if it's explicitly marked as onboarded, or if critical fields are filled.
  // The 'onboarded' flag is the most reliable.
  const isProfileComplete = profile?.onboarded === true;

  if (isProfileComplete) {
    // If the profile is complete, redirect to the appropriate dashboard based on role
    switch (profile.role) {
      case "admin":
        redirect("/dashboard/admin");
      case "assessor":
        redirect("/dashboard/assessor");
      case "trainer":
        redirect("/dashboard/trainer");
      case "caregiver":
        redirect("/dashboard/caregiver");
      case "institution":
        redirect("/dashboard/institution");
      default:
        redirect("/dashboard"); // Fallback for undefined roles
    }
  }

  // Pass existing profile data as default values to the form
  const defaultValues = {
    full_name: profile?.full_name,
    phone: profile?.phone, // Assuming 'phone' column exists
    gender: profile?.gender,
    // Format date_of_birth to 'YYYY-MM-DD' for input type="date"
    dob: profile?.date_of_birth ? profile.date_of_birth.split('T')[0] : '',
    location: profile?.location as string, // Cast as string if stored as text
    role: profile?.role,
    user_id: profile?.user_id, // Assuming 'user_id' column exists
    avatar_url: profile?.avatar_url,
  };

  return (
    <AccountForm userId={user.id} defaultValues={defaultValues} />
  );
}