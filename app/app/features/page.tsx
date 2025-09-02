
// app/features/page.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/app/lib/supabase";

export default function FeaturesPage() {
const [plan, setPlan] = useState("free");

useEffect(() => {
async function fetchPlan() {
const supabase = createClient();
const {
data: { user },
} = await supabase.auth.getUser();

if (!user) return;

const { data: profile } = await supabase
.from("users")
.select("subscription_plan")
.eq("id", user.id)
.single();

setPlan(profile?.subscription_plan || "free");
}

fetchPlan();
}, []);

return (
<main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
<h1 style={{ textAlign: "center" }}>🚀 Scriptum Features</h1>
<p style={{ textAlign: "center" }}>
Your current plan: <b>{plan.toUpperCase()}</b>
</p>

{/* Free Features */}
<section style={{ marginTop: "40px" }}>
<h2>🆓 Free Plan</h2>
<ul>
<li>✅ Community page access</li>
<li>✅ Generate <b>1 video or image/day</b></li>
<li>✅ Fun Robo animations (jump, wave, dance)</li>
<li>✅ Browse <b>free marketplace templates</b></li>
</ul>
{plan === "free" && (
<button
style={{
marginTop: "10px",
padding: "10px 20px",
background: "gold",
border: "none",
cursor: "pointer",
}}
onClick={() => alert("Upgrade to unlock Pro features!")}
>
Upgrade to Pro 💎
</button>
)}
</section>

{/* Pro Features */}
<section style={{ marginTop: "40px" }}>
<h2>💎 Pro Plan</h2>
<ul>
<li>✨ Everything in Free</li>
<li>✨ Generate <b>10 videos/images/day</b></li>
<li>✨ Access <b>premium marketplace templates</b></li>
<li>✨ Extra Robo actions (fly, gym, cycle, study)</li>
<li>✨ No ads, faster processing</li>
</ul>
{plan === "pro" && (
<p style={{ color: "green" }}>
✅ You have Pro access. Enjoy premium powers!
</p>
)}
{plan === "free" && (
<button
style={{
marginTop: "10px",
padding: "10px 20px",
background: "purple",
color: "white",
border: "none",
cursor: "pointer",
}}
onClick={() => alert("Upgrade to Elite for unlimited power!")}
>
Upgrade to Elite 👑
</button>
)}
</section>

{/* Elite Features */}
<section style={{ marginTop: "40px" }}>
<h2>👑 Elite Plan</h2>
<ul>
<li>🔥 Everything in Pro</li>
<li>🔥 <b>Unlimited</b> video/image generation</li>
<li>🔥 Custom branding (add your logo to videos)</li>
<li>🔥 Priority AI queue (faster completion)</li>
<li>🔥 Advanced Robo fun (Michael Jackson dance, mini-games)</li>
<li>🔥 VIP Badge on profile</li>
</ul>
{plan === "elite" && (
<p style={{ color: "gold" }}>
👑 Welcome Elite user! You own the full platform.
</p>
)}
</section>

{/* Robo Menu */}
<section style={{ marginTop: "60px", textAlign: "center" }}>
<h2>🤖 Robo Fun Zone</h2>
<p>Pick an action for Robo:</p>
<div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
{["jump", "wave", "dance", "sleep", "fly", "gym", "study", "cycle"].map(
(action) => (
<button
key={action}
style={{
padding: "10px",
borderRadius: "5px",
border: "1px solid #333",
cursor: "pointer",
}}
onClick={() => alert(`🤖 Robo will now ${action}!`)}
>
{action}
</button>
)
)}
</div>
</section>
</main>
);
}
