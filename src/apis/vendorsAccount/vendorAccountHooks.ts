import { useMutation } from "react-query"
import { deleteVendorsAccount, getVendorsAccount, postVendorsAccount, putVendorsAccount } from "./vendorAccountApi"

export const useCreateVendorsAccount = () => {
    return useMutation((data: any) => postVendorsAccount(data))
}

export const usegetVendorsAccount = () => {
    return useMutation(() => getVendorsAccount())
}

export const useUpdateVendorsAccount = () => {
    return useMutation((data: any) => putVendorsAccount(data))
}

export const useDeleteVendorsAccount = () => {
    return useMutation((data: any) => deleteVendorsAccount(data))
}