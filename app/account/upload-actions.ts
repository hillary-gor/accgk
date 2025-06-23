// app/account/upload-actions.ts
"use server";

import { getSupabaseServer } from "@/utils/supabase/server";

interface UploadResult {
  url?: string;
  error?: string;
}

/**
 * Uploads a file to a specified Supabase storage bucket.
 *
 * @param file The file to upload.
 * @param bucketName The name of the Supabase storage bucket.
 * @param userId The ID of the user uploading the file, used for unique file naming.
 * @returns An object containing the public URL of the uploaded file on success, or an error message on failure.
 */
export async function uploadFile(file: File, bucketName: string, userId: string): Promise<UploadResult> {
  const supabase = await getSupabaseServer();

  if (!file) {
    return { error: "No file provided for upload." };
  }

  // Basic file size validation (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    return { error: "File size exceeds 5MB limit. Maximum allowed is 5MB." };
  }

  // Generate a unique file name
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) {
    return { error: `Failed to upload file: ${uploadError.message}` };
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  if (!publicUrlData || !publicUrlData.publicUrl) {
    return { error: "Failed to retrieve public URL for the uploaded file." };
  }

  return { url: publicUrlData.publicUrl };
}
