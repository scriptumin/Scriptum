
"use client";
import { useEffect, useState } from "react";

export default function Robot() {
const [jump, setJump] = useState(false);
useEffect(() => {
const id = setInterval(()=> setJump(j=>!j), 2500);
return () => clearInterval(id);
}, []);
const wobble = { transform:`translateY(${jump?-6:0}px) rotate(${jump?3:-3}deg)`, transition:"transform .5s ease" };
return (
<div title="boop!" onClick={()=>setJump(true)} style={{cursor:"pointer"}}>
<svg width="32" height="32" viewBox="0 0 32 32" style={wobble}>
<rect x="6" y="9" width="20" height="14" rx="4" fill="#94a3b8"/>
<circle cx="13" cy="16" r="3" fill="#0b0c10"/>
<circle cx="19" cy="16" r="3" fill="#0b0c10"/>
<rect x="10" y="23" width="12" height="3" rx="1.5" fill="#6ee7b7"/>
<rect x="14.5" y="5" width="3" height="4" rx="1.5" fill="#94a3b8"/>
<circle cx="16" cy="4" r="2" fill="#6ee7b7" />
</svg>
</div>
);
}
