"use server";
import { getSupabaseServer } from "@/app/registration/lib/supabase";

export async function submitAppeal(email: string, reason: string) {
  const supabase = await getSupabaseServer();

  const { data: existingAppeal } = await supabase
    .from("appeals")
    .select("status")
    .eq("email", email)
    .single();

  if (existingAppeal) throw new Error("Appeal already submitted.");

  await supabase.from("appeals").insert([{ email, appeal_reason: reason, status: "pending" }]);

  return { success: true };
}
