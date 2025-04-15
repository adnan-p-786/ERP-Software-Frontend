import { useMutation } from "react-query"
import { createSubCategory, getSubCategory } from "./subCategoryApi"


export const useCreateSubCategory = ()=>{
return useMutation((data:any)=>createSubCategory(data))
}

export const usegetSubCategory = () => {
    return useMutation(() => getSubCategory())
}
