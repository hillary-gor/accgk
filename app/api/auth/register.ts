"use server";
import { getSupabaseServer } from "@/lib/supabase";
import bcrypt from "bcryptjs";

// Type definition for the Registration Data
type RegisterData = {
  email: string;
  password: string;
  role: "caregiver" | "institution"; // Explicit Type for Role
  fullName: string;
  phone: string;
  address: string;
  additionalInfo?: string;
  documentUrl: string;
};

export async function register({
  email,
  password,
  role,
  fullName,
  phone,
  address,
  additionalInfo,
  documentUrl,
}: RegisterData) {
  try {
    // Await Supabase Client
    const supabase = await getSupabaseServer();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Error Handling
    const { error } = await supabase.from("applications").insert([
      {
        email,
        password_hash: hashedPassword,
        role,
        full_name: fullName,
        phone,
        address,
        additional_info: additionalInfo,
        document_urls: [documentUrl],
        status: "pending",
        created_at: new Date(),
      },
    ]);

    if (error) throw new Error(error.message);

    return { success: true };
  } catch (error) {
    
    console.error("Registration error:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
