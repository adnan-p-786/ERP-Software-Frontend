import { useMutation } from "react-query"
import { deleteDepartment, postDepartment, putDepartment } from "./departmentApi"



export const useCreateDepartment = () => {
    return useMutation((data: any) => postDepartment(data))
}

export const useUpdateDepartment = () => {
    return useMutation((data: any) => putDepartment(data))
}

export const useDeleteDepartment = () => {
    return useMutation((data: any) => deleteDepartment(data))
}