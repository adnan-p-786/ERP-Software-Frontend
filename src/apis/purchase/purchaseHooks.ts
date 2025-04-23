import { useMutation } from "react-query"
import { deletePurchase, postPurchase, putPurchase } from "./purchaseApi"

export const useCreatePurchase = () => {
    return useMutation((data: any) => postPurchase(data))
}

export const useUpdatePurchase = () => {
    return useMutation((data: any) => putPurchase(data))
}

export const useDeletePurchase = () => {
    return useMutation((data: any) => deletePurchase(data))
}