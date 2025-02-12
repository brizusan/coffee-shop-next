"use client"
import { SearchSchema } from "@/src/types";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export const SearchProducts = () => {

  const handleSearchForm =  (formData:FormData)=> {
    const data = {
      search: formData.get('search')
    }
    const result = SearchSchema.safeParse(data)
    
    if(result.success){
      //reedirectinamiento
      redirect(`/admin/products/search?search=${result.data.search}`)
      
    }else{
      const error = result.error.issues.map((issue)=>issue.message)[0]
      toast.error(error)
    }

  }

  return (
    <form 
      action={handleSearchForm}
      className="flex justify-end items-center gap-2 ">
      <input
        type="text"
        placeholder="cafe , pizza..."
        className="border border-gray-200 pl-4 py-2 rounded-lg"
        name="search"
      />
      <input
        className="bg-indigo-500 hover:bg-indigo-500/70 transition-colors text-white px-4 py-2 rounded-lg cursor-pointer" 
        type="submit" value={'Buscar'} />
    </form>
  );
};
