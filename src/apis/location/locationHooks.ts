import { useMutation } from "react-query"
import { deleteLocation, getLocation, postLocation, putLocation } from "./locationApi"


export const useGetlocation = ()=>{
    return useMutation(()=> getLocation())
}

export const useCreatelocation = () => {
    return useMutation((data: any) => postLocation(data))
}

export const useUpdatelocation = () => {
    return useMutation((data: any) => putLocation(data))
}

export const useDeletelocation = () => {
    return useMutation((data: any) => deleteLocation(data))
}