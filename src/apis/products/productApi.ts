import { apiCLient } from "../ApiCLient"

export const getProduct = ()=>{
    return apiCLient.get('/api/get-product')
}

export const postProduct =(data:any)=>{
    return apiCLient.post('/api/post-product',data)
}

export const putProduct = (data:any)=>{
    return apiCLient.put('/api/put-product',data)
}

export const deleteProduct = (data:any)=>{
    return apiCLient.put('/api/delete-product',data)
}