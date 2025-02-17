"use client";

import { createProduct } from "@/src/actions/create-product-action";
import { ProductSchema } from "@/src/types";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { GoBack } from "../ui/GoBack";
import { updateProduct } from "@/src/actions/update-product-action";

export const EditProductForm = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const params = useParams()
  const { id } = params
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };

    const result = ProductSchema.safeParse(data);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => issue.message);
      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      }
    } else {
      await updateProduct(result.data , +id!);

      toast.success("Registro actualizado");
      setTimeout(() => {
        router.push("/admin/products");
      }, 800);
    }
  };

  return (
    <section className="max-w-7xl mx-auto w-11/12 lg:w-full mt-12">
      <div className="mb-8">
        <GoBack />
      </div>
      <form
        action={handleSubmit}
        className="bg-white p-4 rounded-md shadow-md max-w-lg mx-auto space-y-3"
      >
        <legend className="text-gray-600 font-semibold text-center">
          Actualizar Registro de Producto
        </legend>
        {children}
        <input
          type="submit"
          className="text-sm py-2 px-3 block w-full cursor-pointer bg-indigo-500 rounded shadow font-semibold text-white hover:bg-indigo-400"
          value="Actualizar Producto" 
        />
      </form>
    </section>
  );
};
