"use server";
import { getSupabaseServer } from "@/lib/supabase";

type ResubmitData = {
  email: string;
  fullName: string;
  phone: string;
  address: string;
  additionalInfo?: string;
};

export async function resubmitApplication(data: ResubmitData) {
  const supabase = await getSupabaseServer();

  // Check if user has exceeded resubmission limit
  const { data: userResubmission, error: fetchError } = await supabase
    .from("rejected_users")
    .select("resubmission_count")
    .eq("email", data.email)
    .single();

  if (fetchError) return { success: false, message: fetchError.message };

  if (userResubmission && userResubmission.resubmission_count >= 2) {
    return { success: false, message: "You have reached the maximum number of resubmissions." };
  }

  // Move user back to applications table
  const { error: insertError } = await supabase.from("applications").insert([
    {
      email: data.email,
      full_name: data.fullName,
      phone: data.phone,
      address: data.address,
      additional_info: data.additionalInfo,
      status: "pending",
      created_at: new Date(),
    },
  ]);

  if (insertError) return { success: false, message: insertError.message };

  // Increase resubmission count in rejected_users table
  const { error: updateError } = await supabase
    .from("rejected_users")
    .update({ resubmission_count: userResubmission.resubmission_count + 1 })
    .eq("email", data.email);

  if (updateError) return { success: false, message: updateError.message };

  return { success: true, message: "Application resubmitted successfully!" };
}
