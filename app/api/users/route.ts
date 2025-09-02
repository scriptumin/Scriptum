
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET all users
export async function GET() {
const { data, error } = await supabase.from("users").select("*");
if (error) {
return NextResponse.json({ error: error.message }, { status: 500 });
}
return NextResponse.json(data);
}

// POST create a new user
export async function POST(req: Request) {
const body = await req.json();
const { email, name, subscription_plan } = body;

const { data, error } = await supabase.from("users").insert([
{ email, name, subscription_plan }
]);

if (error) {
return NextResponse.json({ error: error.message }, { status: 500 });
}

return NextResponse.json({ user: data }, { status: 201 });
}
