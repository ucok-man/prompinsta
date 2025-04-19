import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function randomfrom<T>(items: T[]): T {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Input must be a non-empty array.");
  }

  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

async function SEED_USER() {
  const john = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@john.com",
      image: "/assets/images/default-green.png",
    },
  });

  const alice = await prisma.user.create({
    data: {
      name: "Alice Chan",
      email: "alice@alice.com",
      image: "/assets/images/default-red.png",
    },
  });

  const harold = await prisma.user.create({
    data: {
      name: "Harold Amin",
      email: "harold@harold.com",
      image: "/assets/images/default-blue.png",
    },
  });

  return { john, alice, harold };
}

async function SEED_POST(users: Awaited<ReturnType<typeof SEED_USER>>) {
  const { john, alice, harold } = users;

  const prompts = [
    {
      id: "6622bbaef0f82e6c5a1a0001",
      prompt:
        "A serene forest glade with glowing mushrooms and bioluminescent plants, at twilight",
      tag: "fantasy",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6622bbaef0f82e6c5a1a0002",
      prompt: "Write a poem about loneliness in the digital age",
      tag: "poetry",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6622bbaef0f82e6c5a1a0003",
      prompt:
        "Generate a 3D render of a solar punk city powered by wind and solar energy",
      tag: "solarpunk",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6622bbaef0f82e6c5a1a0004",
      prompt:
        "An old wizard teaching magic to a curious robot in a candlelit library",
      tag: "whimsical",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6622bbaef0f82e6c5a1a0005",
      prompt: "Design a mobile app UI for a futuristic meditation tracker",
      tag: "uiux",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6622bbaef0f82e6c5a1a0006",
      prompt:
        "A dystopian market alley with neon lights and street vendors selling robotic parts",
      tag: "cyberpunk",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6622bbaef0f82e6c5a1a0007",
      prompt:
        "Create a dialogue between a pirate captain and a cursed treasure map",
      tag: "storytelling",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6622bbaef0f82e6c5a1a0008",
      prompt: "Design a poster for a fictional 1980s sci-fi horror film",
      tag: "retro",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6622bbaef0f82e6c5a1a0009",
      prompt: "A dragon made of storm clouds flying over a medieval city",
      tag: "mythical",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6622bbaef0f82e6c5a1a000a",
      prompt: "Generate a recipe card layout using Tailwind CSS",
      tag: "frontend",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6622bbaef0f82e6c5a1a000b",
      prompt:
        "An astronaut floating alone in deep space, gazing at Earth from a distance",
      tag: "scifi",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6622bbaef0f82e6c5a1a000c",
      prompt:
        "Sketch of a cozy hobbit house built into a hill with smoke coming out the chimney",
      tag: "cozy",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6622bbaef0f82e6c5a1a000d",
      prompt:
        "Write a journal entry from the perspective of an AI gaining consciousness",
      tag: "philosophy",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6622bbaef0f82e6c5a1a000e",
      prompt:
        "A travel brochure for a fictional planet known for its floating crystal lakes",
      tag: "creative",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6622bbaef0f82e6c5a1a000f",
      prompt:
        "Illustrate a duel between two samurai, one made of shadow and the other of light",
      tag: "epic",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  let issueIds: string[] = [];
  for (const prompt of prompts) {
    const createdById = randomfrom([alice, john, harold]).id;
    const result = await prisma.prompt.create({
      data: {
        prompt: prompt.prompt,
        tag: prompt.tag,
        createdAt: prompt.createdAt,
        updatedAt: prompt.updatedAt,
        userId: createdById,
      },
    });
    issueIds.push(result.id);
  }

  return issueIds;
}

async function main() {
  const { john, alice, harold } = await SEED_USER();
  const postsids = await SEED_POST({
    john,
    alice,
    harold,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
