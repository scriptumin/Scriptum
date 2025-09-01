
export const metadata = {
title: "Scriptum",
description: "Quiet app builder — describe → choose → generate",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<head />
<body style={{margin:0,fontFamily:"Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica"}}>
<div style={{minHeight:"100vh", background:"#0b0c10", color:"#e5e7eb"}}>
<div style={{maxWidth:1180, margin:"0 auto", padding:"28px 18px"}}>
<header style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<div style={{width:12,height:12,borderRadius:999,background:"#a3e635"}} />
<strong style={{letterSpacing:.3}}>Scriptum</strong>
<span style={{opacity:.6,fontSize:13}}>quiet app builder</span>
</div>
<a href="https://scriptum.in" style={{opacity:.6,fontSize:12,textDecoration:"none",color:"inherit"}}>© Scriptum</a>
</header>
{children}
</div>
</div>
</body>
</html>
);
}
