import { useMutation } from "react-query"
import { deletestores, poststores, putstores } from "./storesApi"


export const useCreateStores = () => {
    return useMutation((data: any) => poststores(data))
}

export const useUpdateStores = () => {
    return useMutation((data: any) => putstores(data))
}

export const useDeleteStores = () => {
    return useMutation((data: any) => deletestores(data))
}