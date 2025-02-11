import Image from "next/image"

export const Logotipo = () => {
  return (
    <div className="flex justify-center mt-4">
      <div className="relative w-32 h-32">
        <Image 
          fill
          src={"/logo.svg"}
          alt="logo de la tienda"
          priority
        />
      </div>
    </div>
  )
}
