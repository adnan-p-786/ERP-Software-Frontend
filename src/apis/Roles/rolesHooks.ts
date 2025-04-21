import { useMutation } from "react-query"
import { deleteRoles, getRoles, postRoles, putRoles } from "./rolesApi"

export const useCreateStores = () => {
    return useMutation((data: any) => postRoles(data))
}

export const usegetStores = () => {
    return useMutation(() => getRoles())
}

export const useUpdateStores = () => {
    return useMutation((data: any) => putRoles(data))
}

export const useDeleteStores = () => {
    return useMutation((data: any) => deleteRoles(data))
}