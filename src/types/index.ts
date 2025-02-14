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

export const ProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "El Nombre del Producto no puede ir vacio" }),
  price: z
    .string()
    .trim()
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, { message: "Precio no válido" })
    .or(z.number().min(1, { message: "Precio no válido" })),
  categoryId: z
    .string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: "La Categoría es Obligatoria" })
    .or(z.number().min(1, { message: "La Categoría es Obligatoria" })),
  image:z.string().min(1 ,{message:'La Imagen es Obligatoria'} )
});

export type Order = z.infer<typeof OrderSchema>;
export type CreateProduct = z.infer<typeof ProductSchema>;
