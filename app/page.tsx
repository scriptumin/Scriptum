
"use client";

import { useEffect, useMemo, useState } from "react";
import Robot from "./robot";
import { createBrowserClient } from "../lib/supabase-browser";

type Platform = { id:number; slug:string; name:string; category:string };

export default function Home() {
const sb = useMemo(() => createBrowserClient(), []);
const [email, setEmail] = useState("");
const [user, setUser] = useState<any>(null);
const [platforms, setPlatforms] = useState<Platform[]>([]);
const [backend, setBackend] = useState<string>("");
const [front, setFront] = useState<string>("");
const [title, setTitle] = useState("");
const [script, setScript] = useState("");
const [output, setOutput] = useState<"image"|"video">("image");
const [creating, setCreating] = useState(false);
const [projectId, setProjectId] = useState<number| null>(null);
const [genLoading, setGenLoading] = useState(false);
const [genResult, setGenResult] = useState<string>("");

useEffect(() => {
(async () => {
const { data } = await fetch("/api/platforms").then(r=>r.json());
setPlatforms(data || []);
})();
}, []);

useEffect(() => {
(async () => {
const { data: { user } } = await sb.auth.getUser();
setUser(user);
})();
}, [sb]);

async function signInMagic() {
if (!email) return alert("Type your email.");
const { error } = await sb.auth.signInWithOtp({ email });
if (error) return alert(error.message);
alert("Check your email for the login link.");
}

async function createProject() {
try {
if (!title || !script) return alert("Add a title and script.");
if (!front) return alert("Choose a platform.");
setCreating(true);
const r = await fetch("/api/projects", {
method:"POST",
headers: {"Content-Type":"application/json"},
body: JSON.stringify({ title, script, platform: `${front}${backend?`+${backend}`:""}`, preview_type: output })
}).then(r=>r.json());
if (r.error) throw new Error(r.error);
setProjectId(r.id);
alert("Saved. Scroll to Generate.");
} catch(e:any) {
alert(e.message || "Failed to save");
} finally { setCreating(false); }
}

async function generate() {
if (!projectId) return alert("Create a project first.");
setGenLoading(true);
setGenResult("");
try {
const r = await fetch("/api/generate", {
method:"POST",
headers: {"Content-Type":"application/json"},
body: JSON.stringify({ projectId, type: output })
}).then(r=>r.json());
if (r.error) throw new Error(r.error);
setGenResult(r.output_url || "(processing)");
} catch(e:any) {
setGenResult(`Error: ${e.message}`);
} finally { setGenLoading(false); }
}

const fronts = platforms.filter(p=>["drag","site","mobile","ai","cms","ecom"].includes(p.category));
const backs = [
"Node.js","Django","Laravel","FastAPI","Spring Boot","Rails","Go (Fiber)","ASP.NET Core"
];

return (
<main style={{display:"grid",gridTemplateColumns:"280px 1fr", gap:18, marginTop:18}}>
{/* left rail */}
<aside style={{background:"#0e1014",border:"1px solid #1f2430",borderRadius:12,padding:16}}>
<div style={{fontSize:13,opacity:.7,marginBottom:8}}>Sign in</div>
{!user ? (
<div>
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"
style={input} />
<button onClick={signInMagic} style={button}>Login</button>
<div style={{opacity:.5,fontSize:12,marginTop:8}}>No password — we email you a link.</div>
</div>
) : (
<div style={{fontSize:14}}>Hi {user.email?.split("@")[0]} 👋</div>
)}

<nav style={{marginTop:22, display:"grid", gap:8}}>
<div style={pillActive}>Start</div>
<div style={pill}>Community</div>
<div style={pill}>Marketplace</div>
<div style={pill}>Admin</div>
</nav>
</aside>

{/* main */}
<section style={{display:"grid",gap:16}}>
<div style={card}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<h1 style={{margin:0,fontSize:20}}>Describe. Choose. Generate.</h1>
<Robot />
</div>
<p style={{opacity:.7,marginTop:8,marginBottom:0,fontSize:14}}>
Paste your flow → pick platform + backend → choose image/video → generate preview.
</p>
</div>

<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
<div style={card}>
<div style={label}>Title</div>
<input style={input} value={title} onChange={e=>setTitle(e.target.value)} placeholder="My app idea" />

<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
<div>
<div style={label}>Platform</div>
<select value={front} onChange={e=>setFront(e.target.value)} style={input}>
<option value="">Pick one…</option>
{fronts.map(p=> (<option key={p.id} value={p.slug}>{p.name}</option>))}
</select>
</div>
<div>
<div style={label}>Backend (optional)</div>
<select value={backend} onChange={e=>setBackend(e.target.value)} style={input}>
<option value="">None</option>
{backs.map(b=>(<option key={b} value={b}>{b}</option>))}
</select>
</div>
</div>

<div style={label}>Output</div>
<div style={{display:"flex",gap:8}}>
<button
onClick={()=>setOutput("image")}
style={{...segBtn, ...(output==="image"?segOn:segOff)}}
>Images</button>
<button
onClick={()=>setOutput("video")}
style={{...segBtn, ...(output==="video"?segOn:segOff)}}
>Video</button>
</div>

<div style={label}>Script</div>
<textarea style={{...input, minHeight:120}}
value={script}
onChange={e=>setScript(e.target.value)}
placeholder="Explain screens, steps, and tone…" />

<button style={button} onClick={createProject} disabled={creating}>
{creating ? "Saving…" : "Create"}
</button>
{projectId && <div style={{opacity:.7,fontSize:12,marginTop:6}}>Saved as #{projectId}</div>}
</div>

<div style={card}>
<div style={label}>Generate</div>
<button style={button} onClick={generate} disabled={!projectId || genLoading}>
{genLoading ? "Working…" : `Go (${output})`}
</button>
<div style={{marginTop:12,fontSize:13,opacity:.7}}>
Result:
</div>
<div style={resultBox}>{genResult || "—"}</div>
{!!genResult && genResult.startsWith("http") && (
<a href={genResult} target="_blank" style={{...button, display:"inline-block", marginTop:12, textDecoration:"none"}}>
Open Output
</a>
)}
</div>
</div>
</section>
</main>
);
}

const card = { background:"#0e1014", border:"1px solid #1f2430", borderRadius:12, padding:18 } as const;
const label = { fontSize:12, opacity:.65, margin:"10px 0 6px" } as const;
const input = { width:"100%", padding:"10px 12px", borderRadius:10, border:"1px solid #263244", background:"#0b0c10", color:"#e5e7eb" } as const;
const button = { padding:"10px 14px", borderRadius:10, border:"1px solid #2a3344", background:"#6ee7b7", color:"#0b0c10", fontWeight:600, cursor:"pointer" } as const;
const pill = { padding:"8px 10px", borderRadius:8, background:"#0b0c10", border:"1px solid #1f2430", fontSize:14, opacity:.75 } as const;
const pillActive = { ...pill, background:"#131621" };
const segBtn = { flex:1, padding:"8px 10px", borderRadius:8, border:"1px solid", cursor:"pointer" } as const;
const segOn = { background:"#1a2130", borderColor:"#345", color:"#eaf" } as const;
const segOff = { background:"#0b0c10", borderColor:"#263244", color:"#cbd5e1" } as const;
const resultBox = { marginTop:8, background:"#0b0c10", border:"1px dashed #334155", borderRadius:10, padding:12, wordBreak:"break-all" } as const;
