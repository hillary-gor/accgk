"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Creates a Supabase client using the public anon key.
 * Used for normal user operations in server components, server actions, etc.
 */
export async function getSupabaseServer() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: async () => await cookieStore.getAll(),
        setAll: async (
          cookiesToSet: {
            name: string;
            value: string;
            options: CookieOptions;
          }[]
        ) => {
          "use server";
          const cookieInstance = await cookies();
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              cookieInstance.set(name, value, options);
            } catch (error) {
              console.warn("Error setting cookie:", error);
            }
          });
        },
      },
    }
  );
}

/**
 * Creates a Supabase client using the service role key.
 * Used for privileged server-only operations (never expose to the client!).
 */
export async function getSupabaseAdminServer() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll: async () => await cookieStore.getAll(),
        // Admin client doesn't need to write cookies back
        setAll: async () => {},
      },
    }
  );
}
