import { apiCLient } from "../ApiCLient"

export const getUnits = ()=>{
    return apiCLient.get('/api/get-units')
}

export const postUnits =(data:any)=>{
    return apiCLient.post('/api/post-units',data)
}

export const putUnits = (data:any)=>{
    return apiCLient.put('/api/put-units',data)
}

export const deleteUnits = (data:any)=>{
    return apiCLient.put('/api/delete-units',data)
}