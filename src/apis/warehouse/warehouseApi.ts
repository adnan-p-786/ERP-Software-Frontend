import { apiCLient } from "../ApiCLient"


export const getWarehouse = ()=>{
    return apiCLient.get('/api/get-warehouse')
}

export const postWarehouse =(data:any)=>{
    return apiCLient.post('/api/post-warehouse',data)
}

export const putWarehouse = (data:any)=>{
    return apiCLient.put('/api/put-warehouse',data)
}

export const deleteWarehouse = (data:any)=>{
    return apiCLient.put('/api/delete-warehouse',data)
}