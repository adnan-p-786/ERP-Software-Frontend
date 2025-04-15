import { useMutation } from "react-query"
import { deleteWarehouse, getWarehouse, postWarehouse, putWarehouse } from "./warehouseApi"


export const useCreateWarehouse = () => {
    return useMutation((data: any) => postWarehouse(data))
}

export const usegetWarehouse = () => {
    return useMutation(() => getWarehouse())
}

export const useUpdateWarehouse = () => {
    return useMutation((data: any) => putWarehouse(data))
}

export const useDeleteWarehouse = () => {
    return useMutation((data: any) => deleteWarehouse(data))
}