import { useMutation } from "react-query"
import { deleteVariant, postVariant, putVariant } from "./variantApi"

export const useCreateUnits = () => {
    return useMutation((data: any) => postVariant(data))
}

export const useUpdateUnits = () => {
    return useMutation((data: any) => putVariant(data))
}

export const useDeleteUnits = () => {
    return useMutation((data: any) => deleteVariant(data))
}