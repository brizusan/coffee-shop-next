"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../lib/prisma"
import { ProductSchema , type CreateProduct } from "../types"

export async function createProduct(data:CreateProduct) {

  const result = ProductSchema.safeParse(data)
  
  if(result.success){
    await prisma.product.create({
      data: result.data
    })

    revalidatePath('/admin/products')
  }else{
    return result.error.issues
  }

 
}
