
// app/marketplace/page.tsx
export default function MarketplacePage() {
return (
<main style={{ padding: "40px" }}>
<h1>Marketplace 🛒</h1>
<p>Buy & sell templates, projects, and AI scripts here.</p>
<div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
<div style={{ padding: "20px", border: "1px solid #444", borderRadius: "8px" }}>
<h3>🎬 Video Template</h3>
<p>Price: $5</p>
</div>
<div style={{ padding: "20px", border: "1px solid #444", borderRadius: "8px" }}>
<h3>🖼️ Image Generator Preset</h3>
<p>Price: $3</p>
</div>
</div>
</main>
);
}
