"use client"
import { useStoreOrders } from "@/src/stores/store"
import { OrderProductItem } from "./OrderProductItem"

export const OrderSummary = () => {

  const order = useStoreOrders((state)=>state.orders)

  const isEmpty = order.length === 0
  return (
    <aside className="md:w-64 lg:w-96 p-4 lg:h-screen lg:overflow-y-scroll bg-white">
      <h2 className="subtitle">Mis pedidos</h2>
      {isEmpty && (
        <p className="text-center text-lg font-semibold text-red-400 pt-8">
          No tenemos una orden 
        </p>
      )}

      {!isEmpty && (
        <section className="my-8 grid gap-2">
          {
            order.map((item) => (
              <OrderProductItem key={item.id} item={item} />
            ))
          }
        </section>
      ) }
    </aside>
  )
}
