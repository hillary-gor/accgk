// app/account/institution/actions.ts
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
 * Defines the Zod schema for the Institution profile.
 * All insertable fields are made required.
 * URL fields are validated as URLs. Array URL fields require at least one entry.
 * JSON fields are validated using `jsonSchema`.
 */
const institutionProfileSchema = z.object({
  accreditation_files_url: z.array(z.string().url("Invalid URL format for accreditation file.")).min(1, "At least one accreditation file URL is required."),
  bio: z.string().min(1, "A short bio for the institution is required."),
  city: z.string().min(1, "City is required."),
  contact_person_name: z.string().min(1, "Contact person name is required."),
  contact_person_phone: z.string().min(1, "Contact person phone is required.").regex(/^\+?[1-9]\d{9,14}$/, "Invalid phone number format."), // Basic phone regex
  county: z.string().min(1, "County is required."),
  details: jsonSchema.nullable(),
  institution_logo_url: z.string().url("Institution logo URL is required and must be a valid URL."),
  institution_name: z.string().min(1, "Institution name is required."),
  institution_type: z.string().min(1, "Institution type is required."),
  license_documents_url: z.array(z.string().url("Invalid URL format for license document.")).min(1, "At least one license document URL is required."),
  license_number: z.string().min(1, "License number is required."),
  linkedin_profile: z.string().url("LinkedIn profile must be a valid URL.").min(1, "LinkedIn profile URL is required."),
  location: jsonSchema.nullable(),
  physical_address: z.string().min(1, "Physical address is required."),
  postal_code: z.string().min(1, "Postal code is required."),
  rating: z.coerce.number().min(0, "Rating must be 0 or higher.").max(5, "Rating must be 5 or lower.").nullable(),
  registration_certificate_url: z.string().url("Registration certificate URL is required and must be a valid URL."),
  status: z.string().min(1, "Status is required."),
  website: z.string().url("Website must be a valid URL.").min(1, "Website URL is required."),
  years_in_operation: z.coerce.number().min(0, "Years in operation is required and must be a non-negative number."),
});

type InstitutionProfilePayload = z.infer<typeof institutionProfileSchema>;

/**
 * Server action to upsert (insert or update) an institution's profile.
 * Ensures all required fields are present and valid before updating the database.
 *
 * @param userId The ID of the user whose institution profile is being updated.
 * @param formData The form data object containing institution profile details.
 * @returns An object with an 'error' message and 'fieldErrors' on validation/DB failure, or redirects on success.
 */
export async function upsertInstitutionProfile(userId: string, formData: unknown) {
  const supabase = await getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  // Security check: Ensure the authenticated user matches the userId attempting to update
  if (!user || user.id !== userId) {
    console.error("[Unauthorized Access] Attempt to update institution profile for another user.");
    return { error: "Unauthorized access. You can only update your own profile." };
  }

  // Validate the form data against the Zod schema
  const parsed = institutionProfileSchema.safeParse(formData);
  if (!parsed.success) {
    console.error("[Validation Error] Institution profile:", parsed.error.flatten().fieldErrors);
    return {
      error: "Validation failed. Please correct the highlighted errors.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const payload: InstitutionProfilePayload = parsed.data;

  // Perform the upsert operation (insert or update) into the 'institutions' table
  const { error } = await supabase
    .from("institutions")
    .upsert({
      id: userId,
      accreditation_files_url: payload.accreditation_files_url,
      bio: payload.bio,
      city: payload.city,
      contact_person_name: payload.contact_person_name,
      contact_person_phone: payload.contact_person_phone,
      county: payload.county,
      details: payload.details,
      institution_logo_url: payload.institution_logo_url,
      institution_name: payload.institution_name,
      institution_type: payload.institution_type,
      license_documents_url: payload.license_documents_url,
      license_number: payload.license_number,
      linkedin_profile: payload.linkedin_profile,
      location: payload.location,
      physical_address: payload.physical_address,
      postal_code: payload.postal_code,
      rating: payload.rating,
      registration_certificate_url: payload.registration_certificate_url,
      status: payload.status,
      website: payload.website,
      years_in_operation: payload.years_in_operation,
    }, { onConflict: 'id' });

  if (error) {
    console.error("[Supabase Error] Upserting institution profile:", error.message);
    return { error: `Failed to update institution profile: ${error.message}. Please try again.` };
  }

  // After successful upsert, mark the user's general profile as onboarded
  const { error: profileUpdateError } = await supabase
    .from("profiles")
    .update({ onboarded: true })
    .eq("id", userId);

  if (profileUpdateError) {
    console.error("[Supabase Error] Updating profile onboarded status:", profileUpdateError.message);
    return { error: `Institution profile saved, but failed to update onboarded status: ${profileUpdateError.message}` };
  }

  // Redirect to the institution dashboard upon successful profile completion
  redirect("/dashboard/institution");
}