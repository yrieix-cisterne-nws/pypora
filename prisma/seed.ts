import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
})

const categories = [
  { name: "Python", slug: "python" },
  { name: "API",    slug: "api" },
]

async function main() {
  for (const cat of categories) {
    await prisma.categorie.upsert({
      where:  { name: cat.name },
      update: {},
      create: cat,
    })
  }
  console.log(`✓ ${categories.length} catégories insérées`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
