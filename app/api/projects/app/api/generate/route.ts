
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const PROVIDER_IMAGE = (process.env.PROVIDER_IMAGE || "local").toLowerCase();
const PROVIDER_VIDEO = (process.env.PROVIDER_VIDEO || "local").toLowerCase();
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
const { projectId, type } = await req.json();
const sb = createClient(url, anon);

// read project
const { data: project, error: pErr } = await sb.from("projects").select("id,script,preview_type").eq("id", projectId).single();
if (pErr || !project) return NextResponse.json({ error: pErr?.message || "Not found" }, { status: 404 });

try {
// === IMAGE
if ((type || project.preview_type) === "image") {
if (PROVIDER_IMAGE === "replicate" && REPLICATE_API_TOKEN) {
const res = await fetch("https://api.replicate.com/v1/predictions", {
method: "POST",
headers: {
"Authorization": `Token ${REPLICATE_API_TOKEN}`,
"Content-Type": "application/json",
},
body: JSON.stringify({
// SDXL lightning fast general model
version: "c5c3d9b5f2b1b3a8c9a6b7a55a9a5b17f9f0e3d2d13b0b7f2b8a7b3c3b9c0d46",
input: { prompt: project.script.slice(0, 500) }
})
}).then(r=>r.json());

if (res?.output?.[0]) {
await sb.from("gen_jobs").insert([{ project_id: projectId, user_id: null, job_type:"image", provider:"replicate", status:"done", output_url: res.output[0] }]);
return NextResponse.json({ output_url: res.output[0] });
}
return NextResponse.json({ error: "Replicate did not return output" }, { status: 502 });
}

if (PROVIDER_IMAGE === "openai" && OPENAI_API_KEY) {
const res = await fetch("https://api.openai.com/v1/images/generations", {
method: "POST",
headers: { "Authorization": `Bearer ${OPENAI_API_KEY}`, "Content-Type":"application/json" },
body: JSON.stringify({ model: "gpt-image-1", prompt: project.script.slice(0,500), size: "1024x1024" })
}).then(r=>r.json());
const url = res?.data?.[0]?.url;
if (url) {
await sb.from("gen_jobs").insert([{ project_id: projectId, user_id: null, job_type:"image", provider:"openai", status:"done", output_url: url }]);
return NextResponse.json({ output_url: url });
}
return NextResponse.json({ error: "OpenAI did not return output" }, { status: 502 });
}

// fallback/local simulation
const fake = "https://picsum.photos/seed/scriptum/1024/1024";
await sb.from("gen_jobs").insert([{ project_id: projectId, user_id: null, job_type:"image", provider:"local", status:"done", output_url: fake }]);
return NextResponse.json({ output_url: fake });
}

// === VIDEO
if ((type || project.preview_type) === "video") {
if (PROVIDER_VIDEO === "replicate" && REPLICATE_API_TOKEN) {
const res = await fetch("https://api.replicate.com/v1/predictions", {
method: "POST",
headers: { "Authorization": `Token ${REPLICATE_API_TOKEN}`, "Content-Type":"application/json" },
body: JSON.stringify({
// Pika 1.1 (text-to-video) example version hash
version: "e51f1be9f6a2f7aa451e2a1a2f33e9a55d8d6f2e2efb24ab6c2c3c311b4c5f2a",
input: { prompt: project.script.slice(0, 500) }
})
}).then(r=>r.json());

const url = res?.output?.[0];
if (url) {
await sb.from("gen_jobs").insert([{ project_id: projectId, user_id: null, job_type:"video", provider:"replicate", status:"done", output_url: url }]);
return NextResponse.json({ output_url: url });
}
return NextResponse.json({ error: "Replicate returned no video" }, { status: 502 });
}

// fallback/local simulation
const demo = "https://samplelib.com/lib/preview/mp4/sample-5s.mp4";
await sb.from("gen_jobs").insert([{ project_id: projectId, user_id: null, job_type:"video", provider:"local", status:"done", output_url: demo }]);
return NextResponse.json({ output_url: demo });
}

return NextResponse.json({ error: "Unknown type" }, { status: 400 });
} catch (e:any) {
return NextResponse.json({ error: e.message || "Generation error" }, { status: 500 });
}
}
