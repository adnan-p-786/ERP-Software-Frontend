import { apiCLient } from "../ApiCLient"

export const getDiscount = ()=>{
    return apiCLient.get('/api/get-discount')
}

export const postDiscount =(data:any)=>{
    return apiCLient.post('/api/post-discount',data)
}

export const putDiscount = (data:any)=>{
    return apiCLient.put('/api/put-discount',data)
}

export const deleteDiscount = (data:any)=>{
    return apiCLient.put('/api/delete-discount',data)
}