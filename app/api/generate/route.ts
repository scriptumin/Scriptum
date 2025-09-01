
// app/api/generate/route.ts
export async function POST(req: Request) {
try {
const { prompt, type } = await req.json();

if (!prompt) {
return new Response(
JSON.stringify({ error: "Prompt is required" }),
{ status: 400 }
);
}

// For now, just fake it — later we’ll plug in Replicate/OpenAI
const fakeOutput =
type === "video"
? "https://placehold.co/600x400.mp4?text=Demo+Video"
: "https://placehold.co/600x400.png?text=Demo+Image";

return new Response(
JSON.stringify({ ok: true, output: fakeOutput }),
{ headers: { "Content-Type": "application/json" } }
);
} catch (err: any) {
return new Response(
JSON.stringify({ error: err.message }),
{ status: 500 }
);
}
}
