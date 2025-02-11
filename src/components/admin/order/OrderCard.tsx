"use client"
import { products } from "@/prisma/data/products";
import { formatCurrency } from "@/src/utils";
import { Order } from "@prisma/client";

type OrderCardProps = {
  order: Order & {
    OrderProducts: {
      product: {
        name: string;
        price: number;
      };
      quantity: number;
    }[];
  }
};

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <article
      aria-labelledby="summary-heading"
      className="mt-16 font-mono rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
    >
      <p className="text-xl font-medium  text-gray-900">
        Cliente: <span className="font-serif">{order.name}</span>{" "}
      </p>
      <ul>
        <p className="text-slate-950 flex justify-between pb-2">
          <span className="font-semibold">Producto</span>
          <span className="font-semibold">Cantidad</span>
        </p>
       {
        order.OrderProducts.map((item) => (
          <li
            key={item.product.name}
            className=" py-2 border-t border-gray-200"
          > 
            <p className="flex justify-between">
            <span>{item.product.name}</span>
            <span>{item.quantity}</span>


            </p>
          </li>
        ))
       }
      </ul>
      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">
            Total a Pagar: <span className="bg-amber-500/70 text-white font-semibold p-1">{formatCurrency(order.total)}</span>
          </dt>
          <dd className="text-base font-medium text-gray-900">{}</dd>
        </div>
      </dl>

      <form>
        <input
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-700 transition-colors text-white w-full mt-5 py-2 px-2 uppercase font-semibold cursor-pointer rounded-sm"
          value="Marcar Orden Completada"
        />
      </form>
    </article>
  );
};
