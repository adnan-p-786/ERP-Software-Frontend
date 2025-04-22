import { useMutation } from "react-query"
import { deleteStocks, getStocks, postStocks, putStocks } from "./stockApi"

export const useCreateStocks = () => {
    return useMutation((data: any) => postStocks(data))
}

export const usegetStocks = () => {
    return useMutation(() => getStocks())
}

export const useUpdateStocks = () => {
    return useMutation((data: any) => putStocks(data))
}

export const useDeleteStocks = () => {
    return useMutation((data: any) => deleteStocks(data))
}