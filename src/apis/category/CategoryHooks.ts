import { useMutation } from "react-query"
import { postCategory } from "./categoryApi"


export const useCreateCategory = ()=>{
return useMutation((data:any)=>postCategory(data))
}