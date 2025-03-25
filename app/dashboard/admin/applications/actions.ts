"use server";

import { getSupabaseServer } from "@/lib/supabase";

export async function fetchApplications() {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase
    .from("applications")
    .select("id, applicant_name, email, status, created_at");

  if (error) throw new Error(error.message);
  return data || [];
}

export async function updateApplicationStatus(
  applicationId: string,
  status: "approved" | "rejected"
) {
  const supabase = await getSupabaseServer();
  const { error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", applicationId);

  if (error) throw new Error(error.message);

  return { success: true };
}
