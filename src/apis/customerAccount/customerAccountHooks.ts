import { useMutation } from "react-query"
import { deleteCustomerAccounts, postCustomerAccounts, putCustomerAccounts } from "./customerAccountApi"


export const useCreateCustomerAccounts = () => {
    return useMutation((data: any) => postCustomerAccounts(data))
}

export const useUpdateCustomerAccounts = () => {
    return useMutation((data: any) => putCustomerAccounts(data))
}

export const useDeleteCustomerAccounts = () => {
    return useMutation((data: any) => deleteCustomerAccounts(data))
}