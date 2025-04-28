import { apiCLient } from "../ApiCLient"

export const getVariant = ()=>{
    return apiCLient.get('/api/get-variant')
}

export const postVariant =(data:any)=>{
    return apiCLient.post('/api/post-variant',data)
}

export const putVariant = (data:any)=>{
    return apiCLient.put('/api/put-variant',data)
}

export const deleteVariant = (data:any)=>{
    return apiCLient.put('/api/delete-variant',data)
}