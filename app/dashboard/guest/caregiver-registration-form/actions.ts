"use server";

import { getSupabaseServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { caregiverSchema } from "./schemas";

/* ----------------------------------------
   INITIAL CAREGIVER REGISTRATION ACTION
   Handles the first step of the caregiver form
   Fields: basic personal info, contact info, county/sub-county
---------------------------------------- */
const initialCaregiverSchema = caregiverSchema.pick({
  national_id_number: true,
  gender: true,
  date_of_birth: true,
  county_of_residence: true,
  sub_county_or_constituency: true,
  exact_location: true,
  emergency_contact_name: true,
  emergency_contact_phone: true,
  emergency_contact_relationship: true,
  whatsapp_number: true,
  preferred_contact_method: true,
  why_caregiving: true,
});

export type InitialCaregiverFormData = z.infer<typeof initialCaregiverSchema>;

export async function upsertInitialCaregiverProfile(
  formData: InitialCaregiverFormData
) {
  const supabase = await getSupabaseServer();
  const { data: auth } = await supabase.auth.getUser();
  const user = auth?.user;

  if (!user) return { error: "Not authenticated" };

  // Validate input
  const parsed = initialCaregiverSchema.safeParse(formData);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message || "Validation failed";
    return { error: firstError };
  }

  // Upsert record
  const { error } = await supabase.from("caregivers").upsert(
    {
      profile_id: user.id,
      ...parsed.data,
      status: "pending",
    },
    { onConflict: "profile_id" }
  );

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: true };
}

/* ----------------------------------------
   CAREGIVER TRAINING / CERTIFICATION ACTION
   Handles the second step of the caregiver form
   Fields: training, certifications, BLS, other trainings
---------------------------------------- */
const trainingSchema = caregiverSchema.pick({
  highest_qualification: true,
  caregiving_certification: true,
  training_institution_name: true,
  training_completion_year: true,
  has_bls_certification: true,
  other_relevant_trainings: true,
});

export type TrainingFormData = z.infer<typeof trainingSchema>;

export async function upsertCaregiverTraining(formData: TrainingFormData) {
  const supabase = await getSupabaseServer();
  const { data: auth } = await supabase.auth.getUser();
  const user = auth?.user;

  if (!user) return { error: "Not authenticated" };

  // Validate input
  const parsed = trainingSchema.safeParse(formData);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message || "Validation failed";
    return { error: firstError };
  }

  const { error } = await supabase.from("caregivers").upsert(
    {
      profile_id: user.id,
      ...parsed.data,
    },
    { onConflict: "profile_id" }
  );

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: true };
}

/* ----------------------------------------
   FETCH EXISTING TRAINING INFO
   Returns plain JSON to client components
---------------------------------------- */
export async function getCaregiverTraining() {
  const supabase = await getSupabaseServer();
  const { data: auth } = await supabase.auth.getUser();
  const user = auth?.user;
  if (!user) return null;

  const { data, error } = await supabase
    .from("caregivers")
    .select(
      "highest_qualification,caregiving_certification,training_institution_name,training_completion_year,has_bls_certification,other_relevant_trainings"
    )
    .eq("profile_id", user.id)
    .single();

  if (error) return null;

  return data;
}
