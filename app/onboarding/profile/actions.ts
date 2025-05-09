"use server";

import { getSupabaseServer } from "@/utils/supabase/server";
import { ProfileData } from "./schema";

export async function updateProfile(data: ProfileData) {
  const supabase = await getSupabaseServer();
  
  // Get the authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);
  if (!user) throw new Error("User not authenticated");

  // Update user profile
  const { error: updateError } = await supabase.from("profiles").update({
    full_name: data.full_name,
    phone: data.phone,
  }).eq("id", user.id);

  if (updateError) throw new Error(updateError.message);
}
