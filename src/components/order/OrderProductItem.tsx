import { OrderItem } from "@/src/types";
import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";
import {formatCurrency} from "@/src/utils"
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useStoreOrders } from "@/src/stores/store";
import { useMemo } from "react";

type OrderItemProps = {
  item: OrderItem;
};

const MAX_QUANTITY = 6
const MIN_QUANTITY = 1

export const OrderProductItem = ({ item }: OrderItemProps) => {

  const decrease = useStoreOrders((state) => state.decreaseQuantity)
  const increase = useStoreOrders((state) => state.increaseQuantity)
  const deleteOrder = useStoreOrders((state) => state.deleteOrder)

  const disabledMinus = useMemo(()=> item.quantity === MIN_QUANTITY, [item.quantity]) 
  const disabledAdd = useMemo(()=> item.quantity === MAX_QUANTITY, [item.quantity])

  return (
    <div className="shadow space-y-1 p-3 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button type="button" onClick={() => {
            const confirm = window.confirm("Deseas eliminar el producto del pedido?")
            if(!confirm)return
            deleteOrder(item.id)
          }}>
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">{formatCurrency(item.price)}</p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button 
            type="button" 
            onClick={() => {decrease(item.id)}}
            className="disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={disabledMinus}
          >
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          <button type="button" onClick={() => {increase(item.id)}}
              className="disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={disabledAdd}
            >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {""}
          <span className="font-normal">{formatCurrency(item.subtotal)}</span>
        </p>
      </div>
    </div>
  );
};
