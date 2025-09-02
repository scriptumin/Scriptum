
"use client";
import { useState, useEffect } from "react";
import "../robo.css";

const actions = [
"jump", "wave", "dance", "sleep", "fly", "gym",
"study", "cycle", "moonwalk", "spin", "stretch",
"yoga", "salute", "dab", "shuffle", "robotWalk"
];

export default function Robo() {
const [currentAction, setCurrentAction] = useState("");
const [menuOpen, setMenuOpen] = useState(false);
const [visible, setVisible] = useState(true);

// Pick a random action sometimes if idle
useEffect(() => {
const interval = setInterval(() => {
if (!menuOpen && Math.random() > 0.7) {
const randomAction = actions[Math.floor(Math.random() * actions.length)];
setCurrentAction(randomAction);
setTimeout(() => setCurrentAction(""), 3000);
}
}, 8000); // every 8 seconds try something silly
return () => clearInterval(interval);
}, [menuOpen]);

if (!visible) {
return (
<button
className="robo-toggle"
onClick={() => setVisible(true)}
>
🤖 Show Robo
</button>
);
}

return (
<div className="robo-container">
<div
className={`robo ${currentAction}`}
onClick={() => setMenuOpen(!menuOpen)}
>
🤖
</div>

{menuOpen && (
<div className="robo-menu">
{actions.map((action) => (
<button
key={action}
className="robo-menu-item"
onClick={() => {
setCurrentAction(action);
setTimeout(() => setCurrentAction(""), 3000); // reset after 3s
}}
>
{action}
</button>
))}
<button
className="robo-menu-item hide"
onClick={() => setVisible(false)}
>
Hide Robo 👋
</button>
</div>
)}
</div>
);
}
