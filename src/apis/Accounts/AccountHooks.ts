import { useMutation } from "react-query"
import { deleteAccounts, postAccounts, putAccounts } from "./AccountApi"

export const useCreateAccounts = () => {
    return useMutation((data: any) => postAccounts(data))
}

export const useUpdateAccounts = () => {
    return useMutation((data: any) => putAccounts(data))
}

export const useDeleteAccounts = () => {
    return useMutation((data: any) => deleteAccounts(data))
}

