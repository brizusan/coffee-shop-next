import {  AddProduct, Title } from "@/src/components";
import { ProductForm } from "@/src/components/admin/product/ProductForm";

export default async function CreateProduct() {

  return (
    <>
      <Title>Registro de Productos</Title>
      <p className="text-sm text-center font-semibold font-mono text-slate-500 ">
        Formulario de ingreso de datos referente a los productos
      </p>
      <AddProduct>
        <ProductForm />
      </AddProduct>
    </>
  );
}
