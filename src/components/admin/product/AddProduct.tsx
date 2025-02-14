"use client";

import { createProduct } from "@/src/actions/create-product-action";
import { ProductSchema } from "@/src/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const AddProduct = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

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
      await createProduct(result.data);

      toast.success("Producto creado con exito");
      setTimeout(() => {
        router.push("/admin/products");
      }, 800);
    }
  };

  return (
    <section className="max-w-7xl mx-auto w-11/12 lg:w-full mt-12">
      <form
        action={handleSubmit}
        className="bg-white p-4 rounded-md shadow-md max-w-lg mx-auto space-y-3"
      >
        <legend className="text-gray-600 font-semibold text-center">
          Registrar nuevo producto
        </legend>
        {children}
        <input
          type="submit"
          value={"Registrar Producto"}
          className="text-sm py-2 px-3 block w-full cursor-pointer bg-indigo-500 rounded shadow font-semibold text-white hover:bg-indigo-400"
        />
      </form>
    </section>
  );
};
