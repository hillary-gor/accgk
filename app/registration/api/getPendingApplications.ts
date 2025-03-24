"use server";
import { getSupabaseServer } from "@/lib/supabase";

export async function getPendingApplication(email: string) {
  const supabase = await getSupabaseServer();

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("email", email)
    .eq("status", "pending")
    .single();

  if (error) return { success: false, message: error.message };

  return { success: true, application: data };
}
