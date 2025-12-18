import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { content } = body;

  if (!content) {
    return new Response("Missing content", { status: 400 });
  }

  const autogram = await prisma.autogram.create({
    data: {
      content,
      authorId: 1, 
    },
  });

  return Response.json(autogram);
}
