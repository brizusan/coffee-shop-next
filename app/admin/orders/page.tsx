"use client";
import { OrderCard, Title } from "@/src/components";
import type { OrderWithProducts } from "@/src/types";
import useSwr from "swr";

const getOrders = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/api`;
  const res = await fetch(url);
  const orders = await res.json();
  return orders;
};

export default function OrdersPage() {
  const { data: orders, isLoading } = useSwr<OrderWithProducts[]>(
    "orders",
    getOrders,
    {
      refreshInterval: 1000 * 60, // intervalo de consulta 1 min
      revalidateOnFocus: false, // no refrescar en el foco
    }
  );
  if (isLoading) return <div>Loading...</div>;
  const isEmpty = orders?.length === 0;

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

      <section className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-6 my-6 lg:my-12 w-11/12 mx-auto lg:w-5/6">
        {!isEmpty &&
          orders?.map((order) => <OrderCard key={order.id} order={order} />)}
      </section>
    </>
  );
}
