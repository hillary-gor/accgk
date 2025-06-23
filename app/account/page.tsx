// app/account/page.tsx
import { getSupabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AccountForm } from "./account-form";

export default async function AccountPage() {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  const { data: profile, error } = await supabase
    .from("users")
    .select(
      "full_name, phone, gender, dob, location, avatar_url, role, user_id, onboarded"
    )
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    console.error("[Supabase Error] AccountPage: ", error?.message || "No profile found");
    redirect("/auth/signin?error=profile-load-failed");
  }

  const rolesRequiringUserId = ["admin", "assessor", "trainer"];

  const isCommonComplete =
    !!profile.full_name &&
    !!profile.phone &&
    !!profile.gender &&
    !!profile.dob &&
    !!profile.location &&
    !!profile.avatar_url;

  const requiresUserId =
    rolesRequiringUserId.includes(profile.role) && !profile.user_id;

  const isProfileDataComplete = isCommonComplete && !requiresUserId;

  if (isProfileDataComplete && profile.onboarded) {
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
        redirect("/dashboard");
    }
  }

  const formattedDob = profile.dob ? new Date(profile.dob).toISOString().split('T')[0] : '';

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h1>
      <AccountForm
        userId={user.id}
        defaultValues={{
          full_name: profile.full_name,
          phone: profile.phone,
          gender: profile.gender as "Male" | "Female" | "Other" | null,
          dob: formattedDob,
          location: profile.location,
          role: ["admin", "assessor", "trainer", "caregiver", "institution"].includes(profile.role)
            ? (profile.role as "admin" | "assessor" | "trainer" | "caregiver" | "institution")
            : null,
          user_id: profile.user_id,
          avatar_url: profile.avatar_url,
        }}
      />
    </div>
  );
}