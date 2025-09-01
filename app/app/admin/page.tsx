
// app/admin/page.tsx
export default function AdminPage() {
return (
<main style={{ padding: "40px" }}>
<h1>Admin Dashboard 🛠</h1>
<p>Here you can manage users, payments, and projects.</p>

<div style={{ marginTop: "20px", display: "grid", gap: "20px" }}>
<div style={{ padding: "20px", border: "1px solid #444", borderRadius: "8px" }}>
<h3>👥 Total Users</h3>
<p>123 (example)</p>
</div>

<div style={{ padding: "20px", border: "1px solid #444", borderRadius: "8px" }}>
<h3>📦 Total Projects</h3>
<p>56 (example)</p>
</div>

<div style={{ padding: "20px", border: "1px solid #444", borderRadius: "8px" }}>
<h3>💰 Total Payments</h3>
<p>$999 (example)</p>
</div>
</div>
</main>
);
}
