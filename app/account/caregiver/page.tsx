// app/account/caregiver/page.tsx
import { getSupabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CaregiverForm } from "../caregiver-form";
import { Database } from "@/types/supabase";

/**
 * Server component for the Caregiver Account Profile page.
 * Fetches user and caregiver-specific data from Supabase.
 * Redirects unauthenticated users or if data loading fails.
 * Passes fetched data as default values to the client-side form.
 */
export default async function CaregiverAccountPage() {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user is logged in, redirect to sign-in page
  if (!user) {
    redirect("/auth/signin");
  }

  // Fetch caregiver profile data for the current user
  const { data: caregiverProfile, error: caregiverError } = await supabase
    .from("caregivers")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (caregiverError && caregiverError.code !== 'No rows found') {
    console.error("[Supabase Error] CaregiverAccountPage: Failed to load caregiver profile: ", caregiverError.message);
    redirect("/account?error=caregiver-profile-load-failed");
  }

  const defaultValues: Partial<Database['public']['Tables']['caregivers']['Row']> = {
    address: caregiverProfile?.address || '',
    availability: caregiverProfile?.availability || null,
    bio: caregiverProfile?.bio || '',
    certification_level: caregiverProfile?.certification_level || '',
    certifications_url: caregiverProfile?.certifications_url || [],
    city: caregiverProfile?.city || '',
    country: caregiverProfile?.country || '',
    date_of_birth: caregiverProfile?.date_of_birth || '',
    emergency_contact_name: caregiverProfile?.emergency_contact_name || '',
    emergency_contact_phone: caregiverProfile?.emergency_contact_phone || '',
    emergency_contact_relationship: caregiverProfile?.emergency_contact_relationship || '',
    emergency_contacts: caregiverProfile?.emergency_contacts || null,
    experience_year: caregiverProfile?.experience_year || 0,
    gender: caregiverProfile?.gender || '',
    government_id_url: caregiverProfile?.government_id_url || '',
    license_number: caregiverProfile?.license_number || '',
    preferred_work_type: caregiverProfile?.preferred_work_type || '',
    profession: caregiverProfile?.profession || '',
    profile_picture_url: caregiverProfile?.profile_picture_url || '',
    resume_url: caregiverProfile?.resume_url || '',
    specialty: caregiverProfile?.specialty || '',
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">Complete Your Caregiver Profile</h1>
      <CaregiverForm userId={user.id} defaultValues={defaultValues} />
    </div>
  );
}