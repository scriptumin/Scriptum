
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(req: Request) {
const body = await req.json();
const sb = createClient(url, anon);

const { data, error } = await sb
.from("projects")
.insert([{
title: body.title,
script: body.script,
platform: body.platform,
preview_type: body.preview_type || "image",
status: "draft"
}])
.select("id")
.single();

if (error) return NextResponse.json({ error: error.message }, { status: 500 });
return NextResponse.json({ id: data.id });
}
