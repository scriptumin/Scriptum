
import "./robo.css";
import Robo from "./app/components/Robo";

export const metadata = {
title: "Scriptum",
description: "Quiet app builder — describe → choose → generate",
};

export default function RootLayout({ children }) {
return (
<html lang="en">
<head />
<body
style={{
margin: 0,
fontFamily: "Inter, system-ui, -apple-system, sans-serif",
}}
>
<div
style={{
minHeight: "100vh",
background: "#0b0c10",
color: "#e5e7eb",
}}
>
<div
style={{
maxWidth: "1180px",
margin: "0 auto",
padding: "28px 18px",
}}
>
{/* Header */}
<header
style={{
display: "flex",
alignItems: "center",
justifyContent: "space-between",
}}
>
<div
style={{
display: "flex",
alignItems: "center",
gap: "10px",
}}
>
<div
style={{
width: 12,
height: 12,
borderRadius: "999px",
background: "#a3e635",
}}
/>
<strong style={{ letterSpacing: 1.3 }}>Scriptum</strong>
<span style={{ opacity: 0.6, fontSize: 13 }}>
quiet app builder
</span>
</div>
<a
href="https://scriptum.in"
style={{
opacity: 0.6,
fontSize: 12,
textDecoration: "none",
color: "inherit",
}}
>
scriptum.in
</a>
</header>

{/* Main page content */}
{children}
</div>
</div>

{/* 👇 Robo is here, always visible on every page */}
<Robo />
</body>
</html>
);
}

