
"use client";

import { useState, useEffect } from "react";
import "./robo.css";

export default function HomePage() {
const [action, setAction] = useState("idle");
const [speech, setSpeech] = useState("Hi! I'm Robo 🤖");
const [visible, setVisible] = useState(true);

const allActions = [
"idle",
"jump",
"wave",
"dance",
"sleep",
"fly",
"gym",
"study",
"cycle",
"spin",
"moonwalk",
"rocket",
];

const speeches: Record<string, string[]> = {
idle: ["😎 Just chilling...", "Tap a button to make me move!", "I'm bored... pick something!"],
jump: ["Boing! Boing! 🦘", "Look how high I can jump!", "Weeeeee!"],
wave: ["Hey there 👋", "Yoohoo!", "Over here!"],
dance: ["💃 Disco time!", "Shake it baby!", "Do the robo dance!"],
sleep: ["😴 Zzz...", "Wake me up later...", "Dreaming of apps..."],
fly: ["Whoosh! 🛩️", "I'm flying high!", "Catch me if you can!"],
gym: ["💪 Gains time!", "One... two... lift!", "Strong robo mode!"],
study: ["📖 Studying hard...", "Knowledge = power!", "Beep bop, learning stuff!"],
cycle: ["🚴 Pedal to the metal!", "Tour de Scriptum!", "Wheeee!"],
spin: ["Spinning round 🎡", "I feel dizzy!", "Whoooa!"],
moonwalk: ["Hee-hee! 🕺", "Doing the MJ!", "Moonwalking smooth..."],
rocket: ["🚀 Blast off!", "See ya in space!", "BOOOOM!"],
};

// Random idle actions & speeches
useEffect(() => {
const interval = setInterval(() => {
if (action === "idle" && visible) {
const randomAction = allActions[Math.floor(Math.random() * allActions.length)];
setAction(randomAction);
setSpeech(speeches[randomAction][Math.floor(Math.random() * speeches[randomAction].length)]);
setTimeout(() => {
setAction("idle");
setSpeech("Back to chill mode 😎");
}, 4000);
}
}, 10000);

return () => clearInterval(interval);
}, [action, visible]);

if (!visible) {
return (
<main style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #141e30, #243b55)", color: "white" }}>
<button
style={{
padding: "10px 20px",
borderRadius: "8px",
background: "#7a77e8",
color: "white",
border: "none",
cursor: "pointer",
}}
onClick={() => setVisible(true)}
>
Show Robo 🤖
</button>
</main>
);
}

return (
<main
style={{
minHeight: "100vh",
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "center",
background: "linear-gradient(135deg, #141e30, #243b55)",
color: "white",
fontFamily: "Arial, sans-serif",
textAlign: "center",
padding: "20px",
}}
>
<h1>🚀 Welcome to Scriptum</h1>
<p>Create scripts → generate videos & images → and chill with Robo!</p>

{/* Robo + Speech */}
<div className="robo-container">
<div className={`robo ${action}`}>🤖</div>
<div className="speech-bubble">{speech}</div>
</div>

{/* Action menu */}
<div className="robo-menu">
<h3>🎮 Control Robo</h3>
{allActions.filter((a) => a !== "idle").map((a) => (
<button
key={a}
onClick={() => {
setAction(a);
setSpeech(speeches[a][Math.floor(Math.random() * speeches[a].length)]);
setTimeout(() => {
setAction("idle");
setSpeech("Back to chill mode 😎");
}, 4000);
}}
>
{a}
</button>
))}
<button className="hide-btn" onClick={() => setVisible(false)}>Hide Robo ❌</button>
</div>
</main>
);
}

