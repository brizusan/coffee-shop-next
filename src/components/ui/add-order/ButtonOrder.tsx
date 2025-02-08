"use client";
import { useStoreOrders } from "@/src/stores/store";
import { Product } from "@prisma/client";


type ButtonOrderProps = {
  product: Product
};

export const ButtonOrder = ({product}: ButtonOrderProps) => {

  const addOrder = useStoreOrders((state) => state.addOrder)
  
  return (
    <div className=" pt-0">
      <button
        onClick={() => addOrder(product)}
        className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        Agregar a Pedido
      </button>
    </div>
  );
};
