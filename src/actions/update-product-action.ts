import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";
import { CreateProduct } from "../types";

export async function updateProduct(data:CreateProduct , id: number) {

  try {
    await prisma.product.update({
      where: {
        id
      },
      data
    })


    revalidatePath('/admin/products')

  } catch (error) {
    console.log(error)
  }

}