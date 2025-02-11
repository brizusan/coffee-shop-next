import { prisma } from "@/src/lib/prisma"
import { Category } from "@prisma/client"
import { CategoryIcon } from "../category/CategoryIcon"
import { Logotipo } from "../ui/logo/Logotipo"

async function getCategories() {
  return await prisma.category.findMany()
}

export const OrderSidebar = async () => {
  const categories = await getCategories() as Category[]
  return (
    <aside className="md:w-72 md:h-screen bg-white py-4">
      <Logotipo />
      <p className="text-sm text-center font-semibold font-mono text-slate-500 mt-2">Selecciona dentro de las categorias disponibles</p>
      <nav className="mt-8">
        {
          categories.map((category) => (
            <CategoryIcon 
              key={category.id}
              {...category}
            />
          ))
        }
      </nav>
    </aside>
  )
}
