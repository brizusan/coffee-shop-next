import React from "react"

export const Title = ({children} : {children: React.ReactNode}) => {
  return (
    <div className="pt-8 mb-4 ">
      <h2 className="lg:text-center text-2xl font-semibold text-slate-900">{children}</h2>
    </div>
  )
}
