import { useMutation } from "react-query"
import { deleteProduct, postProduct, putProduct } from "./productApi"

export const useCreateProduct = () => {
    return useMutation((data: any) => postProduct(data))
}

export const useUpdateProduct = () => {
    return useMutation((data: any) => putProduct(data))
}

export const useDeleteProduct = () => {
    return useMutation((data: any) => deleteProduct(data))
}