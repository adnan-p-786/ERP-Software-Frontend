import { useMutation } from "react-query"
import { deleteExpense, postExpense, putExpense } from "./expenseApi"


export const useCreateExpense = () => {
    return useMutation((data: any) => postExpense(data))
}

export const useUpdateExpense = () => {
    return useMutation((data: any) => putExpense(data))
}

export const useDeleteExpense = () => {
    return useMutation((data: any) => deleteExpense(data))
}