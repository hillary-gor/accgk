"use server";

import { getSupabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const INSTITUTION_TYPE_OPTIONS = ['Hospital', 'Clinic', 'Rehabilitation Center', 'Nursing Home', 'Home Care Agency', 'Other'] as const;
const INSTITUTION_STATUS_OPTIONS = ['Active', 'Pending Review', 'Suspended', 'Rejected'] as const;

const institutionProfileSchema = z.object({
  bio: z.string().min(10, "A short bio for the institution is required."),
  city: z.string().min(1, "City is required."),
  contact_person_name: z.string().min(1, "Contact person name is required."),
  contact_person_phone: z.string().min(1, "Contact person phone is required.").regex(/^\+?[1-9]\d{9,14}$/, "Invalid phone number format."),
  county: z.string().min(1, "County is required."),
  details: z.string().optional().nullable(), // Changed to optional string, no JSON validation
  institution_name: z.string().min(1, "Institution name is required."),
  institution_type: z.enum(INSTITUTION_TYPE_OPTIONS, { required_error: "Institution type is required." }), // Using enum
  license_number: z.string().min(1, "License number is required."),
  linkedin_profile: z.string().url("LinkedIn profile must be a valid URL.").min(1, "LinkedIn profile URL is required."),
  location: z.string().optional().nullable(), // Changed to optional string, no JSON validation
  physical_address: z.string().min(1, "Physical address is required."),
  postal_code: z.string().min(1, "Postal code is required."),
  rating: z.coerce.number().min(0, "Rating must be 0 or higher.").max(5, "Rating must be 5 or lower.").nullable(),
  status: z.enum(INSTITUTION_STATUS_OPTIONS, { required_error: "Status is required." }), // Using enum
  website: z.string().url("Website must be a valid URL.").min(1, "Website URL is required."),
  years_in_operation: z.coerce.number().min(0, "Years in operation is required and must be a non-negative number."),
  // Removed file upload related fields:
  // accreditation_files_url
  // institution_logo_url
  // registration_certificate_url
  // license_documents_url
});

type InstitutionProfilePayload = z.infer<typeof institutionProfileSchema>;

export async function upsertInstitutionProfile(userId: string, formData: unknown) {
  const supabase = await getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.id !== userId) {
    console.error("[Unauthorized Access] Attempt to update institution profile for another user.");
    return { error: "Unauthorized access. You can only update your own profile." };
  }

  const parsed = institutionProfileSchema.safeParse(formData);
  if (!parsed.success) {
    console.error("[Validation Error] Institution profile:", parsed.error.flatten().fieldErrors);
    return {
      error: "Validation failed. Please correct the highlighted errors.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const payload: InstitutionProfilePayload = parsed.data;

  const { error } = await supabase
    .from("institutions")
    .upsert({
      id: userId,
      bio: payload.bio,
      city: payload.city,
      contact_person_name: payload.contact_person_name,
      contact_person_phone: payload.contact_person_phone,
      county: payload.county,
      details: payload.details,
      institution_name: payload.institution_name,
      institution_type: payload.institution_type,
      license_number: payload.license_number,
      linkedin_profile: payload.linkedin_profile,
      location: payload.location,
      physical_address: payload.physical_address,
      postal_code: payload.postal_code,
      rating: payload.rating,
      status: payload.status,
      website: payload.website,
      years_in_operation: payload.years_in_operation,
      // Removed file upload related fields from upsert payload
    }, { onConflict: 'id' });

  if (error) {
    console.error("[Supabase Error] Upserting institution profile:", error.message);
    return { error: `Failed to update institution profile: ${error.message}. Please try again.` };
  }

  const { error: profileUpdateError } = await supabase
    .from("profiles")
    .update({ onboarded: true })
    .eq("id", userId);

  if (profileUpdateError) {
    console.error("[Supabase Error] Updating profile onboarded status:", profileUpdateError.message);
    return { error: `Institution profile saved, but failed to update onboarded status: ${profileUpdateError.message}` };
  }

  redirect("/dashboard/institution");
}