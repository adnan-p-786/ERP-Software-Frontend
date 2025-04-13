import { useMutation } from "react-query"
import { deleteDepartment, getDepartment, postDepartment, putDepartment } from "./departmentApi"



export const useCreateDepartment = () => {
    return useMutation((data: any) => postDepartment(data))
}

export const usegetDepartment = () => {
    return useMutation(() => getDepartment())
}

export const useUpdateDepartment = () => {
    return useMutation((data: any) => putDepartment(data))
}

export const useDeleteDepartment = () => {
    return useMutation((data: any) => deleteDepartment(data))
}