// app/api/membership-categories/route.ts
import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = await getSupabaseServer();
    const { data, error } = await supabase
      .from("membership_categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? [], { status: 200 });
  } catch (err: unknown) {
    console.error("API route crashed:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
