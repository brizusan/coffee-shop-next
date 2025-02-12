import z, { number, string } from "zod";
import { Product } from "@prisma/client";

export type OrderItem = Pick<Product, "id" | "name" | "price"> & {
  quantity: number;
  subtotal: number;
};

export const OrderSchema = z.object({
  name: string().min(1, "El nombre es requerido"),
  total: number().min(1, "Minimo 1 producto"),
  order: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      quantity: z.number(),
      price: z.number(),
      subtotal: z.number(),
    })
  ),
});

export const SearchSchema = z.object({
  search: string().trim().min(3, "Mínimo 3 caracteres"),
});

export type Order = z.infer<typeof OrderSchema>;
