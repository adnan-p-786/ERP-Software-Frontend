import { apiCLient } from "../ApiCLient"



export const getRacks = ()=>{
    return apiCLient.get('/api/get-racks')
}

export const postRacks =(data:any)=>{
    return apiCLient.post('/api/post-racks',data)
}

export const putRacks = (data:any)=>{
    return apiCLient.put('/api/put-racks',data)
}

export const deleteRacks = (data:any)=>{
    return apiCLient.put('/api/delete-racks',data)
}