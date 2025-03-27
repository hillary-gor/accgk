"use server";

import { getSupabaseServer } from "@/lib/supabase";

// Fetch all legal pages
export async function getLegalPages() {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.from("legal_pages").select("title, slug");

  if (error) {
    console.error("Error fetching legal pages:", error.message);
    return [];
  }
  return data;
}

// Fetch a single legal page by slug
export async function getLegalPageBySlug(slug: string) {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase.from("legal_pages").select("*").eq("slug", slug).single();

  if (error) {
    console.error(`Error fetching legal page (${slug}):`, error.message);
    return null;
  }
  return data;
}
