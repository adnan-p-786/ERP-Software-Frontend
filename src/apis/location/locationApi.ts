import { apiCLient } from "../ApiCLient"



export const getLocation = ()=>{
    return apiCLient.get('api/get-location')
}

export const postLocation = (data:any)=>{
    return apiCLient.get('api/post-location',data)
}

export const putLocation = (data:any)=>{
    return apiCLient.put('/api/put-location',data)
}

export const deleteLocation = (data:any)=>{
    return apiCLient.put('/api/delete-location',data)
}