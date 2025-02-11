import { create } from "zustand";
import { OrderItem } from "../types";
import { Product } from "@prisma/client";
import { persist } from "zustand/middleware";

interface Store {
  orders: OrderItem[];
  addOrder: (product: Product) => void;
  deleteOrder: (id: OrderItem["id"]) => void;
  decreaseQuantity: (id: OrderItem["id"]) => void;
  increaseQuantity: (id: OrderItem["id"]) => void;
  isAdding: (id: OrderItem["id"]) => boolean;
  clearOrder: () => void;
}

export const useStoreOrders = create<Store>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (product: Product) => {
        const { categoryId, image, ...data } = product;
        let order: OrderItem[] = [];

        if (get().isAdding(product.id)) {
          
          order = get().orders.map((item) => {
            if (item.id === product.id && item.quantity <= 5) {
              return {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.subtotal + data.price,
              };
            }
            return item;
          })
        } else {
          order = [
            ...get().orders,
            { ...data, quantity: 1, subtotal: data.price },
          ];
        }

        set(()=>({
          orders: order
        }))
      },
      deleteOrder: (id) => {
        const order = get().orders.filter((item) => item.id !== id);
        set({ orders: order });
      },

      decreaseQuantity: (id) => {
        const order = get().orders.map((item) => {
          if (item.id === id && item.quantity > 1) {
            return {
              ...item,
              quantity: item.quantity - 1,
              subtotal: item.subtotal - item.price,
            };
          }
          return item;
        });
        set({ orders: order });
      },
      increaseQuantity: (id) => {
        const order = get().orders.map((item) => {
          if (item.id === id && item.quantity <= 5) {
            return {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.subtotal + item.price,
            };
          }
          return item;
        });
        set({ orders: order });
      },
      isAdding: (id) => {
        return get().orders.some((item) => item.id === id);
      },
      clearOrder: () => set({ orders: [] }),
    }),
    {
      name: "order-storage",
    }
  )
);
