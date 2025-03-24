"use server";
import { getSupabaseServer } from "@/lib/supabase";

type AppealData = {
  email: string;
  reason: string;
};

export async function handleAppeal(data: AppealData) {
  const supabase = await getSupabaseServer();

  // ✅ Check if the user has already submitted an appeal
  const { data: existingAppeal, error: checkError } = await supabase
    .from("appeals")
    .select("id")
    .eq("email", data.email)
    .single();

  if (checkError && checkError.code !== "PGRST116") {
    return { success: false, message: "Error checking appeal status." };
  }

  if (existingAppeal) {
    return { success: false, message: "You have already submitted an appeal." };
  }

  // ✅ Insert appeal into the `appeals` table
  const { error: insertError } = await supabase.from("appeals").insert([
    {
      email: data.email,
      reason: data.reason,
      status: "pending", // Default status
      created_at: new Date(),
    },
  ]);

  if (insertError) {
    return { success: false, message: "Error submitting appeal." };
  }

  return { success: true, message: "Your appeal has been submitted for review." };
}
