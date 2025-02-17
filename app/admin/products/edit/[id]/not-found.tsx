import { Title } from "@/src/components";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Title>Administracion de Productos - No encontrado </Title>
      <p className="text-sm text-center font-semibold font-mono text-slate-500 ">
        No encontramos el producto que estas buscando
      </p>

      <div className="flex justify-center pt-8">
        <Link 
          href={"/admin/products"}
          className="text-sm py-2 px-6 bg-indigo-500 rounded shadow font-semibold text-white hover:bg-indigo-400"
        >Ir a Productos</Link>

      </div>
    </>
  );
}
