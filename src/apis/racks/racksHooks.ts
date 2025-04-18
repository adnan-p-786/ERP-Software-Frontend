import { useMutation } from "react-query"
import { deleteRacks, getRacks, postRacks, putRacks } from "./racksApi"


export const useCreateRacks = () => {
    return useMutation((data: any) => postRacks(data))
}

export const usegetRacks = () => {
    return useMutation(() => getRacks())
}

export const useUpdateRacks = () => {
    return useMutation((data: any) => putRacks(data))
}

export const useDeleteRacks = () => {
    return useMutation((data: any) => deleteRacks(data))
}

