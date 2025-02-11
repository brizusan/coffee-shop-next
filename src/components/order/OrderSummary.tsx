"use client";
import { useMemo, useState } from "react";
import { toast } from 'react-toastify';
import { useStoreOrders } from "@/src/stores/store";
import { OrderProductItem } from "./OrderProductItem";
import { formatCurrency } from "@/src/utils";
import { createOrderAction } from "@/src/actions/create-order-action";
import { OrderSchema } from "@/src/types";

export const OrderSummary = () => {
  const [name, setName] = useState("");
  const order = useStoreOrders((state) => state.orders);
  const clear = useStoreOrders((state) => state.clearOrder);  
  const totalPagar = useMemo(
    () => order.reduce((acc, item) => acc + item.subtotal, 0),
    [order]
  );
  const isEmpty = order.length === 0;

  const isValid = useMemo(()=> name.length > 0,[name])


  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name:formData.get('name'),
      total : totalPagar,
      order
    }
    const result = OrderSchema.safeParse(data)
    if(result.success){
      await createOrderAction(data)
      toast.success("Pedido creado con exito")
      setTimeout(() => clear(), 500)
      return
    }else{
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
    }
  };

  return (
    <aside className="md:w-64 lg:w-96 p-4 lg:h-screen lg:overflow-y-scroll bg-white">
      <h2 className="subtitle">Mis pedidos</h2>
      {isEmpty && (
        <p className="text-center text-lg font-semibold text-red-400 pt-8">
          No tenemos una orden
        </p>
      )}

      {!isEmpty && (
        <>
          <section className="my-8 grid gap-2">
            {order.map((item) => (
              <OrderProductItem key={item.id} item={item} />
            ))}
          </section>
          {totalPagar > 0 && (
            <div>
              <p className="text-2xl text-orange-400 font-bold">
                Total a pagar:{" "}
                <span className="text-slate-800 font-medium">
                  {formatCurrency(totalPagar)}
                </span>
              </p>

              <form
                className="my-4 text-center space-y-3"
                action={handleCreateOrder}
              >
                <input
                  type="text"
                  placeholder="Nombre..."
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered border border-gray-400 rounded-sm w-full py-1 pl-4 "
                />

                <input
                  type="submit"
                  disabled={!isValid}
                  className="bg-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-500 hover:cursor-pointer text-white uppercase font-semibold py-2 w-full rounded"
                  value={"Confirmar pedido"}
                />
              </form>
            </div>
          )}
        </>
      )}
    </aside>
  );
};
