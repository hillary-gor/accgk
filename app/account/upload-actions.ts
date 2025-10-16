// app/account/upload-actions.ts
"use server";

import { getSupabaseServer } from "@/utils/supabase/server";

interface UploadResult {
  url?: string;
  error?: string;
}

export async function uploadFile(file: File, bucketName: string, userId: string): Promise<UploadResult> {
  const supabase = await getSupabaseServer();

  if (!file) {
    return { error: "No file provided for upload." };
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB limit
    return { error: "File size exceeds 5MB limit. Maximum allowed is 5MB." };
  }

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