import { Product } from "@prisma/client";
import Image from "next/image";
import { formatCurrency } from "@/src/utils";
import { ButtonOrder } from "../ui/add-order/ButtonOrder";

type ProducItemProps = {
  product: Product;
};
export const ProducItem = ({ product }: ProducItemProps) => {
  const isUrl = product.image.includes("cloudinary")
    ? product.image
    : `/products/${product.image}.jpg`;

  return (
    <>
      <div className="relative flex w-80 space-y-4 flex-col rounded-xl bg-orange-100 bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 mt-4 h-96  overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
          <Image
            fill
            alt={`imagen de producto ${product.name}`}
            src={isUrl}
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className=" text-center font-sans">
          <p className="block text-base font-semibold  leading-relaxed text-blue-gray-900 antialiased">
            {product.name}
          </p>
          <p className="block  text-xl font-medium leading-relaxed text-blue-gray-900 antialiased">
            {formatCurrency(product.price)}
          </p>
        </div>
        <ButtonOrder product={product} />
      </div>
    </>
  );
};
