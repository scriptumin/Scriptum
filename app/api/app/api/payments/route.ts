
// app/api/payments/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
process.env.SUPABASE_URL!,
process.env.SUPABASE_ANON_KEY!
);

// GET all payments
export async function GET() {
const { data, error } = await supabase.from("payments").select("*");
if (error) {
return NextResponse.json({ error: error.message }, { status: 500 });
}
return NextResponse.json(data);
}

// POST create a new payment record
export async function POST(req: Request) {
const body = await req.json();
const { user_id, provider, amount, currency, status, transaction_id } = body;

const { data, error } = await supabase
.from("payments")
.insert([{ user_id, provider, amount, currency, status, transaction_id }])
.select();

if (error) {
return NextResponse.json({ error: error.message }, { status: 500 });
}
return NextResponse.json(data[0]);
}
