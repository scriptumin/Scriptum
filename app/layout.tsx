
import "./robo.css";
import Robo from "./app/components/Robo";

export const metadata = {
title: "Scriptum",
description: "Quiet app builder – describe → choose → generate",
};

export default function RootLayout({ children }) {
return (
<html lang="en">
<body
style={{
margin: 0,
fontFamily: "Inter, system-ui, -apple-system, sans-serif",
background: "linear-gradient(135deg, #0b0c10, #1f2833)",
color: "#e5e7eb",
minHeight: "100vh",
}}
>
<header
style={{
display: "flex",
alignItems: "center",
justifyContent: "center",
gap: "10px",
padding: "20px",
background: "#1f2833",
}}
>
<div
style={{
width: 12,
height: 12,
borderRadius: "999px",
background: "#45a29e",
}}
/>
<strong style={{ letterSpacing: 1.5, fontSize: "1.2rem" }}>
Scriptum
</strong>
<span style={{ opacity: 0.6, fontSize: "0.9rem" }}>
quiet app builder
</span>
</header>

<main style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 18px" }}>
{children}
</main>

{/* 👇 Robo will show up on every page */}
<Robo />
</body>
</html>
);
}
