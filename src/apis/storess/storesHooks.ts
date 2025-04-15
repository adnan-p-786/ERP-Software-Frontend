import { useMutation } from "react-query"
import { deletestores, getstores, poststores, putstores } from "./storesApi"


export const useCreateStores = () => {
    return useMutation((data: any) => poststores(data))
}

export const usegetStores = () => {
    return useMutation(() => getstores())
}

export const useUpdateStores = () => {
    return useMutation((data: any) => putstores(data))
}

export const useDeleteStores = () => {
    return useMutation((data: any) => deletestores(data))
}