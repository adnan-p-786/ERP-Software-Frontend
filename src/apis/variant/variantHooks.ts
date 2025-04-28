import { useMutation } from "react-query"
import { deleteVariant, postVariant, putVariant } from "./variantApi"

export const useCreateVariant = () => {
    return useMutation((data: any) => postVariant(data))
}

export const useUpdateVariant = () => {
    return useMutation((data: any) => putVariant(data))
}

export const useDeleteVariant = () => {
    return useMutation((data: any) => deleteVariant(data))
}