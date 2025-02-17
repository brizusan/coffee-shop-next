import { EditProductForm, Title } from "@/src/components";
import { ProductForm } from "@/src/components/admin/product/ProductForm";
import { prisma } from "@/src/lib/prisma";
import { Product } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProductById(id: Product["id"]) {
  return await prisma.product.findUnique({ where: { id } });
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: Product["id"] }>;
}) {
  const { id } = await params;
  const product = await getProductById(+id);

  if (!product) return notFound();

  return (
    <>
      <Title>Administracion de Productos - Editar </Title>
      <p className="text-sm text-center font-semibold font-mono text-slate-500 ">
        Actualizacion o edicion de datos referente a los productos
      </p>



      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}
