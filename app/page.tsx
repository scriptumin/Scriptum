// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import "./robo.css"; // custom animations

export default function HomePage() {
const [action, setAction] = useState("idle");
const [showRobo, setShowRobo] = useState(true);

// Random silly actions when idle
useEffect(() => {
if (!showRobo) return;
const interval = setInterval(() => {
const randomActions = ["moonwalk", "sleep", "study", "cycle", "yoga", "spin"];
const random = randomActions[Math.floor(Math.random() * randomActions.length)];
setAction(random);
}, 12000); // every 12s if idle
return () => clearInterval(interval);
}, [showRobo]);

return (
<main
style={{
minHeight: "100vh",
background: "linear-gradient(135deg, #1e3c72, #2a5298)",
color: "white",
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "center",
padding: "40px",
textAlign: "center",
fontFamily: "Inter, sans-serif",
}}
>
<h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
🚀 Welcome to Scriptum
</h1>
<p style={{ fontSize: "1.2rem", opacity: 0.9 }}>
Paste your script → Pick a platform → Generate a video or image.
</p>

{/* Robo Section */}
{showRobo && (
<div style={{ marginTop: "40px" }}>
<div className={`robo ${action}`}></div>
</div>
)}

{/* Controls */}
<div style={{ marginTop: "30px" }}>
<button
style={btn}
onClick={() => setShowRobo((prev) => !prev)}
>
{showRobo ? "🙈 Hide Robo" : "🤖 Show Robo"}
</button>

{showRobo && (
<div style={{ marginTop: "20px" }}>
<h3>🎮 Robo Menu</h3>
<div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
{[
"jump", "dance", "wave", "gym", "study", "cycle",
"moonwalk", "sleep", "fly", "shower", "spin",
"bow", "pushups", "yoga", "rollerskate", "paint", "code"
].map((act) => (
<button key={act} style={btnSmall} onClick={() => setAction(act)}>
{act}
</button>
))}
</div>
</div>
)}
</div>
</main>
);
}

// Button Styles
const btn = {
padding: "12px 24px",
background: "#ff7eb3",
color: "white",
border: "none",
borderRadius: "6px",
fontSize: "1rem",
cursor: "pointer",
};

const btnSmall = {
padding: "8px 14px",
background: "#4facfe",
color: "white",
border: "none",
borderRadius: "6px",
fontSize: "0.9rem",
cursor: "pointer",
};
