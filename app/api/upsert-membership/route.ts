import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const { membership_id } = await req.json();

    if (!membership_id) {
      return NextResponse.json({ error: "Membership ID is required" }, { status: 400 });
    }

    const supabase = await getSupabaseServer();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Update existing profile instead of upsert
    const { error } = await supabase
      .from("profiles")
      .update({ membership_id })
      .eq("id", userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
