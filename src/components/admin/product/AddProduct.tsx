"use client"

export const AddProduct = ({children}:{children:React.ReactNode}) => {
  return (
    <section className="max-w-7xl mx-auto w-11/12 lg:w-full mt-12">
      <form className="bg-white p-4 rounded-md shadow-md max-w-lg mx-auto space-y-3">
        <legend className="text-gray-600 font-semibold text-center">
          Registrar nuevo producto
        </legend>
        {children}
        <input
          type="submit"
          value={"Registrar Producto"}
          className="text-sm py-2 px-3 block w-full bg-indigo-500 rounded shadow font-semibold text-white hover:bg-indigo-400"
        />
      </form>
    </section>
  );
};
