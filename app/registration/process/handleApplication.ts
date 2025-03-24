"use server";
import { getSupabaseServer } from "@/app/registration/lib/supabase";

export async function handleApplication(email: string, action: "approve" | "reject", feedback?: string) {
  const supabase = await getSupabaseServer();

  const { data: user, error } = await supabase
    .from("applications")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) throw new Error("User not found");

  if (action === "approve") {
    await supabase.from("approved_users").insert({ ...user });

    // Send Magic Link using Supabase Auth
    const { error: magicLinkError } = await supabase.auth.admin.inviteUserByEmail(email, {
      redirectTo: process.env.NEXT_PUBLIC_LOGIN_REDIRECT, // Dashboard Redirect
    });

    if (magicLinkError) throw new Error("Failed to send Magic Link");

    return { success: true, message: "User approved and Magic Link sent." };
  } else {
    await supabase.from("rejected_users").insert({ ...user, feedback });

    // Send rejection email using Supabase's built-in email system
    const { error: rejectionEmailError } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: { subject: "Your Application Was Not Approved", message: `Reason: ${feedback || "No specific reason provided."}` },
    });

    if (rejectionEmailError) throw new Error("Failed to send rejection email");

    return { success: true, message: "User rejected and email sent." };
  }

  await supabase.from("applications").delete().eq("email", email);
}
