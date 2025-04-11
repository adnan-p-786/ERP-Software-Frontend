import { apiCLient } from "../ApiCLient"



export const getSubCategory = ()=>{
    return apiCLient.get('/api/get-subCategories')
}

export const createSubCategory = (data:any)=>{
    return apiCLient.post('/api/post-subCategories',data)
}