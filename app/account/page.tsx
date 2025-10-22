// app/account/page.tsx
import { getSupabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AccountForm } from "./account-form";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
      "first_name, last_name, phone, gender, date_of_birth, location, role, onboarded"
    )
    .eq("id", user.id)
    .maybeSingle();

  if (error && error.code !== "No rows found") {
    redirect("/auth/signin?error=profile-fetch-failed");
  }

  const profileExists = !!fetchedProfile;

  // Determine if the common profile data (AccountForm data) is complete.
  // This is separate from the 'onboarded' flag, which indicates total onboarding completion.
  const isCommonProfileDataComplete =
    profileExists &&
    !!fetchedProfile.first_name &&
    !!fetchedProfile.last_name &&
    !!fetchedProfile.phone &&
    !!fetchedProfile.gender &&
    !!fetchedProfile.date_of_birth &&
    !!fetchedProfile.location &&
    !!fetchedProfile.role;

  // If the common profile is complete AND the user is not yet fully onboarded,
  // redirect them to their role-specific form.
  if (
    isCommonProfileDataComplete &&
    fetchedProfile &&
    !fetchedProfile.onboarded
  ) {
    if (fetchedProfile.role === "caregiver") {
      // Check if caregiver profile is already created. If not, redirect to caregiver form.
      const { data: caregiverSpecificProfile } = await supabase
        .from("caregivers")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (!caregiverSpecificProfile) {
        redirect("/account/caregiver");
      }
    } else if (fetchedProfile.role === "institution") {
      // Check if institution profile is already created. If not, redirect to institution form.
      const { data: institutionSpecificProfile } = await supabase
        .from("institutions")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (!institutionSpecificProfile) {
        redirect("/account/institution");
      }
    }
  }

  // If the user is fully onboarded (common profile + role-specific form complete, if applicable),
  // redirect them to their respective dashboards.
  if (profileExists && fetchedProfile.onboarded) {
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
        redirect("/dashboard/packages");
      default:
        redirect("/dashboard");
    }
  }

  // If none of the above redirects happen, it means the common profile is not complete,
  // so render the AccountForm for them to complete it.
  const defaultFormValues = {
    first_name: fetchedProfile?.first_name || "",
    last_name: fetchedProfile?.last_name || "",
    phone: fetchedProfile?.phone || "",
    gender:
      (fetchedProfile?.gender as "Male" | "Female" | "Other" | null) ||
      undefined,
    date_of_birth: fetchedProfile?.date_of_birth
      ? new Date(fetchedProfile.date_of_birth).toISOString().split("T")[0]
      : "",
    location: fetchedProfile?.location || "",
    role: fetchedProfile?.role || undefined,
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <Header />
      <h1 className="text-2xl font-bold mb-6 text-center">
        Complete Your Profile
      </h1>
      <AccountForm userId={user.id} defaultValues={defaultFormValues} />
      <Footer />
    </div>
  );
}
