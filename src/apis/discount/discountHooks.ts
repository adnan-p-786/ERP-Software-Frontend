import { useMutation } from "react-query"
import { deleteDiscount, getDiscount, postDiscount, putDiscount } from "./discountApi"

export const useCreateDiscount = () => {
    return useMutation((data: any) => postDiscount(data))
}

export const usegetDiscount = () => {
    return useMutation(() => getDiscount())
}

export const useUpdateDiscount = () => {
    return useMutation((data: any) => putDiscount(data))
}

export const useDeleteDiscount = () => {
    return useMutation((data: any) => deleteDiscount(data))
}