"use server";

import { getSupabaseServer } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

/* --------------------------------------------------------
   FETCH EDUCATION RECORDS (with attached files)
-------------------------------------------------------- */
export async function getCaregiverEducationRecords() {
  const supabase = await getSupabaseServer();

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, message: "Not authenticated.", data: [] };
  }

  // Fetch caregiver education records + related files
  const { data, error } = await supabase
    .from("caregiver_education")
    .select(
      `
      id,
      level,
      institution_name,
      qualification_obtained,
      start_year,
      end_year,
      grade_or_score,
      caregiver_education_files (
        id,
        file_name,
        file_url
      )
    `
    )
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching caregiver education records:", error.message);
    return { success: false, message: error.message, data: [] };
  }

  return { success: true, data };
}

/* --------------------------------------------------------
   ADD EDUCATION RECORD
-------------------------------------------------------- */
export async function addCaregiverEducation(formData: FormData) {
  const supabase = await getSupabaseServer();

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, message: "Not authenticated." };
  }

  // Extract and validate fields
  const level = (formData.get("level") as string)?.trim();
  const institution_name = (formData.get("institution_name") as string)?.trim();
  const qualification_obtained = (
    formData.get("qualification_obtained") as string
  )?.trim();
  const start_year = Number(formData.get("start_year"));
  const end_year = Number(formData.get("end_year"));
  const grade_or_score = (formData.get("grade_or_score") as string)?.trim();

  if (
    !level ||
    !institution_name ||
    !qualification_obtained ||
    !start_year ||
    !end_year ||
    !grade_or_score
  ) {
    return { success: false, message: "All fields are required." };
  }

  // Insert education record
  const { data: edu, error: eduError } = await supabase
    .from("caregiver_education")
    .insert([
      {
        profile_id: user.id,
        level,
        institution_name,
        qualification_obtained,
        start_year,
        end_year,
        grade_or_score,
      },
    ])
    .select()
    .single();

  if (eduError || !edu) {
    console.error("Education insert error:", eduError);
    return {
      success: false,
      message: eduError?.message || "Failed to save education record.",
    };
  }

  // Handle file uploads (if any)
  const files = formData.getAll("files") as File[];
  const uploadedFiles: string[] = [];

  try {
    if (files && files.length > 0) {
      for (const file of files) {
        if (!file || file.size === 0) continue;

        const filePath = `${edu.id}/${randomUUID()}-${file.name}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("caregiver_education_files")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) throw new Error(uploadError.message);

        uploadedFiles.push(uploadData?.path);

        const { error: insertFileError } = await supabase
          .from("caregiver_education_files")
          .insert({
            education_id: edu.id,
            file_url: uploadData?.path,
            file_name: file.name,
          });

        if (insertFileError) throw new Error(insertFileError.message);
      }
    }
  } catch (error: unknown) {
    // Rollback uploaded files on failure
    for (const path of uploadedFiles) {
      await supabase.storage.from("caregiver_education_files").remove([path]);
    }

    const message =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during upload.";
    console.error("Upload rollback triggered:", message);

    return { success: false, message };
  }

  // Refresh UI
  revalidatePath("/dashboard/caregiver/caregiver-education");

  return { success: true, message: "Education record saved successfully!" };
}

/* --------------------------------------------------------
   DELETE EDUCATION RECORD + FILES (Postgres + Storage)
-------------------------------------------------------- */

export async function deleteEducationRecord(educationId: string) {
  const supabase = await getSupabaseServer();

  // Auth check
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user)
    return { success: false, message: "Not authenticated." };

  try {
    // Fetch all files linked to this education record
    const { data: files, error: fetchError } = await supabase
      .from("caregiver_education_files")
      .select("file_url")
      .eq("education_id", educationId);

    if (fetchError) throw new Error(fetchError.message);

    console.log("Files found for deletion:", files);

    // Delete file DB entries
    const { error: fileDBError } = await supabase
      .from("caregiver_education_files")
      .delete()
      .eq("education_id", educationId);

    if (fileDBError) throw new Error(fileDBError.message);

    // Delete education record
    const { error: eduError } = await supabase
      .from("caregiver_education")
      .delete()
      .eq("id", educationId)
      .eq("profile_id", user.id);

    if (eduError) throw new Error(eduError.message);

    // Delete actual storage files
    if (files && files.length > 0) {
      // Each file_url looks like: educationId/uuid-filename.pdf
      // Supabase requires the **exact relative path** inside the bucket.
      const paths = files.map((f) => f.file_url.trim());

      console.log("Removing storage paths:", paths);

      // Use remove() *after confirming bucket + folder path*
      const { data: removed, error: removeError } = await supabase.storage
        .from("caregiver_education_files")
        .remove(paths);

      if (removeError) {
        console.error("Storage remove error:", removeError);
        throw new Error(removeError.message);
      }

      console.log("Storage removed result:", removed);
    } else {
      console.log("No storage files found for this educationId.");
    }

    // Revalidate UI
    revalidatePath("/dashboard/caregiver/caregiver-education");

    return {
      success: true,
      message: "Education record and all files deleted.",
    };
  } catch (err) {
    console.error("Delete education failed:", err);
    const message =
      err instanceof Error ? err.message : "Failed to delete education record.";
    return { success: false, message };
  }
}
