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

  const { data: fetchedProfile, error } = await supabase
    .from("profiles")
    .select(
      "first_name, last_name, phone, gender, date_of_birth, location, role, onboarded" // Removed avatar_url
    )
    .eq("id", user.id)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') {
    console.error("[Supabase Error] AccountPage: ", error.message);
    redirect("/auth/signin?error=profile-fetch-failed");
  }

  const profileExists = !!fetchedProfile;

  const isCommonDataComplete = profileExists &&
    !!fetchedProfile.first_name &&
    !!fetchedProfile.last_name &&
    !!fetchedProfile.phone &&
    !!fetchedProfile.gender &&
    !!fetchedProfile.date_of_birth &&
    !!fetchedProfile.location; // Removed !!fetchedProfile.avatar_url

  if (profileExists && isCommonDataComplete && fetchedProfile.onboarded) {
    switch (fetchedProfile.role) {
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

  const defaultFormValues = {
    first_name: fetchedProfile?.first_name || '',
    last_name: fetchedProfile?.last_name || '',
    phone: fetchedProfile?.phone || '',
    gender: fetchedProfile?.gender as "Male" | "Female" | "Other" | null || undefined,
    date_of_birth: fetchedProfile?.date_of_birth ? new Date(fetchedProfile.date_of_birth).toISOString().split('T')[0] : '',
    location: fetchedProfile?.location || '',
    role: fetchedProfile?.role || undefined,
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h1>
      <AccountForm
        userId={user.id}
        defaultValues={defaultFormValues}
      />
    </div>
  );
}