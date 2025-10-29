"use server";

import { getSupabaseServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { InstitutionFormSchema, InstitutionFormData } from "./schema";
import { ZodError } from "zod";

export async function upsertInstitutionDetails(formData: InstitutionFormData) {
  const supabase = await getSupabaseServer();

  try {
    // 1. Validate input
    const parsed = InstitutionFormSchema.safeParse(formData);
    if (!parsed.success) {
      const errorMsg = parsed.error.issues.map((i) => i.message).join(", ");
      return { success: false, error: `Validation failed: ${errorMsg}` };
    }

    // 2. Get current user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      return { success: false, error: "User not authenticated." };
    }

    const userId = userData.user.id;

    // 3. Upsert institution record
    const { data, error } = await supabase
      .from("institutions")
      .upsert(
        {
          profile_id: userId,
          institution_name: formData.institution_name,
          institution_type: formData.institution_type,
          bio: formData.bio,
          city: formData.city,
          county: formData.county,
          physical_address: formData.physical_address,
          postal_code: formData.postal_code,
          website: formData.website,
          linkedin_profile: formData.linkedin_profile,
          years_in_operation: formData.years_in_operation,
          contact_person_name: formData.contact_person_name,
          contact_person_phone: formData.contact_person_phone,
          // registration_number: formData.registration_number,
          details: formData.details,
          location: formData.location,
          status: "pending",
          updated_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        },
        { onConflict: "profile_id" }
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase upsert error:", error);
      return { success: false, error: error.message };
    }

    // 4. Revalidate UI path
    revalidatePath("/dashboard/guest/institution-registration-form");

    return { success: true, data };
  } catch (err) {
    console.error("Unexpected error:", err);

    const errorMessage =
      err instanceof ZodError
        ? err.issues.map((i) => i.message).join(", ")
        : err instanceof Error
        ? err.message
        : "Unexpected error occurred.";

    return { success: false, error: errorMessage };
  }
}
