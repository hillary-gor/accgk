import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase
    .from("membership_categories")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data);
}
