// /lib/auth.ts
"use server";

import { getSupabaseServer } from "@/lib/supabase";

export async function isCaregiver(email: string) {
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("members")
    .select("members_role")
    .eq("email", email)
    .single();

  return data?.members_role === "caregiver";
}
