
// app/admin/page.tsx
"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
const [users, setUsers] = useState<any[]>([]);
const [payments, setPayments] = useState<any[]>([]);
const [projects, setProjects] = useState<any[]>([]);
const [robotActions, setRobotActions] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
async function fetchData() {
try {
// Fetch users
const resUsers = await fetch("/api/users");
const dataUsers = await resUsers.json();
setUsers(dataUsers || []);

// Fetch payments
const resPayments = await fetch("/api/payments");
const dataPayments = await resPayments.json();
setPayments(dataPayments || []);

// Fetch projects (scripts → video/image)
const resProjects = await fetch("/api/projects");
const dataProjects = await resProjects.json();
setProjects(dataProjects || []);

// Fetch robot actions
const resRobots = await fetch("/api/robot-actions");
const dataRobots = await resRobots.json();
setRobotActions(dataRobots || []);
} catch (err) {
console.error("Error loading admin data:", err);
} finally {
setLoading(false);
}
}
fetchData();
}, []);

if (loading) {
return <main style={{ padding: "40px" }}><h2>Loading Admin Dashboard...</h2></main>;
}

return (
<main style={{ padding: "40px" }}>
<h1>⚙️ Admin Dashboard</h1>
<p>Manage everything: users, payments, projects, and robot fun.</p>

{/* USERS */}
<section style={{ marginTop: "30px" }}>
<h2>👥 Users</h2>
<table border={1} cellPadding={10} style={{ width: "100%", marginTop: "10px" }}>
<thead>
<tr>
<th>Email</th>
<th>Name</th>
<th>Plan</th>
<th>Joined</th>
</tr>
</thead>
<tbody>
{users.map((u, i) => (
<tr key={i}>
<td>{u.email}</td>
<td>{u.name}</td>
<td>{u.subscription_plan}</td>
<td>{u.created_at}</td>
</tr>
))}
</tbody>
</table>
</section>

{/* PAYMENTS */}
<section style={{ marginTop: "30px" }}>
<h2>💳 Payments</h2>
<table border={1} cellPadding={10} style={{ width: "100%", marginTop: "10px" }}>
<thead>
<tr>
<th>User ID</th>
<th>Provider</th>
<th>Amount</th>
<th>Status</th>
<th>Transaction ID</th>
<th>Date</th>
</tr>
</thead>
<tbody>
{payments.map((p, i) => (
<tr key={i}>
<td>{p.user_id}</td>
<td>{p.provider}</td>
<td>{p.amount} {p.currency}</td>
<td>{p.status}</td>
<td>{p.transaction_id}</td>
<td>{p.created_at}</td>
</tr>
))}
</tbody>
</table>
</section>

{/* PROJECTS */}
<section style={{ marginTop: "30px" }}>
<h2>🎬 Projects (Scripts → Video/Image)</h2>
<table border={1} cellPadding={10} style={{ width: "100%", marginTop: "10px" }}>
<thead>
<tr>
<th>Title</th>
<th>Type</th>
<th>Output</th>
<th>Date</th>
</tr>
</thead>
<tbody>
{projects.map((pr, i) => (
<tr key={i}>
<td>{pr.title}</td>
<td>{pr.type}</td>
<td><a href={pr.output_url} target="_blank">{pr.output_url}</a></td>
<td>{pr.created_at}</td>
</tr>
))}
</tbody>
</table>
</section>

{/* ROBOT ACTIONS */}
<section style={{ marginTop: "30px" }}>
<h2>🤖 Robot Actions</h2>
<ul>
{robotActions.map((r, i) => (
<li key={i}><b>{r.action_name}</b> → {r.description}</li>
))}
</ul>
</section>
</main>
);
}

