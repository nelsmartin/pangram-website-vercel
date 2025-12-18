import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    autograms: {
      create: [
        {
          content: "Alice's First Pangram",
        },
        {
          content: "Alice's Second Pangram",
        },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    autograms: {
      create: [
        {
          content: "Bob's first pangram",
        },
      ],
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();