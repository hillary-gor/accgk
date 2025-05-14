"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getSupabaseServer() {
  const cookieStore = await cookies(); // Await cookies() before use

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: async () => await cookieStore.getAll(), // Await before getting cookies
        setAll: async (cookiesToSet) => {
          "use server"; //Function runs on the server
          const cookieInstance = await cookies(); // Await `cookies()`
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieInstance.set(name, value, options)
          );
        },
      },
    }
  );
}
