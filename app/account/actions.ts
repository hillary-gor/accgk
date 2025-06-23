// app/account/actions.ts
"use server";

import { getSupabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const memberRoles = [
  "caregiver",
  "institution",
  "admin",
  "assessor",
  "trainer",
] as const;

const updateSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  location: z.string().min(2, "Location is required"),
  role: z.enum(memberRoles, {
    required_error: "Role is required",
  }),
});

type ProfilePayload = z.infer<typeof updateSchema>;

export async function updateUserProfile(userId: string, data: unknown) {
  const supabase = await getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.id !== userId) {
    // In production, log this unauthorized access attempt to a secure logging service.
    redirect("/account?error=unauthorized");
  }

  const parsed = updateSchema.safeParse(data);
  if (!parsed.success) {
    // In production, log validation errors for debugging, but avoid exposing sensitive details.
    return {
      error: "Validation failed. Please check your inputs.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const payload: ProfilePayload = parsed.data;

  // Determine if 'onboarded' should be set to true at this stage.
  // For 'caregiver' and 'institution', 'onboarded' will be set to true
  // only after their specific profile forms are completed.
  const shouldMarkOnboarded = !['caregiver', 'institution'].includes(payload.role);

  const updateData = {
    id: userId,
    first_name: payload.first_name,
    last_name: payload.last_name,
    phone: payload.phone,
    gender: payload.gender,
    date_of_birth: payload.date_of_birth,
    location: payload.location,
    role: payload.role,
    // Set onboarded based on whether further role-specific forms are required
    onboarded: shouldMarkOnboarded,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("profiles")
    .upsert(updateData, { onConflict: 'id' });

  if (error) {
    // In production, log database errors to a secure logging service.
    return { error: `Profile update/insert failed: ${error.message}` };
  }

  // Redirect based on role
  if (payload.role === "caregiver") {
    redirect("/account/caregiver"); // Redirect to caregiver-specific form
  } else if (payload.role === "institution") {
    redirect("/account/institution"); // Redirect to institution-specific form
  } else {
    // For other roles, they are fully onboarded after this form, redirect to their dashboard
    switch (payload.role) {
      case "admin":
        redirect("/dashboard/admin");
      case "assessor":
        redirect("/dashboard/assessor");
      case "trainer":
        redirect("/dashboard/trainer");
      default:
        // Fallback or error if role is unexpected after `shouldMarkOnboarded` logic
        redirect("/dashboard");
    }
  }
}