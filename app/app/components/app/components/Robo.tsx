
"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import "./../robo.css";

// Connect Supabase
const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const actions = [
"jump", "wave", "dance", "sleep", "fly", "gym", "study",
"cycle", "moonwalk", "spin", "stretch", "yoga", "salute",
"dab", "shuffle", "robotWalk"
];

export default function Robo() {
const [currentAction, setCurrentAction] = useState("");
const [menuOpen, setMenuOpen] = useState(false);
const [visible, setVisible] = useState(true);

// Save action to Supabase
async function logAction(action: string) {
const { data: { user } } = await supabase.auth.getUser();
await supabase.from("robot_actions_log").insert([
{
user_id: user?.id || null,
action_name: action,
},
]);
}

// Random idle action every 20s
useEffect(() => {
const interval = setInterval(() => {
const random = actions[Math.floor(Math.random() * actions.length)];
setCurrentAction(random);
logAction(random); // track random action too
setTimeout(() => setCurrentAction(""), 5000);
}, 20000);

return () => clearInterval(interval);
}, []);

if (!visible) {
return (
<button className="robo-toggle" onClick={() => setVisible(true)}>
🤖 Show Robo
</button>
);
}

return (
<div className="robo-container">
{/* The Robo */}
<div
className={`robo ${currentAction}`}
onClick={() => setMenuOpen(!menuOpen)}
>
🤖
</div>

{/* Menu */}
{menuOpen && (
<div className="robo-menu">
{actions.map((action) => (
<button
key={action}
className="robo-menu-item"
onClick={() => {
setCurrentAction(action);
logAction(action); // track user action
setTimeout(() => setCurrentAction(""), 5000);
}}
>
{action}
</button>
))}

{/* Hide option */}
<button
className="robo-menu-item hide"
onClick={() => setVisible(false)}
>
Hide Robo
</button>
</div>
)}
</div>
);
}
