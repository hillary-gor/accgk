// app/account/actions.ts
"use server";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { z } from "zod";

// Import Database types to ensure correct enum usage

// Use the actual enum from your database types

// Schema (mirrors the form schema)
const updateSchema = z.object({
  full_name: z.string().min(2),
  phone: z.string().min(10),
  gender: z.enum(["Male", "Female", "Other"]),
  dob: z.string().min(1), // Assuming this is YYYY-MM-DD
  location: z.string().min(2),
  // Updated role enum to match your database types
  role: z.enum(['caregiver', 'institution', 'admin', 'assessor', 'trainer']),
  user_id: z.string().optional(),
  avatar_url: z.string().optional(),
});

export async function updateUserProfile(userId: string, data: unknown) {
  const supabase = await createClient();

  // Validate input using Zod
  const parsed = updateSchema.safeParse(data);
  if (!parsed.success) {
    console.error("[Zod Validation Error]", parsed.error.flatten().fieldErrors);
    // You might want to handle this error more gracefully, e.g., using a toast
    redirect(`/account?error=validation&details=${JSON.stringify(parsed.error.flatten().fieldErrors)}`);
  }

  const payload = parsed.data;

  // Perform update, including setting onboarded to true
  const { error } = await supabase
    .from("users")
    .update({
      ...payload,
      onboarded: true, // Mark user as onboarded after profile completion
      updated_at: new Date().toISOString(), // Update the timestamp
    })
    .eq("id", userId);

  if (error) {
    console.error("[Update Error]", error.message);
    redirect(`/account?error=update&details=${error.message}`);
  }

  // Role-based redirect
  switch (payload.role) {
    case "admin":
      redirect("/dashboard/admin");
    case "assessor": // New role redirect
      redirect("/dashboard/assessor");
    case "trainer": // New role redirect
      redirect("/dashboard/trainer");
    case "caregiver": // Updated redirect
      redirect("/dashboard/caregiver");
    case "institution": // Updated redirect
      redirect("/dashboard/institution");
    default:
      redirect("/dashboard"); // Fallback
  }
}