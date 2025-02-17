import { prisma } from "@/src/lib/prisma";

export async function GET() {
  
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: false
      },
      include: {
        OrderProducts: {
          include: {
            product: true
          }
        }
      }
    })
    return Response.json(orders)
  } catch (error) {
    console.log(error)
  }
}