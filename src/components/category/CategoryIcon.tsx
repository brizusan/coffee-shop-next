"use client";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type CategoryIconProps = {
  id: Category["id"];
  slug: Category["slug"];
  nombre: Category["nombre"];
};

export const CategoryIcon = ({ id, slug, nombre }: CategoryIconProps) => {
  const pathname = usePathname();

  const isPathname = pathname === `/order/${slug}`;

  return (
    <div className=" border-t border-gray-200 last-of-type:border-b ">
      <Link
        className={`${
          isPathname ? "bg-orange-200" : ""
        } flex items-center gap-4 p-4`}
        href={`/order/${slug}`}
      >
        <div className="w-20 h-20 relative">
          <Image
            fill
            src={`/icon_${slug}.svg`}
            alt={`imagen de categoria ${nombre}`}
          />
        </div>
        <p className={`${isPathname ? "text-slate-950" : "text-slate-700"} text-lg font-semibold `}>{nombre}</p>
      </Link>
    </div>
  );
};
