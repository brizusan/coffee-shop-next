import { Title } from "@/src/components";
import { prisma } from "@/src/lib/prisma";

async function getOrder(){
  return await prisma.product.findMany()
}

export default async function ProductsPage() {
  const products = await getOrder()
  const isEmpty = products.length === 0
  return (
    <>
      <Title>Administracion de Productos</Title>
      <p className="text-sm text-center font-semibold font-mono text-slate-500 ">
        Registros y vizualización de los productos que tenemos en la cafeteria
      </p>

      {
        isEmpty && (
          <p className="text-center text-lg font-semibold text-red-400 pt-8">
            No hay productos registrados
          </p>
        )
      }
      <section className="max-w-7xl mx-auto w-11/12 lg:w-full mt-12">
        listado de productos
      </section>
    </>
  );
}
