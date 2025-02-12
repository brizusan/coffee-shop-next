import { Pagination, ProductTable, SearchProducts, Title } from "@/src/components";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

async function totalProducts() {
  return await prisma.product.count();
}

async function getProducts(pageInt: number, pageSize: number) {
  const skip = (pageInt - 1) * pageSize;
  return await prisma.product.findMany({
    take: pageSize,
    skip,
    orderBy: {
      category: {
        id: "asc",
      },
    },
    include: {
      category: true,
    },
  });
}

export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page } = await searchParams;
  const pageInt = page ? Number(page) : 1;
  const pageSize = 10;

  const totalProductsData = totalProducts();
  const productsData = getProducts(pageInt, pageSize);
  const [products, countProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);
  const totalPage = Math.ceil(countProducts / pageSize);
  const isEmpty = products.length === 0;

  return (
    <>
      <Title>Administracion de Productos</Title>
      <p className="text-sm text-center font-semibold font-mono text-slate-500 ">
        Registros y vizualización de los productos que tenemos en la cafeteria
      </p>

      {isEmpty && (
        <p className="text-center text-lg font-semibold text-red-400 pt-8">
          No hay productos registrados
        </p>
      )}

      <section className="max-w-7xl mx-auto w-11/12 lg:w-full mt-8 flex flex-col gap-3 md:flex-row justify-between">
        <Link
          href={"/admin/products/new"}
          className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-500 transition-colors text-white capitalize font-semibold"
        >
          crear producto
        </Link>
        <SearchProducts />
      </section>
      <section className="max-w-7xl mx-auto w-11/12 lg:w-full my-6">
        <ProductTable products={products} />
        <Pagination page={pageInt} totalPages={totalPage} />
      </section>
    </>
  );
}
