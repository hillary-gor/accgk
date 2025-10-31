"use server";

import { getSupabaseServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// UPLOAD INSTITUTION QUALIFICATION FILE
export async function uploadInstitutionFile(formData: FormData) {
  try {
    const supabase = await getSupabaseServer();

    // Extract from FormData (since form sends FormData)
    const file = formData.get("file") as File | null;
    const document_type = formData.get("document_type") as string;
    const description = formData.get("description") as string;
    const issued_by = formData.get("issued_by") as string;
    const issued_date = formData.get("issued_date") as string;

    if (!file) return { success: false, message: "No file selected." };

    // 1. Auth check
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user)
      return { success: false, message: "Unauthorized: Please log in first." };

    // 2. Get institution
    const { data: institution, error: instError } = await supabase
      .from("institutions")
      .select("id, institution_name")
      .eq("profile_id", user.id)
      .single();

    if (instError || !institution)
      return { success: false, message: "Institution not found." };

    // 3. Enforce PDF type
    const mimeType = file.type || "application/pdf";
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (mimeType !== "application/pdf" && ext !== "pdf")
      return { success: false, message: "Only PDF files are allowed." };

    // 4. Upload to storage
    const bucket = "institution_qualification_files";
    const filePath = `${institution.id}/${Date.now()}_${file.name.replace(
      /\s+/g,
      "_"
    )}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: mimeType,
      });

    if (uploadError)
      return {
        success: false,
        message: `Upload failed: ${uploadError.message}`,
      };

    // 5. Public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath);

    // 6. Insert record
    const { error: insertError } = await supabase
      .from("institution_qualification_files")
      .insert({
        institution_id: institution.id,
        profile_id: user.id,
        document_type,
        description,
        issued_by,
        issued_date,
        file_url: publicUrl,
        file_name: file.name,
        file_type: "pdf",
        file_size: file.size,
      });

    if (insertError)
      return {
        success: false,
        message: `Could not save record: ${insertError.message}`,
      };

    revalidatePath(
      "/dashboard/guest/institution-registration-form/institution-qualifications"
    );

    return { success: true, message: "File uploaded successfully." };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unexpected upload error.";
    console.error("uploadInstitutionFile error:", message);
    return { success: false, message };
  }
}

export async function getUploadedInstitutionFiles() {
  const supabase = await getSupabaseServer();

  // Get authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) throw new Error("Unauthorized: Please log in first.");

  // Get institution linked to this user
  const { data: institution, error: instError } = await supabase
    .from("institutions")
    .select("id")
    .eq("profile_id", user.id)
    .single();

  if (instError || !institution)
    throw new Error("Institution not found for current user.");

  // Fetch uploaded files for this institution
  const { data, error } = await supabase
    .from("institution_qualification_files")
    .select("*")
    .eq("institution_id", institution.id)
    .order("uploaded_at", { ascending: false });

  if (error) {
    console.error("Error fetching institution files:", error);
    throw new Error("Could not fetch uploaded files");
  }

  return data;
}

// FETCH INSTITUTION FILES
export async function getInstitutionFiles() {
  try {
    const supabase = await getSupabaseServer();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user)
      return { success: false, message: "Unauthorized.", data: [] };

    const { data: institution, error: instError } = await supabase
      .from("institutions")
      .select("id")
      .eq("profile_id", user.id)
      .single();

    if (instError || !institution)
      return { success: false, message: "Institution not found.", data: [] };

    const { data, error } = await supabase
      .from("institution_qualification_files")
      .select(
        "id, file_name, document_type, description, issued_by, issued_date, file_url, file_type, file_size, uploaded_at"
      )
      .eq("institution_id", institution.id)
      .order("uploaded_at", { ascending: false });

    if (error)
      return { success: false, message: "Failed to fetch files.", data: [] };

    return { success: true, message: "Files fetched.", data: data ?? [] };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, message, data: [] };
  }
}

// DELETE INSTITUTION FILE (DB + STORAGE)
export async function deleteInstitutionFile(fileId: string) {
  try {
    const supabase = await getSupabaseServer();

    // 1. Auth check
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user)
      return { success: false, message: "Unauthorized: Please log in first." };

    // 2. Fetch the file record
    const { data: fileRecord, error: fetchError } = await supabase
      .from("institution_qualification_files")
      .select("id, file_url, institution_id")
      .eq("id", fileId)
      .single();

    if (fetchError || !fileRecord)
      return { success: false, message: "File not found." };

    // 3. Delete DB record
    const { error: dbDeleteError } = await supabase
      .from("institution_qualification_files")
      .delete()
      .eq("id", fileId)
      .eq("profile_id", user.id);

    if (dbDeleteError)
      return { success: false, message: "Failed to delete record from DB." };

    // 4. Derive path inside the bucket
    const bucket = "institution_qualification_files";
    const relativePath = fileRecord.file_url.split(`${bucket}/`).pop();

    if (relativePath) {
      const { error: storageError } = await supabase.storage
        .from(bucket)
        .remove([relativePath]);

      if (storageError)
        console.error("Storage deletion warning:", storageError);
    }

    // 5. Refresh UI
    revalidatePath("/dashboard/guest/institution-qualifications");

    return { success: true, message: "File deleted successfully." };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unexpected delete error.";
    console.error("deleteInstitutionFile error:", message);
    return { success: false, message };
  }
}
