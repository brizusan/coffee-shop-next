import { prisma } from "@/src/lib/prisma";
import { ProductImage } from "./ProductImage";
import { Product } from "@prisma/client";


type ProductFormProps = {
  product?: Product
};

async function getCategories() {
  return await prisma.category.findMany();
}


export const ProductForm = async({product}:ProductFormProps) => {

  const categories = await getCategories();
  return (
    <>
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="name">
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          defaultValue={product?.name}
          className="block w-full p-3 bg-slate-100"
          placeholder="Nombre Producto"
        />
      </div>

      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          name="price"
          defaultValue={product?.price}
          className="block w-full p-3 bg-slate-100"
          placeholder="Precio Producto"
        />
      </div>

      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="categoryId">
          Categoría:
        </label>
        <select
          className="block w-full p-3 bg-slate-100"
          id="categoryId"
          name="categoryId"
          defaultValue={product?.categoryId}
        >
          <option value="">-- Seleccione --</option>
          {
            categories.map((category)=>(
              <option
                key={category.id}
                value={category.id}
              >{category.nombre}</option>
            ))
          }
        </select>
      </div>

      <ProductImage 
        image={product?.image}
      />
    </>
  );
};
