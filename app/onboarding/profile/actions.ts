"use server";

import { getSupabaseServer } from "@/utils/supabase/server";
import { ProfileData } from "./schema";

export async function updateProfile(data: ProfileData) {
  const supabase = await getSupabaseServer();
  const { data: session, error } = await supabase.auth.getSession();

  if (error) throw new Error(error.message);
  if (!session?.user) throw new Error("User not authenticated");

  const { error: updateError } = await supabase.auth.updateUser({
    data: {
      full_name: data.full_name,
      phone: data.phone,
    },
  });

  if (updateError) throw new Error(updateError.message);
}
