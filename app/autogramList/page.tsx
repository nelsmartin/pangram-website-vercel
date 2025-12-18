import prisma from "@/lib/prisma";

export default async function AutogramList() {
  const autograms = await prisma.autogram.findMany({
    include: {
      author: true,
    },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Previously Found Pangrams</h1>

      <ul className="space-y-4">
        {autograms.map((autogram) => (
          <li
            key={autogram.id}
            className="rounded-lg border bg-white p-4 shadow-sm"
          >
            <p className="text-gray-900">{autogram.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}



/*
import prisma from "@/lib/prisma";

export default async function Posts() {
  const posts = await prisma.autogram.findMany({
    include: {
      author: true,
    },
  });

  return (
    <div>
      <h1>
        Pangrams
      </h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <span>{post.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
*/
