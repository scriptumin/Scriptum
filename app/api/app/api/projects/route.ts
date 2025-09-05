
// app/api/projects/route.ts
import type { NextRequest } from "next/server";
import { supabase, supabaseAdmin } from "../../lib/supabase";

// Helper: try to get logged-in user; fallback to service-role header for dev testing
async function getUserFromRequest(req: NextRequest) {
const userRes = await supabase.auth.getUser();
const user = userRes.data?.user ?? null;
if (user) return { user, via: "cookie" };

// fallback: dev test header (only for testing). Remove in production.
const header = req.headers.get("x-service-role");
if (header && header === process.env.SUPABASE_SERVICE_ROLE_KEY) {
// for header-based calls, caller must provide user_id in body
return { user: null, via: "service" };
}
return { user: null, via: null };
}

export async function GET(req: NextRequest) {
// List projects for current user (or all if service key used)
const who = await getUserFromRequest(req);
if (!who.via) return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });

if (who.via === "cookie") {
const user = (await supabase.auth.getUser()).data?.user;
const { data, error } = await supabase
.from("projects")
.select("*")
.eq("user_id", user.id)
.order("created_at", { ascending: false });

if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
return new Response(JSON.stringify(data), { status: 200 });
} else {
// service header -> return all projects (dev)
const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
return new Response(JSON.stringify(data), { status: 200 });
}
}

export async function POST(req: NextRequest) {
const body = await req.json().catch(() => ({}));
const who = await getUserFromRequest(req);

// If not authenticated and no service header -> reject
if (!who.via) return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });

// If service header used, allow caller to pass user_id in body (dev mode only)
let userId = null;
if (who.via === "cookie") {
const current = (await supabase.auth.getUser()).data?.user;
userId = current?.id;
} else {
userId = body.user_id ?? null;
if (!userId) return new Response(JSON.stringify({ error: "Provide user_id in body when using service header" }), { status: 400 });
}

if (!body.title) return new Response(JSON.stringify({ error: "title required" }), { status: 400 });

const payload = {
user_id: userId,
title: String(body.title).slice(0, 255),
script: body.script ?? null,
platform: body.platform ?? null,
backend: body.backend ?? null,
preview_type: body.preview_type ?? "video",
status: "draft",
};

const { data, error } = await supabase.from("projects").insert(payload).select().single();
if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

return new Response(JSON.stringify(data), { status: 201 });
}
