"use server";
import { getSupabaseServer } from "@/lib/supabase";

export async function uploadFile(file: File) {
  try {
    if (!file) throw new Error("No file selected.");

    const supabase = await getSupabaseServer(); // Get the Supabase instance

    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("documents")
      .upload(fileName, file);

    if (error) throw new Error(error.message);

    return data.path;
  } catch (error) {
    console.error("File upload failed:", error);
    return null;
  }
}
