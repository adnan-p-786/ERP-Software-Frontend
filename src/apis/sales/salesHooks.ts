import { useMutation } from "react-query"
import { deleteSales, postSales, putSales } from "./salesApi"

export const useCreateSales = () => {
    return useMutation((data: any) => postSales(data))
}

export const useUpdateSales = () => {
    return useMutation((data: any) => putSales(data))
}

export const useDeleteSales = () => {
    return useMutation((data: any) => deleteSales(data))
}