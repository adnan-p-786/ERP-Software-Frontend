import { useMutation } from "react-query"
import { deleteExpenseType, getExpenseType, postExpenseType, putExpenseType } from "./expenseTypeApi"

export const useGetExpenseType = ()=>{
    return useMutation(()=> getExpenseType())
}

export const useCreateExpenseType = () => {
    return useMutation((data: any) => postExpenseType(data))
}

export const useUpdateExpenseType = () => {
    return useMutation((data: any) => putExpenseType(data))
}

export const useDeleteExpenseType = () => {
    return useMutation((data: any) => deleteExpenseType(data))
}