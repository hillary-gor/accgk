// app/account/caregiver/actions.ts
"use server";

import { getSupabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

/**
 * Zod schema for parsing and validating JSON string inputs.
 * Ensures the string is not empty and can be successfully parsed into a JSON object/array.
 */
const jsonSchema = z.string().min(1, "This field is required and must not be empty.").transform((str, ctx) => {
  try {
    const parsed = JSON.parse(str);
    return parsed;
  } catch {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid JSON format. Please ensure it's valid JSON.",
    });
    return z.NEVER;
  }
});

/**
 * Defines the Zod schema for the Caregiver profile.
 * All fields that can be inserted are made required (`.min(1)` for strings, `z.coerce.number()` for numbers).
 * URL fields are validated as URLs. Array URL fields require at least one entry.
 * JSON fields are validated using `jsonSchema`.
 */
const caregiverProfileSchema = z.object({
  address: z.string().min(1, "Address is required."),
  availability: jsonSchema.nullable(),
  bio: z.string().min(1, "A short bio is required."),
  certification_level: z.string().min(1, "Certification level is required."),
  certifications_url: z.array(z.string().url("Invalid URL format for certification document.")).min(1, "At least one certification document URL is required."),
  city: z.string().min(1, "City is required."),
  country: z.string().min(1, "Country is required."),
  date_of_birth: z.string().min(1, "Date of birth is required.").regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD."),
  emergency_contact_name: z.string().min(1, "Emergency contact name is required."),
  emergency_contact_phone: z.string().min(1, "Emergency contact phone is required.").regex(/^\+?[1-9]\d{9,14}$/, "Invalid phone number format."), // Basic phone regex
  emergency_contact_relationship: z.string().min(1, "Emergency contact relationship is required."),
  emergency_contacts: jsonSchema.nullable(),
  experience_year: z.coerce.number().min(0, "Years of experience is required and must be a non-negative number."),
  gender: z.string().min(1, "Gender is required."),
  government_id_url: z.string().url("Government ID URL is required and must be a valid URL."),
  license_number: z.string().min(1, "License number is required."),
  preferred_work_type: z.string().min(1, "Preferred work type is required."),
  profession: z.string().min(1, "Profession is required."),
  profile_picture_url: z.string().url("Profile picture URL is required and must be a valid URL."),
  resume_url: z.string().url("Resume URL is required and must be a valid URL."),
  specialty: z.string().min(1, "Specialty is required."),
});

type CaregiverProfilePayload = z.infer<typeof caregiverProfileSchema>;

/**
 * Server action to upsert (insert or update) a caregiver's profile.
 * Ensures all required fields are present and valid before updating the database.
 *
 * @param userId The ID of the user whose profile is being updated.
 * @param formData The form data object containing caregiver profile details.
 * @returns An object with an 'error' message and 'fieldErrors' on validation/DB failure, or redirects on success.
 */
export async function upsertCaregiverProfile(userId: string, formData: unknown) {
  const supabase = await getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  // Ensure the authenticated user matches the userId attempting to update
  if (!user || user.id !== userId) {
    console.error("[Unauthorized Access] Attempt to update caregiver profile for another user.");
    return { error: "Unauthorized access. You can only update your own profile." };
  }

  // Validate the form data against the Zod schema
  const parsed = caregiverProfileSchema.safeParse(formData);
  if (!parsed.success) {
    console.error("[Validation Error] Caregiver profile:", parsed.error.flatten().fieldErrors);
    return {
      error: "Validation failed. Please correct the highlighted errors.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const payload: CaregiverProfilePayload = parsed.data;

  // Perform the upsert operation (insert or update) into the 'caregivers' table
  const { error } = await supabase
    .from("caregivers")
    .upsert({
      id: userId,
      address: payload.address,
      availability: payload.availability,
      bio: payload.bio,
      certification_level: payload.certification_level,
      certifications_url: payload.certifications_url,
      city: payload.city,
      country: payload.country,
      date_of_birth: payload.date_of_birth,
      emergency_contact_name: payload.emergency_contact_name,
      emergency_contact_phone: payload.emergency_contact_phone,
      emergency_contact_relationship: payload.emergency_contact_relationship,
      emergency_contacts: payload.emergency_contacts,
      experience_year: payload.experience_year,
      gender: payload.gender,
      government_id_url: payload.government_id_url,
      license_number: payload.license_number,
      preferred_work_type: payload.preferred_work_type,
      profession: payload.profession,
      profile_picture_url: payload.profile_picture_url,
      resume_url: payload.resume_url,
      specialty: payload.specialty,
    }, { onConflict: 'id' });

  if (error) {
    console.error("[Supabase Error] Upserting caregiver profile:", error.message);
    return { error: `Failed to update caregiver profile: ${error.message}. Please try again.` };
  }

  // After successful upsert, mark the user's general profile as onboarded
  const { error: profileUpdateError } = await supabase
    .from("profiles")
    .update({ onboarded: true })
    .eq("id", userId);

  if (profileUpdateError) {
    console.error("[Supabase Error] Updating profile onboarded status:", profileUpdateError.message);
    return { error: `Caregiver profile saved, but failed to update onboarded status: ${profileUpdateError.message}` };
  }

  // Redirect to the caregiver dashboard upon successful profile completion
  redirect("/dashboard/caregiver");
}