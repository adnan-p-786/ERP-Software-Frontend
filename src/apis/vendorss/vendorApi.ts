import { apiCLient } from "../ApiCLient"



export const getVendors = ()=>{
    return apiCLient.get('/api/get-vendors')
}

export const postVendors =(data:any)=>{
    return apiCLient.post('/api/post-vendors',data)
}

export const putVendors = (data:any)=>{
    return apiCLient.put('/api/put-vendors',data)
}

export const deleteVendors = (data:any)=>{
    return apiCLient.put('/api/delete-vendors',data)
}