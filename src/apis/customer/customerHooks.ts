import { useMutation  } from "react-query"
import { deleteCustomer, getCustomer, postCustomer, putCustomer } from "./customerApi"




export const useCreateCustomers = () => {
    return useMutation((data: any) => postCustomer(data))
}

export const useGetCustomers = () => {
    return useMutation(() => getCustomer())
}

export const useUpdateCustomers = () => {
    return useMutation((data: any) => putCustomer(data))
}

export const useDeleteCustomers = () => {
    return useMutation((data: any) => deleteCustomer(data))
}