import { DeliveryCard, Title } from "@/src/components";
import { prisma } from "@/src/lib/prisma";

async function getReadyOrders() {
  return await prisma.order.findMany({
    where: { status: true },
  });
}

export default async function DeliveryPage() {
  const orders = await getReadyOrders();

  const isEmpty = orders.length === 0;

  return (
    <>
      <Title>Despacho de ordenes - Coffee Shop</Title>
      <p className="text-sm text-center font-semibold font-mono text-slate-500 ">
        Entrega de Tickets para recojo de pedidos
      </p>

      {isEmpty && (
        <p className="text-center text-lg font-semibold text-red-400 pt-8">
          No tenemos pedidos para entregar
        </p>
      )}

      <section className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-6 my-6 lg:my-12 w-11/12 mx-auto lg:w-5/6">
        {!isEmpty &&
          orders?.map((order) => <DeliveryCard key={order.id} order={order} />)}
      </section>
    </>
  );
}
