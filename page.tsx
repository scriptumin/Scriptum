
export default function HomePage() {
return (
<main style={{ padding: "40px", textAlign: "center" }}>
<h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
Welcome to Scriptum 🚀
</h1>
<p style={{ fontSize: "1.2rem", opacity: 0.8 }}>
Paste your script → pick a platform → generate a video or image.
</p>
<div style={{ marginTop: "40px" }}>
<button
style={{
padding: "12px 20px",
background: "#2563eb",
color: "white",
border: "none",
borderRadius: "6px",
fontSize: "1rem",
cursor: "pointer",
}}
>
Start Creating
</button>
</div>
</main>
);
}
