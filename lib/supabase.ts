import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// Access environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate the environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required.");
}

if (!supabaseServiceKey) {
  console.warn("Service Role Key is not defined. Some server-side operations may not work.");
}

// Client-side Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Server-side Supabase admin client
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey!);
