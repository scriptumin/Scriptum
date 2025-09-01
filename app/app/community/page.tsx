
// app/community/page.tsx
export default function CommunityPage() {
return (
<main style={{ padding: "40px" }}>
<h1>Community 👥</h1>
<p>Welcome to the Scriptum community! Share your apps, tips, and feedback here.</p>

<div style={{ marginTop: "20px", display: "grid", gap: "20px" }}>
<div style={{ padding: "20px", border: "1px solid #444", borderRadius: "8px" }}>
<h3>🌟 User 1</h3>
<p>"Just built my first app with Scriptum! Super easy."</p>
</div>

<div style={{ padding: "20px", border: "1px solid #444", borderRadius: "8px" }}>
<h3>🌟 User 2</h3>
<p>"Loving the marketplace feature. Sold my first template!"</p>
</div>
</div>
</main>
);
}
