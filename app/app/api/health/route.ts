
// app/api/health/route.ts
export async function GET() {
return new Response(
JSON.stringify({ ok: true, message: "✅ Scriptum API is healthy!" }),
{ headers: { "Content-Type": "application/json" } }
);
}
