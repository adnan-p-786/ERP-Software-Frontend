import { useMutation } from "react-query"
import { deleteCustomerAccounts, getCustomerAccounts, postCustomerAccounts, putCustomerAccounts } from "./customerAccountApi"


export const useCreateCustomerAccounts = () => {
    return useMutation((data: any) => postCustomerAccounts(data))
}

export const useGetCustomerAccounts = () => {
    return useMutation(() => getCustomerAccounts())
}

export const useUpdateCustomerAccounts = () => {
    return useMutation((data: any) => putCustomerAccounts(data))
}

export const useDeleteCustomerAccounts = () => {
    return useMutation((data: any) => deleteCustomerAccounts(data))
}