import { useMutation } from "react-query"
import { deleteRoles, getRoles, postRoles, putRoles } from "./rolesApi"

export const useCreateRoles = () => {
    return useMutation((data: any) => postRoles(data))
}

export const usegetRoles = () => {
    return useMutation(() => getRoles())
}

export const useUpdateRoles = () => {
    return useMutation((data: any) => putRoles(data))
}

export const useDeleteRoles = () => {
    return useMutation((data: any) => deleteRoles(data))
}