// app/account/institution/page.tsx
import { getSupabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { InstitutionForm } from "../institution-form";
import { Database } from "@/types/supabase";
/**
 * Server component for the Institution Account Profile page.
 * Fetches user and institution-specific data from Supabase.
 * Redirects unauthenticated users or if data loading fails.
 * Passes fetched data as default values to the client-side form.
 */
export default async function InstitutionAccountPage() {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  // Fetch institution profile data for the current user
  const { data: institutionProfile, error: institutionError } = await supabase
    .from("institutions")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (institutionError && institutionError.code !== 'No rows found') {
    console.error("[Supabase Error] InstitutionAccountPage: Failed to load institution profile: ", institutionError.message);
    redirect("/account?error=institution-profile-load-failed");
  }

  const defaultValues: Partial<Database['public']['Tables']['institutions']['Row']> = {
    accreditation_files_url: institutionProfile?.accreditation_files_url || [],
    bio: institutionProfile?.bio || '',
    city: institutionProfile?.city || '',
    contact_person_name: institutionProfile?.contact_person_name || '',
    contact_person_phone: institutionProfile?.contact_person_phone || '',
    county: institutionProfile?.county || '',
    details: institutionProfile?.details || null,
    institution_logo_url: institutionProfile?.institution_logo_url || '',
    institution_name: institutionProfile?.institution_name || '',
    institution_type: institutionProfile?.institution_type || '',
    license_documents_url: institutionProfile?.license_documents_url || [],
    license_number: institutionProfile?.license_number || '',
    linkedin_profile: institutionProfile?.linkedin_profile || '',
    location: institutionProfile?.location || null,
    physical_address: institutionProfile?.physical_address || '',
    postal_code: institutionProfile?.postal_code || '',
    rating: institutionProfile?.rating || null,
    registration_certificate_url: institutionProfile?.registration_certificate_url || '',
    status: institutionProfile?.status || '',
    website: institutionProfile?.website || '',
    years_in_operation: institutionProfile?.years_in_operation || 0,
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">Complete Your Institution Profile</h1>
      <InstitutionForm userId={user.id} defaultValues={defaultValues} />
    </div>
  );
}