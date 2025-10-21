"use server";

import { getSupabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const locationSchema = z.object({
  country: z.string().min(2, "Country is required"),
  county: z.string().min(2, "County is required"),
  subcounty: z.string().min(2, "Subcounty is required"),
  ward: z.string().nullable().optional(),
  town: z.string().nullable().optional(),
});

const updateSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(["Male", "Female", "Other"], {
    message: "Gender is required",
  }),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  location: locationSchema,
});

type ProfilePayload = z.infer<typeof updateSchema>;

export async function updateUserProfile(userId: string, data: unknown) {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.id !== userId) {
    redirect("/account?error=unauthorized");
  }

  const parsed = updateSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Validation failed:", parsed.error.flatten().fieldErrors);
    return {
      error: "Validation failed. Please check your inputs.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const payload: ProfilePayload = parsed.data;

  const updateData = {
    id: userId,
    first_name: payload.first_name,
    last_name: payload.last_name,
    phone: payload.phone,
    gender: payload.gender,
    date_of_birth: payload.date_of_birth,
    location: payload.location,
    role: "guest",
    onboarded: true,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("profiles")
    .upsert(updateData, { onConflict: "id" });

  if (error) {
    console.error("Profile update failed:", error);
    return { error: `Profile update failed: ${error.message}` };
  }

  redirect("/dashboard/guest");
}
