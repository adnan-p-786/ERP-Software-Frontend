import { useMutation } from "react-query"
import { deleteVendors, postVendors, putVendors } from "./vendorApi"


export const useCreateVendors = () => {
    return useMutation((data: any) => postVendors(data))
}

export const useUpdateVendors = () => {
    return useMutation((data: any) => putVendors(data))
}

export const useDeleteVendors = () => {
    return useMutation((data: any) => deleteVendors(data))
}