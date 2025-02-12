import { completeOrder } from "@/src/actions/complete-order-action";
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
  };
};

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <article
      aria-labelledby="summary-heading"
      className="mt-16 relative font-mono rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
    >
      <p className="text-xl font-medium  text-gray-900">
        Cliente: <span className="font-serif">{order.name}</span>{" "}
      </p>
      <ul>
        <p className="text-slate-950 flex justify-between pb-2">
          <span className="font-semibold">Producto</span>
          <span className="font-semibold">Cantidad</span>
        </p>
        {order.OrderProducts.map((item) => (
          <li
            key={item.product.name}
            className=" py-2 border-t border-gray-200"
          >
            <p className="flex justify-between">
              <span>{item.product.name}</span>
              <span>{item.quantity}</span>
            </p>
          </li>
        ))}
      </ul>
      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">
            Total a Pagar:{" "}
            <span className="bg-amber-500/70 text-white font-semibold p-1">
              {formatCurrency(order.total)}
            </span>
          </dt>
          <dd className="text-base font-medium text-gray-900">{}</dd>
        </div>
      </dl>

      <form
        action={completeOrder}
        className="flex justify-end absolute right-4 top-2"
      >
        <input type="text" name="order_id" value={order.id} hidden readOnly />

        <button
          type="submit"
          className="w-7 h-7 text-red-500 hover:text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </form>
    </article>
  );
};
