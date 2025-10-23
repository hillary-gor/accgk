"use server";

import { getSupabaseServer } from "@/utils/supabase/server";
import { CaregiverFormData } from "./schema";

// Use profile_id instead of user_id
export async function upsertCaregiverProfile(profileId: string, data: CaregiverFormData) {
  const supabase = await getSupabaseServer();

  const { error } = await supabase
    .from("caregivers")
    .upsert(
      {
        ...data,
        profile_id: profileId,
      },
      { onConflict: "profile_id" } // ensure one record per user
    );

  if (error) throw new Error(error.message);
}
