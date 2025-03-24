import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getSupabaseServer() {
  const cookieStore = await cookies(); // Await the cookies() function

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(), // Access getAll() on the resolved cookieStore
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options) // Access set() on the resolved cookieStore
            );
          } catch (error) {
            console.error("Failed to set cookies:", error);
          }
        },
      },
    }
  );
}
