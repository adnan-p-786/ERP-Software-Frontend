import { useMutation } from "react-query"
import { deleteUnits, postUnits, putUnits } from "./unitsApi"

export const useCreateUnits = () => {
    return useMutation((data: any) => postUnits(data))
}

export const useUpdateUnits = () => {
    return useMutation((data: any) => putUnits(data))
}

export const useDeleteUnits = () => {
    return useMutation((data: any) => deleteUnits(data))
}