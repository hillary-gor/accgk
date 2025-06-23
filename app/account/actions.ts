// app/account/actions.ts
"use server";

import { createClient } from "@/utils/supabase/client";
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
  full_name: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  dob: z.string().min(1, "Date of birth is required"),
  location: z.string().min(2, "Location is required"),
  role: z.enum(memberRoles, {
    required_error: "Role is required",
  }),
  user_id: z.string().optional(),
  avatar_url: z.string().optional(),
});

type ProfilePayload = z.infer<typeof updateSchema>;

export async function updateUserProfile(userId: string, data: unknown) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.id !== userId) {
    console.error("[Unauthorized Update Attempt]", userId, user?.id);
    redirect("/account?error=unauthorized");
  }

  const parsed = updateSchema.safeParse(data);
  if (!parsed.success) {
    console.error("[Zod Validation Error]", parsed.error.flatten().fieldErrors);
    return {
      error: "Validation failed. Please check your inputs.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const payload: ProfilePayload = parsed.data;

  const updateData: Partial<ProfilePayload> & { onboarded: boolean; updated_at: string; } = {
    full_name: payload.full_name,
    phone: payload.phone,
    gender: payload.gender,
    dob: payload.dob,
    location: payload.location,
    role: payload.role,
    avatar_url: payload.avatar_url,
    onboarded: true,
    updated_at: new Date().toISOString(),
  };

  if (payload.user_id) {
    updateData.user_id = payload.user_id;
  }

  const { error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", userId);

  if (error) {
    console.error("[Update Error]", error.message);
    return { error: `Profile update failed: ${error.message}` };
  }

  switch (payload.role) {
    case "admin":
      redirect("/dashboard/admin");
    case "assessor":
      redirect("/dashboard/assessor");
    case "trainer":
      redirect("/dashboard/trainer");
    case "caregiver":
      redirect("/dashboard/caregiver");
    case "institution":
      redirect("/dashboard/institution");
    default:
      redirect("/dashboard");
  }
}

export async function uploadAvatar(
  userId: string,
  file: File,
  bucketName: string = "avatars"
): Promise<{ data?: { path: string }; error?: string }> {
  const supabase = await createClient();

  if (!file) {
    return { error: "No file provided for upload." };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "Only image files are allowed." };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { error: "File size exceeds 5MB limit." };
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}-${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) {
    console.error("[Avatar Upload Error]", uploadError.message);
    return { error: `Failed to upload avatar: ${uploadError.message}` };
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  if (!publicUrlData) {
    console.error("[Get Public URL Error]", "No public URL returned after upload");
    return { error: "Failed to get public URL for avatar." };
  }

  const { error: dbUpdateError } = await supabase
    .from("users")
    .update({ avatar_url: publicUrlData.publicUrl })
    .eq("id", userId);

  if (dbUpdateError) {
    console.error("[Avatar DB Update Error]", dbUpdateError.message);
    return { error: `Failed to update avatar URL in database: ${dbUpdateError.message}` };
  }

  return { data: { path: publicUrlData.publicUrl } };
}