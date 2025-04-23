import { useMutation } from "react-query"
import { deleteDiscount, postDiscount, putDiscount } from "./discountApi"

export const useCreateDiscount = () => {
    return useMutation((data: any) => postDiscount(data))
}

export const useUpdateDiscount = () => {
    return useMutation((data: any) => putDiscount(data))
}

export const useDeleteDiscount = () => {
    return useMutation((data: any) => deleteDiscount(data))
}