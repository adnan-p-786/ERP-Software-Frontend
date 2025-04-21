import { apiCLient } from "../ApiCLient"

export const getPurchase = ()=>{
    return apiCLient.get('/api/get-purchase')
}

export const postPurchase =(data:any)=>{
    return apiCLient.post('/api/post-purchase',data)
}

export const putPurchase = (data:any)=>{
    return apiCLient.put('/api/put-purchase',data)
}

export const deletePurchase = (data:any)=>{
    return apiCLient.put('/api/delete-purchase',data)
}