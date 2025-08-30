
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET() {
const sb = createClient(url, anon);
const { data, error } = await sb.from("platforms").select("id,slug,name,category").eq("active", true).order("name");
if (error) return NextResponse.json({ error: error.message }, { status: 500 });
return NextResponse.json({ data });
}
