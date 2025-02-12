import { ProductTable, SearchProducts, Title } from "@/src/components";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getProductsBySearch(search: string) {
  return await prisma.product.findMany({
    where: {
      name: {
        // filtros de prisma
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    }
  });
}

const NoResults=()=> {
  return (
    <>
      <Title>Resultado de la busqueda en productos</Title>

      <p className="text-sm text-center font-semibold font-mono text-slate-500 ">
        No encontramos concidencias en tu busqueda
      </p>

      <div className="mt-4 flex justify-center">
        <Link
          className="text-sm py-1 px-3  bg-indigo-500 rounded shadow font-semibold text-white hover:bg-indigo-400" 
          href="/admin/products">Ver todos los productos</Link>
      </div>

    </>
  );
}
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { search } = await searchParams;
  if (search === undefined) redirect("/admin/products");
  if (Array.isArray(search)) redirect("/admin/products");
  const products = await getProductsBySearch(search);

  if (products.length === 0) return <NoResults />;

  return (
    <>
      <Title>Resultado de la busqueda en productos</Title>
      <p className="text-sm text-center font-semibold font-mono text-slate-500 ">
        a continuacion se mostraran todas las coincidencias en tu busqueda :{" "}
        <span className="text-sm py-1 px-3 bg-white rounded shadow font-bold text-slate-900">
          {search}
        </span>
      </p>
      <section className="max-w-7xl mx-auto w-11/12 lg:w-full mt-8">
        <SearchProducts />
      </section>
      <section className="max-w-7xl mx-auto w-11/12 lg:w-full mt-12 ">
        <ProductTable 
          products={products}
        />
      </section>
    </>
  );
}
