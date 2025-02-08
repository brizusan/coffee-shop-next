import { ProducItem } from "@/src/components";
import { prisma } from "@/src/lib/prisma";
import { Category, Product } from "@prisma/client";

async function getProductsByCategory(category: Category["slug"]) {
  // forma simple de hacerlo
  // const categoria = await prisma.category.findMany({ where: { slug: category } })
  // const products = await prisma.product.findMany({ where: { categoryId: categoria[0].id } })

  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });

  return products;
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ category: Category["slug"] }>;
}) {
  const { category } = await params;
  const products = (await getProductsByCategory(category)) as Product[];

  const isEmpty = products.length === 0;

  return (
    <section>
      <h2 className="subtitle">Productos de la categoria {category}</h2>
      <p className="text-sm text-center font-semibold font-mono text-slate-500 mt-2">Elige y personaliza tu pedido de la mejor manera</p>

      {isEmpty && (
        <p className="text-center text-lg font-semibold text-red-400 pt-8">
          No hay productos en esta categoria
        </p>
      )}
      <section className="grid justify-items-center grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3 2xl:w-5/6 my-8  mx-auto">
        {!isEmpty &&
          products.map((product) => (
            <ProducItem key={product.id} product={product} />
          ))}
      </section>
    </section>
  );
}
