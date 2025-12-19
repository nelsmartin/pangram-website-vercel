import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { content, time, name, prefix, zConnector } = await req.json();

  if (!content || time == null) {
  return new Response("Missing content or time", { status: 400 });
  }
  console.log(time)
  const autogram = await prisma.autogram.create({
    data: {
      content,
      time: time,
      name: name,
      prefix: prefix,
      zConnector: zConnector
    },
  });

  return Response.json(autogram);
}
