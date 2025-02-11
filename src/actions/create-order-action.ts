"use server"
import { redirect } from "next/navigation"
import { prisma } from "../lib/prisma"
import { OrderSchema } from "../types"

export async function createOrderAction(data:unknown) {

  const result = OrderSchema.safeParse(data)

  if(!result.success){
    return {
      errors:result.error.issues
    }
  }

  try {
    await prisma.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        OrderProducts:{
          create: result.data.order.map((item) => ({
            productId: item.id,
            quantity : item.quantity
          }))
        }
      }
    })
  } catch (error) {
    console.log(error)
  }



}