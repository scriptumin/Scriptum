
// app/community/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function CommunityPage() {
const [posts, setPosts] = useState([
{ id: 1, user: "User A", content: "🎥 Made a cool AI video!" },
{ id: 2, user: "User B", content: "🧠 Shared an AI workflow." },
]);

// Later: fetch real posts from Supabase
useEffect(() => {
// TODO: Replace with Supabase fetch
}, []);

return (
<main style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
<h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>🌍 Community</h1>
<p style={{ color: "#666", marginBottom: "20px" }}>
Share your projects, scripts, and ideas with everyone!
</p>

<div style={{ display: "grid", gap: "15px" }}>
{posts.map((post) => (
<div
key={post.id}
style={{
border: "1px solid #ddd",
borderRadius: "8px",
padding: "15px",
background: "white",
}}
>
<h3 style={{ margin: "0 0 5px 0" }}>{post.user}</h3>
<p style={{ margin: 0 }}>{post.content}</p>
</div>
))}
</div>
</main>
);
}

