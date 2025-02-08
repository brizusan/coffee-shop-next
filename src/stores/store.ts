import { create } from "zustand";
import { OrderItem } from "../types";
import { Product } from "@prisma/client";
import { persist } from "zustand/middleware";

interface Store {
  orders: OrderItem[];
  addOrder: (product: Product) => void;
}

export const useStoreOrders = create<Store>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (product: Product) => {
        const { categoryId, image, ...data } = product;
        const newItem: OrderItem = {
          ...data,
          quantity: 1,
          subtotal: product.price,
        };

        console.log(newItem);

        set((state) => ({
          orders: [...state.orders, newItem],
        }));
      },
    }),
    {
      name: "order-storage",
    }
  )
);
