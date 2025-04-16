import { useMutation } from "react-query"
import { deleteBrand, getBrand, postBrand, putBrand } from "./brandApi"

export const useCreateBrand = () => {
    return useMutation((data: any) => postBrand(data))
}

export const useGetBrand = () => {
    return useMutation(() => getBrand())
}

export const useUpdateBrand = () => {
    return useMutation((data: any) => putBrand(data))
}

export const useDeleteBrand = () => {
    return useMutation((data: any) => deleteBrand(data))
}