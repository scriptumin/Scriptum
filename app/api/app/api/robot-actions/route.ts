
// app/api/robot-actions/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
process.env.SUPABASE_URL!,
process.env.SUPABASE_ANON_KEY!
);

// GET all robot actions
export async function GET() {
const { data, error } = await supabase.from("robot_actions").select("*");
if (error) {
return NextResponse.json({ error: error.message }, { status: 500 });
}
return NextResponse.json(data);
}

// POST add a new robot action
export async function POST(req: Request) {
const body = await req.json();
const { action_name, description } = body;

const { data, error } = await supabase
.from("robot_actions")
.insert([{ action_name, description }])
.select();

if (error) {
return NextResponse.json({ error: error.message }, { status: 500 });
}
return NextResponse.json(data[0]);
}
