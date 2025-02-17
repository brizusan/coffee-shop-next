"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"


type AdminRouteProps = {
  url:string,
  text:string,
  blank:boolean
}

export const AdminRoute = ({url , text , blank}: AdminRouteProps) => {

  const pathname = usePathname();
  const isUrl = pathname === url

  return (
    <Link 
      href={url}
      target={blank ? "_blank" : "_self"}
      className={`${isUrl ? "bg-amber-300 border-transparent text-white" : "text-slate-500 hover:text-slate-800"} text-center font-semibold   border-b border-gray-200 py-3 w-full`}
    >
      {text}
    </Link>
  )
}
