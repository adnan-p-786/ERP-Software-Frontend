import { useMutation } from "react-query"
import { createSubCategory } from "./subCategoryApi"


export const useCreateSubCategory = ()=>{
return useMutation((data:any)=>createSubCategory(data))
}