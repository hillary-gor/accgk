// hooks/useDeleteStorageFile.ts
"use client";

import { createClient } from "@/utils/supabase/client";
import { useCallback, useState } from "react";

export function useDeleteStorageFile(bucket: string) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteFile = useCallback(
    async (publicUrl: string) => {
      try {
        setLoading(true);
        setError(null);

        const urlParts = new URL(publicUrl);
        // e.g. /storage/v1/object/public/service_package_media/vendorId/file.png
        const path = decodeURIComponent(
          urlParts.pathname.split("/").slice(3).join("/")
        );

        const { error: deleteError } = await supabase.storage
          .from(bucket)
          .remove([path]);

        if (deleteError) throw new Error(deleteError.message);
        return true;
      } catch (err) {
        console.error("Storage delete failed:", err);
        setError(err instanceof Error ? err.message : "Failed to delete file");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [bucket, supabase]
  );

  return { deleteFile, loading, error };
}
