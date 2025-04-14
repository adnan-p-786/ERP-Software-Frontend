import { useMutation } from "react-query"
import { deleteVendors, getVendors, postVendors } from "./vendorApi"
import { putRacks } from "../racks/racksApi"


export const useCreateVendors = () => {
    return useMutation((data: any) => postVendors(data))
}

export const usegetVendors = () => {
    return useMutation(() => getVendors())
}

export const useUpdateVendors = () => {
    return useMutation((data: any) => putRacks(data))
}

export const useDeleteVendors = () => {
    return useMutation((data: any) => deleteVendors(data))
}