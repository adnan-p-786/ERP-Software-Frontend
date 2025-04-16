import { useMutation } from "react-query"
import { deleteUnits, getUnits, postUnits, putUnits } from "./unitsApi"

export const useCreateUnits = () => {
    return useMutation((data: any) => postUnits(data))
}

export const usegetUnits = () => {
    return useMutation(() => getUnits())
}

export const useUpdateUnits = () => {
    return useMutation((data: any) => putUnits(data))
}

export const useDeleteUnits = () => {
    return useMutation((data: any) => deleteUnits(data))
}