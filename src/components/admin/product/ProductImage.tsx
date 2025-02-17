"use client";
import { getImagePath } from "@/src/utils";
import { CameraIcon } from "@heroicons/react/24/outline";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

export const ProductImage = ({ image }: { image: string | undefined }) => {
  const [imageURL, setImageURL] = useState("");
  return (
    <CldUploadWidget
      uploadPreset="coffee-shop"
      options={{ maxFiles: 1 }}
      onSuccess={(result, { widget }) => {
        setImageURL("");
        if (result.event === "success") {
          // asignar la url de la imagen al input
          // @ts-ignore
          setImageURL(result.info.secure_url);
          setTimeout(() => {
            widget.close();
          }, 1500);
        } else {
          throw new Error("Error al subir la imagen ");
        }
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2 ">
            <label className="text-slate-800">Imagen de Producto</label>
            <div className="bg-gray-100/80 relative hover:bg-gray-200 transition-colors p-4 text-center rounded-md">
              <button
                onClick={() => open()}
                type="button"
                className="flex flex-col justify-center mx-auto "
              >
                <CameraIcon className="w-20 h-20 mx-auto text-gray-600" />
                <p className="text-lg font-semibold text-slate-500">
                  Agregar una imagen
                </p>
              </button>

              {imageURL && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Image
                    width={200}
                    height={250}
                    className="object-contain"
                    src={imageURL}
                    alt="imagen de producto"
                    priority
                  />
                </div>
              )}
            </div>
            {
              image && !imageURL && (
                <>
                <p className="text-sm text-center font-semibold font-mono text-slate-500 " >
                  Imagen actual
                </p>
                <div
                  className="w-36 h-36 relative mx-auto"
                >
                  <Image 
                    fill
                    priority
                    src={getImagePath(image)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt="imagen de producto"
                  />
                </div>
                </>
              )
            }
            <input type="hidden" name="image" value={imageURL ? imageURL : image} />
          </div>
        </>
      )}
    </CldUploadWidget>
  );
};
