"use server";
import { getSupabaseServer } from "@/app/registration/lib/supabase";

type RegisterData = {
  email: string;
  role: "caregiver" | "institution";
  fullName: string;
  phone: string;
  address: string;
  additionalInfo?: string;
  documentUrl?: string; // ✅ Make this optional
};

export async function registerUser(data: RegisterData) {
  const supabase = await getSupabaseServer();

  const { error } = await supabase.from("applications").insert([
    {
      email: data.email,
      role: data.role,
      full_name: data.fullName,
      phone: data.phone,
      address: data.address,
      additional_info: data.additionalInfo,
      document_urls: data.documentUrl ? [data.documentUrl] : [], // ✅ Handles missing documentUrl
      status: "pending",
      created_at: new Date(),
    },
  ]);

  if (error) throw new Error(error.message);

  return { success: true, message: "Application submitted successfully!" };
}
