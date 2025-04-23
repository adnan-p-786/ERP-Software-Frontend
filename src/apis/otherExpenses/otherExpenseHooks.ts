import { useMutation } from "react-query"
import { deleteOtherExpenses, postOtherExpenses, putOtherExpenses } from "./otherExpenseApi"


export const useCreateOtherExpenses = () => {
    return useMutation((data: any) => postOtherExpenses(data))
}

export const useUpdateOtherExpenses = () => {
    return useMutation((data: any) => putOtherExpenses(data))
}

export const useDeleteOtherExpenses = () => {
    return useMutation((data: any) => deleteOtherExpenses(data))
}