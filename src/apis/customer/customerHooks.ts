import { useMutation  } from "react-query"
import { deleteCustomers, getCustomers, postCustomers, putCustomers } from "./customerApi"




export const useCreateCustomers = () => {
    return useMutation((data: any) => postCustomers(data))
}

export const useGetCustomers = () => {
    return useMutation(() => getCustomers())
}

export const useUpdateCustomers = () => {
    return useMutation((data: any) => putCustomers(data))
}

export const useDeleteCustomers = () => {
    return useMutation((data: any) => deleteCustomers(data))
}