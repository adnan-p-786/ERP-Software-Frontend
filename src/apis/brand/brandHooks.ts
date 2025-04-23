import { useMutation } from "react-query"
import { deleteBrand, postBrand, putBrand } from "./brandApi"

export const useCreateBrand = () => {
    return useMutation((data: any) => postBrand(data))
}

export const useUpdateBrand = () => {
    return useMutation((data: any) => putBrand(data))
}

export const useDeleteBrand = () => {
    return useMutation((data: any) => deleteBrand(data))
}