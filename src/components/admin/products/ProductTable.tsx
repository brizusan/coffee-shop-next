import type { ProductWithCategory } from "@/app/admin/products/page";
import { formatCurrency } from "@/src/utils";
import { DeleteIcon, EditIcon } from "../../ui/icons/Icons";
import Link from "next/link";

type ProducTableProps = {
  products: ProductWithCategory;
};
export const ProductTable = ({ products }: ProducTableProps) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root ">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 ">
            <table className="min-w-full divide-y divide-gray-300 ">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Producto
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Precio
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                  >
                    Categoría
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 ">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 ">
                      {product.name}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 ">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="whitespace-nowrap text-center py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 ">
                      {product.category.nombre}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-0 ">
                      <div className="flex gap-2 justify-center">
                        <Link
                          href={`/admin/products/edit/${product.id}`} 
                          className="text-blue-400 hover:text-blue-600 transition-colors">
                          <EditIcon />
                        </Link>
                        <button className="text-red-400 hover:text-red-600 transition-colors">
                          <DeleteIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
