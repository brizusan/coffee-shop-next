import { PrismaClient } from "@prisma/client";
import { products as productsDB } from "../data/products";
import { categories as categoriesDB } from "../data/categories";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.category.createMany({
      data: categoriesDB,
    });

    await prisma.product.createMany({
      data: productsDB,
    });
  } catch (error) {}
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
