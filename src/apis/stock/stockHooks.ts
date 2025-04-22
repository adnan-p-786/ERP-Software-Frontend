import { useMutation } from "react-query"
import { deleteStocks, postStocks, putStocks } from "./stockApi"

export const useCreateStocks = () => {
    return useMutation((data: any) => postStocks(data))
}

export const useUpdateStocks = () => {
    return useMutation((data: any) => putStocks(data))
}

export const useDeleteStocks = () => {
    return useMutation((data: any) => deleteStocks(data))
}