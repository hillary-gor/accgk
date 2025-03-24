"use server";
import { getSupabaseServer } from "@/lib/supabase";

export async function getResubmissionCount(email: string) {
  const supabase = await getSupabaseServer();

  const { data, error } = await supabase
    .from("rejected_users")
    .select("resubmission_count")
    .eq("email", email)
    .single();

  if (error) return { success: false, count: 0 };

  return { success: true, count: data.resubmission_count };
}
