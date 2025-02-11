
import { OrderCard, Title } from "@/src/components";
import { prisma } from "@/src/lib/prisma";

async function getOrders() {
  return await prisma.order.findMany({
    where: {
      status: false,
    },
    orderBy: {
      date: "desc",
    },
    include: {
      OrderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
}

export default async function OrdersPage() {
  const orders = await getOrders();
  const isEmpty = orders.length === 0;

  return (
    <>
      <Title>Administracion de Ordenes</Title>
      <p className="text-sm text-center font-semibold font-mono text-slate-500 ">
        Aqui podras ver todas las ordenes realizadas
      </p>

      {isEmpty && (
        <p className="text-center text-lg font-semibold text-red-400 pt-8">
          No tenemos ordenes pendientes
        </p>
      )}

      <section className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-6 my-12 w-11/12 mx-auto lg:w-5/6">
        {
          orders.map((order) => (
            <OrderCard 
              key={order.id}
              order={order}
            />
          ))
        }
      </section>
    </>
  );
}
